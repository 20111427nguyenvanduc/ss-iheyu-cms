import React from "react"
import history from "../../../../../core/history"
import Link from "../../../../../components/Link"
import { useDispatch, useSelector } from "react-redux"

// material-ui
import { styled, useTheme } from "@mui/material/styles"
import { Avatar, Chip, ListItemIcon, ListItemText, Typography, useMediaQuery, ListItemButton } from "@mui/material"

// project imports
import { MENU_OPEN, SET_MENU } from "../../../../../store/actions"

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

// style constant
const ListIcon = styled(ListItemIcon)(({ theme }) => ({
 minWidth: "18px",
 marginTop: "auto",
 marginBottom: "auto",
}))

const SubMenuCaption = styled(Typography)(({ theme }) => ({
 ...theme.typography.subMenuCaption,
}))

function isLeftClickEvent(event) {
 return event.button === 0
}

function isModifiedEvent(event) {
 return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
// ===========================|| SIDEBAR MENU LIST ITEMS ||=========================== //

const NavItem = ({ item, level, drawerOpen, handleCloseMenu }) => {
 const dispatch = useDispatch()
 const { customization, user } = useSelector((state) => state)
 const matchesSM = useMediaQuery((theme) => theme.breakpoints.down("md"))
 const padding = 8

 const Icon = item.icon
 const itemIcon = item.icon ? (
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

 let itemTarget = ""
 if (item.target) {
  itemTarget = "_blank"
 }

 const itemHandler = (id, to, event) => {
  if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
   return
  }

  if (event.defaultPrevented === true) {
   return
  }

  event.preventDefault()
  localStorage.setItem("last-link", to)
  history.push(to)
  // dispatch({ type: MENU_OPEN, id });
  if (matchesSM) dispatch({ type: SET_MENU, opened: false })
  if (handleCloseMenu) handleCloseMenu()
 }

 const checkRole = () => {
  if (!user.roles) {
   return false
  }
  return item.role ? item.role.some((rol) => user.roles[rol]) : false
 }
 if (!checkRole()) {
  return null
 }
 const isActived = _.get(history, 'location.pathname') === item.url
 return (
  <ListItemButton
   component='a'
   href={item.url}
   disabled={item.disabled}
   sx={{
    marginBottom: "5px",
    paddingTop: `${padding}px`,
    paddingBottom: `${padding}px`,
    paddingRight: `${padding}px`,
    paddingLeft: `${drawerOpen ? level * padding : padding}px`,
    borderRadius: `${customization.borderRadius}px`,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: isActived ? 'rgba(20, 161, 255, 0.15)' : level > 1 ? "transparent !important" : "inherit",
   }}
   selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
   onClick={(e) => itemHandler(item.id, item.url, e)}
   target={itemTarget}
  >
   <ListIcon>{itemIcon}</ListIcon>
   <ListItemText
    sx={{ ml: 1, flexGrow: 1, display: drawerOpen ? "block" : "none" }}
    primary={<Typography color='inherit'>{item.title}</Typography>}
    secondary={
     item.caption && (
      <SubMenuCaption variant='caption' display='block' gutterBottom>
       {item.caption}
      </SubMenuCaption>
     )
    }
   />
   {item.chip && <Chip color={item.chip.color} variant={item.chip.variant} size={item.chip.size} label={item.chip.label} avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>} />}
  </ListItemButton>
 )
}

export default NavItem
