import React, { useState } from "react"
import _ from "lodash"
import { Box, Button, Container, TextField, Grid, Typography, Stack, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { styled } from "@mui/material/styles"
import PasswordInput from "../../ui-component/input/Password"
import { login } from "../../services/authentication"
import history from "../../core/history"
import Link from "../../components/Link"

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

const Login = (props) => {
 const [username, setUsername] = useState("")
 const [password, setPassword] = useState("")
 const [rememberMe, setRememberMe] = useState(true)

 const handleRememberMeChange = (event) => {
  setRememberMe(event.target.checked)
 }

 const submit = (e) => {
  e.preventDefault()
  login({
   username: username.trim(),
   password: password.trim(),
   //    rememberMe: rememberMe, // Truyền trạng thái ghi nhớ
   //    lastpath: localStorage.getItem("last-link"),
  }).then((res) => {
   if (_.get(res, "code") === 200) {
    history.replace("/")
   }
  })
 }

 return (
  <React.Fragment>
   <Grid container direction='row' justifyContent='center' alignItems='center' style={{ minHeight: "100vh" }}>
    <Grid item>
     <Grid container style={{ maxWidth: "808px", height: "auto" }}>
      <Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
       <img style={{ width: "100%", height: "100%", borderRadius: "24px 0px 0px 24px" }} src='/images/login/city.png'></img>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
       <Box p={3} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#ffffff" }} sx={{ borderRadius: { xs: "24px", md: "0px 24px 24px 0px" } }}>
        <Box component='form' onSubmit={submit} sx={{ display: "flex", flexDirection: "column" }}>
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
         <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px' flexGrow={1}>
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
           <Typography variant='h5' sx={{ fontSize: "16px", color: "#021E38", fontWeight: 500 }}>
            Mật khẩu
           </Typography>
           <StyledPassword
            fullWidth
            placeholder='Nhập mật khẩu'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ name: "password", ariallabel: "password" }}
           />
           <Stack direction='row' spacing={2} sx={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <FormGroup>
             <FormControlLabel
              control={
               <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange} // Liên kết sự kiện thay đổi
               />
              }
              label={
               <Typography variant='h5' sx={{ fontSize: "16px", color: "#2E3236" }}>
                Ghi nhớ đăng nhập
               </Typography>
              }
             />
            </FormGroup>
            <Typography variant='h5' sx={{ fontSize: "16px", color: "#007CFE", fontWeight: 600 }}>
             <Link title={"Quên mật khẩu?"} to={"/forgot-password"}>
              Quên mật khẩu?
             </Link>
            </Typography>
           </Stack>

           <Button fullWidth variant='contained' type='submit' sx={{ borderRadius: "12px", background: "#007CFE", fontSize: "16px", padding: "12px" }}>
            Đăng nhập
           </Button>
          </Box>
         </Box>
        </Box>
       </Box>
      </Grid>
     </Grid>
     {/* <Grid container mt={8}>
      <Grid item xs={12} sx={{textAlign: "center"}}>
       <Typography variant='h5' sx={{fontSize: "18px", color: "#F3F3F3", fontWeight: 600}}>
        GIẢI PHÁP CÔNG NGHỆ CỦA CÔNG TY
       </Typography>
       <Typography variant='h5' sx={{fontSize: "18px", color: "#F3F3F3", fontWeight: 500, marginTop: "8px"}}>
        Công ty Cổ Phần Công Nghệ HeyU Việt Nam
       </Typography>
      </Grid>
     </Grid> */}
    </Grid>
   </Grid>
  </React.Fragment>
 )
}

export default Login
