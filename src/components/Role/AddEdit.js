/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, FormControlLabel, Checkbox, Grid} from "@mui/material"
import {create as createRole, update as updateRole} from "../../services/role"
import {list as listGroupPermission} from "../../services/groupPermission"
import FilterAddPermission from "../GroupPermission/FilterAddPermission"

const AddGroup = ({children, onClose = () => {}, detail = null}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [description, setDescription] = useState("")
 const [code, setCode] = useState("")
 const [permissions, setPermissions] = useState([])
 const [groupPermissions, setGroupPermissions] = useState([])
 const [dataGroup, setDataGroup] = useState([])

 useEffect(() => {
  if (detail && open) {
   fillDataState(detail)
  }
 }, [open, detail])

 useEffect(() => {
  getListGroupPermissions()
 }, [])

 const getListGroupPermissions = () => {
  listGroupPermission({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setDataGroup(_.get(res, "data"))
   }
  })
 }

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const resetState = (detail) => {
  setName("")
  setDescription("")
  setPermissions([])
  setGroupPermissions([])
 }

 const fillDataState = (detail) => {
  setName(_.get(detail, "name"))
  setDescription(_.get(detail, "description"))
  setPermissions(_.get(detail, "permissions"))
  setGroupPermissions(_.get(detail, "groupPermissions"))
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên vai trò")
   return false
  }
  if (!description) {
   toastr.warning("Nhập mô tả vai trò")
   return false
  }
  if (!permissions.length) {
   toastr.warning("Chọn quyền cho vai trò")
   return false
  }
  try {
   createRole({name, description, permissions, groupPermissions}).then((res) => {
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
   toastr.warning("Nhập tên vai trò")
   return false
  }
  if (!description) {
   toastr.warning("Nhập mô tả vai trò")
   return false
  }
  if (!permissions.length) {
   toastr.warning("Chọn quyền cho vai trò")
   return false
  }
  try {
   updateRole({_id: _.get(detail, "_id"), name, description, permissions, groupPermissions}).then((res) => {
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

   <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {detail ? "Chỉnh sửa vai trò " : "Thêm vai trò mới"}
     </Typography>
    </DialogTitle>
    <DialogContent dividers>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên vai trò
       </Typography>
       <TextField
        fullWidth
        label='Nhập tên vai trò'
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
        label='Nhập mô tả vai trò'
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

       <FilterAddPermission permissions={permissions} setPermissions={setPermissions} groupPermissions={groupPermissions} setGroupPermissions={setGroupPermissions} dataGroup={dataGroup} />

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
