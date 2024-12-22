import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import { useMediaQuery } from "@mui/material"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"

import { drawerWidth } from "../../../store/constant"
import MenuList from "./MenuList"
import Header from "./Header"

const openedMixin = (theme) => ({
 width: drawerWidth,
 transition: theme.transitions.create("width", {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen,
 }),
 overflowX: "hidden",
})

const closedMixin = (theme) => ({
 transition: theme.transitions.create("width", {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen,
 }),
 overflowX: "hidden",
 width: `calc(${theme.spacing(8)} + 1px)`,
 [theme.breakpoints.down("sm")]: {
  width: `0px`,
 },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
 width: drawerWidth,
 flexShrink: 0,
 whiteSpace: "nowrap",
 boxSizing: "border-box",
 ...(open && {
  ...openedMixin(theme),
  "& .MuiDrawer-paper": openedMixin(theme),
 }),
 ...(!open && {
  ...closedMixin(theme),
  "& .MuiDrawer-paper": closedMixin(theme),
 }),
}))

export default function MiniDrawer({ open, drawerToggle }) {
 const theme = useTheme()

 const matchDownMd = useMediaQuery(theme.breakpoints.down("md"))

 return (
  <Drawer variant={"permanent"} open={open} onClose={drawerToggle} anchor='left'>
   <Header handleLeftDrawerToggle={drawerToggle} drawerOpen={open} />
   <MenuList drawerOpen={open} />
  </Drawer>
 )
}
