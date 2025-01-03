import * as React from "react"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import DirectionsIcon from "@mui/icons-material/Directions"
const noOp = () => {}

export default function Search({placeholder = "Tìm kiếm", textSearch = "", searchChange = noOp, onSubmit = noOp}) {
 const onTextSearchChange = (value) => {
  searchChange(value)
 }

 return (
  <Paper
   onSubmit={(e) => {
    e.preventDefault()
    onSubmit()
   }}
   component='form'
   sx={{p: "0px 4px", display: "flex", alignItems: "center", width: 250, boxShadow: "none", borderRadius: "32px", border: "1px solid #CCCFD3"}}
  >
   <IconButton sx={{p: "8px"}} aria-label='menu' onClick={(e) => onSubmit()}>
    <SearchIcon />
   </IconButton>
   <InputBase sx={{ml: 1, flex: 1}} placeholder={placeholder} inputProps={{"aria-label": {placeholder}}} value={textSearch} onChange={(e) => onTextSearchChange(e.target.value)} />
  </Paper>
 )
}
