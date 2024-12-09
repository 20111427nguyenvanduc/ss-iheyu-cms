import React from "react"

// material-ui
import { Typography } from "@mui/material"

// project imports
import NavGroup from "./NavGroup"
import menuItem from "../menu-items"

// ===========================|| SIDEBAR MENU LIST ||=========================== //

const MenuList = ({ drawerOpen }) => {
 const navItems = menuItem.items.map((item) => {
  switch (item.type) {
   case "group":
    return <NavGroup drawerOpen={drawerOpen} key={item.id} item={item} />
   default:
    return (
     <Typography key={item.id} color='error' align='center'>
      Menu Items Error
     </Typography>
    )
  }
 })

 return navItems
}

export default MenuList
