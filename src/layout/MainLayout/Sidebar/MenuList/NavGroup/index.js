import React from "react"
import { useDispatch, useSelector } from "react-redux"
// material-ui
import { styled, useTheme } from "@mui/material/styles"
import { Divider, List, Typography } from "@mui/material"

// project imports
import NavItem from "../NavItem"
import NavCollapse from "../NavCollapse"

// style constant
const MenuCaption = styled(Typography)(({ theme }) => ({
 ...theme.typography.menuCaption,
}))

const SubMenuCaption = styled(Typography)(({ theme }) => ({
 ...theme.typography.subMenuCaption,
}))

const MenuDivider = styled(Typography)(({ theme }) => ({
 marginTop: "2px",
 marginBottom: "10px",
}))

const WrapMenu = styled(List, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
 padding: open ? "16px" : "8px",
 [theme.breakpoints.down("sm")]: {
  ...(!open && {
   display: `none`,
  }),
 },
}))

// ===========================|| SIDEBAR MENU LIST GROUP ||=========================== //

const getRoles = (item) => {
 if (item.role) {
  return item.role
 }
 if (item.children) {
  return item.children.map((child) => getRoles(child)).flat()
 }
 return []
}

// const getUrls = (item) => {
//   if (item.url) {
//    return item.url
//   }
//   if (item.children) {
//    return item.children.map((child) => getUrls(child)).flat()
//   }
//   return []
//  }

const NavGroup = ({ item, drawerOpen }) => {
 const { user, customization } = useSelector((state) => state)
 const roles = Array.from(new Set(getRoles(item).flat()))
//  const urls = Array.from(new Set(getUrls(item).flat()))
 // menu list collapse & items
 const items = item.children.map((menu) => {
  switch (menu.type) {
   case "collapse":
    return <NavCollapse key={menu.id} menu={menu} level={1} drawerOpen={drawerOpen} />
   case "item":
    return <NavItem key={menu.id} item={menu} level={1} drawerOpen={drawerOpen} />
   default:
    return (
     <Typography key={menu.id} color='error' align='center'>
      Menu Items Error
     </Typography>
    )
  }
 })
//  if (!roles.some((role) => _.get(user, `roles.${role}`) === 1)) {
//   return null
//  }
//  const isActived = urls.includes(item.url)
 return (
  <React.Fragment>
   <WrapMenu
    open={drawerOpen}
    subheader={
     item.title && (
      <MenuCaption sx={{ display: drawerOpen ? "block" : "none" }} open={drawerOpen} variant='caption' display='block' gutterBottom>
       {item.title}
       {item.caption && (
        <SubMenuCaption variant='caption' display='block' gutterBottom>
         {item.caption}
        </SubMenuCaption>
       )}
      </MenuCaption>
     )
    }
   >
    {items}
   </WrapMenu>

   {/* group divider */}
   <Divider />
  </React.Fragment>
 )
}

export default NavGroup
