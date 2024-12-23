/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { styled, useTheme } from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {
 Avatar,
 Box,
 Button,
 Chip,
 FormControlLabel,
 IconButton,
 Paper,
 Divider,
 Grid,
 TextField,
 Breadcrumbs,
 Typography,
 Stack,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 DialogContentText,
} from "@mui/material"
import Link from "../../components/Link"
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import { list, update as updateGroupPermission, inactive as inactiveGroupPermission } from "../../services/groupPermission"
import history from "../../core/history"
import AddPermission from "../../components/GroupPermissionDetail/AddPermission"

const StyledBox = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const EditGroup = ({ id }) => {
 const dispatch = useDispatch()
 const { user, configs } = useSelector((state) => state)
 const { region, regions } = configs
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
   setStateData(listData[0])
   setDetailData(listData[0])
  }
 }, [listData])

 const setStateData = (item) => {
  setName(_.get(item, "name"))
  setDescription(_.get(item, "description"))
  setPermissions(_.get(item, "permissions", []).map((item) => item._id))
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

 const handleUpdate = () => {
  if (!name) {
   toastr.warning("Nhập tên nhóm quyền")
   return false
  }
  try {
   updateGroupPermission({ _id: _.get(detailData, "_id"), name, description, permissions }).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Cập nhật nhóm quyền thành công!")
     getList()
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleRemovePermission = (idToRemove) => {
  const updatedIds = permissions.filter((id) => id !== idToRemove)
  try {
   updateGroupPermission({ _id: _.get(detailData, "_id"), name, description, permissions: updatedIds }).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Xóa quyền khỏi nhóm quyền thành công!")
     handleCloseDeletePermission()
     getList()
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleAddPermission = (idToAdd) => {
  const updatedIds = [...permissions, idToAdd]
  try {
   updateGroupPermission({ _id: _.get(detailData, "_id"), name, description, permissions: updatedIds }).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Thêm quyền vào nhóm quyền thành công!")
     handleCloseDeletePermission()
     getList()
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const handleInactivePermissionGrpup = () => {
  try {
   inactiveGroupPermission({ _id: _.get(detailData, "_id") }).then((res) => {
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

 return (
  <Fragment>
   <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Trang quản trị
     </Link>
     <Link underline='hover' key='2' color='#2E3236' href='/group-permission'>
      Nhóm quyền
     </Link>
     <Typography key='2' sx={{ color: "#007CFE" }}>
      Chi tiết nhóm quyền
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{ py: 1.5, px: 2, mt: 2 }}>
    <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "start" }}>
     <Link underline='none' color='#2E3236' to='/group-permission'>
      <i className='icon-linear-arrow-left' style={{ fontSize: "22px" }} />
     </Link>
     <Stack direction='column' spacing={1} sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
      <Typography variant='h5' sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
       Chi tiết nhóm quyền
      </Typography>
      <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 600 }}>
       Chi tiết nhóm quyền
      </Typography>
     </Stack>
    </Stack>
   </Box>
   <Divider />

   <Box sx={{ flexGrow: 1 }} p={2}>
    <Grid container spacing={2}>
     <Grid item xs={6}>
      <Box sx={{ border: "1px solid #CCCFD3", borderRadius: "12px" }} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='20px' mt={1} p={2}>
       <Typography variant='h5' sx={{ fontSize: "24px", color: "#2E3236", fontWeight: 700, textAlign: "center", width: "100%" }}>
        Thông tin nhóm quyền{" "}
       </Typography>
       <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400 }}>
        Tên nhóm quyền
       </Typography>
       <TextField
        fullWidth
        label='Nhập tên nhóm quyền'
        variant='outlined'
        value={name}
        onChange={(e) => setName(e.target.value)}
        inputProps={{ name: "name", ariallabel: "name" }}
        InputProps={{
         sx: { borderRadius: "16px" },
        }}
       />
       <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400 }}>
        Mô tả
       </Typography>
       <TextField
        fullWidth
        label='Nhập tên nhóm quyền'
        variant='outlined'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        inputProps={{ name: "name", ariallabel: "name" }}
        InputProps={{
         sx: { borderRadius: "16px" },
        }}
        multiline
        rows={4}
       />
       <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "start" }}>
        <Button
         onClick={() => {
          handleInactivePermissionGrpup()
         }}
         variant='contained'
         size='large'
         color='error'
         sx={{ borderRadius: "12px", textTransform: "inherit" }}
        >
         Xóa nhóm quyền
        </Button>
        <Button
         onClick={() => {
          handleUpdate()
         }}
         variant='contained'
         size='large'
         sx={{ background: "#007CFE", borderRadius: "12px", textTransform: "inherit" }}
         startIcon={<i className='icon-bold-document-text' />}
        >
         Lưu thông tin
        </Button>
       </Stack>
      </Box>
     </Grid>
     <Grid item xs={6}>
      <Box sx={{ border: "1px solid #CCCFD3", borderRadius: "12px" }} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='20px' mt={1} p={2}>
       <Typography variant='h5' sx={{ fontSize: "24px", color: "#2E3236", fontWeight: 700, textAlign: "center", width: "100%" }}>
        Danh sách các quyền
       </Typography>

       {detailData && detailData.permissions.length
        ? detailData.permissions.map((permission, j) => {
           return (
            <Box sx={{ background: permission.status ? "#E5F1FF" : "#F3F3F3", padding: "12px 16px", borderRadius: "12px", width: "100%" }}>
             <Stack direction='row' spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
               <Typography variant='h5' sx={{ fontSize: "16px", color: "#007CFE", fontWeight: 700 }}>
                {j + 1}
               </Typography>
               <Typography variant='h5' sx={{ fontSize: "18px", color: "#010810", fontWeight: 400 }}>
                {permission.name}
               </Typography>
              </Stack>
              <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
               <Typography
                variant='h5'
                sx={{
                 fontSize: "14px",
                 color: permission.status ? "#00BF30" : "#007CFE",
                 background: permission.status ? "#F1FFF5" : "#E5F1FF",
                 fontWeight: 400,
                 padding: "2px 8px",
                 borderRadius: "16px",
                }}
               >
                {permission.status ? " Đang hoạt động" : "Đang tắt"}
               </Typography>
               <i
                onClick={() => {
                 setPermissionDetail(permission)
                 handleClickOpenDeletePermission()
                }}
                className='icon-bold-trash'
                style={{ color: "#656C75", fontSize: "22px", cursor: "pointer" }}
               />
              </Stack>
             </Stack>
            </Box>
           )
          })
        : null}

       <Stack direction='row' spacing={2} sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
        <AddPermission groupPermission={detailData} handleAddPermission={handleAddPermission} />
       </Stack>
      </Box>
     </Grid>
    </Grid>
   </Box>

   <Dialog open={isOpenDeletePermission} onClose={handleCloseDeletePermission}>
    <DialogTitle sx={{ padding: "16px" }}>Thông báo</DialogTitle>
    <DialogContent sx={{ padding: "16px" }}>
     <DialogContentText>Bạn muốn xóa quyền {_.get(permissionDetail, "name")} khỏi nhóm quyền ?</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ padding: "16px" }}>
     <Button size='large' variant='outlined' onClick={handleCloseDeletePermission} sx={{ borderRadius: "12px", textTransform: "inherit" }}>
      Hủy
     </Button>
     <Button
      onClick={() => {
       handleRemovePermission(_.get(permissionDetail, "_id"))
      }}
      size='large'
      variant='contained'
      sx={{ background: "#007CFE", borderRadius: "12px", textTransform: "inherit" }}
     >
      Đồng ý
     </Button>
    </DialogActions>
   </Dialog>
  </Fragment>
 )
}

export default EditGroup
