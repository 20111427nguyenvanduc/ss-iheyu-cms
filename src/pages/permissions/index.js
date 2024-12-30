/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Breadcrumbs, Typography, Stack} from "@mui/material"
import Link from "../../components/Link"
import DataTable, {createCell, createRows} from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import AddGroup from "../../components/Permissions/AddEditPermission"
import {list, inactive as inactivePermission} from "../../services/permission"
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
      Trang quản trị
     </Link>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Quản lý quyền hạn
     </Link>
     <Typography key='2' sx={{color: "#007CFE"}}>
      Mô tả quyền hạn
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={6} sx={{justifyContent: "space-between", alignItems: "center"}}>
     <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
      <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
       Mô tả quyền hạn{" "}
      </Typography>
      <AddGroup onClose={getList} />
     </Stack>
     <Search
      placeholder={"Tìm kiếm quyền hệ thống"}
      textSearch={textSearch}
      searchChange={(text) => setTextSearch(text)}
      onSubmit={() => {
       getList()
      }}
     />
    </Stack>
   </Box>
   <Box sx={{px: 2, display: "flex", flexDirection: "column", gap: 1, justifyContent: "center", alignItems: "center"}} mt={2}>
    <DataTable
     heads={["STT", "Tên quyền hạn", "Danh mục quyền", "Mô tả", "Ngày tạo", "Trạng thái", "Thao tác"].map((head, i) =>
      createCell(head, {sx: {width: i == 0 ? "5%" : i == 4 ? "10%" : i == 5 ? "10%" : "auto", textAlign: "center"}}),
     )}
     rows={listData.map((item, i) => {
      return createRows([
       <StyledBox>
        <Box>{i + 1}</Box>
       </StyledBox>,
       <StyledBox>
        <Box>{item.name}</Box>
       </StyledBox>,
       <StyledBox>
        <Box>{_.get(item,'categoryPermission.name')}</Box>
       </StyledBox>,
       <StyledBox>
        <Box>{item.description}</Box>
       </StyledBox>,
       <StyledBox>
        <Box>{moment(_.get(item, "updatedAt")).format("DD/MM/YYYY HH:mm")}</Box>
       </StyledBox>,
       <StyledBox>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: "12px"}}>
         <span style={{width: "6px", height: "6px", borderRadius: "50%", background: "#00BF30", display: "flex"}}></span>
         <Typography variant='p' sx={{fontSize: "16px", color: "#00BF30", fontWeight: 400}}>
          {item.status ? "Đang hoạt động" : "Đã tắt"}
         </Typography>
        </Box>
       </StyledBox>,
       <StyledBox>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
         <AddGroup onClose={getList} detail={item}>
          <Tooltip title='Chỉnh sửa' placement='top'>
           <Avatar sx={{bgcolor: "#DCF1FF", cursor: "pointer"}}>
            <i className='icon-linear-edit-2' style={{color: "#1589D8"}} />
           </Avatar>
          </Tooltip>
         </AddGroup>
        </Box>
       </StyledBox>,
      ])
     })}
    />
   </Box>
  </Fragment>
 )
}

export default Manage
