/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment} from "@mui/material"
import {create as createPosition, update as updatePosition} from "../../services/position"

const AddEditPosition = ({children, onClose = () => {}, unitCurrent, detail = null}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [icon, setIcon] = useState("https://cdn.haiphong.gov.vn/gov-hpg/upload/haiphong/product/2021/07-2021/So-Giao-duc-va-Dao-tao-12885-637620339902795980.jpg")

 useEffect(() => {
  if (open) {
   setStateData()
  }
 }, [open, detail])

 const setStateData = () => {
  setName(_.get(detail, "name"))
 }

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const resetState = () => {
  setName("")
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên chức vụ")
   return false
  }

  try {
   createPosition({name, unit: _.get(unitCurrent, "_id"), permissions: [], groupPermissions: []}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Tạo chức vụ thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleUpdate = () => {
  if (!name) {
   toastr.warning("Nhập tên chức vụ")
   return false
  }
  try {
   updatePosition({_id: _.get(detail, "_id"), name, unit: _.get(unitCurrent, "_id"), permissions: _.get(detail, "permissions"), groupPermissions: _.get(detail, "groupPermissions")}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Cập nhật chức vụ thành công!")
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
     <Button variant='contained' size='large' sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}} startIcon={<i className='icon-bold-add-circle' />}>
      Thêm chức vụ mới
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose} PaperProps={{sx: {borderRadius: "16px"}}}>
    <DialogTitle>
     <Typography component='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {detail ? "Sửa chức vụ" : "Thêm chức vụ mới"}
     </Typography>
     <Typography component='p' sx={{fontSize: "18px", color: "#143250", fontWeight: 400}}>
      Trực thuộc {_.get(unitCurrent, "name")}
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên chức vụ
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập tên chức vụ'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
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
        sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px", textTransform: "initial"}}
       >
        {detail ? "Cập nhật chức vụ" : "Tạo chức vụ mới"}
       </Button>
      </Box>
     </Box>
    </DialogContent>
   </Dialog>
  </React.Fragment>
 )
}

export default AddEditPosition
