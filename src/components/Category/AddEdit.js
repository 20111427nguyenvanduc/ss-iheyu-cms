/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, Chip} from "@mui/material"
import {create as createCategory, update as updateCategory} from "../../services/category"
import UploadImgSingle from "../tools/UploadImgSingle"

const AddEdit = ({children, onClose = () => {}, detail = null}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [icon, setIcon] = useState("")

 useEffect(() => {
  if (open) {
   setStateData()
  }
 }, [open, detail])

 const setStateData = () => {
  setName(_.get(detail, "name"))
  setIcon(_.get(detail, "icon"))
 }

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const resetState = () => {
  setName("")
  setIcon("")
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên danh mục")
   return false
  }
  if (!icon) {
   toastr.warning("Tải ảnh danh mục")
   return false
  }

  try {
   createCategory({name, icon}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Tạo danh mục thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleUpdate = () => {
  if (!name) {
   toastr.warning("Nhập tên danh mục")
   return false
  }
  if (!icon) {
   toastr.warning("Tải ảnh danh mục")
   return false
  }

  try {
   updateCategory({_id: _.get(detail, "_id"), name, icon}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Cập nhật danh mục thành công!")
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
     <Button variant='contained' size='large' sx={{padding: "12px 32px", background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}} startIcon={<i className='icon-bold-add-circle' />}>
      Thêm danh mục mới
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose} PaperProps={{sx: {borderRadius: "16px"}}}>
    <DialogTitle>
     <Typography component='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {detail ? "Sửa danh mục" : "Thêm danh mục mới"}
     </Typography>
     <Typography component='p' sx={{fontSize: "18px", color: "#143250", fontWeight: 400}}>
      Phản ánh kiến nghị
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên danh mục
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập tên danh mục'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Biểu tượng danh mục{" "}
       </Typography>

       <UploadImgSingle
        id={"icon-unut"}
        width={"100%"}
        height={"150px"}
        folder='icon-unit'
        imageUrl={icon}
        onUploadSuccess={(imageUrl) => {
         setIcon(imageUrl)
        }}
        onDeleteFile={(filename) => {
         setIcon("")
        }}
        type='category'
       >
        <Stack direction='column' spacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
         <img src='/images/icon-upload.png' style={{width: "40px"}} />
         <Typography variant='p' sx={{fontSize: "14px", color: "#656C75", fontWeight: 400}}>
          Thêm file/ hình ảnh{" "}
         </Typography>
         <Chip label='Chọn file ' />
        </Stack>
       </UploadImgSingle>
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
        {detail ? "Cập nhật danh mục" : " Tạo danh mục"}
       </Button>
      </Box>
     </Box>
    </DialogContent>
   </Dialog>
  </React.Fragment>
 )
}

export default AddEdit
