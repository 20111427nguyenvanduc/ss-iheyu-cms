import React, {useState} from "react"
import _ from "lodash"
import {Box, Button, Container, TextField, Grid, Typography, Stack, Divider, FormGroup, FormControlLabel, Checkbox} from "@mui/material"
import PasswordInput from "../../ui-component/input/Password"
import {login} from "../../services/authentication"
import history from "../../core/history"
import Link from "../../components/Link"

const ForgotPassword = (props) => {
 const [username, setUsername] = useState("")
 const [newPassword, setNewPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [otp, setOtp] = useState("")
 const [step, setStep] = useState(1)
 const [countdown, setCountdown] = useState(172)

 const submit = (e) => {
  e.preventDefault()

  if (newPassword !== confirmPassword) {
   alert("Mật khẩu mới và xác nhận mật khẩu không khớp.")
   return
  }

  login({
   newPassword: newPassword.trim(),
  }).then((res) => {
   if (_.get(res, "code") === 200) {
    alert("Đổi mật khẩu thành công!")
    history.replace("/login")
   } else {
    alert("Đổi mật khẩu thất bại. Vui lòng thử lại.")
   }
  })
 }

 return (
  <React.Fragment>
   <Grid container direction='row' justifyContent='center' alignItems='center' style={{minHeight: "100vh"}}>
    <Grid item>
     <Grid container style={{maxWidth: "808px", height: "634px"}}>
      <Grid item xs={12} md={6} display={{xs: "none", md: "block"}}>
       <img style={{width: "100%", height: "100%", borderRadius: "24px 0px 0px 24px"}} src='/images/login/city.png'></img>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
       <Box p={3} style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff"}} sx={{borderRadius: {xs: "24px", md: "0px 24px 24px 0px"}}}>
        <form onSubmit={submit}>
         <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
          <img style={{width: "auto", height: "auto", maxWidth: "56px", maxHeight: "56px"}} src='/images/logo.png' />
          <Box>
           <Typography variant='h5' sx={{fontSize: "16px", color: "#021E38", fontWeight: 500}}>
            HỆ THỐNG QUẢN TRỊ
           </Typography>
           <Typography variant='h5' sx={{fontSize: "16px", color: "#021E38", fontWeight: 500}}>
            ỨNG DỤNG CÔNG DÂN SỐ HẢI PHÒNG
           </Typography>
          </Box>
         </Stack>

         <Divider sx={{margin: "24px 0"}} />

         <Typography variant='h5' sx={{fontSize: "20px", color: "#021E38", fontWeight: 500, textAlign: "center"}}>
          Quên mật khẩu
         </Typography>
         {step === 1 ? (
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={3}>
           <Box sx={{width: "100%", maxWidth: "400px"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
            <Typography variant='h5' sx={{fontSize: "16px", color: "#021E38", fontWeight: 500}}>
             Tên đăng nhập
            </Typography>
            <TextField
             fullWidth
             placeholder='Nhập tên đăng nhập'
             variant='outlined'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             autoFocus
             inputProps={{name: "username", ariallabel: "username"}}
             InputProps={{
              sx: {borderRadius: "12px"},
             }}
            />

            <Button fullWidth variant='contained' onClick={() => setStep(2)} sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px", marginTop: "16px"}}>
             Tiếp tục
            </Button>
            <Typography variant='h5' sx={{fontSize: "16px", color: "#007CFE", fontWeight: 600, textAlign: "center", marginTop: "16px", width: "100%"}}>
             <Link title={" Quay lại đăng nhập"} to={"/login"}>
              Quay lại đăng nhập
             </Link>
            </Typography>
           </Box>
          </Box>
         ) : (
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' mt={3}>
           <Box sx={{width: "100%", maxWidth: "400px"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
            <Typography variant='h5' sx={{fontSize: "16px", color: "#021E38", fontWeight: 500}}>
             Mã xác thực
            </Typography>
            <Typography variant='h5' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400, marginBottom: "4px"}}>
             Nhập mã xác thực vừa gửi đến số 091*********
            </Typography>
            <TextField
             fullWidth
             placeholder='Nhập mã xác thực'
             variant='outlined'
             value={otp}
             onChange={(e) => setOtp(e.target.value)}
             autoFocus
             inputProps={{name: "otp", ariallabel: "otp"}}
             InputProps={{
              sx: {borderRadius: "12px"},
              endAdornment: (
               <Typography
                variant='p'
                sx={{
                 fontSize: "16px",
                 color: "#656C75",
                 fontWeight: 400,
                 textAlign: "center",
                 width: countdown ? "75%" : "50%",
                 background: "#F3F3F3",
                 padding: "4px",
                 borderRadius: "4px",
                 cursor: "pointer",
                }}
               >
                Gửi lại mã {countdown ? `(${countdown}s)` : null}
               </Typography>
              ),
             }}
            />

            <Typography variant='h5' sx={{fontSize: "16px", color: "#021E38", fontWeight: 500}}>
             Mật khẩu mới
            </Typography>
            <PasswordInput
             fullWidth
             placeholder='Nhập mật khẩu mới'
             variant='outlined'
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
             inputProps={{name: "newPassword", ariallabel: "newPassword"}}
            />
            <Typography variant='h5' sx={{fontSize: "16px", color: "#021E38", fontWeight: 500}}>
             Nhập lại mật khẩu mới{" "}
            </Typography>
            <PasswordInput
             fullWidth
             placeholder='Nhập lại mật khẩu mới'
             variant='outlined'
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             inputProps={{name: "confirmPassword", ariallabel: "confirmPassword"}}
            />

            <Button fullWidth variant='contained' onClick={() => setStep(2)} sx={{borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px", marginTop: "16px"}}>
             Đổi mật khẩu
            </Button>
           </Box>
          </Box>
         )}
        </form>
       </Box>
      </Grid>
     </Grid>
     <Grid container mt={8}>
      <Grid item xs={12} sx={{textAlign: "center"}}>
       <Typography variant='h5' sx={{fontSize: "18px", color: "#F3F3F3", fontWeight: 600}}>
        GIẢI PHÁP CÔNG NGHỆ CỦA CÔNG TY
       </Typography>
       <Typography variant='h5' sx={{fontSize: "18px", color: "#F3F3F3", fontWeight: 500, marginTop: "8px"}}>
        Công ty Cổ Phần Công Nghệ HeyU Việt Nam
       </Typography>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </React.Fragment>
 )
}

export default ForgotPassword
