/*jslint es6 */
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import Confirm from "../../ui-component/modal/Alert"
import _ from "lodash"
import CONSTANT from "../../const"
import CONSTANT_ROLE from "./roleConstant.js"
import toastr from "toastr"
import { create, read, update } from "../../services/user"
import { Button, Box, Divider, Paper, Typography, Grid, TextField, Select, InputLabel, FormControl } from "@mui/material"
import ModalCenter from "../../ui-component/modal/ModalCenter"
import ModalHeader from "../../ui-component/modal/common/Header"
import ModalBody from "../../ui-component/modal/common/Body"
import ModalFooter from "../../ui-component/modal/common/Footer"
import LoadingBackdrop from "../../ui-component/loading/LoadingBackdrop"
import SelectPopup from "../../ui-component/input/SelectPopup"

const UserInf = ({ children, id, onClose, ...props }) => {
 const { regions } = useSelector((state) => state.configs)
 const [open, setOpen] = useState(false)
 const [isLoading, setIsLoading] = useState(false)
 const [user, setUser] = useState({
  active: 1,
  type: 1,
  department: "customer_service",
  region: "hn",
 })
 const onUserChange = (newState) => {
  setUser((oldState) => ({
   ...oldState,
   ...newState,
  }))
 }

 const onOpen = () => {
  setOpen(true)
  getUserInf()
 }

 const close = () => {
  onClose()
  setOpen(false)
 }

 const getUserInf = () => {
  if (!id) {
   return
  }
  read({ id }).then((response) => {
   setUser(_.get(response, "data"))
  })
 }

 const submit = (e) => {
  if (e) {
   e.preventDefault()
  }

  if (!id) {
   create({
    data: {
     ...user,
     hospital: _.get(user, "hospital._id"),
    },
   }).then((response) => {
    if (_.get(response, "code") === 200) {
     close()
    }
   })
  } else {
   update({
    id,
    data: {
     ...user,
     hospital: _.get(user, "hospital._id"),
    },
   }).then((response) => {
    if (_.get(response, "code") === 200) {
     close()
    }
   })
  }
 }

 return (
  <React.Fragment>
   {React.cloneElement(children, { onClick: onOpen })}
   <ModalCenter open={open} onClose={() => close()}>
    <Box component='form' sx={{ maxWidth: "1200px", width: "100vw" }} onSubmit={submit}>
     <LoadingBackdrop loading={isLoading} />
     <ModalHeader>{id ? "Chỉnh sửa" : "Tạo mới"}</ModalHeader>
     <ModalBody>
      <Grid container spacing={3}>
       <Grid item xs={12} md={3}>
        <TextField
         InputLabelProps={{
          shrink: true,
         }}
         fullWidth
         label='Họ'
         size='small'
         value={_.get(user, "name.first")}
         onChange={(e) =>
          onUserChange({
           name: {
            ...user.name,
            first: e.target.value,
           },
          })
         }
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <TextField
         InputLabelProps={{
          shrink: true,
         }}
         fullWidth
         label='Tên'
         size='small'
         value={_.get(user, "name.last")}
         onChange={(e) =>
          onUserChange({
           name: {
            ...user.name,
            last: e.target.value,
           },
          })
         }
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <TextField
         InputLabelProps={{
          shrink: true,
         }}
         fullWidth
         label='Email'
         size='small'
         value={_.get(user, "email")}
         onChange={(e) =>
          onUserChange({
           email: e.target.value,
          })
         }
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <TextField
         InputLabelProps={{
          shrink: true,
         }}
         fullWidth
         label='Tên tài khoản'
         size='small'
         value={_.get(user, "username")}
         onChange={(e) =>
          onUserChange({
           username: e.target.value,
          })
         }
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <TextField
         InputLabelProps={{
          shrink: true,
         }}
         fullWidth
         label='SĐT'
         size='small'
         value={_.get(user, "phone")}
         onChange={(e) =>
          onUserChange({
           phone: e.target.value,
          })
         }
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <TextField
         InputLabelProps={{
          shrink: true,
         }}
         fullWidth
         label='Mã TĐV'
         size='small'
         value={_.get(user, "code")}
         onChange={(e) =>
          onUserChange({
           code: e.target.value,
          })
         }
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <SelectPopup
         label='Loại tài khoản'
         fullWidth
         value={_.get(user, "type")}
         onChange={(selectedValue) =>
          onUserChange({
           type: selectedValue,
          })
         }
         options={[
          { value: 0, title: "Quản lý" },
          { value: 1, title: "CSKH" },
         ]}
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <SelectPopup
         label='Trạng thái'
         fullWidth
         value={_.get(user, "active")}
         onChange={(selectedValue) =>
          onUserChange({
           active: selectedValue,
          })
         }
         options={[
          { value: 0, title: "Ngừng HĐ" },
          { value: 1, title: "Hoạt động" },
         ]}
        />
       </Grid>

       <Grid item xs={12} md={3}>
        <SelectPopup
         label='Phòng ban'
         fullWidth
         value={_.get(user, "department")}
         onChange={(selectedValue) =>
          onUserChange({
           department: selectedValue,
          })
         }
         options={[
          { value: "admin", title: "Admin" },
          { value: "customer_service", title: "CSKH" },
          { value: "hospital_manager", title: "Quản lý bệnh viện" },
         ]}
        />
       </Grid>
       <Grid item xs={12} md={3}>
        <SelectPopup
         label='Tỉnh'
         fullWidth
         value={_.get(user, "region")}
         onChange={(selectedValue) =>
          onUserChange({
           region: selectedValue,
          })
         }
         options={Object.keys(regions || CONSTANT.REGION).map((value) => ({ value, title: (regions || CONSTANT.REGION)[value] || value }))}
        />
       </Grid>

       <Grid item xs={12} md={12}>
        <Typography>Quyền quản lý thành viên:</Typography>
        <Grid container mb={1} rowSpacing={1} columnSpacing={3}>
         {CONSTANT_ROLE.MEMEBER_ROLES.map((role, i) => (
          <RoleBtn key={i} user={user} role={role} onUserChange={onUserChange} />
         ))}
        </Grid>
        <Typography>Quyền quản lý đơn:</Typography>
        <Grid container mb={1} rowSpacing={1} columnSpacing={3}>
         {CONSTANT_ROLE.ORDER_ROLES.map((role, i) => (
          <RoleBtn key={i} user={user} role={role} onUserChange={onUserChange} />
         ))}
        </Grid>
        <Typography>Quyền quản lý ca:</Typography>
        <Grid container mb={1} rowSpacing={1} columnSpacing={3}>
         {CONSTANT_ROLE.ORDER_JOB_ROLES.map((role, i) => (
          <RoleBtn key={i} user={user} role={role} onUserChange={onUserChange} />
         ))}
        </Grid>
        <Typography>Quyền phàn hồi & đánh giá:</Typography>
        <Grid container mb={1} rowSpacing={1} columnSpacing={3}>
         {CONSTANT_ROLE.FEEDBACK_ROLES.map((role, i) => (
          <RoleBtn key={i} user={user} role={role} onUserChange={onUserChange} />
         ))}
        </Grid>
        <Typography>Quyền thống kê:</Typography>
        <Grid container mb={1} rowSpacing={1} columnSpacing={3}>
         {CONSTANT_ROLE.STATISTIC_ROLES.map((role, i) => (
          <RoleBtn key={i} user={user} role={role} onUserChange={onUserChange} />
         ))}
        </Grid>
        <Typography>Quyền quản trị:</Typography>
        <Grid container mb={1} rowSpacing={1} columnSpacing={3}>
         {CONSTANT_ROLE.SYSTEM_ROLES.map((role, i) => (
          <RoleBtn key={i} user={user} role={role} onUserChange={onUserChange} />
         ))}
        </Grid>
       </Grid>
      </Grid>
     </ModalBody>
     <ModalFooter>
      <Box display='flex' justifyContent='end'>
       <Button type='submit' variant='contained'>
        Lưu
       </Button>
      </Box>
     </ModalFooter>
    </Box>
   </ModalCenter>
  </React.Fragment>
 )
}

const RoleBtn = ({ role, user, onUserChange }) => {
 let currentRoles = _.get(user, `roles`, {})
 let isActived = currentRoles[role]
 return (
  <Grid item key={role} xs={12} md={3}>
   <Button
    variant={isActived ? "contained" : "outlined"}
    onClick={() => {
     onUserChange({
      roles: {
       ...currentRoles,
       [role]: isActived ? 0 : 1,
      },
     })
    }}
    fullWidth
   >
    {CONSTANT_ROLE.TRANSLATE[role]}
   </Button>
  </Grid>
 )
}

export default UserInf
