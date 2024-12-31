/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _, {map} from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Breadcrumbs, Typography, Stack, Switch, Grid, Divider} from "@mui/material"
import Link from "../../components/Link/Link"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import AddEdit from "../../components/Category/AddEdit"
import {list, inactive as inactive} from "../../services/category"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import Search from "../../components/Shared/Search"
import ItemList from "../../components/Petition/ItemList"
import Detail from "../../components/Petition/Detail"
import Timeline from "../../components/Petition/TimeLine"

const StyledBox = styled(Box)(({theme}) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const Manage = () => {
 const dispatch = useDispatch()
 const {user, configs} = useSelector((state) => state)
 const {region, regions} = configs
 const [textSearch, setTextSearch] = useState("")
 const [status, setStatus] = useState("")

 const listStatus = [
  {name: "Tất cả", icon: "", value: "", total: ""},
  {name: "Chờ xử lý", icon: "icon-bold-clock", value: 1, total: 10},
  {name: "Đang xử lý", icon: "icon-bold-clock", value: 2, total: 10},
  {name: "Sắp đến hạn", icon: "icon-bold-clock", value: 3, total: 10},
  {name: "Chờ bổ sung thông tin", icon: "icon-bold-clock", value: 4, total: 10},
  {name: "Chờ phê duyệt", icon: "icon-bold-clock", value: 5, total: 10},
  {name: "Đã xử lý", icon: "icon-bold-verify", value: 6, total: 10},
  {name: "Phản ánh trùng", icon: "icon-bold-verify", value: 6, total: 10},
  {name: "Từ chối tiếp nhận", icon: "icon-bold-verify", value: 6, total: 10},
 ]

 useEffect(() => {}, [])

 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Phản ánh kiến nghị
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      Danh sách công việc
     </Typography>
    </Breadcrumbs>
   </Box>

   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
     <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
      <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
       Danh sách phản ánh{" "}
      </Typography>
     </Stack>
     <Search
      placeholder={"Tìm kiếm phản ánh"}
      textSearch={textSearch}
      searchChange={(text) => setTextSearch(text)}
      onSubmit={() => {
       getList()
      }}
     />
    </Stack>
   </Box>
   <Box p={2}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     <Box sx={{width: "85px"}}>
      <Typography variant='p' sx={{fontSize: "16px", color: "#010810", fontWeight: 500, width: "85px"}}>
       Trạng thái
      </Typography>
     </Box>
     <Box
      sx={{
       display: "flex",
       overflowX: "auto",
       width: "100%",
       gap: "16px",
       padding: "8px 0",
       "&::-webkit-scrollbar": {
        height: "6px",
       },
       "&::-webkit-scrollbar-thumb": {
        background: "#CCCFD3",
        borderRadius: "4px",
       },
       "&::-webkit-scrollbar-track": {
        background: "transparent",
       },
      }}
     >
      {listStatus.map((item, i) => {
       return (
        <Box
         key={i}
         sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: item.value === status ? "#E5F1FF" : "#FFF",
          padding: "8px 16px",
          border: item.value === status ? "1px solid #007CFE " : "1px solid  #CCCFD3",
          borderRadius: "100px",
          gap: 1,
          cursor: "pointer",
          flexShrink: 0, // Ngăn các phần tử co lại
         }}
         onClick={() => setStatus(item.value)}
        >
         {item.icon ? <i className={item.icon} style={{color: item.value === status ? "#007CFE" : "#4A4F55"}} /> : null}
         <Typography
          variant='p'
          sx={{
           fontSize: "14px",
           color: item.value === status ? "#007CFE" : "#4A4F55",
           fontWeight: item.value === status ? 600 : 400,
          }}
         >
          {item.name}
         </Typography>
         {item.total ? (
          <Typography
           variant='p'
           sx={{
            fontSize: "14px",
            borderRadius: "4px",
            padding: "0 4px",
            color: "#007CFE",
            background: "#E5F1FF",
            fontWeight: 400,
           }}
          >
           {item.total}
          </Typography>
         ) : null}
        </Box>
       )
      })}
     </Box>
    </Stack>
    <Divider sx={{borderColor: "#CCCFD3", margin: "16px 0", height: "2px"}} />
   </Box>

   <Box sx={{px: 2, display: "flex", justifyContent: "space-between", alignItems: "start", gap: 2}}>
    <Box sx={{background: "#F6F5FC", border: "1px solid #CCCFD3", borderRadius: "8px", width: "35%", display: "flex", height: "600px", overflowY: "auto"}} flexDirection={"column"} gap={2}>
     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
      <ItemList index={i} />
     ))}
    </Box>
    <Box sx={{background: "#FFF", border: "1px solid #007CFE", borderRadius: "8px", width: "64%", display: "flex", justifyContent: "space-between", alignItems: "start"}}>
     <Box sx={{width: "70%", borderRight: "1px solid #CCCFD3"}}>
      <Detail />
     </Box>
     <Box sx={{width: "30%"}}>
      <Timeline />
     </Box>
    </Box>
   </Box>
  </Fragment>
 )
}

export default Manage
