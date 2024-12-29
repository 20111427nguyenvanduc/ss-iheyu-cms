/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _, {map} from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Breadcrumbs, Typography, Stack, Switch, Grid} from "@mui/material"
import Link from "../../components/Link/Link"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import AddEdit from "../../components/Category/AddEdit"
import {list, inactive as inactive} from "../../services/category"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"
import Search from "../../components/Shared/Search"

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

 useEffect(() => {
  getList()
 }, [])

 const getList = () => {
  setLoading(true)
  list({name: textSearch}).then((res) => {
   if (_.get(res, "code") === 200) {
    setListData(_.get(res, "data"))
   }
   setLoading(false)
  })
 }

 const handleDelete = (_id) => {
  try {
   inactivePermission({_id}).then((res) => {
    if (_.get(res, "code") === 200) {
     toastr.success("Xóa quyền thành công!")
    }
   })
  } catch (error) {
   toastr.error("Lỗi hệ thống. Vui lòng thử lại sau.")
  }
 }
 return (
  <Fragment>
   <Box sx={{background: "#EEF2F6", py: 1.5, px: 2}}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Phản ánh kiến nghị
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      Danh mục phản ánh{" "}
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
     <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
      <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
       Danh mục phản ánh{" "}
      </Typography>
      <AddEdit onClose={getList} />
     </Stack>
    </Stack>
   </Box>
   <Box p={2}>
    <Box sx={{border: "1px solid #A1A7AE", borderRadius: "16px"}} p={2}>
     <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6].map((item, i) => {
       {
        return (
         <Grid item sm={6}>
          <Stack direction='row' spacing={2} sx={{justifyContent: "space-between", alignItems: "center", border: "1px solid #CCCFD3", padding: "8px 12px", borderRadius: "16px"}}>
           <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
            <img src='/images/icon-cate.png' style={{width: "20px"}} />
            <Typography variant='p' sx={{fontSize: "20px", color: "#2E3236", fontWeight: 600}}>
             An ninh trật tự
            </Typography>
           </Stack>

           <Stack direction='row' spacing={2} sx={{justifyContent: "flex-end", alignItems: "center"}}>
            <Typography variant='p' sx={{fontSize: "14px", color: "#00BF30", fontWeight: 500}}>
             Đang hoạt động
            </Typography>
            <Switch defaultChecked/>
            <AddEdit onClose={getList}>
             <Avatar sx={{bgcolor: "#DCF1FF", cursor: "pointer"}}>
              <i className='icon-linear-edit-2' style={{color: "#1589D8"}} />
             </Avatar>
            </AddEdit>
           </Stack>
          </Stack>
         </Grid>
        )
       }
      })}
     </Grid>
    </Box>
   </Box>
  </Fragment>
 )
}

export default Manage
