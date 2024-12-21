import * as React from "react"
import {styled, useTheme} from "@mui/material/styles"

import {IconButton, TextField, InputAdornment} from "@mui/material"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const PasswordInput = ({...others}) => {
 const theme = useTheme()
 const [showPassword, setShowPassword] = React.useState(false)

 const handleClickShowPassword = () => setShowPassword((show) => !show)

 const handleMouseDownPassword = (event) => {
  event.preventDefault()
 }

 return (
  <TextField
   variant='outlined'
   type={showPassword ? "text" : "password"}
   InputProps={{
    endAdornment: (
     <InputAdornment position='end'>
      <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end' sx={{color: theme.palette.text.primary}}>
       {showPassword ? <VisibilityOff sx={{width: "25px", height: "25px"}} /> : <Visibility sx={{width: "25px", height: "25px"}} />}
      </IconButton>
     </InputAdornment>
    ),
    sx: {borderRadius: "12px"},
   }}
   {...others}
  />
 )
}
export default PasswordInput
