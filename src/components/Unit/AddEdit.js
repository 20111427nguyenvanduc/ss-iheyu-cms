/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment} from "@mui/material"
import {create as createUnit, update as updateUnit} from "../../services/unit"

const AddEdit = ({children, onClose = () => {}, detail = null, listDataLevel = [], listData}) => {
 const [open, setOpen] = React.useState(false)
 const [name, setName] = useState("")
 const [level, setLevel] = useState("")
 const [parent, setParent] = useState("")

 useEffect(() => {
  if (detail && open) {
   fillDataState(detail)
  }
 }, [open, detail])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const fillDataState = (detail) => {
  setName(_.get(detail, "name"))
  setLevel(findByLevel(listDataLevel, _.get(detail, "level")))
  setParent(findByParent(listData, _.get(detail, "parent")))
 }

 const resetState = () => {
  setName("")
  setLevel("")
  setParent("")
 }

 const handleCreate = () => {
  if (!name) {
   toastr.warning("Nhập tên đơn vị")
   return false
  }
  if (!level) {
   toastr.warning("Chọn thuộc cấp")
   return false
  }
  if ([2, 3].includes(_.get(level, "level")) && !parent) {
   toastr.warning("Chọn đơn vị trực thuộc")
   return false
  }

  try {
   createUnit({name, level: _.get(level, "level"), parent: _.get(parent, "_id")}).then((res) => {
    if (_.get(res, "code") === 200) {
     handleClose()
     onClose()
     resetState()
     toastr.success("Tạo đơn vị thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleUpdate = () => {
  if (!name) {
   toastr.warning("Nhập tên đơn vị")
   return false
  }
  if (!level) {
   toastr.warning("Chọn thuộc cấp")
   return false
  }
  if ([2, 3].includes(_.get(level, "level")) && !parent) {
   toastr.warning("Chọn đơn vị trực thuộc")
   return false
  }
  try {
   updateUnit({_id: _.get(detail, "_id"), name, level: _.get(level, "level"), parent: _.get(parent, "_id")}).then((res) => {
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

 const findByLevel = (array, level) => {
  const item = array.find((element) => element.level === level)
  return item ? item : null
 }

 const findByParent = (array, _id) => {
  const item = array.find((element) => element._id === _id)
  return item ? item : null
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

   <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={handleClose}>
    <DialogTitle>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {detail ? "Chỉnh sửa đơn vị " : "Thêm đơn vị mới"}
     </Typography>
    </DialogTitle>
    <DialogContent dividers>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={1}>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên đơn vị
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập tên đơn vị'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Thuộc cấp
       </Typography>
       <Autocomplete
        freeSolo
        sx={{width: "100%"}}
        options={listDataLevel}
        value={level}
        onChange={(event, newValue) => {
         setLevel(newValue)
        }}
        getOptionLabel={(option) => option.name}
        inputValue={_.get(level, "name", "")}
        onInputChange={(event, newInputValue) => {}}
        renderInput={(params) => <TextField {...params} placeholder='Chọn thuộc cấp' />}
       />
       {[2, 3].includes(_.get(level, "level")) ? (
        <Fragment>
         <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
          Trực thuộc đơn vị
         </Typography>
         <Autocomplete
          freeSolo
          sx={{width: "100%"}}
          options={listData.filter((element) => element.level <= _.get(level, "level"))}
          value={parent}
          onChange={(event, newValue) => {
           setParent(newValue)
          }}
          getOptionLabel={(option) => option.name}
          inputValue={_.get(parent, "name", "")}
          onInputChange={(event, newInputValue) => {}}
          renderInput={(params) => <TextField {...params} placeholder='Chọn đơn vị trực thuộc' />}
         />
        </Fragment>
       ) : null}

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
        {detail ? "Cập nhật" : "Tạo đơn vị"}
       </Button>
      </Box>
     </Box>
    </DialogContent>
    <DialogActions></DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default AddEdit
