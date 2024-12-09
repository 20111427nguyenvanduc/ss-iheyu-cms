import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Box, Button, Typography, TextField, Grid } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useTheme } from "@mui/material/styles"

import ModalCenter from "../../../../ui-component/modal/ModalCenter"
import ModalHeader from "../../../../ui-component/modal/common/Header"
import ModalBody from "../../../../ui-component/modal/common/Body"
import ModalFooter from "../../../../ui-component/modal/common/Footer"
import Input from "../../../../ui-component/input/Password"
//3rd
import toastr from "toastr"
import { changePassword } from "../../../../services/authentication"

export default function ChangePassword({ open, onClose }) {
 const [loading, setLoading] = useState(false)
 const [password, setPassword] = useState("")
 const [newPass, setNewPass] = useState("")
 const [confirmPass, setConfirmPass] = useState("")
 const [validTextPassword, setValidTextPassword] = useState("")
 const [validTextNewPass, setValidTextNewPass] = useState("")
 const [validTextConfirmPass, setValidTextConfirmPass] = useState("")

 const theme = useTheme()
 const { customization, user } = useSelector((state) => state)

 const checkLength = (value) => value.length >= 8 && value.length <= 32

 const onChangePassword = (value) => {
  value = value.trim()
  setValidTextPassword(checkLength(value) ? "" : "Mật khẩu phải từ 8 đến 32 ký tự")
  setPassword(value)
 }

 const onChangeNewPass = (value) => {
  value = value.trim()
  setValidTextNewPass(!checkLength(value) ? "Mật khẩu phải từ 8 đến 32 ký tự" : password === value ? "Mật khẩu mới phải khác mật khẩu cũ" : "")
  setNewPass(value)
 }

 const onChangeConfirmPass = (value) => {
  value = value.trim()
  setValidTextConfirmPass(!checkLength(value) ? "Mật khẩu phải từ 8 đến 32 ký tự" : newPass !== value ? "Mật khẩu xác nhận không khớp" : "")
  setConfirmPass(value)
 }

 const changePass = () => {
  if (validTextPassword || validTextNewPass || validTextConfirmPass || !password || !newPass || !confirmPass) {
   return toastr.error("Thông báo", "Kiểm tra lại dữ liệu nhập")
  }
  let data = {
   oldPassword: password,
   newPassword: newPass,
   confirmPassword: confirmPass,
   user,
  }
  changePassword(data).then((response) => {
   if (response.code === 200) {
    return onClose()
   }
  })
 }

 return (
  <ModalCenter open={open} onClose={onClose}>
   <Box
    component='form'
    sx={{
     "& > :not(style)": { m: 1 },
    }}
    noValidate
    autoComplete='off'
   >
    <ModalHeader sx={{ backgroundColor: theme.palette.background.default }}>
     <Typography>Đổi mật khẩu</Typography>
    </ModalHeader>
    <ModalBody>
     <Grid container spacing={2}>
      <Grid item xs={12}>
       <Input fullWidth label='Mật khẩu cũ' value={password} onChange={(e) => onChangePassword(e.target.value)} helperText={validTextPassword} error={validTextPassword ? true : false} />
      </Grid>
      <Grid item xs={12}>
       <Input fullWidth label='Mật khẩu mới' value={newPass} onChange={(e) => onChangeNewPass(e.target.value)} helperText={validTextNewPass} error={validTextNewPass ? true : false} />
      </Grid>
      <Grid item xs={12}>
       <Input
        fullWidth
        label='Xác nhận mật khẩu'
        value={confirmPass}
        onChange={(e) => onChangeConfirmPass(e.target.value)}
        helperText={validTextConfirmPass}
        error={validTextConfirmPass ? true : false}
       />
      </Grid>
     </Grid>
    </ModalBody>
    <ModalFooter>
     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LoadingButton loading={loading} color='primary' size='large' variant='contained' onClick={changePass}>
       Xác nhận đổi mật khẩu
      </LoadingButton>
     </Box>
    </ModalFooter>
   </Box>
  </ModalCenter>
 )
}
