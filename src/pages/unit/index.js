/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Grid} from "@mui/material"
import {Breadcrumbs, Typography, Link, Stack} from "@mui/material"
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import AddEditUnit from "../../components/Unit/AddEditUnit"
import AddEditPosition from "../../components/Unit/AddEditPosition"
import {list, inactive as inactiveUnit} from "../../services/unit"
import {list as listPosition} from "../../services/position"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import {Height} from "@mui/icons-material"

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
 const setFilter = (newState) => {}
 const [filter, updatedFilter] = useState({
  page: 0,
  limit: 20,
  status: "",
  type: "",
  region: region,
  orderType: "",
  searchWithFilter: false,
  sortBy: "-updatedAt",
  filterTime24h: false,
 })
 const [listData, setListData] = useState([])
 const [textSearch, setTextSearch] = useState("")
 const [loading, setLoading] = useState(false)
 const [breadcrumbs, setBreadcrumbs] = useState([])

 const [unitCurrent, setUnitCurrent] = useState(null)

 const [listDataPosition, setListDataPosition] = useState([])

 useEffect(() => {
  getParentCurrent()
 }, [])

 useEffect(() => {
  if (unitCurrent) {
   getList()
   getListPosition()
  }
 }, [unitCurrent])

 const getParentCurrent = () => {
  list({}).then((res) => {
   if (_.get(res, "code") === 200) {
    let data = _.get(res, "data", [])
    if (data.length) {
     setUnitCurrent(data[0])
    }
   }
  })
 }

 const getList = () => {
  list({parent: _.get(unitCurrent, "_id")}).then((res) => {
   if (_.get(res, "code") === 200) {
    let data = _.get(res, "data", [])
    setListData(data)
   }
  })
 }

 const getListPosition = () => {
  listPosition({unit: _.get(unitCurrent, "_id")}).then((res) => {
   if (_.get(res, "code") === 200) {
    let data = _.get(res, "data", [])
    setListDataPosition(data)
   }
  })
 }

 const handleDelete = (_id) => {
  try {
   inactiveUnit({_id}).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Xóa đơn vị thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }

 const findNameByLevel = (array, level) => {
  const item = array.find((element) => element.level === level)
  return item ? item.name : null
 }

 const findNameByParent = (array, _id) => {
  const item = array.find((element) => element._id === _id)
  return item ? item.name : null
 }

 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' href='/unit'>
      Quản lý phòng ban
     </Link>
     {_.get(unitCurrent, "parent") ? (
      <Link underline='hover' key='1' color='#2E3236' href='/unit'>
       {_.get(unitCurrent, "parent.name")}
      </Link>
     ) : null}
     <Typography key='2' sx={{color: "#007CFE", fontWeight: 600}}>
      {_.get(unitCurrent, "name")}
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     {_.get(unitCurrent, "parent") ? (
      <Link underline='none' color='#2E3236' href='/unit'>
       <i className='icon-linear-arrow-left' style={{fontSize: "22px"}} />
      </Link>
     ) : null}
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      {_.get(unitCurrent, "name")}
     </Typography>
    </Stack>
   </Box>

   <Box sx={{flexGrow: 1}} p={2}>
    <Grid container spacing={2}>
     <Grid item sm={12}>
      <Box>
       <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center",border: "1px solid #007CFE", width: "fit-content", padding: "12px 32px", borderRadius: "32px"}}>
        <Avatar alt='Remy Sharp' src={_.get(unitCurrent, "icon")} />
        <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
         {_.get(unitCurrent, "name")}
        </Typography>
       </Stack>
      </Box>
     </Grid>
     <Grid item sm={6}>
      <Box></Box>
     </Grid>
     <Grid item sm={6}>
      <Box></Box>
     </Grid>
    </Grid>
   </Box>

   <Box sx={{flexGrow: 1}} p={2}>
    <Grid container spacing={2}>
     <Grid item sm={12}>
      <Box sx={{border: "1px solid #CCCFD3", borderRadius: "12px"}} display={"flex"} flexDirection='column' p={2}>
       <Stack direction='row' spacing={2} sx={{justifyContent: "space-between", alignItems: "center"}}>
        <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
         <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600, margin: "8px 0 16px"}}>
          Danh sách chức vụ
         </Typography>
         <AddEditPosition onClose={getListPosition} unitCurrent={unitCurrent} />
        </Stack>
       </Stack>

       <DataTable
        tableContainerProps={{sx: {borderRadius: "0"}}}
        heads={["STT", "Chức vụ", "Quyền", "Thao tác"].map((head, i) => createCell(head, {sx: {width: i == 1 ? "35%" : "auto", textAlign: "center"}}))}
        rows={listDataPosition.map((item, i) => {
         return createRows([
          <StyledBox>
           <Box>{i + 1}</Box>
          </StyledBox>,
          <Box px={2} sx={{color: "#010810", fontSize: "18px", fontWeight: 700}}>
           {item.name}
          </Box>,
          <Box flexDirection='column' sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
           <Box flexDirection='column' sx={{display: "flex", alignItems: "start", justifyContent: "center", gap: "8px"}}>
            {[1, 2].map((group, j) => {
             return (
              <Typography component='p' sx={{fontSize: "16px", color: "#010810"}}>
               {j + 1} {". "}Chỉnh sửa thao tác
              </Typography>
             )
            })}
           </Box>
           <Typography variant='p' sx={{fontSize: "14px", color: "#007CFE", fontWeight: 400}}>
            {"Chi tiết chức vụ >>>"}
           </Typography>
          </Box>,
          <StyledBox>
           <Link underline='hover' key='1' color='#2E3236' href={"/position/" + item._id}>
            <Avatar sx={{bgcolor: "#DCF1FF"}}>
             <i className='icon-linear-edit-2' style={{color: "#1589D8"}} />
            </Avatar>
           </Link>
          </StyledBox>,
         ])
        })}
       />

       {/* <Box flexDirection='column' p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <img src='/images/empty-role.png' style={{width: "128px"}} />

        <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 400, margin: "24px 0"}}>
         UBND Thành phố Hải Phòng chưa có chức vụ được thêm vào
        </Typography>
       </Box> */}
      </Box>
     </Grid>
     <Grid item sm={12}>
      <Box sx={{border: "1px solid #CCCFD3", borderRadius: "12px"}} display={"flex"} flexDirection='column' p={2}>
       <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600, margin: "8px 0 16px"}}>
        Danh sách đơn vị trực thuộc
       </Typography>
       <DataTable
        tableContainerProps={{sx: {borderRadius: "0"}}}
        heads={["Tên đơn vị", "Thao tác"].map((head, i) => createCell(head, {sx: {width: i == 1 ? "25%" : "auto", textAlign: "center"}}))}
        rows={listData.map((item, i) => {
         return createRows([
          <Box px={2} sx={{color: "#010810", fontSize: "18px", fontWeight: 600}}>
           {item.name}
          </Box>,
          <StyledBox>
           <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
            <Tooltip title='Xem chi tiết' placement='top'>
             <Avatar sx={{bgcolor: "#E5F1FF", cursor: "pointer"}} onClick={() => setUnitCurrent(item)}>
              <i className='icon-bold-eye' style={{color: "#1589D8"}} />
             </Avatar>
            </Tooltip>

            <AddEditUnit onClose={getList} unitCurrent={unitCurrent} detail={item}>
             <Tooltip title='Chỉnh sửa' placement='top'>
              <Avatar sx={{bgcolor: "#E5F1FF", cursor: "pointer"}}>
               <i className='icon-bold-edit-2' style={{color: "#1589D8"}} />
              </Avatar>
             </Tooltip>
            </AddEditUnit>
            <AlertDialogDelete title='Thông báo' description={"Bạn muốn xóa đơn vị " + item.name + "?"} onClose={getList} onHandle={() => handleDelete(item._id)}>
             <Tooltip title='Xóa' placement='top'>
              <Avatar sx={{bgcolor: "#F3F3F3", cursor: "pointer"}}>
               <i className='icon-bold-trash' style={{color: "#1C1E21"}} />
              </Avatar>
             </Tooltip>
            </AlertDialogDelete>
           </Box>
          </StyledBox>,
         ])
        })}
       />

       <Box p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <AddEditUnit onClose={getList} unitCurrent={unitCurrent} />
       </Box>
       {/* <Box flexDirection='column' p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <img src='/images/empty-unit.png' style={{width: "128px"}} />

        <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 400, margin: "24px 0"}}>
         UBND Thành phố Hải Phòng chưa có đơn vị trực thuộc
        </Typography>
       </Box> */}
      </Box>
     </Grid>
    </Grid>
   </Box>
   <Box sx={{px: 2, display: "flex", flexDirection: "column", gap: 1, justifyContent: "center", alignItems: "center"}}></Box>
  </Fragment>
 )
}

export default Manage
