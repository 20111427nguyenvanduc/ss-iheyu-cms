/* jslint es6 */
import React, {useEffect, useState, useRef, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import history from "../../core/history"
import moment from "moment"
import async from "async"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Paper, Tooltip, Breadcrumbs, Typography, Stack, Grid, TextField, MenuItem, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import Link from "../../components/Link"
import UnitSelected from "../../components/UserManager/UnitSelected"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import {get, create, update, inactive} from "../../services/user"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import LoadingSkeleton from "../../ui-component/loading/LoadingSkeleton"
import DatePicker from "../../ui-component/datepicker/DatePicker"
import {list as listUnit} from "../../services/unit"
import {list as listRole} from "../../services/role"
import FilterAddPermission from "../../components/GroupPermission/FilterAddPermission"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import CONSTANT from "../../const"
import UploadImgSingle from "../../components/tools/UploadImgSingle"
import UnitSelect from "../../components/UserManager/UnitSelect"

const StyledAddButton = styled(Button)(({theme}) => ({
 backgroundColor: "#E5F1FF",
 color: "#007CFE",
 borderRadius: "12px",
 ":hover": {
  backgroundColor: "#007CFE",
  color: "#FFFFFF",
 },
}))

const StyledButton = styled(Button)(({theme}) => ({
 padding: "16px 32px",
 borderRadius: "12px",
}))
const StyledLoadingButton = styled(LoadingButton)(({theme}) => ({
 padding: "16px 32px",
 borderRadius: "12px",
}))

const StyledTextField = styled(TextField)({
 "& .MuiOutlinedInput-root": {
  borderRadius: "16px",
  "& fieldset": {
   borderRadius: "16px",
  },
  "&:hover fieldset": {
   borderRadius: "16px",
  },
  "&.Mui-focused fieldset": {
   borderRadius: "16px",
  },
 },
})

const currencies = [
 {
  value: "USD",
  label: "$",
 },
 {
  value: "EUR",
  label: "€",
 },
 {
  value: "BTC",
  label: "฿",
 },
 {
  value: "JPY",
  label: "¥",
 },
]
const DetailUser = ({id}) => {
 const dispatch = useDispatch()
 const {user, configs} = useSelector((state) => state)
 const [textSearch, setTextSearch] = useState("")
 const [units, setUnits] = useState([])
 const [unitSelected, setUnitSelected] = useState([])
 const [roles, setRoles] = useState([])
 const [loading, setLoading] = useState(false)
 const [loadingSave, setLoadingSave] = useState(false)
 const [userData, setData] = useState({})
 const setUserData = (newState) => {
  setData((oldState) => ({
   ...oldState,
   ...newState,
  }))
 }

 const getUserInf = (cb) => {
  if (!id || id === "add-new-user") {
   return cb(null, {})
  }
  get({id}).then((response) => {
   const {data} = response
   cb(null, data || {})
  })
 }

 const getUnits = (cb) => {
  listUnit({limit: 9999}).then((response) => {
   const {data} = response
   cb(null, data)
  })
 }

 const getRoles = (cb) => {
  listRole({limit: 9999}).then((response) => {
   const {data} = response
   cb(null, data)
  })
 }

 const initState = () => {
  setLoading(true)
  async.parallel(
   {
    // units: getUnits,
    // roles: getRoles,
    userData: getUserInf,
   },
   (err, objResult) => {
    setData(objResult.userData)
    // setUnits(objResult.units)
    // setRoles(objResult.roles)
    setLoading(false)
   },
  )
 }

 useEffect(() => {
  initState()
 }, [id])

 const createData = () => {
  setLoadingSave(true)
  create(userData)
   .then((response) => {
    setLoadingSave(false)
    if (_.get(response, "code") === CONSTANT.CODE.SUCCESS) {
     history.push(`/user-manager/${_.get(response, "data")}`)
    }
   })
   .catch(() => {
    setLoadingSave(false)
   })
 }

 const updateData = () => {
  setLoadingSave(true)
  update(userData)
   .then(() => {
    setLoadingSave(false)
   })
   .catch(() => {
    setLoadingSave(false)
   })
 }

 const handleInactive = () => {
  setLoadingSave(true)
  inactive({id: userData._id})
   .then((res) => {
    setLoadingSave(false)
    history.push("/user-manager")
   })
   .catch(() => {
    setLoadingSave(false)
   })
 }

 const onChangeRole = (roleId) => {
  let roleObj
  roles.forEach((role) => {
   if (role._id === roleId) {
    roleObj = role
   }
  })
  setUserData({
   role: roleId,
   permissions: _.get(roleObj, "permissions", userData.permissions || []),
  })
 }

 const addCollaborate = () => {
  let units = _.get(userData, "units", [])
  let positions = _.get(userData, "positions", [])
  if ((typeof _.last(units) === "object" && _.isEmpty(_.last(units))) || (typeof _.last(positions) === "object" && _.isEmpty(_.last(positions)))) {
   return toastr.warning("Chưa điền đầy đủ công tác trước")
  }
  if (!_.isArray(units)) {
   units = [{}]
  } else {
   units.push({})
  }
  if (!_.isArray(positions)) {
   positions = [{}]
  } else {
   positions.push({})
  }
  setUserData({
   units,
   positions,
  })
 }

 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Trang quản trị
     </Link>
     <Link underline='hover' key='1' color='#2E3236' to='/user-manager'>
      Quản lý thành viên
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      Hồ sơ tài khoản
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     <Typography variant='h5' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Thông tin thành viên
     </Typography>
    </Stack>
   </Box>
   <Box sx={{p: 2}}>
    {loading ? (
     <LoadingSkeleton loading={loading} variant='rounded' width='100%' height={300} />
    ) : (
     <Fragment>
      <Paper elevation={0}>
       <Typography variant='h6'>Thông tin</Typography>
       <Grid container my={2} spacing={2}>
        <Grid item xs={12} md={6} lg={2}>
         <Avatar src={_.get(userData, "avatar")} width={96} height={96} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
          Họ tên
         </Typography>
         <StyledTextField
          fullWidth
          placeholder='Nhập họ tên'
          variant='outlined'
          value={_.get(userData, "name", "")}
          onChange={(e) => setUserData({name: e.target.value})}
          inputProps={{name: "name", ariallabel: "name"}}
         />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
          Số điện thoại
         </Typography>
         <StyledTextField
          fullWidth
          placeholder='Nhập số điện thoại'
          variant='outlined'
          value={_.get(userData, "phone", "")}
          onChange={(e) => setUserData({phone: e.target.value})}
          inputProps={{name: "phone", ariallabel: "phone"}}
         />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
          Email
         </Typography>
         <StyledTextField
          fullWidth
          placeholder='Nhập email'
          variant='outlined'
          value={_.get(userData, "email", "")}
          onChange={(e) => setUserData({email: e.target.value})}
          inputProps={{name: "email", ariallabel: "email"}}
         />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
          Tài khoản
         </Typography>
         <StyledTextField
          fullWidth
          placeholder='Nhập tài khoản'
          variant='outlined'
          value={_.get(userData, "username", "")}
          onChange={(e) => setUserData({username: e.target.value})}
          inputProps={{name: "username", ariallabel: "username"}}
         />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
          Giới tính
         </Typography>
         <StyledTextField
          fullWidth
          select
          sx={{
           "& .MuiSelect-select span::before": {
            content: "'Chọn giới tính'",
           },
          }}
          variant='outlined'
          value={_.get(userData, "gender", "")}
          onChange={(e) => setUserData({gender: e.target.value})}
          inputProps={{name: "gender", ariallabel: "gender"}}
         >
          {[
           {label: "Nam", code: "male"},
           {label: "Nữ", code: "female"},
          ].map((option) => (
           <MenuItem key={option.code} value={option.code}>
            {option.label}
           </MenuItem>
          ))}
         </StyledTextField>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
          Ngày sinh
         </Typography>
         <DatePicker placeholder='Chọn ngày sinh' value={_.get(userData, "dob", "") ? moment(_.get(userData, "dob", "")) : ""} onChange={(newDate) => setUserData({dob: newDate})} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
         <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
         Danh mục phản ánh phụ trách
         </Typography>
         <StyledTextField
          fullWidth
          select
          sx={{
           "& .MuiSelect-select span::before": {
            content: "'Chọn danh mục'",
           },
          }}
          variant='outlined'
          value={_.get(userData, "categories", [])}
          onChange={(e) => setUserData({categories: e.target.value})}
          inputProps={{name: "categories", ariallabel: "categories"}}
          SelectProps={{
           multiple: true,
          }}
         >
          {[
           {label: "CA", code: "ca"},
           {label: "UBND", code: "ubnd"},
          ].map((option) => (
           <MenuItem key={option.code} value={option.code}>
            {option.label}
           </MenuItem>
          ))}
         </StyledTextField>
        </Grid>
       </Grid>
      </Paper>
      <Paper sx={{p: 2, border: "1px solid #CCCFD3", borderRadius: "12px"}} elevation={0}>
       <Typography variant='h6'>Thông tin công tác</Typography>
       <Grid container my={2} spacing={2}>
        {_.get(userData, "units", []).map((unit, i) => (
         <Grid item xs={12} md={6}>
          <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
           Đơn vị
            </Typography>
            <UnitSelect/>
          {/* <UnitSelected unit={unit} setUnit={(newUnit) => setUserData({unit: newUnit})} /> */}
         </Grid>
        ))}

        {_.get(userData, "positions", []).map(
         (position, i) => (
          <Grid item xs={12} md={6}>
           <Typography variant='h5' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1}}>
            Chức vụ
           </Typography>
          </Grid>
         ), // <UnitSelected unit={position} setUnit={(newPosition) => setUserData({ unit: newPosition })} />
        )}

        <Grid item xs={12}>
         <Box sx={{display: "flex", gap: "16px", width: "100%", justifyContent: "center"}}>
          <StyledAddButton startIcon={<AddCircleIcon />} variant='contained' color='info' onClick={addCollaborate}>
           Thêm công tác
          </StyledAddButton>
         </Box>
        </Grid>
       </Grid>
      </Paper>
     </Fragment>
    )}
   </Box>

   <Box sx={{p: 2}}>
    {/* <FilterAddPermission
     permissions={_.get(userData, "permissions", [])}
     setPermissions={(newPermissions) => setUserData({ permissions: newPermissions })}
     groupPermissions={_.get(userData, "groupPermissions", [])}
     setGroupPermissions={(newGroup) => setUserData({ groupPermissions: newGroup })}
    /> */}
   </Box>
   <Box sx={{p: 2}}>
    <Box sx={{display: "flex", gap: "16px"}}>
     {_.get(userData, "status") ? (
      <AlertDialogDelete description={"Bạn muốn xóa tài khoản " + userData.name + "?"} onHandle={handleInactive}>
       <StyledButton variant='contained' color='error' disableElevation>
        Xóa thành viên
       </StyledButton>
      </AlertDialogDelete>
     ) : null}
     {_.get(userData, "_id") ? (
      <StyledLoadingButton loading={loadingSave} variant='contained' color='info' disableElevation onClick={updateData}>
       Lưu thông tin
      </StyledLoadingButton>
     ) : (
      <StyledLoadingButton loading={loadingSave} variant='contained' color='info' disableElevation onClick={createData}>
       Tạo mới
      </StyledLoadingButton>
     )}
    </Box>
   </Box>
  </Fragment>
 )
}

export default DetailUser
