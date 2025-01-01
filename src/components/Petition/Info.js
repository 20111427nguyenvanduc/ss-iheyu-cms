import * as React from "react"
import {Box, Typography} from "@mui/material"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"

export default function Info() {
 const itemData = [
  {
   img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
   title: "Breakfast",
  },
  {
   img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
   title: "Burger",
  },
  {
   img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
   title: "Camera",
  },
 ]
 return (
  <Box sx={{width: "100%", display:'flex'}} flexDirection={"column"} gap={1.5}>
   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Mã phản ánh:
    </Typography>
    <Typography variant='p' sx={{fontSize: "18px", color: "#007CFE", fontWeight: 600}}>
     #PAKN.20241212.0012
    </Typography>
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", background: "#E5F1FF", padding: "4px 8px", borderRadius: "100px", gap: 1, cursor: "pointer", flexShrink: 0}}>
     <i className={"icon-bold-clock"} style={{color: "#007CFE", fontSize: "16px"}} />
     <Typography variant='p' sx={{fontSize: "14px", color: "#007CFE", fontWeight: 400}}>
      Chờ xử lý
     </Typography>
    </Box>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Lĩnh vực:
    </Typography>
    <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
     <img src='/images/sidebar/icon-sidebar-donvi.png' style={{width: "16px"}} />
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      An ninh trật tự
     </Typography>
     <i className='icon-bold-edit-2' style={{color: "#007CFE", fontSize: "20px"}} />
    </Box>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Mức độ:
    </Typography>
    <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
     <img src='/images/priority/priority-1.png' style={{width: "16px"}} />
     <i className='icon-bold-edit-2' style={{color: "#007CFE", fontSize: "20px"}} />
    </Box>
   </Box>
   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Thời gian tạo: 10:02 03/12/2024
    </Typography>
   </Box>
   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Địa điểm: Cầu vượt Đông Hải, Phường Đông Hải, Quận Hải An
    </Typography>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Tiêu đề:
    </Typography>
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 600}}>
     Cầu vượt Đông Hải xuống dốc có khúc cua gấp
    </Typography>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "start", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "start", gap: 1}} flexDirection={"column"}>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      Nội dung
     </Typography>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      Cầu Vượt Đông Hải 1 đoạn xuống dốc do khúc cua gấp, đường trơn và trượt, khuất tầm nhìn nên thường xảy ra tai nạn giao thông, đề nghị cơ quan chức năng giả quyết.
     </Typography>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      Cầu Vượt Đông Hải 1 đoạn xuống dốc do khúc cua gấp, đường trơn và trượt, khuất tầm nhìn nên thường xảy ra tai nạn giao thông, đề nghị cơ quan chức năng giả quyết.
     </Typography>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      Ảnh/video:
     </Typography>
     <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>
      {itemData.map((item) => (
       <ImageListItem key={item.img}>
        <img srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} src={`${item.img}?w=164&h=164&fit=crop&auto=format`} alt={item.title} loading='lazy' />
       </ImageListItem>
      ))}
     </ImageList>
    </Box>
   </Box>
  </Box>
 )
}
