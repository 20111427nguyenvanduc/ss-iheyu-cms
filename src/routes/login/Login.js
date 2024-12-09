import React, { useState } from "react"
import _ from "lodash"
import { Box, Button, Container, TextField } from "@mui/material"
import PasswordInput from "../../ui-component/input/Password"
// import { login } from "../../services/authentication"
import history from "../../core/history"
import toastr from "toastr"

const Login = (props) => {
 const [username, setUsername] = useState("")
 const [password, setPassword] = useState("")

 const submit = (e) => {
  e.preventDefault()
//   login({
//    username: username.trim(),
//    password: password.trim(),
//    lastpath: localStorage.getItem("last-link"),
//   }).then((res) => {
//    if (_.get(res, "code") === 200) {
//     history.replace(_.get(res, "data"))
//    }
//   })
 }
 return (
  <React.Fragment>
   <Container maxWidth='sm'>
    <form onSubmit={submit}>
     <Box sx={{ height: "100vh" }} display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <img style={{ width: "100%", maxWidth: "400px" }} src='/img/logoHeyU.png' />
      <Box sx={{ width: "100%", maxWidth: "400px" }} display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='10px'>
       <TextField
        fullWidth
        label='Tên đăng nhập/email'
        variant='outlined'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
        inputProps={{ name: "username", ariallabel: "username" }}
       />
       <PasswordInput fullWidth label='Mật khẩu' variant='outlined' value={password} onChange={(e) => setPassword(e.target.value)} inputProps={{ name: "password", ariallabel: "password" }} />
       <Button fullWidth variant='contained' type='submit'>
        Đăng nhập
       </Button>
      </Box>
     </Box>
    </form>
   </Container>
  </React.Fragment>
 )
}

export default Login
