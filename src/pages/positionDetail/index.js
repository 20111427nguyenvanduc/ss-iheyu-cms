/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Divider, Grid, TextField, AppBar, Toolbar, Breadcrumbs, Typography, Stack} from "@mui/material"
import Link from "../../components/Link"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import {list, update as updateGroupPermission, inactive as inactiveGroupPermission} from "../../services/groupPermission"
import {get as getPosition, inactive as inactivePosition, update as updatePosition} from "../../services/position"
import {get as getUnit} from "../../services/unit"
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
 const [unitCurrent, setUnitCurrent] = useState(null)

 useEffect(() => {
  getDetailPosition()
 }, [id])

 useEffect(() => {
  if (position) getDetailUnit()
 }, [position])

 const getDetailPosition = () => {
  getPosition({_id: id}).then((res) => {
   if (_.get(res, "code") === 200) {
    setPosition(_.get(res, "data"))
    setPermissions(_.get(res, "data.permissions"))
    setGroupPermissions(_.get(res, "data.groupPermissions"))
   }
  })
 }

 const getDetailUnit = () => {
  getUnit({_id: _.get(position, "unit._id")}).then((res) => {
   if (_.get(res, "code") === 200) {
    let data = _.get(res, "data")
    setUnitCurrent(data)
   }
  })
 }

 const handleDelete = (_id) => {
  try {
   inactivePosition({_id}).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Xóa chức vụ thành công!")
     history.replace("/unit/" + _.get(unitCurrent, "._id"))
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleUpdatePosition = () => {
  try {
   updatePosition({
    _id: _.get(position, "_id"),
    name: _.get(position, "name"),
    unit: _.get(position, "unit._id"),
    permissions: permissions.map((item) => item._id),
    groupPermissions: groupPermissions.map((item) => item._id),
   }).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Cập nhật chức vụ thành công!")
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
     <Link underline='hover' key='1' color='#2E3236' to='/unit'>
      Quản lý đơn vị
     </Link>
     {_.get(unitCurrent, "parentPath", []).map((path) => {
      return (
       <Link underline='hover' key={path._id} color='#2E3236' to={"/unit/" + path._id}>
        {_.get(path, "name")}
       </Link>
      )
     })}
     {unitCurrent ? (
      <Link underline='hover' key={unitCurrent._id} color='#2E3236' to={"/unit/" + unitCurrent._id}>
       {_.get(unitCurrent, "name")}
      </Link>
     ) : null}

     <Typography key='2' sx={{color: "#007CFE"}}>
      {_.get(position, "name")}
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     {unitCurrent ? (
      <Link underline='hover' to={"/unit/" + unitCurrent._id}>
       <i className='icon-linear-arrow-left' style={{fontSize: "22px"}} />
      </Link>
     ) : null}
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
    <Toolbar sx={{gap: 2}}>
     <AlertDialogDelete
      title='Thông báo'
      description={"Bạn muốn xóa nhóm chức vụ " + _.get(position, "name") + "?"}
      onClose={() => {}}
      onHandle={() => {
       handleDelete()
      }}
     >
      <Button
       variant='contained'
       size='large'
       sx={{
        width: "15%",
        padding: "12px 32px",
        background: "#FFE2E2",
        borderRadius: "12px",
        textTransform: "inherit",
        color: "#D30500",

        "&:hover": {backgroundColor: "#FFE2E2", color: "#D30500"},
       }}
      >
       Xóa chức vụ{" "}
      </Button>
     </AlertDialogDelete>

     <Button
      disabled={areArraysEqualById(permissions, _.get(position, "permissions", []))}
      onClick={handleUpdatePosition}
      variant='contained'
      size='large'
      sx={{
       width: "15%",
       padding: "12px  32px",
       background: "#007CFE",
       borderRadius: "12px",
       textTransform: "inherit",
       color: "#FFF",
       "&:hover": {backgroundColor: "#007CFE", color: "#FFF"},
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
