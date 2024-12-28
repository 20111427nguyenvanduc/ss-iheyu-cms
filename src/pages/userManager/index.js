/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { styled, useTheme } from "@mui/material/styles"
import history from "../../core/history"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import { Avatar, Box, Button, Chip, FormControlLabel, IconButton, Paper, Tooltip, Breadcrumbs, Typography, Stack } from "@mui/material"
import Link from "../../components/Link"
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable"
import SearchHeader from "../../ui-component/search/SearchHeader"
import { list } from "../../services/user"
import AlertDialogDelete from "../../ui-component/dialog/AlertDialog"

const StyledBox = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const StyledButton = styled(Button)(({ theme }) => ({
 padding: "16px 32px",
 borderRadius: "16px",
}))

const Manage = () => {
 const { pathname } = history.location
 const dispatch = useDispatch()
 const { user, configs } = useSelector((state) => state)
 const { region, regions } = configs
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

 useEffect(() => {
  getList()
 }, [])

 const getList = () => {
  list({
   textSearch,
   ...filter,
  }).then((res) => {
   if (_.get(res, "code") === 200) {
    setListData(_.get(res, "data"))
   }
  })
 }

 return (
  <Fragment>
   <Box sx={{ background: "#EEF2F6", py: 1.5, px: 2 }}>
    <Breadcrumbs separator={<i className='icon-linear-arrow-right-1' />} aria-label='breadcrumb'>
     <Link underline='hover' key='1' color='#2E3236' to='/'>
      Trang quản trị
     </Link>
     <Typography key='2' sx={{ color: "#007CFE" }}>
      Quản lý tài khoản
     </Typography>
    </Breadcrumbs>
   </Box>
   <Box sx={{ py: 1.5, px: 2, mt: 2 }}>
    <Stack direction='row' spacing={2} sx={{ justifyContent: "flex-start", alignItems: "center" }}>
     <Typography variant='h5' sx={{ fontSize: "22px", color: "#2E3236", fontWeight: 700 }}>
      Quản lý tài khoản
     </Typography>
     <Link to='/user-manager/add-new-user'>
      <StyledButton variant='contained' color='info' disableElevation>
       Thêm mới
      </StyledButton>
     </Link>
    </Stack>
   </Box>
   <Box sx={{ p: 2 }}>
    <SearchHeader
     textSearch={textSearch}
     searchChange={(text) => setTextSearch(text)}
     onSubmit={() => {
      getList()
     }}
     page={filter.page}
     limit={filter.limit}
     count={listData.length}
     onPageChange={(newPage) => setFilter({ page: newPage })}
     onLimitChange={(newLimit) => setFilter({ page: 0, limit: newLimit })}
    >
     <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center", margin: "0 24px" }}></Box>
    </SearchHeader>
   </Box>
   <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: 1, justifyContent: "center", alignItems: "center" }}>
    <DataTable
     heads={["STT", "Họ tên","SĐT", "Chức vụ", "Phòng ban", "Đơn vị", "Tài khoản", "Thao tác"].map((head, i) =>
      createCell(head, { sx: { width: i == 0 ? "5%" : i == 5 ? "10%" : i == 6 ? "10%" : "auto", textAlign: "center" } }),
     )}
     rows={listData.map((item, i) => {
      return createRows([
       <StyledBox>{filter.page * filter.limit + i + 1}</StyledBox>,
       <StyledBox sx={{ justifyContent: "start", flexDirection: "row" }}>
        <Avatar src={_.get(item, "avatar", item.name)} />
        <Typography>{item.name}</Typography>
       </StyledBox>,
       <StyledBox>{item.phone}</StyledBox>,
       <StyledBox>{_.get(item, "unit.name")}</StyledBox>,
       <StyledBox>{_.get(item, "role.name")}</StyledBox>,
       <StyledBox>{_.get(item, "role.name")}</StyledBox>,
       <StyledBox>{_.get(item, "username")}</StyledBox>,
       <StyledBox>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
         <Link to={`${pathname}/${item._id}`}>
          <Tooltip title='Chỉnh sửa' placement='top'>
           <Avatar sx={{ bgcolor: "#DCF1FF", cursor: "pointer" }}>
            <i className='icon-linear-edit-2' style={{ color: "#1589D8" }} />
           </Avatar>
          </Tooltip>
         </Link>
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
