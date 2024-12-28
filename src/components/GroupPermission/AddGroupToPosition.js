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
import {list as listGroupPermission} from "../../services/groupPermission"
import Search from "../Shared/Search"

const AddGroupToPosition = ({children, onClose = () => {}, dataGroup = [], textSearch, setTextSearch, onSubmitSearch = () => {}}) => {
 const [open, setOpen] = React.useState(false)

 const [groupPermissions, setGroupPermissions] = useState([])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleCheckGroupPermission = (group) => {
  const isChecked = findIdInArray(groupPermissions, _.get(group, "_id"))
  if (isChecked) {
   // Bỏ tick nhóm quyền
   setGroupPermissions(groupPermissions.filter((item) => item._id !== _.get(group, "_id")))
  } else {
   // Tick nhóm quyền
   setGroupPermissions([...groupPermissions, group])
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
       Danh sách nhóm quyền
      </Typography>
      <Search
       placeholder={"Tìm nhóm quyền"}
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
      {dataGroup.map((group, i) => {
       return (
        <Grid item>
         <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} sx={{border: !findIdInArray(groupPermissions, group._id) ? "1px solid #CCCFD3" : "1px solid #007CFE", borderRadius: "12px"}}>
          <Box px={2} pt={1}>
           <Stack onChange={() => handleCheckGroupPermission(group)} direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
             <i className='icon-bold-task-square' style={{color: "#007CFE", fontSize: "22px"}} />
             <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
              {group.name}
             </Typography>
            </Stack>
            <Checkbox value={group._id} onChange={() => handleCheckGroupPermission(group)} checked={findIdInArray(groupPermissions, group._id)} />
           </Stack>
          </Box>

          <Divider sx={{borderColor: "#CCCFD3"}} />
          <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} px={2} mb={2}>
           {group.permissions && group.permissions.length
            ? _.get(group, "permissions", []).map((group, i) => {
               return (
                <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center", gap: 2}}>
                 <i className='icon-bold-cd' style={{color: "#656C75"}} />
                 {group.name}
                 <Typography component='p' sx={{fontSize: "16px", color: "#010810"}}></Typography>
                </Stack>
               )
              })
            : null}
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
       onClose(groupPermissions)
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

export default AddGroupToPosition
