/*jslint es6 */
import React, { useState, useEffect, Fragment } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import moment from "moment"
import _ from "lodash"
import axios from "../../services/axios"
import Confirm from "../../ui-component/modal/Alert"
import Loading from "../others/loading-image"
import toastr from "toastr"
import UserInf from "./UserInf"
import CONSTANT from "../../const"
import { AppBar, Button, Box, Divider, Paper, Typography } from "@mui/material"
import SearchHeader from "../../ui-component/search/SearchHeader"
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable"
import HeaderTitle from "../Header/HeaderTitle"
import FilterListIcon from "@mui/icons-material/FilterList"
import ClearIcon from "@mui/icons-material/Clear"
import { list, update } from "../../services/user"
const UserManager = () => {
 const { user, configs } = useSelector((state) => state)
 const { region, regions } = configs
 const [users, setUsers] = useState([])
 const [textSearch, setTextSearch] = useState("")
 const [isFilter, setIsFilter] = useState(false)
 const [filter, updatedFilter] = useState({
  page: 0,
  limit: 20,
  region: region,
  active: "",
 })
 const setFilter = (newState, cb) => {
  updatedFilter(
   (oldState) => ({
    ...oldState,
    ...newState,
   }),
   cb,
  )
 }

 const getListUser = () => {
  list({
   ...filter,
   textSearch,
  }).then((response) => {
   setUsers(_.get(response, "data"))
  })
 }

 useEffect(() => {
  getListUser()
 }, [filter])

 const switchActive = (userInf) => {
  update({ id: userInf._id, data: { active: userInf.active ? 0 : 1 } }).then((response) => {
   if (_.get(response, "code") === 200) {
    getListUser()
   }
  })
 }

 return (
  <Fragment>
   <HeaderTitle title='Quản lý tài khoản' />
   <Box p={2}>
    <SearchHeader
     count={users.length}
     textSearch={textSearch}
     searchChange={(text) => setTextSearch(text)}
     onSubmit={getListUser}
     page={filter.page}
     limit={filter.limit}
     onPageChange={(newPage) => setFilter({ page: newPage }, () => {})}
     onLimitChange={(newLimit) => setFilter({ page: 0, limit: newLimit }, () => {})}
     wrapChildrenProps={{ gap: 1 }}
    >
     <Button type='button' variant='contained' onClick={() => setIsFilter(!isFilter)}>
      {isFilter ? <ClearIcon /> : <FilterListIcon />}Lọc
     </Button>
     <UserInf regions={regions} onClose={getListUser}>
      <Button variant='contained'>Thêm mới</Button>
     </UserInf>
    </SearchHeader>
    {isFilter ? (
     <Box>
      <Paper sx={{ borderRadius: 2 }}>
       <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
         <Typography>Khu vực:</Typography>
         <Button size='small' variant={"" === filter.region ? "contained" : "outlined"} onClick={() => setFilter({ region: "" })}>
          Tất cả
         </Button>
         {_.get(user, 'workingRegion')
          ? user.workingRegion.map((regionCode) => (
             <Button key={regionCode} size='small' variant={regionCode === filter.region ? "contained" : "outlined"} onClick={() => setFilter({ region: regionCode })}>
              {regions[regionCode]}
             </Button>
            ))
          : null}
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
         <Typography>Trạng thái:</Typography>
         <Button size='small' variant={"" === filter.active ? "contained" : "outlined"} onClick={() => setFilter({ active: "" })}>
          Tất cả
         </Button>
         <Button size='small' variant={1 === filter.active ? "contained" : "outlined"} onClick={() => setFilter({ active: 1 })}>
          Hoạt động
         </Button>
         <Button size='small' variant={0 === filter.active ? "contained" : "outlined"} onClick={() => setFilter({ active: 0 })}>
          Ngừng hoạt động
         </Button>
        </Box>
       </Box>
      </Paper>
     </Box>
    ) : null}
    <Box mt={1}>
     <DataTable
      tableContainerProps={{ sx: { boxShadow: "none" } }}
      heads={["Họ Tên", "Email", "TĐV", "Tỉnh", "Trạng thái", "Thao tác"].map((head, i) =>
       createCell(head, {
        align: "center",
        width: i < 4 ? "15%" : "",
       }),
      )}
      rows={users.map((user, i) => {
       return createRows([
        <Box>{Object.values(_.get(user, "name", {})).join(" ")}</Box>,
        <Box>{_.get(user, "email")}</Box>,
        <Box>{_.get(user, "code")}</Box>,
        <Box>{regions[_.get(user, "region")]}</Box>,
        <Box>
         <Confirm
          onConfirm={() => switchActive(user)}
          body={user.active === 1 ? `Xác nhận vô hiệu hóa tài khoản ${_.get(user, "email")}?` : `Xác nhận mở tài khoản ${_.get(user, "email")}?`}
          confirmText='Đồng ý'
          cancelText='Không'
          title='Xác nhận chuyển trạng thái tài khoản'
         >
          <a> {_.get(user, "active") === 1 ? <span style={{ color: "green" }}>Hoạt động</span> : <span style={{ color: "red" }}>Ngừng hoạt động</span>}</a>
         </Confirm>
        </Box>,
        <Box
         style={{
          display: "flex",
          justifyContent: "space-around",
         }}
        >
         <UserInf id={user._id} regions={regions} onClose={getListUser}>
          <Button variant='contained'>
           <i className='fa fa-pencil m-r-xs'></i>Sửa
          </Button>
         </UserInf>
        </Box>,
       ])
      })}
     />
    </Box>
   </Box>
  </Fragment>
 )
}

export default UserManager
