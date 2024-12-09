import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import parse from "autosuggest-highlight/parse"
import { debounce } from "@mui/material/utils"
import { placeAutocomplete, placeDetail } from "../../services/location"
// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = "AIzaSyC3aviU6KHXAjoSnxcw6qbOhjnFctbxPkE"

export default function GoogleMaps({ onChange = () => {}, defaultValue = "", inputProps, ...props }) {
 const [value, setValue] = React.useState(defaultValue)
 const [inputValue, setInputValue] = React.useState('')
 const [options, setOptions] = React.useState([])

 const fetch = React.useMemo(
  () =>
   debounce((request, callback) => {
    placeAutocomplete(request).then(callback)
   }, 400),
  [],
 )

 React.useEffect(() => {
  let active = true

  if (inputValue === "") {
   setOptions(value ? [value] : [])
   return undefined
  }

  fetch({ input: inputValue }, (results) => {
   let predictions = _.get(results, "predictions")
   if (active) {
    let newOptions = []

    if (value) {
     newOptions = [value]
    }

    if (predictions) {
     newOptions = [...newOptions, ...predictions]
    }

    setOptions(newOptions)
   }
  })

  return () => {
   active = false
  }
 }, [value, inputValue, fetch])

 const onLocationChange = (option) => {
  placeDetail({ placeid: _.get(option, "place_id") }).then((response) => {
   onChange(_.get(response, "result"))
  })
 }

 return (
  <Autocomplete
   sx={{ width: "100%" }}
   getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
   filterOptions={(x) => x}
   options={options}
   autoComplete
   includeInputInList
   filterSelectedOptions
   value={value}
   noOptionsText='Không tìm thấy vị trí'
   onChange={(event, newValue) => {
    setOptions(newValue ? [newValue, ...options] : options)
    setValue(newValue)
    if (newValue) {
     onLocationChange(newValue)
    }
   }}
   onInputChange={(event, newInputValue) => {
    setInputValue(newInputValue)
   }}
   renderInput={(params) => <TextField {...params} fullWidth {...inputProps} />}
   renderOption={(props, option) => {
    const { key, ...optionProps } = props
    const matches = _.get(option, "structured_formatting.main_text_matched_substrings", [])
    const parts = parse(
     _.get(option, "structured_formatting.main_text"),
     matches.map((match) => [match.offset, match.offset + match.length]),
    )
    return (
     <li key={key} {...optionProps}>
      <Grid container sx={{ alignItems: "center" }}>
       <Grid item sx={{ display: "flex", width: 44 }}>
        <LocationOnIcon sx={{ color: "text.secondary" }} />
       </Grid>
       <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
        {parts.map((part, index) => (
         <Box key={index} component='span' sx={{ fontWeight: part.highlight ? "bold" : "regular" }}>
          {part.text}
         </Box>
        ))}
        <Typography variant='body2' color='text.secondary'>
         {_.get(option, "structured_formatting.secondary_text")}
        </Typography>
       </Grid>
      </Grid>
     </li>
    )
   }}
   {...props}
  />
 )
}
