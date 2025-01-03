import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete} from "@mui/material"
import {create as createPermission, update as updatePermission} from "../../services/permission"
import {list as listCategory} from "../../services/category"

const EditPriority = ({children, priorityDetail = 0, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)
 const [listPriority, setListPriority] = useState([
  {
   name: "Cao nhất",
   value: 0,
   url: "/images/priority/priority-0.png",
  },
  {
   name: "Cao",
   value: 1,
   url: "/images/priority/priority-1.png",
  },
  {
   name: "Trung bình",
   value: 2,
   url: "/images/priority/priority-2.png",
  },
  {
   name: "Thấp",
   value: 3,
   url: "/images/priority/priority-3.png",
  },
  {
   name: "Thấp nhất",
   value: 4,
   url: "/images/priority/priority-4.png",
  },
 ])

 // Khởi tạo giá trị ban đầu của priority từ priorityDetail
 const [priority, setPriority] = useState(priorityDetail)

 useEffect(() => {
  setPriority(priorityDetail) // Cập nhật priority khi priorityDetail thay đổi
 }, [priorityDetail])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleCreate = () => {
  // Handle create action
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

   <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Chỉnh sửa mức độ
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Mức độ
       </Typography>
       <Autocomplete
        fullWidth
        options={listPriority}
        getOptionLabel={(option) => _.get(option, "name", "")}
        value={listPriority.find((item) => _.get(item, "value") === priority) || null} // Bind the value based on priority value
        onChange={(e, value) => {
         setPriority(_.get(value, "value", null)) // Only store the value when selected
        }}
        renderOption={(props, option) => (
         <li {...props} style={{display: "flex", alignItems: "center"}}>
          <img src={_.get(option, "url", "")} alt={_.get(option, "name", "")} style={{width: "20px", height: "20px", margin: "0 8px"}} />
          <Typography>{_.get(option, "name", "")}</Typography>
         </li>
        )}
        renderInput={(params) => (
         <TextField
          {...params}
          fullWidth
          placeholder='Chọn mức độ'
          variant='outlined'
          sx={{
           "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
           },
          }}
          InputProps={{
           ...params.InputProps,
           startAdornment: priority !== null && (
            <img
             src={_.get(
              listPriority.find((item) => _.get(item, "value") === priority),
              "url",
              "",
             )}
             alt='Selected Priority'
             style={{width: "20px", height: "20px", margin: "0 8px"}}
            />
           ),
          }}
         />
        )}
       />
       <Button onClick={handleCreate} fullWidth variant='contained' type='submit' sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "8px"}}>
        Xác nhận
       </Button>
      </Box>
     </Box>
    </DialogContent>
   </Dialog>
  </React.Fragment>
 )
}

export default EditPriority
