/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Grid, Checkbox, Divider} from "@mui/material"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import {list as listPermission} from "../../services/permission"
import Search from "../Shared/Search"

const AddPermissionToPosition = ({children, onClose = () => {}, dataPermission = [], textSearch, setTextSearch, onSubmitSearch = () => {}}) => {
 const [open, setOpen] = React.useState(false)

 const [permissions, setPermissions] = useState([])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleCheckPermission = (permission) => {
  const isChecked = findIdInArray(permissions, _.get(permission, "_id"))
  if (isChecked) {
   // Bỏ tick nhóm quyền
   setPermissions(permissions.filter((item) => item_id !== _.get(permission, "_id")))
  } else {
   // Tick nhóm quyền
   setPermissions([...permissions, permission])
  }
 }

 const findIdInArray = (array, idToFind) => {
  return array.some((item) => item._id === idToFind)
 }

 return (
  <React.Fragment>
   {React.cloneElement(
    children || (
     <Button variant='contained' size='large' sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}} startIcon={<i className='icon-bold-add-circle' />}>
      Thêm mới
     </Button>
    ),
    {onClick: handleClickOpen},
   )}
   <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose} scroll={"paper"} PaperProps={{sx: {borderRadius: "16px"}}}>
    <DialogTitle>
     <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
      <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
       Danh sách quyền
      </Typography>
      <Search
       placeholder={"Tìm quyền"}
       textSearch={textSearch}
       searchChange={(text) => setTextSearch(text)}
       onSubmit={() => {
        onSubmitSearch()
       }}
      />
     </Stack>
    </DialogTitle>
    <DialogContent>
     <Grid container spacing={2}>
      {dataPermission.map((permission, i) => {
       return (
        <Grid item>
         <Box
          display={"flex"}
          flexDirection='column'
          px={2}
          py={0.5}
          gap={1.5}
          mt={1}
          sx={{border: !findIdInArray(permissions, permission._id) ? "1px solid #CCCFD3" : "1px solid #007CFE", borderRadius: "12px"}}
         >
          <Box>
           <Stack onChange={() => handleCheckPermission(permission)} direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
             <i className='icon-bold-cd' style={{color: "#007CFE", fontSize: "22px"}} />
             <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
              {permission.name}
             </Typography>
            </Stack>
            <Checkbox value={permission._id} onChange={() => handleCheckPermission(permission)} checked={findIdInArray(permissions, permission._id)} />
           </Stack>
          </Box>
         </Box>
        </Grid>
       )
      })}
     </Grid>
    </DialogContent>
    <DialogActions sx={{justifyContent: "center"}}>
     <Button
      onClick={() => {
       onClose(permissions)
       handleClose()
      }}
      variant='contained'
      size='large'
      sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit", width: "250px"}}
     >
      Xác nhận
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default AddPermissionToPosition
