/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField} from "@mui/material"
import {create as createPermission} from "../../services/permission"

const AddPermission = ({groupPermission, handleAddPermission}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [code, setCode] = useState("")

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const resetState = () => {
  setName("")
  setCode("")
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên quyền")
   return false
  }
  if (!code) {
   toastr.warning("Nhập tên mã code")
   return false
  }
  try {
   createPermission({name, code}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Tạo quyền thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 return (
  <React.Fragment>
   <Button
    onClick={handleClickOpen}
    variant='contained'
    size='large'
    sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}}
    startIcon={<i className='icon-bold-document-text' />}
   >
    Thêm quyền mới
   </Button>
   <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle>
     <Typography variant='h5' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Thêm quyền mới
     </Typography>
    </DialogTitle>
    <DialogContent dividers>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên quyền
       </Typography>
       <TextField
        fullWidth
        label='Nhập tên quyền'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
       <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Mã code
       </Typography>
       <TextField
        fullWidth
        label='Nhập mã code'
        variant='outlined'
        value={code}
        onChange={(e) => setCode(e.target.value)}
        inputProps={{name: "code", ariallabel: "code"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
       <Button
        onClick={() => {
         handleCreate()
        }}
        fullWidth
        variant='contained'
        type='submit'
        sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px", textTransform: "inherit", fontWeight: 600}}
       >
        Tạo quyền
       </Button>
      </Box>
     </Box>
    </DialogContent>
   </Dialog>
  </React.Fragment>
 )
}

export default AddPermission
