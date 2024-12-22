import React from "react"
import { useDispatch, useSelector } from "react-redux"

// material-ui
import { styled, useTheme } from "@mui/material/styles"
import { Avatar, Box, Button, ButtonBase, useMediaQuery, Typography } from "@mui/material"

// project imports
import LogoSection from "../../LogoSection"

// 3rd
import _ from "lodash"

// assets
import MenuIcon from "@mui/icons-material/Menu"
import ClearIcon from "@mui/icons-material/Clear"
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar"
// style constant
const MenuBtn = styled(ButtonBase, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
 padding: "0px",
 fontSize: "1.5rem",
 overflow: "hidden",
 borderRadius: theme.spacing(1),
 [theme.breakpoints.down("sm")]: {
  ...(!open && {
   display: `none`,
  }),
 },
}))
const WrapHeader = styled(Box)(({ theme }) => ({
 backgroundColor: "#007CFE",
 color: "#ffffff",
 padding: theme.spacing(2),
 minHeight: '65px'
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
    <Box sx={{ flexGrow: 1, display: drawerOpen ? "block" : "none" }}>
     <Box sx={{ display: "flex" }}>
      <LogoSection />
      <Box sx={{ flexGrow: 1, px: 1 }}>
       <Typography variant='h6'>UBND Tỉnh HP</Typography>
       <Typography variant='subtitle1'>#000000</Typography>
      </Box>
     </Box>
    </Box>
    <Box>
     <MenuBtn variant='text' onClick={handleLeftDrawerToggle} open={drawerOpen}>
      {/* <ViewSidebarIcon stroke={1.5} size='1.3rem' /> */}
      {drawerOpen ? <ClearIcon stroke={1.5} size='1.3rem' /> : <MenuIcon stroke={1.5} size='1.3rem' />}
     </MenuBtn>
    </Box>
   </BoxContainer>
  </WrapHeader>
 )
}

export default Header
