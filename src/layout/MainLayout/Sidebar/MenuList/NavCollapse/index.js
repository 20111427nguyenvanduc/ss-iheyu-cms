import React from "react"
import { useSelector } from "react-redux"

// material-ui
import { styled, useTheme } from "@mui/material/styles"
import { Box, Collapse, List, ListItemIcon, ListItemText, Typography, ListItemButton, Menu, Popover } from "@mui/material"

// project imports
import NavItem from "../NavItem"

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import IconChevronUp from "@mui/icons-material/ExpandLess"
import IconChevronDown from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
// style constant

const CollapseWrap = styled(List)(({ theme }) => ({
 position: "relative",
 "&:after": {
  content: "''",
  position: "absolute",
  left: "10px",
  top: 0,
  height: "100%",
  width: "1px",
  opacity: 1,
  background: theme.palette.primary.light,
 },
}))

const PopoverWrap = styled(Popover)(({ theme }) => ({}))

// ===========================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||=========================== //

const NavCollapse = ({ menu, level, drawerOpen }) => {
 const theme = useTheme()
 const { user, customization } = useSelector((state) => state)
 const padding = 8
 const [open, setOpen] = React.useState(false)
 const [selected, setSelected] = React.useState(null)

 const [anchorEl, setAnchorEl] = React.useState(null)
 const openMenu = Boolean(anchorEl)

 const handleClickMenu = (event) => {
  setAnchorEl(event.currentTarget)
 }
 const handleCloseMenu = (event) => {
  setAnchorEl(null)
 }
 const handleClick = (event) => {
  if (drawerOpen) {
   setOpen(!open)
   setSelected(!selected ? menu.id : null)
  } else {
   handleClickMenu(event)
  }
 }

 // menu collapse & item
 const menus = menu.children.map((item) => {
  switch (item.type) {
   case "collapse":
    return <NavCollapse key={item.id} menu={item} level={level + 1} drawerOpen={drawerOpen} />
   case "item":
    return <NavItem key={item.id} item={item} level={level + 1} drawerOpen={drawerOpen} handleCloseMenu={handleCloseMenu} />
   default:
    return (
     <Typography key={item.id} color='error' align='center'>
      Menu Items Error
     </Typography>
    )
  }
 })

 const menusPopver = menu.children.map((item) => {
  switch (item.type) {
   case "collapse":
    return <NavCollapse key={item.id} menu={item} level={level} drawerOpen={true} />
   case "item":
    return <NavItem key={item.id} item={item} level={level} drawerOpen={true} />
   default:
    return (
     <Typography key={item.id} color='error' align='center'>
      Menu Items Error
     </Typography>
    )
  }
 })

 const Icon = menu.icon
 const menuIcon = menu.icon ? (
  typeof Icon === "string" ? (
   <img src={Icon} width='20px' height='20px' />
  ) : (
   <Icon stroke={1.5} size='20px' />
  )
 ) : (
  <FiberManualRecordIcon
   sx={{
    width: "13px",
    height: "13px",
   }}
   fontSize={level > 0 ? "inherit" : "default"}
  />
 )

 const checkRole = () => {
  const roles = menu.children ? menu.children.map((item) => item.role).flat(1) : []
  if (_.isEmpty(roles)) {
   return true
  }
  if (!user.roles || _.isEmpty(user.roles)) {
   return false
  }
  return roles ? roles.some((rol) => user.roles[rol]) : false
 } 
 if (!checkRole()) {
  return null
 }

 return (
  <React.Fragment>
   <ListItemButton
    sx={{
     marginBottom: "5px",
     paddingTop: `${padding}px`,
     paddingBottom: `${padding}px`,
     paddingRight: `${padding}px`,
     paddingLeft: `${drawerOpen ? level * padding : padding}px`,
     borderRadius: `${customization.borderRadius}px`,
     alignItems: "flex-start",
     justifyContent: "center",
     backgroundColor: level > 1 ? "transparent !important" : "inherit",
    }}
    selected={selected === menu.id}
    onClick={handleClick}
   >
    <ListItemIcon
     sx={{
      minWidth: "18px",
      marginTop: "auto",
      marginBottom: "auto",
     }}
    >
     {menuIcon}
    </ListItemIcon>
    <ListItemText
     sx={{ ml: 1, flexGrow: 1, display: drawerOpen ? "block" : "none" }}
     primary={<Typography color='inherit'>{menu.title}</Typography>}
     secondary={
      menu.caption && (
       <Typography variant='caption' display='block' gutterBottom>
        {menu.caption}
       </Typography>
      )
     }
    />

    {!drawerOpen ? (
     <Box
      sx={{
       position: "absolute",
       right: "0px",
       top: "0px",
       height: "100%",
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
      }}
     >
      <ChevronRightIcon
       stroke={1.5}
       size='1rem'
       sx={{
        fontSize: "1rem",
        marginTop: "auto",
        marginBottom: "auto",
       }}
      />
     </Box>
    ) : open ? (
     <IconChevronUp
      stroke={1.5}
      size='1rem'
      sx={{
       fontSize: "1rem",
       marginTop: "auto",
       marginBottom: "auto",
      }}
     />
    ) : (
     <IconChevronDown
      stroke={1.5}
      size='1rem'
      sx={{
       fontSize: "1rem",
       marginTop: "auto",
       marginBottom: "auto",
      }}
     />
    )}
   </ListItemButton>
   <Collapse in={open && drawerOpen}>
    <CollapseWrap component='div' disablePadding>
     {menus}
    </CollapseWrap>
   </Collapse>
   <PopoverWrap
    id={menu.id + "-popover"}
    open={openMenu}
    anchorEl={anchorEl}
    anchorOrigin={{
     vertical: "top",
     horizontal: "right",
    }}
    transformOrigin={{
     vertical: "top",
     horizontal: "left",
    }}
    onClose={handleCloseMenu}
    disableRestoreFocus
   >
    {menusPopver}
   </PopoverWrap>
  </React.Fragment>
 )
}

export default NavCollapse
