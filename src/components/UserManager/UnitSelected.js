import React, { useEffect, useState, useRef, Fragment } from "react"
import { styled, useTheme } from "@mui/material/styles"
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import { list as listUnit } from "../../services/unit"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
 borderRadius: "16px",
 border: "1px solid #F3F3F3",
}))

const ListItemStyled = styled(ListItem)(({ theme }) => ({
 display: "flex",
 flexDirection: "column",
 gap: 1,
 padding: "0px 0px 0px 16px",
 position: "relative",
}))

const Vector = styled(Box)(({ theme }) => ({
 position: "absolute",
 width: "16px",
 height: "32px",
 top: 0,
 left: 0,
 borderRadius: "0px 0px 0px 8px",
 borderLeft: "1px solid #CCCFD3",
 borderBottom: "1px solid #CCCFD3",
}))

const NestedList = ({ item, onClick = () => {}, items }) => {
 const [open, setOpen] = React.useState(false)

 const handleClick = () => {
  onClick(item)
  setOpen(!open)
 }

 return (
  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
   <ListItemButtonStyled onClick={handleClick}>
    <ListItemIcon>{_.get(item, "icon")}</ListItemIcon>
    <ListItemText primary={_.get(item, "label")} />
    {open ? <ExpandLess /> : <ExpandMore />}
   </ListItemButtonStyled>
   <Collapse in={open} timeout='auto' unmountOnExit>
    <List disablePadding>
     {items.map((item, i) => (
      <ListItemStyled key={i}>
       <Vector /> {item}
      </ListItemStyled>
     ))}
    </List>
   </Collapse>
  </List>
 )
}
export default function UnitSelected({ unit, setUnit }) {
 const [units, setUnits] = useState([])

 const setUnitByParent = (parent) => {
  getUnits(parent, (newParent) => {
   setUnits(newParent)
  })
 }

 const getUnits = (parent, cb) => {
  listUnit({ limit: 9999, parent: _.get(parent, "_id") }).then((response) => {
   const { data } = response
   if (!parent) {
    return cb(data)
   }
   cb([
    {
     ...parent,
     childrens: data,
    },
   ])
  })
 }

 useEffect(() => {
  setUnitByParent(unit)
 }, [unit])
//  console.log(units)

 return (
  <NestedList
   item={{
    icon: "",
    label: "Đơn vị",
   }}
   items={[
    <NestedList
     item={{
      icon: "",
      label: "Đơn vị",
     }}
     items={[
      <NestedList
       items={[
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
         <ListItemButton>
          <ListItemIcon>
           <InboxIcon />
          </ListItemIcon>
          <ListItemText primary='Hết' />
         </ListItemButton>
        </List>,
       ]}
      />,
     ]}
    />,
   ]}
  />
 )
}
{
 /* <NestedList
item={{
 icon: "",
 label: "Đơn vị",
}}
items={[
 <NestedList
  item={{
   icon: "",
   label: "Đơn vị",
  }}
  items={[
   <NestedList
    items={[
     <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItemButton>
       <ListItemIcon>
        <InboxIcon />
       </ListItemIcon>
       <ListItemText primary='Hết' />
      </ListItemButton>
     </List>,
    ]}
   />,
  ]}
 />,
]}
/> */
}
