/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Grid, Breadcrumbs, Typography, Stack} from "@mui/material"
import Link from "../../components/Link"
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
     <Link underline='hover' key='1' color='#2E3236' to='/unit'>
      Quản lý phòng ban
     </Link>
     {_.get(unitCurrent, "parent") ? (
      <Link underline='hover' key='1' color='#2E3236' to='/unit'>
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
      <Link underline='none' color='#2E3236' to='/unit'>
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
      <Box display={"flex"} justifyContent={"center"}>
       <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center", border: "1px solid #007CFE", width: "fit-content", padding: "12px 32px", borderRadius: "32px"}}>
        <Avatar alt='Remy Sharp' src={_.get(unitCurrent, "icon")} />
        <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
         {_.get(unitCurrent, "name")}
        </Typography>
       </Stack>
      </Box>
     </Grid>
     <Grid item sm={6}>
      <Box flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
       <Stack direction='row' spacing={2} sx={{justifyContent: "center", alignItems: "center", width: "500px", padding: "18px 32px", borderRadius: "32px", background: "#F6F5FC"}}>
        <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
         Sở ban ngành
        </Typography>
       </Stack>

       {listData.map((item, i) => {
        return (
         <Box onClick={() => setUnitCurrent(item)} sx={{justifyContent: "center", alignItems: "center", width: "500px", padding: "12px 32px", borderRadius: "32px", border: "1px solid #656C75"}}>
          <Stack direction='row' spacing={2} sx={{justifyContent: "space-between", alignItems: "center"}}>
           <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
            <Avatar alt='Remy Sharp' src={_.get(unitCurrent, "icon")} />
            <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
             {item.name}
            </Typography>
           </Stack>
           <i className='icon-linear-arrow-right' style={{color: "#007CFE", fontSize: "22px"}} />
          </Stack>
         </Box>
        )
       })}

       <Box p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <AddEditUnit onClose={getList} unitCurrent={unitCurrent} />
       </Box>
      </Box>
     </Grid>
     <Grid item sm={6}>
      <Box flexDirection={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
       <Stack direction='row' spacing={2} sx={{justifyContent: "center", alignItems: "center", width: "500px", padding: "18px 32px", borderRadius: "32px", background: "#F6F5FC"}}>
        <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
         Chức vụ
        </Typography>
       </Stack>

       {listDataPosition.map((item, i) => {
        return (
         <Link underline='hover' key='1' color='#2E3236' href={"/position/" + item._id}>
          <Box sx={{justifyContent: "center", alignItems: "center", width: "500px", padding: "12px 32px", borderRadius: "32px", border: "1px solid #656C75"}}>
           <Stack direction='row' spacing={2} sx={{justifyContent: "space-between", alignItems: "center"}}>
            <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
             <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
              {item.name}
             </Typography>
            </Stack>
            <i className='icon-linear-arrow-right' style={{color: "#007CFE", fontSize: "22px"}} />
           </Stack>
          </Box>
         </Link>
        )
       })}

       <Box p={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <AddEditPosition onClose={getListPosition} unitCurrent={unitCurrent} />
       </Box>
      </Box>
     </Grid>
    </Grid>
   </Box>
  </Fragment>
 )
}

export default Manage
