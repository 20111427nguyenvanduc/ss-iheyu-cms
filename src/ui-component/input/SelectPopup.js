import React, { useState, Fragment } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"

export default function SelectPopup({ label, value, options = [], onChange = () => {}, ...props }) {
 const [open, setOpen] = useState(false)

 const handleChange = (newValue) => {
  onChange(newValue)
  handleClose()
 }

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = (event, reason) => {
  setOpen(false)
 }
 let showValue = value
 options.forEach((opt) => {
  if (opt.value === value) {
   showValue = opt.title
  }
 })
 return (
  <Fragment>
   <Button onClick={handleClickOpen} variant='outlined' color='grey' {...props}>
    {label}: {showValue || "Chưa chọn"}
   </Button>
   <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{label}</DialogTitle>
    <DialogContent>
     <Box component='form' sx={{ display: "flex", flexWrap: "wrap", gap: 1, minWidth: "256px" }}>
      {options.map((opt, i) => (
       <Button key={i} variant={value === opt.value ? "contained" : "outlined"} onClick={() => handleChange(opt.value)}>
        {opt.title}
       </Button>
      ))}
     </Box>
    </DialogContent>
   </Dialog>
  </Fragment>
 )
}
