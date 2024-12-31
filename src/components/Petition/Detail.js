import * as React from "react"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import {Box, Typography} from "@mui/material"
import Info from "./Info"

export default function Detail() {
 const [value, setValue] = React.useState("1")

 const handleChange = (event, newValue) => {
  setValue(newValue)
 }

 return (
  <Box sx={{width: "100%", typography: "body1"}}>
   <TabContext value={value}>
    <Box sx={{borderBottom: "1px solid #CCCFD3", paddingBottom: "8px"}}>
     <TabList
      onChange={handleChange}
      TabIndicatorProps={{
       style: {
        backgroundColor: "#007CFE", // Màu của indicator
        height: "2px", // Độ dày của indicator
       },
      }}
      sx={{
       "& .MuiTabs-flexContainer": {
        gap: "48px", // Khoảng cách giữa các tab
       },
       "& .MuiTab-root": {
        color: "#A1A7AE", // Màu không active
        fontWeight: 500,
        textTransform: "none",
        padding: "16px",
       },
       "& .Mui-selected": {
        color: "#007CFE", // Màu active
        fontWeight: 600,
       },
      }}
     >
      <Tab
       label={
        <Typography variant='p' sx={{fontSize: "16px", fontWeight: "inherit", textTransform: "none"}}>
         Thông tin phản ánh
        </Typography>
       }
       value='1'
      />
      <Tab
       label={
        <Typography variant='p' sx={{fontSize: "16px", fontWeight: "inherit", textTransform: "none"}}>
         Kết quả xử lý
        </Typography>
       }
       value='2'
      />
      <Tab
       label={
        <Typography variant='p' sx={{fontSize: "16px", fontWeight: "inherit", textTransform: "none"}}>
         Bình luận
        </Typography>
       }
       value='3'
      />
     </TabList>
    </Box>
    <TabPanel value='1' sx={{padding:'16px'}}>
     <Info />
    </TabPanel>
    <TabPanel value='2'>Kết quả xử lý</TabPanel>
    <TabPanel value='3'>Bình luận</TabPanel>
   </TabContext>
  </Box>
 )
}
