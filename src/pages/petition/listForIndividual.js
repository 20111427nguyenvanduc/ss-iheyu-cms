/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _, {map} from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Breadcrumbs, Typography, Stack, Switch, Grid, Divider, AppBar, Toolbar} from "@mui/material"
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
import Pagination from "@mui/material/Pagination"
import Reject from "../../components/Petition/Reject"
import EditResult from "../../components/Petition/EditResult"
import DrawerSearch from "../../components/Petition/DrawerSearch"

import {listForIndividual} from "../../services/petition"

const StyledBox = styled(Box)(({theme}) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const ListForIndividual = () => {
 const dispatch = useDispatch()
 const {user, configs} = useSelector((state) => state)
 const {region, regions} = configs
 const [textSearch, setTextSearch] = useState("")
 const [tab, setTab] = useState("")

 const [filter, updatedFilter] = useState({
  page: 0,
  limit: 10,
  active: "",
  isFilter: false,
  unit: "",
  position: "",
  sort: 1,
  gender: "",
 })
 const setFilter = (newState) => {
  updatedFilter((oldState) => ({...oldState, ...newState}))
 }

 const [dataListForUnit, setDataListForUnit] = useState([])
 const [dataSelected, setDataSelected] = useState(null)

 useEffect(() => {
  getList()
 }, [])

 const getList = () => {
  listForIndividual({
   tab,
   limit: 10,
   sort: -1,
   page: 0,
  }).then((res) => {
   if (_.get(res, "code") === 200) {
    let data = _.get(res, "data", [])
    setDataListForUnit(data)
    if (data.length) setDataSelected(data[0])
   }
  })
 }

 const listStatus = [
  {name: "Tất cả", icon: "", value: "", total: ""},
  {name: "Chờ xử lý", icon: "icon-bold-clock", value: 0, total: 10},
  {name: "Đang xử lý", icon: "icon-bold-clock", value: 1, total: 10},
  {name: "Sắp/đã hết hạn", icon: "icon-bold-clock", value: 2, total: 10},
  {name: "Chờ duyệt kết quả", icon: "icon-bold-clock", value: 3, total: 10},
  {name: "Đã xử lý", icon: "icon-bold-verify", value: 4, total: 10},
 ]

 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Phản ánh kiến nghị
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      Xử lý phản ánh
     </Typography>
    </Breadcrumbs>
   </Box>

   <Box sx={{px: 2, mt: 1}}>
    <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
     <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
      <Search
       placeholder={"Tìm kiếm phản ánh"}
       textSearch={textSearch}
       searchChange={(text) => setTextSearch(text)}
       onSubmit={() => {
        getList()
       }}
      />
      <DrawerSearch filter={filter} setFilter={setFilter} />
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
            background: item.value === tab ? "#E5F1FF" : "#FFF",
            padding: "8px 16px",
            border: item.value === tab ? "1px solid #007CFE " : "1px solid  #CCCFD3",
            borderRadius: "100px",
            gap: 1,
            cursor: "pointer",
            flexShrink: 0, // Ngăn các phần tử co lại
            position: "relative", // Đặt relative để chấm đỏ được định vị dựa trên Box này
           }}
           onClick={() => setTab(item.value)}
          >
           {i === 3 ? (
            <Box
             sx={{
              position: "absolute",
              top: "5px", // Đặt chấm đỏ ở góc trên
              right: "5px", // Đặt chấm đỏ ở góc phải
              transform: "translate(50%, -50%)", // Căn chỉnh chấm đỏ ra ngoài một chút
              width: "16px",
              height: "16px",
              backgroundColor: "#D30500",
              borderRadius: "50%", // Tạo hình tròn
             }}
            ></Box>
           ) : null}

           {item.icon ? (
            <i
             className={item.icon}
             style={{
              color: item.value === tab ? "#007CFE" : "#4A4F55",
             }}
            />
           ) : null}
           <Typography
            variant='p'
            sx={{
             fontSize: "14px",
             color: item.value === tab ? "#007CFE" : "#4A4F55",
             fontWeight: item.value === tab ? 600 : 400,
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
     </Stack>
    </Stack>
   </Box>
   <Divider sx={{borderColor: "#CCCFD3", margin: "16px 0", height: "2px"}} />

   <Box sx={{px: 2, display: "flex", justifyContent: "space-between", alignItems: "start", gap: 2}}>
    <Box sx={{background: "#F6F5FC", border: "1px solid #CCCFD3", borderRadius: "8px", width: "35%", display: "flex", height: "600px", overflowY: "auto"}} flexDirection={"column"} gap={2}>
     {dataListForUnit.map((item, i) => (
      <ItemList
       dataSelected={dataSelected}
       data={item}
       onSelectItem={() => {
        setDataSelected(item)
       }}
      />
     ))}
    </Box>
    <Box
     sx={{
      background: "#FFF",
      border: "1px solid #007CFE",
      borderRadius: "8px",
      width: "64%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      height: "600px",
      overflowY: "auto",
     }}
    >
     <Box sx={{width: "70%", borderRight: "1px solid #CCCFD3"}}>{dataSelected ? <Detail dataSelected={dataSelected} /> : null}</Box>

     <Box sx={{width: "30%"}}>
      <Timeline />
     </Box>
    </Box>
   </Box>
   <AppBar position='sticky' color='primary' sx={{top: "auto", bottom: 0, boxShadow: "0px -5px 4px 0px #7E7E7E26", background: "#FFF"}}>
    <Box sx={{p: 2, display: "flex", justifyContent: "space-between", alignItems: "start", gap: 2}}>
     <Box sx={{width: "35%", textAlign: "center"}}>{/* <Pagination count={10} color='primary' /> */}</Box>

     <Box
      sx={{
       width: "64%",
       display: "flex",
       alignItems: "center",
       justifyContent: "end",
       gap: 2,
      }}
     >
      <Reject>
       <Button
        variant='contained'
        size='large'
        sx={{
         width: "180px",
         background: "#FFE2E2",
         textTransform: "inherit",
         color: "#D30500",
         "&:hover": {
          backgroundColor: "#FFE2E2",
          color: "#D30500",
         },
        }}
       >
        Từ chối phản ánh
       </Button>
      </Reject>

      <Button
       variant='contained'
       size='large'
       sx={{
        width: "180px",
        background: "#FFF",
        textTransform: "inherit",
        color: "#007CFE",
        border: "1px solid #007CFE",
        "&:hover": {
         backgroundColor: "#FFF",
         color: "#007CFE",
        },
       }}
      >
       Báo trùng
      </Button>
      <Button
       variant='contained'
       size='large'
       sx={{
        width: "180px",
        background: "#E5F1FF",
        textTransform: "inherit",
        color: "#007CFE",
        "&:hover": {
         backgroundColor: "#E5F1FF",
         color: "#007CFE",
        },
       }}
      >
       Phân phối xử lý
      </Button>
      <EditResult>
       <Button onClick={() => {}} variant='contained' size='large' sx={{width: "180px", background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}}>
        Tiếp nhận xử lý
       </Button>
      </EditResult>
     </Box>
    </Box>
   </AppBar>
  </Fragment>
 )
}

export default ListForIndividual
