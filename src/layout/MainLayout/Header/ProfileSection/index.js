import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// material-ui
import { styled, useTheme } from "@mui/material/styles"
import {
 Avatar,
 Box,
 Card,
 CardContent,
 Chip,
 ClickAwayListener,
 Divider,
 Grid,
 InputAdornment,
 List,
 ListItemIcon,
 ListItemText,
 OutlinedInput,
 Paper,
 Popper,
 Switch,
 Typography,
 ListItemButton,
} from "@mui/material"

// third-party
import PerfectScrollbar from "react-perfect-scrollbar"
import _ from "lodash"

// project imports
import MainCard from "../../../../ui-component/cards/MainCard"
import Transitions from "../../../../ui-component/extended/Transitions"
import ChangePassword from "./ChangePassword"
import { SET_MODE } from "../../../../store/actions"

// assets
import IconLogout from "@mui/icons-material/Logout"
import IconSearch from "@mui/icons-material/Search"
import IconSettings from "@mui/icons-material/Settings"
import KeyIcon from "@mui/icons-material/Key"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
// style const
const PopperWrap = styled(Popper)(({ theme }) => ({
 zIndex: 999,
 backgroundColor: theme.palette.paper,
}))

const NavContainer = styled(List)(({ theme }) => ({
 width: "100%",
 maxWidth: "260px",
 minWidth: "200px",
 // backgroundColor: theme.palette.background.paper,
 [theme.breakpoints.down("sm")]: {
  minWidth: "100%",
 },
}))

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
 cursor: "pointer",
 margin: `${theme.spacing(1)} ${theme.spacing(0)} !important`,
}))

const ProfileChip = styled(Chip)(({ theme }) => ({
 height: "65px",
 width: "100%",
 alignItems: "center",
 padding: "13px 8px",
 justifyContent: "start",
 transition: "all .2s ease-in-out",
 // borderColor: theme.palette.primary.main,
 // backgroundColor: theme.palette.primary.main,
 color: "#ffffff",
 '&[aria-controls="menu-list-grow"], &:hover': {
//   borderColor: theme.palette.primary.light,
//   background: `${theme.palette.primary.dark}!important`,
//   "& svg": {
//    stroke: theme.palette.primary.main,
//   },
 },
}))
const ProfileInfWrap = styled(Box)(({ theme }) => ({
 flexGrow: 1,
 padding: "8px",
}))

// ===========================|| PROFILE MENU ||=========================== //

const ProfileSection = () => {
 const theme = useTheme()
 const dispatch = useDispatch()
 const { customization, user } = useSelector((state) => state)
 const [sdm, setSdm] = useState(true)
 const [isOpenChangePass, setOpenChangePass] = useState(false)
 const [value, setValue] = useState("")
 const [notification, setNotification] = useState(false)
 const [selectedIndex] = useState(1)

 const [open, setOpen] = useState(false)
 const anchorRef = React.useRef(null)
 const handleLogout = async () => {
  document.location.href = "/logout"
 }

 const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen)
 }
 const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
   return
  }

  setOpen(false)
 }

 const prevOpen = React.useRef(open)
 useEffect(() => {
  if (prevOpen.current === true && open === false) {
   anchorRef.current.focus()
  }
  prevOpen.current = open
 }, [open])

 useEffect(() => {
  if (user.password === "$2a$08$kyWnU8E7t7VBqfp2yZSyd.9U52B.qD7GG.stLSpKGHYtqbOTyITpu") {
   openChangePass()
  }
 }, [user])

 const openChangePass = () => {
  setOpenChangePass(true)
 }

 const closeChangePass = () => {
  setOpenChangePass(false)
 }

 const handleSwitchMode = () => {
  dispatch({ type: SET_MODE, mode: customization && customization.mode === "dark" ? "light" : "dark" })
 }

 return (
  <Box>
   <ProfileChip
    sx={{ borderRadius: `${customization.borderRadius}px`, borderColor: "transparent" }}
    classes={{
     label: {
      lineHeight: 0,
      padding: theme.spacing(1),
     },
    }}
    icon={
     <ProfileAvatar src={_.get(user, "avatar")} ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup='true' color='inherit'>
      {_.get(user, "name")}
     </ProfileAvatar>
    }
    label={
     <ProfileInfWrap>
      <Box display='flex' alignItems='center' gap='4px'>
       <Box>
        <Typography variant='h6'>{_.get(user, "name")}</Typography>
       </Box>
       {open ? <ArrowDropUpIcon fontSize='large' /> : <ArrowDropDownIcon fontSize='large' />}
      </Box>
     </ProfileInfWrap>
    }
    variant='outlined'
    ref={anchorRef}
    aria-controls={open ? "menu-list-grow" : undefined}
    aria-haspopup='true'
    onClick={handleToggle}
    color='primary'
   />
   <PopperWrap
    placement='bottom-end'
    open={open}
    sx={{ zIndex: 999 }}
    anchorEl={anchorRef.current}
    role={undefined}
    transition
    disablePortal
    popperOptions={{
     modifiers: [
      {
       name: "offset",
       options: {
        offset: [0, 14],
       },
      },
     ],
    }}
   >
    {({ TransitionProps }) => (
     <Transitions in={open} {...TransitionProps}>
      <Paper sx={{ boxShadow: "none" }}>
       <ClickAwayListener onClickAway={handleClose}>
        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
         <CardContent>
          <Grid container direction='column' spacing={0}>
           <Grid item sx={{ display: "flex" }}>
            <Typography variant='body1'>Xin chào, {_.get(user, "name")}</Typography>
            <Typography
             component='span'
             variant='body1'
             sx={{
              marginLeft: "5px",
              fontWeight: 500,
             }}
            >
             {_.get(user, "name.last")}
            </Typography>
           </Grid>
           <Grid item>
            <Typography variant='subtitle'>{_.get(user, "departments", []).join(", ")}</Typography>
           </Grid>
          </Grid>
          <Divider />
          <NavContainer component='nav' sx={{ borderRadius: `${customization.borderRadius}px` }}>
           <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, marginTop: "5px" }} selected={selectedIndex === 3} onClick={handleSwitchMode}>
            <ListItemIcon>{customization.mode === "dark" ? <DarkModeIcon stroke={1.5} size='1.3rem' /> : <LightModeIcon stroke={1.5} size='1.3rem' />}</ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Chế độ: {customization.mode === "dark" ? "Tối" : "Sáng"}</Typography>} />
           </ListItemButton>
           <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, marginTop: "5px" }} selected={selectedIndex === 3} onClick={openChangePass}>
            <ListItemIcon>
             <KeyIcon stroke={1.5} size='1.3rem' />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Đổi mật khẩu</Typography>} />
           </ListItemButton>
           <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, marginTop: "5px" }} selected={selectedIndex === 4} onClick={handleLogout}>
            <ListItemIcon>
             <IconLogout stroke={1.5} size='1.3rem' />
            </ListItemIcon>
            <ListItemText primary={<Typography variant='body1'>Đăng xuất</Typography>} />
           </ListItemButton>
          </NavContainer>
         </CardContent>
        </MainCard>
       </ClickAwayListener>
      </Paper>
     </Transitions>
    )}
   </PopperWrap>
   <ChangePassword open={isOpenChangePass} onClose={closeChangePass} />
  </Box>
 )
}

export default ProfileSection
