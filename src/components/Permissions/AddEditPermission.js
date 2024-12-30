/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete} from "@mui/material"
import {create as createPermission, update as updatePermission} from "../../services/permission"
import {list as listCategoryPermission} from "../../services/categoryPermission"

const AddGroup = ({children, onClose = () => {}, detail = null}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [description, setDescription] = useState("")
 const [code, setCode] = useState("")
 const [categoryPermission, setCategoryPermission] = useState("")
 const [listCat, setListCat] = useState([])

 useEffect(() => {
  resetState(detail)
 }, [detail])

 useEffect(() => {
  getList()
 }, [])

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
  setCategoryPermission(_.get(detail, "categoryPermission"))
 }

 const getList = () => {
  listCategoryPermission({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setListCat(_.get(res, "data"))
   }
  })
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
   createPermission({name, description, code, categoryPermission: _.get(categoryPermission, "_id")}).then((res) => {
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
   updatePermission({_id: _.get(detail, "_id"), name, description, code, categoryPermission: _.get(categoryPermission, "_id")}).then((res) => {
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

 const compareOldNew = () => {
  if (detail) {
   if (name != _.get(detail, "name")) {
    return false
   }
   if (code != _.get(detail, "code")) {
    return false
   }
   if (description != _.get(detail, "description")) {
    return false
   }
   if (_.get(categoryPermission, "_id") != _.get(detail, "categoryPermission._id")) {
    return false
   }
   return true
  } else {
   if (!name || !code) {
    return true
   }
   return false
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
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên quyền
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập tên quyền'
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
        placeholder='Nhập mã code'
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
        placeholder='Nhập mô tả quyền'
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
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Danh mục
       </Typography>
       <Autocomplete
        fullWidth
        options={listCat}
        getOptionLabel={(option) => _.get(option, "name", "")}
        value={categoryPermission}
        onChange={(e, value) => {
         setCategoryPermission(value)
        }}
        renderInput={(params) => (
         <TextField
          {...params}
          fullWidth
          placeholder='Chọn danh mục'
          variant='outlined'
          sx={{
           "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
           },
          }}
         />
        )}
       />
       <Button
        disabled={compareOldNew()}
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
