import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
import { Box, useMediaQuery } from "@mui/material"
import { SET_USER, SET_REGIONS, SET_ORDER_TYPES } from "../../store/actions"
import { blueGray } from "@mui/material/colors"
import Header from "./Header"
import Sidebar from "./Sidebar"
import themes from "../../themes"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
// 3rd party
import axios from "../../services/axios"
import {MENU_OPEN, SET_MENU} from "../../store/actions"
import {drawerWidth} from "../../store/constant"
// import { getRegion } from "../../services/app"
import {getUserInf} from "../../services/authentication"

const Main = styled(Box, {shouldForwardProp: (prop) => prop !== "open"})(({theme, open}) => ({
 backgroundColor: theme.palette.background.main,
 flexGrow: 1,
 height: "100vh",
 overflow: "auto",
 width: `calc(100vw - ${open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`})`,
 ...(open
  ? {
     transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
     }),
    }
  : {
     transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
     }),
    }),
 [theme.breakpoints.down("sm")]: {
  maxWidth: `100vw`,
 },
}))

export default function MiniDrawer({children}) {
 const {user, customization} = useSelector((state) => state)
 const dispatch = useDispatch()
 const handleDrawerToggle = () => {
  dispatch({type: SET_MENU, opened: !customization.opened})
 }

 const getInitState = () => {
  getUserInf({}).then((response) => {
   const user = _.get(response, "data")
   localStorage.setItem("user", JSON.stringify(user))
   dispatch({type: SET_USER, payload: user})
  })
  //   getRegion({}).then((response) => {
  //    const regions = _.get(response, "data")
  //    dispatch({ type: SET_REGIONS, payload: regions })
  //   })
 }

 React.useEffect(() => {
  getInitState()
 }, [])

 const userActive = !_.isEmpty(user) && user.status
 if (!userActive) {
  return null
 }

 return (
  <ThemeProvider theme={themes(customization)}>
   <CssBaseline />
   <Box sx={{display: "flex", justifyContent: "space-between"}}>
    <Sidebar open={customization.opened} drawerToggle={handleDrawerToggle} />
    <Main component='main' sx={{ flexGrow: 1 }} open={customization.opened}>
     <Header handleLeftDrawerToggle={handleDrawerToggle} drawerOpen={customization.opened} />
     {children}
    </Main>
   </Box>
  </ThemeProvider>
 )
}
