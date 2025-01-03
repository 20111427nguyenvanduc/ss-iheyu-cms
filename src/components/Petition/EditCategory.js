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
import {list as listCategory} from "../../services/category"

const EditCategory = ({children, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)
 const [listCat, setListCat] = useState("")
 const [category, setCategory] = useState(null)

 useEffect(() => {}, [])

 useEffect(() => {
  getList()
 }, [])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const getList = () => {
  listCategory({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setListCat(_.get(res, "data"))
   }
  })
 }

 const handleCreate = () => {}

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

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Chỉnh sửa lĩnh vực
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Lĩnh vực
       </Typography>
       <Autocomplete
        fullWidth
        options={listCat}
        getOptionLabel={(option) => _.get(option, "name", "")}
        value={category}
        onChange={(e, value) => {
         setCategory(value)
        }}
        renderInput={(params) => (
         <TextField
          {...params}
          fullWidth
          placeholder='Chọn lĩnh vực'
          variant='outlined'
          sx={{
           "& .MuiOutlinedInput-root": {
            borderRadius: "16px",
           },
          }}
         />
        )}
       />
       <Button onClick={() => {}} fullWidth variant='contained' type='submit' sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "8px"}}>
        Xác nhận
       </Button>
      </Box>
     </Box>
    </DialogContent>
   </Dialog>
  </React.Fragment>
 )
}

export default EditCategory
