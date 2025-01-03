import * as React from "react"
import {Box, Typography} from "@mui/material"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import EditCategory from "./EditCategory"
import EditPriority from "./EditPriority"
import moment from "moment"
import {translateStatusJob} from "../../ultil"

export default function Info({data}) {
 return (
  <Box sx={{width: "100%", display: "flex"}} flexDirection={"column"} gap={1.5}>
   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Mã phản ánh:
    </Typography>
    <Typography variant='p' sx={{fontSize: "18px", color: "#007CFE", fontWeight: 600}}>
     {_.get(data, "code")}
    </Typography>

    {translateStatusJob(_.get(data, "statusJob"))}
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Lĩnh vực:
    </Typography>
    <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
     <img src={_.get(data, "category.icon")} style={{width: "20px"}} />
     <Typography variant='p' sx={{fontSize: "14px", color: "#2E3236", fontWeight: 400}}>
      {_.get(data, "category.name")}
     </Typography>
     <EditCategory categoryDetail={_.get(data, "category")}>
      <i className='icon-bold-edit-2' style={{color: "#007CFE", fontSize: "20px", cursor: "pointer"}} />
     </EditCategory>
    </Box>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Mức độ:
    </Typography>
    <Box sx={{justifyContent: "start", alignItems: "center", display: "flex", gap: 1}}>
     <img src={`/images/priority/priority-${_.get(data, "priority", 0)}.png`} style={{width: "16px"}} />
     <EditPriority priorityDetail={_.get(data, "priority", 0)}>
      <i className='icon-bold-edit-2' style={{color: "#007CFE", fontSize: "20px", cursor: "pointer"}} />
     </EditPriority>
    </Box>
   </Box>
   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Thời gian tạo: {moment(_.get(data, "updatedAt")).format("DD/MM/YYYY HH:mm")}
    </Typography>
   </Box>
   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Địa điểm: {_.get(data, "address")}
    </Typography>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "center", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
     Tiêu đề:
    </Typography>
    <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 600}}>
     {_.get(data, "title")}
    </Typography>
   </Box>

   <Box sx={{display: "flex", justifyContent: "start", alignItems: "start", gap: 2}}>
    <img src='/images/icon-arrow-right.png' style={{height: "11px"}} />
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "start", gap: 1}} flexDirection={"column"}>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      Nội dung
     </Typography>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      {_.get(data, "content")}{" "}
     </Typography>
     <Typography variant='p' sx={{fontSize: "16px", color: "#2E3236", fontWeight: 400}}>
      Ảnh/video:
     </Typography>
     <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>
      {_.get(data, "attachments", []).map((item) => (
       <ImageListItem key={item}>
        <img srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`} src={`${item}?w=164&h=164&fit=crop&auto=format`} loading='lazy' />
       </ImageListItem>
      ))}
     </ImageList>
    </Box>
   </Box>
  </Box>
 )
}
