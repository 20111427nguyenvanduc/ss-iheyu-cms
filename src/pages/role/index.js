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
import AddEdit from "../../components/Role/AddEdit"

import {list, inactive as inactiveRole} from "../../services/role"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"

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
  list({}).then((res) => {
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
     <Typography key='2' sx={{color: "#007CFE"}}>
      Quản vai trò
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{py: 1.5, px: 2, mt: 2}}>
    <Stack direction='row' spacing={2} sx={{justifyContent: "flex-start", alignItems: "center"}}>
     <Typography variant='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Quản vai trò
     </Typography>
     <AddEdit onClose={getList} />
    </Stack>
   </Box>
   <Box sx={{p: 2}}>
    <SearchHeader
     textSearch={textSearch}
     searchChange={(text) => setTextSearch(text)}
     onSubmit={() => {
      getList()
     }}
     page={filter.page}
     limit={filter.limit}
     count={listData.length}
     onPageChange={(newPage) => setFilter({page: newPage})}
     onLimitChange={(newLimit) => setFilter({page: 0, limit: newLimit})}
    >
     <Box sx={{display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", margin: "0 24px"}}></Box>
    </SearchHeader>
   </Box>
   <Box sx={{px: 2, display: "flex", flexDirection: "column", gap: 1, justifyContent: "center", alignItems: "center"}}>
    <DataTable
     
     heads={["STT", "Tên quyền", "Mô tả", "Nhóm quyền", "Cập nhật", "Thao tác"].map((head, i) =>
      createCell(head, {sx: {width: i == 0 ? "5%" : i == 5 ? "10%" : i == 6 ? "10%" : "auto", textAlign: "center"}}),
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
        <Box>{item.description}</Box>
       </StyledBox>,
       <StyledBox>
        <Box></Box>
       </StyledBox>,
       <StyledBox>
        <Box>{moment(_.get(item, "updatedAt")).format("DD/MM/YYYY HH:mm")}</Box>
       </StyledBox>,
       <StyledBox>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
         <AddEdit onClose={getList} detail={item}>
          <Tooltip title='Chỉnh sửa' placement='top'>
           <Avatar sx={{bgcolor: "#DCF1FF", cursor: "pointer"}}>
            <i className='icon-linear-edit-2' style={{color: "#1589D8"}} />
           </Avatar>
          </Tooltip>
         </AddEdit>
         <Tooltip title='Xóa' placement='top'>
          <AlertDialogDelete title='Thông báo' description={"Bạn muốn xóa quyền " + item.name + "?"} onClose={getList} onHandle={() => handleDelete(item._id)}>
           <Avatar sx={{bgcolor: "#FFE2E2", cursor: "pointer"}}>
            <i className='icon-bold-trash' style={{color: "#D30500"}} />
           </Avatar>
          </AlertDialogDelete>
         </Tooltip>
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
