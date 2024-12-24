/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField} from "@mui/material"
import {create as createPermission, update as updatePermission} from "../../services/permission"

const AddGroup = ({children, onClose = () => {}, detail = null}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [description, setDescription] = useState("")
 const [code, setCode] = useState("")

 useEffect(() => {
  resetState(detail)
 }, [detail])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const resetState = (detail) => {
  setName(_.get(detail, "name"))
  setDescription(_.get(detail, "description"))
  setCode(_.get(detail, "code"))
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên quyền")
   return false
  }
  if (!code) {
   toastr.warning("Nhập mã code")
   return false
  }
  try {
   createPermission({name, description, code}).then((res) => {
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

 const handleUpdate = () => {
  if (!name) {
   toastr.warning("Nhập tên quyền")
   return false
  }
  if (!code) {
   toastr.warning("Nhập mã code")
   return false
  }
  try {
   updatePermission({_id: _.get(detail, "_id"), name, description, code}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Cập nhật quyền thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 return (
  <React.Fragment>
   {React.cloneElement(
    children || (
     <Button variant='contained' size='large' sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}} startIcon={<i className='icon-bold-document-text' />}>
      Thêm mới
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {detail ? "Chỉnh sửa quyền " : "Thêm quyền mới"}
     </Typography>
    </DialogTitle>
    <DialogContent dividers>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên quyền
       </Typography>
       <TextField
        fullWidth
        label='Nhập tên quyền'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Mã code quyền
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
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Mô tả
       </Typography>
       <TextField
        fullWidth
        label='Nhập mô tả quyền'
        variant='outlined'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
        multiline
        rows={4}
       />
       <Button
        onClick={() => {
         if (detail) {
          handleUpdate()
         } else {
          handleCreate()
         }
        }}
        fullWidth
        variant='contained'
        type='submit'
        sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px"}}
       >
        {detail ? "Cập nhật" : "Tạo quyền"}
       </Button>
      </Box>
     </Box>
    </DialogContent>
    <DialogActions></DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default AddGroup
