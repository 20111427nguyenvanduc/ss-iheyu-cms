/* jslint es6 */
import React, { useEffect, useState, useRef, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { styled, useTheme } from "@mui/material/styles"
import history from "../../core/history"
import moment from "moment"
import async from "async"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import { Avatar, Box, Button, Paper, Tooltip, Breadcrumbs, Typography, Stack, Grid, TextField, MenuItem } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import PasswordInput from "../../ui-component/input/Password"
import Link from "../../components/Link"
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import { get, update, inactive } from "../../services/user"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import LoadingBackdrop from "../../ui-component/loading/LoadingBackdrop"
import { list as listUnit } from "../../services/unit"
import { list as listRole } from "../../services/role"
import FilterAddPermission from "../../components/GroupPermission/FilterAddPermission"

const StyledBox = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const StyledButton = styled(Button)(({ theme }) => ({
 padding: "16px 32px",
 borderRadius: "16px",
}))
const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
 padding: "16px 32px",
 borderRadius: "16px",
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

const StyledPasswordInput = styled(PasswordInput)({
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
const DetailUser = ({ id }) => {
 const dispatch = useDispatch()
 const { user, configs } = useSelector((state) => state)
 const [textSearch, setTextSearch] = useState("")
 const [units, setUnits] = useState([])
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
  if (!id) {
   return cb(null, {})
  }
  get({ id }).then((response) => {
   const { data } = response
   cb(null, data)
  })
 }

 const getUnits = (cb) => {
  listUnit({ limit: 9999 }).then((response) => {
   const { data } = response
   cb(null, data)
  })
 }

 const getRoles = (cb) => {
  listRole({ limit: 9999 }).then((response) => {
   const { data } = response
   cb(null, data)
  })
 }

 const initState = () => {
  setLoading(true)
  async.parallel(
   {
    units: getUnits,
    roles: getRoles,
    userData: getUserInf,
   },
   (err, objResult) => {
    setData(objResult.userData)
    setUnits(objResult.units)
    setRoles(objResult.roles)
    setLoading(false)
   },
  )
 }

 useEffect(() => {
  initState()
 }, [id])

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
  inactive({ id })
   .then((res) => {
    setLoadingSave(false)
    history.push("/user-manager")
   })
   .catch(() => {
    setLoadingSave(false)
   })
 }

 return (
  <Fragment>
   <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Trang quản trị
     </Link>
     <Link underline='hover' key='1' color='#2E3236' to='/user-manager'>
      Quản lý tài khoản
     </Link>
     <Typography key='2' sx={{ color: "#007CFE" }}>
      Hồ sơ tài khoản
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{ py: 1.5, px: 2, mt: 2 }}>
    <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
     <Link to='/user-manager'>
      <i className='icon-linear-arrow-left' style={{ fontSize: "22px" }} />
     </Link>
     <Typography variant='h5' sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
      Hồ sơ tài khoản
     </Typography>
    </Stack>
   </Box>
   {loading ? (
    <LoadingBackdrop loading={loading} />
   ) : (
    <Box sx={{ p: 2 }}>
     <Paper sx={{ p: 2, border: "1px solid #CCCFD3", borderRadius: "12px" }}>
      <Typography variant='h6'>Thông tin</Typography>
      <Grid container my={2} spacing={2}>
       <Grid item xs={12} md={6} lg={3}>
        <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1 }}>
         Họ tên
        </Typography>
        <StyledTextField
         fullWidth
         placeholder='Nhập họ tên'
         variant='outlined'
         value={_.get(userData, "name", "")}
         onChange={(e) => setUserData({ name: e.target.value })}
         inputProps={{ name: "name", ariallabel: "name" }}
        />
       </Grid>
       <Grid item xs={12} md={6} lg={3}>
        <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1 }}>
         Số điện thoại
        </Typography>
        <StyledTextField
         fullWidth
         placeholder='Nhập số điện thoại'
         variant='outlined'
         value={_.get(userData, "phone", "")}
         onChange={(e) => setUserData({ phone: e.target.value })}
         inputProps={{ name: "phone", ariallabel: "phone" }}
        />
       </Grid>
       <Grid item xs={12} md={6} lg={3}>
        <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1 }}>
         Tài khoản
        </Typography>
        <StyledTextField
         fullWidth
         placeholder='Nhập tài khoản'
         variant='outlined'
         value={_.get(userData, "username", "")}
         onChange={(e) => setUserData({ username: e.target.value })}
         inputProps={{ name: "username", ariallabel: "username" }}
        />
       </Grid>
       <Grid item xs={12} md={6} lg={3}>
        <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1 }}>
         Mật khẩu
        </Typography>
        <StyledPasswordInput
         fullWidth
         placeholder='Nhập mật khẩu'
         variant='outlined'
         value={id ? "*********" : _.get(userData, "password", "")}
         onChange={(e) => setUserData({ password: e.target.value })}
         disabled={id ? true : false}
         inputProps={{ name: "password", ariallabel: "password" }}
        />
       </Grid>
       <Grid item xs={12} md={6}>
        <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1 }}>
         Đơn vị
        </Typography>

        <StyledTextField fullWidth select placeholder='Chọn một' value={_.get(userData, "unit", "")} onChange={(e) => setUserData({ unit: e.target.value })}>
         {units.map((option) => (
          <MenuItem key={option._id.toString()} value={option._id.toString()}>
           {option.name}
          </MenuItem>
         ))}
        </StyledTextField>
       </Grid>
       <Grid item xs={12} md={6}>
        <Typography variant='h5' sx={{ fontSize: "18px", color: "#4A4F55", fontWeight: 400, mb: 1 }}>
         Vai trò
        </Typography>

        <StyledTextField fullWidth select placeholder='Chọn một' value={_.get(userData, "role", "")} onChange={(e) => setUserData({ role: e.target.value })}>
         {roles.map((option) => (
          <MenuItem key={option._id.toString()} value={option._id.toString()}>
           {option.name}
          </MenuItem>
         ))}
        </StyledTextField>
       </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: "16px" }}>
       {userData.status ? (
        <AlertDialogDelete description={"Bạn muốn xóa tài khoản " + userData.name + "?"} onHandle={handleInactive}>
         <StyledButton variant='contained' color='error' size='large' disableElevation>
          Xóa thành viên
         </StyledButton>
        </AlertDialogDelete>
       ) : null}

       <StyledLoadingButton loading={loadingSave} variant='contained' color='info' size='large' disableElevation onClick={updateData}>
        Lưu thông tin
       </StyledLoadingButton>
      </Box>
     </Paper>
    </Box>
   )}

   <Box sx={{ p: 2 }}>
    <FilterAddPermission
     permissions={_.get(userData, "permissions", [])}
     setPermissions={(newPermissions) => setUserData({ permissions: newPermissions })}
     groupPermissions={_.get(userData, "groupPermissions", [])}
     setGroupPermissions={(newGroup) => setUserData({ groupPermissions: newGroup })}
    />
   </Box>
  </Fragment>
 )
}

export default DetailUser
