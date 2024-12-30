/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Divider, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Breadcrumbs, Typography, Stack, AppBar, Toolbar} from "@mui/material"
import Link from "../../components/Link"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import {list, update as updateGroupPermission, inactive as inactiveGroupPermission} from "../../services/groupPermission"
import history from "../../core/history"
import AddPermission from "../../components/GroupPermissionDetail/AddPermission"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import FilterAddPermissionToGroup from "../../components/GroupPermission/FilterAddPermissionToGroup"

const StyledBox = styled(Box)(({theme}) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const EditGroup = ({id}) => {
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

 const [detailData, setDetailData] = useState(null)
 const [name, setName] = useState("")
 const [description, setDescription] = useState("")
 const [permissions, setPermissions] = useState([])
 const [permissionDetail, setPermissionDetail] = useState(null)

 const [isOpenDeletePermission, setIsOpenDeletePermission] = React.useState(false)

 const handleClickOpenDeletePermission = () => {
  setIsOpenDeletePermission(true)
 }

 const handleCloseDeletePermission = () => {
  setIsOpenDeletePermission(false)
 }

 useEffect(() => {
  getList()
 }, [])

 useEffect(() => {
  if (listData.length) {
   let detail = findItemById(listData, id)
   if (detail) {
    setStateData(detail)
    setDetailData(detail)
   }
  }
 }, [listData])

 const setStateData = (item) => {
  setName(_.get(item, "name"))
  setDescription(_.get(item, "description"))
  setPermissions(_.get(item, "permissions", []))
 }

 const getList = () => {
  setLoading(true)
  list({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setListData(_.get(res, "data"))
   }
   setLoading(false)
  })
 }

 const findItemById = (array, id) => {
  return array.find((item) => item._id === id)
 }

 const handleUpdate = () => {
  if (!name) {
   toastr.warning("Nhập tên nhóm quyền")
   return false
  }
  try {
   updateGroupPermission({
    _id: _.get(detailData, "_id"),
    name,
    description,
    permissions: permissions.map((item) => item._id),
   }).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Cập nhật nhóm quyền thành công!")
     getList()
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleInactivePermissionGrpup = () => {
  try {
   inactiveGroupPermission({_id: _.get(detailData, "_id")}).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Xóa nhóm quyền thành công!")
     setTimeout(() => {
      history.replace("/group-permission/")
     }, 1000)
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const areArraysEqualById = (array1, array2) => {
  const ids1 = array1.map((item) => item._id).sort() // Lấy danh sách _id và sắp xếp
  const ids2 = array2.map((item) => item._id).sort() // Lấy danh sách _id và sắp xếp
  // So sánh từng phần tử trong mảng _id
  return ids1.length === ids2.length && ids1.every((id, index) => id === ids2[index])
 }

 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Trang quản trị
     </Link>
     <Link underline='hover' key='2' color='#2E3236' to='/group-permission'>
      Quản lý quyền hạn
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      Chi tiết nhóm quyền
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "start"}}>
     <Link underline='none' color='#2E3236' to='/group-permission'>
      <i className='icon-linear-arrow-left' style={{fontSize: "22px"}} />
     </Link>
     <Stack direction='column' spacing={1} sx={{justifyContent: "flex-start", alignItems: "flex-start"}}>
      <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
       Chi tiết nhóm quyền
      </Typography>
      <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 600}}>
       {_.get(detailData, "name")}
      </Typography>
     </Stack>
    </Stack>
   </Box>
   <Divider />

   <Box sx={{flexGrow: 1}} p={4}>
    <Grid container spacing={2} sx={{border: "1px solid #CCCFD3", borderRadius: "12px"}} p={1}>
     <Grid item xs={12}>
      <Typography variant='p' sx={{fontSize: "24px", color: "#2E3236", fontWeight: 700}}>
       Thông tin nhóm quyền{" "}
      </Typography>
     </Grid>
     <Grid item xs={6}>
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='20px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Tên nhóm quyền
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập tên nhóm quyền'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
       />
      </Box>
     </Grid>
     <Grid item xs={6}>
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='20px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Mô tả
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập mô tả nhóm quyền'
        variant='outlined'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        inputProps={{name: "description", ariallabel: "description"}}
        InputProps={{
         sx: {borderRadius: "16px"},
        }}
        multiline
        rows={4}
       />
      </Box>
     </Grid>
    </Grid>
   </Box>

   <Box sx={{flexGrow: 1}} p={2}>
    <FilterAddPermissionToGroup permissions={permissions} setPermissions={setPermissions} />
   </Box>

   <AppBar position='sticky' color='primary' sx={{top: "auto", bottom: 0, boxShadow: "0px -5px 4px 0px #7E7E7E26", background: "#FFF"}}>
    <Toolbar sx={{gap: 2}}>
     <AlertDialogDelete title='Thông báo' description={"Bạn muốn xóa nhóm quyền " + name + "?"} onClose={getList} onHandle={() => handleInactivePermissionGrpup()}>
      <Button
       variant='contained'
       size='large'
       sx={{
        width: "15%",
        background: "#FFE2E2",
        textTransform: "inherit",
        color: "#D30500",
        "&:hover": {
         backgroundColor: "#FFE2E2",
         color: "#D30500",
        },
       }}
      >
       Xóa nhóm quyền
      </Button>
     </AlertDialogDelete>
     <Button
      onClick={() => {
       handleUpdate()
      }}
      disabled={areArraysEqualById(permissions, _.get(detailData, "permissions", []))}
      variant='contained'
      size='large'
      sx={{width: "15%", background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}}
      startIcon={<i className='icon-bold-document-text' />}
     >
      Lưu thông tin
     </Button>
    </Toolbar>
   </AppBar>
  </Fragment>
 )
}

export default EditGroup
