/* jslint es6 */
import React from "react"
import {Box, Typography} from "@mui/material"
import moment from "moment"
import {translateStatusJob} from "../../ultil"

const ItemList = ({children, dataSelected, data = {}, onSelectItem = () => {}}) => {
 const [open, setOpen] = React.useState(false)

 return (
  <Box
   onClick={() => onSelectItem()}
   sx={{
    background: "#FFF",
    border: _.get(data, "code") === _.get(dataSelected, "code") ? "1px solid #007CFE" : "none",
    borderRadius: "8px",
    display: "flex",
    cursor: "pointer",
   }}
   p={2}
   flexDirection={"column"}
   gap={1}
  >
   <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
    <Typography variant='p' sx={{fontSize: "18px", color: "#007CFE", fontWeight: 600}}>
     {_.get(data, "code")}
    </Typography>
    <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
     {moment(_.get(data, "updatedAt")).format("DD/MM/YYYY HH:mm")}
    </Typography>
   </Box>
   <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex", gap: 2}}>
    <Typography variant='p' sx={{fontSize: "16px", color: "#010810", fontWeight: 500, width: "55%"}}>
     {_.get(data, "title")}
    </Typography>
    <Box
     sx={{
      justifyContent: "flex-end",
      alignItems: "center",
      display: "flex",
      gap: 1,
     }}
    >
     <img src='/images/priority/priority-1.png' style={{width: "16px"}} />

     {translateStatusJob(_.get(data, "statusJob"))}
    </Box>
   </Box>

   <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
    <i className='icon-bold-location' style={{color: "#656C75", fontSize: "20px"}} />
    <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
     {_.get(data, "address")}
    </Typography>
   </Box>
   <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
    <img src={_.get(data, "category.icon")} style={{width: "20px"}} />
    <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
     {_.get(data, "category.name")}
    </Typography>
   </Box>
  </Box>
 )
}

export default ItemList
