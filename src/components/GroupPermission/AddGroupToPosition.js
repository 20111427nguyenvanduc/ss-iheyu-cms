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

const AddGroupToPosition = ({children, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)

 const [dataGroup, setDataGroup] = useState([])

 const [groupPermissions, setGroupPermissions] = useState([])

 const [textSearch, setTextSearch] = useState("")

 const getListGroupPermissions = () => {
  listGroupPermission({name: textSearch}).then((res) => {
   if (_.get(res, "code") === 200) {
    setDataGroup(_.get(res, "data"))
   }
  })
 }

 useEffect(() => {
  getListGroupPermissions()
 }, [])

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleCheckGroupPermission = (groupId) => {
  const isChecked = groupPermissions.includes(groupId)
  if (isChecked) {
   // Bỏ tick nhóm quyền
   setGroupPermissions(groupPermissions.filter((id) => id !== groupId))
  } else {
   // Tick nhóm quyền
   setGroupPermissions([...groupPermissions, groupId])
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
        getListGroupPermissions()
       }}
      />
     </Stack>
    </DialogTitle>
    <DialogContent>
     <Grid container spacing={2}>
      {dataGroup.map((group, i) => {
       return (
        <Grid item>
         <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} sx={{border: !groupPermissions.includes(group._id) ? "1px solid #CCCFD3" : "1px solid #007CFE", borderRadius: "12px"}}>
          <Box px={2} pt={1}>
           <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
             <i className='icon-bold-task-square' style={{color: "#007CFE", fontSize: "22px"}} />
             <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
              {group.name}
             </Typography>
            </Stack>
            <Checkbox value={group._id} onChange={() => handleCheckGroupPermission(group._id)} checked={groupPermissions.includes(group._id)} />
           </Stack>
          </Box>

          <Divider sx={{borderColor: "#CCCFD3"}} />

          <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} px={2} mb={2}>
           {[1, 2, 3, 4, 5].map((group, i) => {
            return (
             <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center", gap: 2}}>
              <i className='icon-bold-cd' style={{color: "#656C75"}} />
              Sửa {group}
              <Typography component='p' sx={{fontSize: "16px", color: "#010810"}}></Typography>
             </Stack>
            )
           })}
          </Box>
         </Box>
        </Grid>
       )
      })}
      {dataGroup.map((group, i) => {
       return (
        <Grid item>
         <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} sx={{border: !groupPermissions.includes(group._id) ? "1px solid #CCCFD3" : "1px solid #007CFE", borderRadius: "12px"}}>
          <Box px={2} pt={1}>
           <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
             <i className='icon-bold-task-square' style={{color: "#007CFE", fontSize: "22px"}} />
             <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
              {group.name}
             </Typography>
            </Stack>
            <Checkbox value={group._id} onChange={() => handleCheckGroupPermission(group._id)} checked={groupPermissions.includes(group._id)} />
           </Stack>
          </Box>

          <Divider sx={{borderColor: "#CCCFD3"}} />

          <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} px={2} mb={2}>
           {[1, 2, 3, 4, 5].map((group, i) => {
            return (
             <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center", gap: 2}}>
              <i className='icon-bold-cd' style={{color: "#656C75"}} />
              Sửa {group}
              <Typography component='p' sx={{fontSize: "16px", color: "#010810"}}></Typography>
             </Stack>
            )
           })}
          </Box>
         </Box>
        </Grid>
       )
      })}
      {dataGroup.map((group, i) => {
       return (
        <Grid item>
         <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} sx={{border: !groupPermissions.includes(group._id) ? "1px solid #CCCFD3" : "1px solid #007CFE", borderRadius: "12px"}}>
          <Box px={2} pt={1}>
           <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
             <i className='icon-bold-task-square' style={{color: "#007CFE", fontSize: "22px"}} />
             <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
              {group.name}
             </Typography>
            </Stack>
            <Checkbox value={group._id} onChange={() => handleCheckGroupPermission(group._id)} checked={groupPermissions.includes(group._id)} />
           </Stack>
          </Box>

          <Divider sx={{borderColor: "#CCCFD3"}} />

          <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} px={2} mb={2}>
           {[1, 2, 3, 4, 5].map((group, i) => {
            return (
             <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center", gap: 2}}>
              <i className='icon-bold-cd' style={{color: "#656C75"}} />
              Sửa {group}
              <Typography component='p' sx={{fontSize: "16px", color: "#010810"}}></Typography>
             </Stack>
            )
           })}
          </Box>
         </Box>
        </Grid>
       )
      })}
     </Grid>
    </DialogContent>
    <DialogActions sx={{justifyContent: "center"}}>
     <Button variant='contained' size='large' sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit", width: "250px"}}>
      Xác nhận
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default AddGroupToPosition