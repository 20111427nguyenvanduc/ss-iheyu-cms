/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Divider, Grid, TextField, AppBar, Toolbar, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Breadcrumbs, Typography, Stack} from "@mui/material"
import Link from "../../components/Link"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import {list, update as updateGroupPermission, inactive as inactiveGroupPermission} from "../../services/groupPermission"
import {get as getPosition} from "../../services/position"

import history from "../../core/history"
import AddPermission from "../../components/GroupPermissionDetail/AddPermission"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import AddEditPosition from "../../components/Unit/AddEditPosition"
import FilterAddPermission from "../../components/GroupPermission/FilterAddPermission"

const StyledBox = styled(Box)(({theme}) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const EditPosition = ({id}) => {
 const dispatch = useDispatch()
 const {user, configs} = useSelector((state) => state)
 const {region, regions} = configs
 const setFilter = (newState) => {}
 const [filter, updatedFilter] = useState({
  page: 0,
  limit: 20,
  status: "",
  type: "",
  region: region,
  orderType: "",
  searchWithFilter: false,
  sortBy: "-updatedAt",
  filterTime24h: false,
 })
 const [listData, setListData] = useState([])
 const [textSearch, setTextSearch] = useState("")
 const [loading, setLoading] = useState(false)
 const [permissions, setPermissions] = useState([])
 const [groupPermissions, setGroupPermissions] = useState([])
 const [permissionDetail, setPermissionDetail] = useState(null)
 const [position, setPosition] = useState(null)

 useEffect(() => {
  getDetailPosition()
 }, [id])

 const getDetailPosition = () => {
  getPosition({_id: id}).then((res) => {
   if (_.get(res, "code") === 200) {
    setPosition(_.get(res, "data"))
   }
  })
 }

 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/unit'>
      Quản lý phòng ban
     </Link>
     <Link underline='hover' key='2' color='#2E3236' to='/unit'>
      {_.get(position, "unit.name")}
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      {_.get(position, "name")}
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     <Link underline='none' color='#2E3236' to='/unit'>
      <i className='icon-linear-arrow-left' style={{fontSize: "22px"}} />
     </Link>

     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {_.get(position, "name")}
     </Typography>
     <AddEditPosition detail={position} onClose={getDetailPosition} unitCurrent={_.get(position, "unit")}>
      <Button
       variant='contained'
       size='large'
       sx={{background: "#E5F1FF", borderRadius: "12px", textTransform: "inherit", color: "#007CFE", "&:hover": {backgroundColor: "#E5F1FF", color: "#007CFE"}}}
       startIcon={<i className='icon-bold-edit-2' style={{color: "#007CFE"}} />}
      >
       Sửa tên chức vụ
      </Button>
     </AddEditPosition>
    </Stack>
   </Box>
   <Divider />
   <Box p={2}>
    <FilterAddPermission permissions={permissions} setPermissions={setPermissions} groupPermissions={groupPermissions} setGroupPermissions={setGroupPermissions} />
   </Box>

   <AppBar position='sticky' color='primary' sx={{top: "auto", bottom: 0, boxShadow: "0px -5px 4px 0px #7E7E7E26", background: "#FFF"}}>
    <Toolbar>
     <Button
      variant='contained'
      size='large'
      sx={{
       background: "#007CFE",
       borderRadius: "12px",
       textTransform: "inherit",
       color: "#007CFE",
      }}
     >
      Lưu thông tin
     </Button>
     <Button
      variant='contained'
      size='large'
      sx={{
       background: "#007CFE",
       borderRadius: "12px",
       textTransform: "inherit",
       color: "#007CFE",
      }}
     >
      Lưu thông tin
     </Button>
    </Toolbar>
   </AppBar>
  </Fragment>
 )
}

export default EditPosition
