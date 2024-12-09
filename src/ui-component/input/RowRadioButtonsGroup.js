import React, {useState} from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

export default function RowRadioButtonsGroup({options = [], value, setValue, label, id}) {
 const [inputs, setInputs] = useState({})
 const handleChange = (option) => {
  setValue(option)
 }
 return (
  <FormControl>
   <FormLabel id={id}>{label}</FormLabel>
   <RadioGroup row aria-labelledby={id} name={id}>
    {options.map((option, i) => {
     return <FormControlLabel key={i} control={<Radio checked={value === option.value} onClick={() => handleChange(option)} />} {...option} />
    })}
   </RadioGroup>
  </FormControl>
 )
}
