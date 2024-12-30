/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Box, TextField, FormControlLabel, Checkbox, Grid, Stack} from "@mui/material"
import {list as listGroupPermission} from "../../services/groupPermission"
import {list as listPermission} from "../../services/permission"

import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import AddGroupToPosition from "./AddGroupToPosition"
import AddPermissionToPosition from "./AddPermissionToPosition"
import Search from "../Shared/Search"

const FilterAddPermission = ({permissions = [], setPermissions}) => {
 const [dataPermission, setDataPermission] = useState([])
 const [textSearchPermission, setTextSearchPermission] = useState("")

 useEffect(() => {
  getListPermissions()
 }, [])

 const getListPermissions = () => {
  listPermission({name: textSearchPermission}).then((res) => {
   if (_.get(res, "code") === 200) {
    setDataPermission(_.get(res, "data"))
   }
  })
 }

 const confirmAddPermission = (data) => {
  const merged = [...permissions, ...data]
  const uniqueById = merged.reduce((acc, current) => {
   if (!acc.some((item) => item._id === current._id)) {
    acc.push(current)
   }
   return acc
  }, [])
  setPermissions(uniqueById) // Cập nhật state
 }

 const handleDeletePermission = (idToDelete) => {
  setPermissions((prevItems) => prevItems.filter((item) => item._id !== idToDelete))
 }

 // Lọc quyền danh sách dựa trên nội dung tìm kiếm
 const filteredPermissions = permissions.filter((per) => per.name.toLowerCase().includes(textSearchPermission.toLowerCase()))

 return (
  <Grid item xs={12} mt={2} sx={{background: "#FFF", border: "1px solid #A1A7AE", borderRadius: "12px", height: "450px"}} p={2}>
   <Stack direction='row' spacing={2} sx={{justifyContent: "space-between", alignItems: "center", width: "100%"}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Các quyền thuộc nhóm
     </Typography>

     <AddPermissionToPosition
      permissionsCurrent={permissions}
      onClose={confirmAddPermission}
      dataPermission={dataPermission}
      textSearch={textSearchPermission}
      setTextSearch={setTextSearchPermission}
      onSubmitSearch={getListPermissions}
     >
      <Button
       variant='contained'
       size='large'
       sx={{
        background: "#E5F1FF",
        borderRadius: "12px",
        textTransform: "inherit",
        color: "#007CFE",
        "&:hover": {
         backgroundColor: "#E5F1FF",
         color: "#007CFE",
        },
       }}
       startIcon={<i className='icon-bold-add-circle' style={{color: "#007CFE"}} />}
      >
       Tạo thêm quyền
      </Button>
     </AddPermissionToPosition>
    </Stack>
    <Search
     placeholder={"Tìm quyền"}
     textSearch={textSearchPermission}
     searchChange={(text) => {
      setTextSearchPermission(text)
     }}
     onSubmit={() => {}}
    />
   </Stack>

   <Grid container spacing={2} mt={1}>
    {filteredPermissions.map((per, i) => {
     return (
      <Grid item>
       <Box display={"flex"} flexDirection='column' gap={1.5} mt={1} sx={{border: "1px solid #CCCFD3", padding: "12px 16px", borderRadius: "12px"}}>
        <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
         <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
          <i className='icon-bold-cd' style={{color: "#007CFE", fontSize: "22px"}} />
          <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
           {per.name}
          </Typography>
         </Stack>
         <AlertDialogDelete
          title='Thông báo'
          description={"Bạn muốn xóa quyền ?"}
          onClose={() => {}}
          onHandle={() => {
           handleDeletePermission(per._id)
          }}
         >
          <i className='icon-bold-minus-cirlce' style={{color: "#D30500", fontSize: "22px"}} />
         </AlertDialogDelete>
        </Stack>
       </Box>
      </Grid>
     )
    })}
   </Grid>
  </Grid>
 )
}

export default FilterAddPermission
