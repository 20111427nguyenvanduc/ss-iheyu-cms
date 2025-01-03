/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, Chip} from "@mui/material"
import {tiepNhanXyLy} from "../../services/petition"

const BtnTiepNhanXuLy = ({children, idSelected, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)
 const [reson, setReson] = useState("")
 const [icon, setIcon] = useState("")

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleTiepNhanXuLy = () => {
  tiepNhanXyLy({_id: idSelected}).then((res) => {
   if (_.get(res, "code") === 200) {
   }
  })
 }

 return (
  <React.Fragment>
   {React.cloneElement(
    children || (
     <Button onClick={() => {}} variant='contained' size='large' sx={{width: "180px", background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}}>
      Tiếp nhận xử lý
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose}>
    <DialogTitle>
     <Typography component='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Tiếp nhận xử lý
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'></Box>
     </Box>
    </DialogContent>
    <DialogActions sx={{padding: "0 24px 24px"}}>
     <Button
      onClick={handleClose}
      variant='contained'
      size='large'
      sx={{
       width: "50%",
       background: "#FFF",
       color: "#007CFE",
       border: "1px solid #007CFE",
       "&:hover": {
        backgroundColor: "#FFF",
        color: "#007CFE",
       },
      }}
     >
      Quay lại
     </Button>
     <Button
      onClick={() => {
       handleTiepNhanXuLy()
      }}
      size='large'
      fullWidth
      variant='contained'
      type='submit'
      sx={{width: "50%", background: "#007CFE"}}
     >
      Tiếp nhận xử lý
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default BtnTiepNhanXuLy
