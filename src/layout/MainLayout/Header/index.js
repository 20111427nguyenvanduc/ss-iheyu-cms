import React from "react"
import { useDispatch, useSelector } from "react-redux"

// material-ui
import { styled, useTheme } from "@mui/material/styles"
import { Avatar, Box, Button, ButtonBase, useMediaQuery } from "@mui/material"

// project imports
import LogoSection from "../LogoSection"
// import SearchSection from './SearchSection';
import ProfileSection from "./ProfileSection"
// import NotificationSection from './NotificationSection';

// 3rd
import _ from "lodash"

// assets
import MenuIcon from "@mui/icons-material/Menu"
import ClearIcon from "@mui/icons-material/Clear"
// style constant
const MenuBtn = styled(ButtonBase, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
 padding: theme.spacing(1),
 fontSize: "1.5rem",
 overflow: "hidden",
 borderRadius: theme.spacing(1),
 [theme.breakpoints.down("sm")]: {
  ...(!open && {
   position: `fixed`,
   top: theme.spacing(1),
   left: theme.spacing(1),
   backgroundColor: "#1589D8",
  }),
 },
}))
const WrapHeader = styled(Box)(({ theme }) => ({
 backgroundColor: "#1589D8",
 color: "#ffffff",
}))

const BoxContainer = styled(Box)(({ theme }) => ({
 width: "100%",
 display: "flex",
 justifyContent: "center",
 // padding: theme.spacing(1)
}))

const BoxHidding = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
 display: open ? "block" : "none",
 padding: theme.spacing(1),
}))

// ===========================|| MAIN NAVBAR / HEADER ||=========================== //

const Header = ({ handleLeftDrawerToggle, drawerOpen }) => {
 const theme = useTheme()
 const matchUpMd = useMediaQuery(theme.breakpoints.up("md"))
 const { user, customization } = useSelector((state) => state)
 const { avatar, fullName } = user
 return (
  <WrapHeader>
   <BoxContainer>
    <Box sx={{ p: 1, flexGrow: 1, display: drawerOpen ? "block" : "none", backgroundColor: "#ffffff", borderRadius: "0px 0px 100px 0px" }}>
     <LogoSection />
    </Box>
    <MenuBtn variant='text' onClick={handleLeftDrawerToggle} open={drawerOpen}>
     {drawerOpen ? <ClearIcon stroke={1.5} size='1.3rem' /> : <MenuIcon stroke={1.5} size='1.3rem' />}
    </MenuBtn>
   </BoxContainer>

   {/* header search */}
   {/* <SearchSection theme="light" /> */}
   {/* notification & profile */}
   {/* <NotificationSection /> */}
   <BoxHidding open={drawerOpen} sx={{ width: "100%" }}>
    <ProfileSection drawerOpen={drawerOpen} />
   </BoxHidding>
  </WrapHeader>
 )
}

export default Header
