/* jslint es6 */
import React from "react"
import {Box, Typography} from "@mui/material"

const ItemList = ({children, index, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)

 return (
  <Box
   sx={{
    background: "#FFF",
    border: index === 0 ? "1px solid #007CFE" : "none",
    borderRadius: "8px",
    display: "flex",
    position: "relative", // Đặt position relative để định vị ảnh chồng
   }}
   p={2}
   flexDirection={"column"}
   gap={1}
  >
   {/* Hình ảnh chồng lên trên bên phải */}
   <img
    src='/images/polygon.png'
    alt='polygon'
    style={{
     position: "absolute",
     top: "50%", // Căn giữa theo chiều dọc
     right: "-16px", // Đẩy ảnh ra ngoài bên phải
     transform: "translateY(-50%)", // Dịch chuyển lên nửa chiều cao
     width: "16px",
    }}
   />

   <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
    <Typography variant='p' sx={{fontSize: "18px", color: "#007CFE", fontWeight: 600}}>
     #PAKN.20241212.0012
    </Typography>
    <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
     10:02 03/12/2024
    </Typography>
   </Box>
   <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex", gap: 2}}>
    <Typography variant='p' sx={{fontSize: "16px", color: "#010810", fontWeight: 500}}>
     Cầu vượt Đông Hải xuống dốc có khúc cua gấp
    </Typography>
    <Box
     sx={{
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
      gap: 1,
     }}
    >
     <img src='/images/priority/priority-1.png' style={{width: "16px"}} />
     <Box
      sx={{
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       background: "#E5F1FF",
       padding: "4px 8px",
       borderRadius: "100px",
       gap: 1,
       cursor: "pointer",
       flexShrink: 0,
      }}
     >
      <i className={"icon-bold-clock"} style={{color: "#007CFE", fontSize: "16px"}} />
      <Typography variant='p' sx={{fontSize: "14px", color: "#007CFE", fontWeight: 400}}>
       Chờ xử lý
      </Typography>
     </Box>
    </Box>
   </Box>

   <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
    <i className='icon-bold-location' style={{color: "#656C75", fontSize: "16px"}} />
    <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
     Cầu vượt Đông Hải, Phường Đông Hải, Quận Hải An
    </Typography>
   </Box>
   <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
    <img src='/images/sidebar/icon-sidebar-donvi.png' style={{width: "16px"}} />
    <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
     An ninh trật tự
    </Typography>
   </Box>
  </Box>
 )
}

export default ItemList
