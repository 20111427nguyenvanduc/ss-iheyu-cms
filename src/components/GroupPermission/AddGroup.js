/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField} from "@mui/material"
import {create as createGroupPermission} from "../../services/groupPermission"

const AddGroup = ({children, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [description, setDescription] = useState("")

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const resetState = () => {
  setName("")
  setDescription("")
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên nhóm quyền")
   return false
  }
  try {
   createGroupPermission({name, description, permissions: []}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Tạo nhóm quyền thành công!")
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
    Thêm mới
   </Button>
   <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Thêm nhóm quyền mới{" "}
     </Typography>
    </DialogTitle>
    <DialogContent dividers>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên nhóm quyền
       </Typography>
       <TextField
        fullWidth
        label='Nhập tên nhóm quyền'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Mô tả
       </Typography>
       <TextField
        fullWidth
        label='Mô tả nhóm quyền'
        variant='outlined'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        inputProps={{name: "description", ariallabel: "description"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
        multiline
        rows={4}
       />
       <Button
        onClick={() => {
         handleCreate()
        }}
        fullWidth
        variant='contained'
        type='submit'
        sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px"}}
       >
        Tạo nhóm quyền
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
