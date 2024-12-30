import React, { useState, useEffect } from "react"
import _ from "lodash"
import toastr from "toastr"
import { Box, Button, Container, TextField, Grid, Typography, Stack, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { styled } from "@mui/material/styles"
import PasswordInput from "../../ui-component/input/Password"
import { forgotPasswordSendOtp, forgotPasswordCheckOtp } from "../../services/authentication"
import history from "../../core/history"
import Link from "../../components/Link"
import Alert from "../../ui-component/dialog/Alert"

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

const StyledPassword = styled(PasswordInput)({
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

let countTimer = setInterval(() => {}, 1000)

const ForgotPassword = (props) => {
 const [username, setUsername] = useState("")
 const [newPassword, setNewPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [otp, setOtp] = useState("")
 const [userInf, setUserInf] = useState()
 const [step, setStep] = useState(1)
 const [countdown, setCountdown] = useState(0)
 const [alertSuccess, setAlertSuccess] = useState(false)

 useEffect(() => {
  if (countdown <= 0) {
   clearInterval(countTimer)
  }
 }, [countdown])

 const submit = (e) => {
  e.preventDefault()

  if (step === 1) {
   return checkUsername(() => {
    setStep(2)
   })
  }
  if (step === 2) {
   return changePassword()
  }
 }

 const changePassword = () => {
  if (newPassword !== confirmPassword) {
   toastr.warning("Mật khẩu mới và xác nhận mật khẩu không khớp.")
   return
  }
  forgotPasswordCheckOtp({
   code: otp,
   token: userInf.token,
   username,
   newPassword,
   rePassword: confirmPassword,
  }).then((res) => {
   if (_.get(res, "code") === 200) {
    setAlertSuccess("Đổi mật khẩu thành công, vui lòng đăng nhập lại")
    setTimeout(() => {
     history.replace("/login")
    }, 3000)
   }
  })
 }

 const checkUsername = (cb = () => {}) => {
  forgotPasswordSendOtp({
   username,
  }).then((res) => {
   if (_.get(res, "code") === 200) {
    setUserInf({
     ..._.get(res, "userInf"),
     ..._.get(res, "data"),
    })
    clearInterval(countTimer)
    setCountdown(_.get(res, "data.timeResend", 180000) / 1000)
    countTimer = setInterval(() => {
     setCountdown((oldCount) => oldCount - 1)
    }, 1000)
    cb()
   }
  })
 }

 const reSendOTP = () => {
  checkUsername()
 }

 const alertSuccessClose = () => {
  setAlertSuccess(false)
  history.replace("/login")
 }

 return (
  <React.Fragment>
   <Grid container direction='row' justifyContent='center' alignItems='center' style={{ minHeight: "100vh" }}>
    <Grid item>
     <Grid container style={{ maxWidth: "808px", height: "634px" }}>
      <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
       <img style={{ width: "100%", height: "100%", borderRadius: "24px 0px 0px 24px" }} src='/images/login/city.png'></img>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
       <Box p={3} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }} sx={{ borderRadius: { xs: "24px", md: "0px 24px 24px 0px" } }}>
        <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
         <img style={{ width: "auto", height: "auto", maxWidth: "56px", maxHeight: "56px" }} src='/images/logo.png' />
         <Box>
          <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
           HỆ THỐNG QUẢN TRỊ
          </Typography>
          <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
           ỨNG DỤNG CÔNG DÂN SỐ HẢI PHÒNG
          </Typography>
         </Box>
        </Stack>
        <Divider sx={{ margin: "24px 0" }} />
        <Typography variant='h5' sx={{ fontSize: "20px", color: "#021E38", fontWeight: 500, textAlign: "center" }}>
         Quên mật khẩu
        </Typography>
        <Box component='form' onSubmit={submit}>
         {step === 1 ? (
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={3}>
           <Box sx={{ width: "100%", maxWidth: "400px" }} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
            <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
             Tên đăng nhập
            </Typography>
            <StyledTextField
             fullWidth
             placeholder='Nhập tên đăng nhập'
             variant='outlined'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             autoFocus
             inputProps={{ name: "username", ariallabel: "username" }}
            />

            <Button fullWidth variant='contained' type='submit' sx={{ borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px", marginTop: "16px" }}>
             Tiếp tục
            </Button>
            <Typography variant='h5' sx={{ fontSize: "16px", color: "#007CFE", fontWeight: 600, textAlign: "center", marginTop: "16px", width: "100%" }}>
             <Link title={" Quay lại đăng nhập"} to={"/login"}>
              Quay lại đăng nhập
             </Link>
            </Typography>
           </Box>
          </Box>
         ) : (
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={3}>
           <Box sx={{ width: "100%", maxWidth: "400px" }} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
            <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
             Mã xác thực
            </Typography>
            <Typography variant='h5' sx={{ fontSize: "16px", color: "#2E3236", fontWeight: 400, marginBottom: "4px" }}>
             Nhập mã xác thực vừa gửi đến số {_.get(userInf, "phone")}
            </Typography>
            <StyledTextField
             fullWidth
             placeholder='Nhập mã xác thực'
             variant='outlined'
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
             autoFocus
             inputProps={{ name: "otp", ariallabel: "otp" }}
             InputProps={{
              endAdornment: (
               <Button
                component='p'
                variant='contained'
                size='small'
                sx={{
                 width: countdown > 0 ? "75%" : "50%",
                }}
                disabled={countdown <= 0 ? false : true}
                onClick={reSendOTP}
               >
                Gửi lại mã {countdown > 0 ? `(${countdown}s)` : null}
               </Button>
              ),
             }}
            />

            <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
             Mật khẩu mới
            </Typography>
            <StyledPassword
             fullWidth
             placeholder='Nhập mật khẩu mới'
             variant='outlined'
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
             inputProps={{ name: "newPassword", ariallabel: "newPassword" }}
            />
            <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
             Nhập lại mật khẩu mới{" "}
            </Typography>
            <StyledPassword
             fullWidth
             placeholder='Nhập lại mật khẩu mới'
             variant='outlined'
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             inputProps={{ name: "confirmPassword", ariallabel: "confirmPassword" }}
            />

            <Button fullWidth variant='contained' type='submit' sx={{ borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px", marginTop: "16px" }}>
             Đổi mật khẩu
            </Button>
           </Box>
          </Box>
         )}
        </Box>
       </Box>
      </Grid>
     </Grid>
     {/* <Grid container mt={8}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
       <Typography variant='h5' sx={{ fontSize: "18px", color: "#F3F3F3", fontWeight: 600 }}>
        GIẢI PHÁP CÔNG NGHỆ CỦA CÔNG TY
       </Typography>
       <Typography variant='h5' sx={{ fontSize: "18px", color: "#F3F3F3", fontWeight: 500, marginTop: "8px" }}>
        Công ty Cổ Phần Công Nghệ HeyU Việt Nam
       </Typography>
      </Grid>
     </Grid> */}
    </Grid>
   </Grid>
   <Alert open={alertSuccess ? true : false} onClose={alertSuccessClose} title='Thông báo' description={alertSuccess} />
  </React.Fragment>
 )
}

export default ForgotPassword
