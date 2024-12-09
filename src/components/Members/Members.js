/* jslint es6 */
import React, { useEffect, useState, Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_REGION } from "../../store/actions"
import { styled, useTheme } from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import CONSTANT from "../../const"
import { Avatar, Box, Button, Chip, IconButton, Paper, Typography } from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import ClearIcon from "@mui/icons-material/Clear"
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn"
import HeaderTitle from "../Header/HeaderTitle"
import SearchHeader from "../../ui-component/search/SearchHeader"
import DataTable, { createCell, createRows } from "../../ui-component/table/DataTable"
import BlockModal from "./BlockModal"
import AuthenticationCaregiver from "./AuthenticationCaregiver"
import { list, openTraining, unblockMember } from "../../services/member"
import Confirm from "../../ui-component/modal/Alert"
import { moneyFomat } from "../../helpers"

const StyledBox = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
 flexDirection: "column",
 alignItems: "center",
 justifyContent: "center",
}))

const StyledStatus = styled(Typography)(({ theme }) => ({
 fontWeight: "bold",
}))

export const typeTrans = (type) => {
 switch (type) {
  case CONSTANT.MEMBER_TYPE.SHIPPER:
   return "Tài xế"
   break
  case CONSTANT.MEMBER_TYPE.ADMIN:
   return "Admin"
   break
  case CONSTANT.MEMBER_TYPE.CUSTOMER:
   return "Khách hàng"
   break
  case CONSTANT.MEMBER_TYPE.TICKBOX:
   return "Tickbox"
   break
  case CONSTANT.MEMBER_TYPE.CAREGIVER:
   return "Chăm sóc viên"
   break
  default:
   return type
   break
 }
 return type
}

const Members = () => {
 const { user, configs } = useSelector((state) => state)
 const { region, regions } = configs
 const [members, setMembers] = useState([])
 const [textSearch, setTextSearch] = useState("")
 const [isFilter, setIsFilter] = useState(false)
 const [filter, updatedFilter] = useState({
  page: 0,
  limit: 20,
  type: "",
  region: region,
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

 const onClickFilterBtn = () => {
  setIsFilter(!isFilter)
 }

 useEffect(() => {
  getList()
 }, [filter])

 const getList = () => {
  list({
   ...filter,
   textSearch,
  }).then((response) => {
   setMembers(_.get(response, "data", []))
  })
 }

 return (
  <Fragment>
   <HeaderTitle title='Quản lý thành viên' />
   <Box sx={{ p: 1 }}>
    <SearchHeader
     textSearch={textSearch}
     searchChange={(text) => setTextSearch(text)}
     onSubmit={() => getList()}
     page={filter.page}
     limit={filter.limit}
     count={members.length}
     onPageChange={(newPage) => setFilter({ page: newPage })}
     onLimitChange={(newLimit) => setFilter({ page: 0, limit: newLimit })}
    >
     <Button type='button' variant='contained' onClick={onClickFilterBtn}>
      {isFilter ? <ClearIcon /> : <FilterListIcon />}Lọc
     </Button>
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
         {user.workingRegion
          ? user.workingRegion.map((regionCode) => (
             <Button key={regionCode} size='small' variant={regionCode === filter.region ? "contained" : "outlined"} onClick={() => setFilter({ region: regionCode })}>
              {regions[regionCode]}
             </Button>
            ))
          : null}
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
         <Typography>Loại tài khoản:</Typography>
         <Button size='small' variant={"" === filter.type ? "contained" : "outlined"} onClick={() => setFilter({ type: "" })}>
          Tất cả
         </Button>
         {[CONSTANT.MEMBER_TYPE.CUSTOMER, CONSTANT.MEMBER_TYPE.CAREGIVER].map((type) => (
          <Button key={type} size='small' variant={type === filter.type ? "contained" : "outlined"} onClick={() => setFilter({ type })}>
           {typeTrans(type)}
          </Button>
         ))}
        </Box>
       </Box>
      </Paper>
     </Box>
    ) : null}
    {members.map((member, i) => (
     <MemberTable key={member._id} member={member} getList={getList} />
    ))}
   </Box>
  </Fragment>
 )
}

const MemberTable = ({ member, getList }) => {
 const [open, setOpen] = useState(false)

 const btnOpenTraining = () => {
  openTraining({ id: member }).then((res) => {
   getList()
  })
 }
 const isAuthen = _.get(member, "staff.isAuthen") === 1
 const isOpenTraining = _.get(member, "openTraining") === 1
 const isBlocked = _.get(member, "blockUtil") > Date.now()
 const isBlockedOrder = _.get(member, "blockOrderUtil") > Date.now()
 const blockUtil = moment(_.get(member, "blockUtil")).format("HH:mm DD/MM/YYYY")
 const blockOrderUtil = moment(_.get(member, "blockOrderUtil")).format("HH:mm DD/MM/YYYY")
 const createdAt = moment(_.get(member, "createdAt")).format("HH:mm DD/MM/YYYY")
 const unblockBtn = (blockType) => {
  unblockMember({
   blockType,
   member: member._id,
  }).then((response) => {
   getList()
  })
 }
 return (
  <Box sx={{ mt: 1 }}>
   <DataTable
    tableContainerProps={{ sx: { boxShadow: "none" } }}
    heads={["Ảnh", "Tên thành viên", "SĐT", "Loại TK", "Tài khoản", "Trạng thái", "Tham gia", "Thao tác"].map((head) => createCell(head))}
    rows={[
     createRows([
      <StyledBox>
       <Avatar src={_.get(member, "facebook.picture")} alt={_.get(member, "facebook.name")} />
      </StyledBox>,
      <StyledBox>
       <Box>{_.get(member, "facebook.name")}</Box>
       <Box>{_.get(member, "code")}</Box>
      </StyledBox>,
      <StyledBox>{_.get(member, "phone")}</StyledBox>,
      <StyledBox>
       {typeTrans(_.get(member, "type"))}
       {isAuthen ? (
        <Chip
         size='small'
         sx={{
          backgroundColor: "rgba(4, 177, 141, 0.1)",
          color: "rgba(4, 177, 141, 1)",
         }}
         label='CSV HeyCare'
        />
       ) : null}
      </StyledBox>,
      <StyledBox>
       <Typography>SSM: {moneyFomat(_.get(member, "realMoneyStaff", 0))}</Typography>
       <Typography>Coints: {moneyFomat(_.get(member, "cointsStaff", 0))}</Typography>
      </StyledBox>,
      <StyledBox>
       {!isBlocked ? (
        <Fragment>
         <StyledStatus sx={{ color: "green" }}>Hoạt động</StyledStatus>
         {isBlockedOrder ? (
          <Confirm onConfirm={() => unblockBtn("blockOrderUtil")} body='Xác nhận mở chặn nhận đơn' confirmText='Đồng ý' cancelText='Không' title='Xác nhận chuyển trạng thái tài khoản'>
           <StyledStatus sx={{ fontSize: "11px", fontStyle: "italic", color: "#1589D8" }}>Chặn đến {blockOrderUtil} </StyledStatus>
          </Confirm>
         ) : null}
        </Fragment>
       ) : (
        <Fragment>
         <StyledStatus sx={{ color: "red" }}>{blockUtil}</StyledStatus>
        </Fragment>
       )}
      </StyledBox>,
      <StyledBox>{createdAt}</StyledBox>,
      <StyledBox>
       {!isBlocked ? (
        <Button color='error' size='small' variant='contained' onClick={() => setOpen(true)}>
         Khóa
        </Button>
       ) : (
        <Confirm onConfirm={() => unblockBtn("blockUtil")} body='Xác nhận mở khóa' confirmText='Đồng ý' cancelText='Không' title='Xác nhận chuyển trạng thái tài khoản'>
         <Button color='success' size='small' variant='contained'>
          Mở khóa
         </Button>
        </Confirm>
       )}

       {!isOpenTraining && !isAuthen ? (
        <Button size='small' onClick={btnOpenTraining}>
         Mở đào tạo
        </Button>
       ) : !isAuthen ? (
        <AuthenticationCaregiver member={member} onClose={getList}>
         <Button size='small'>Đăng ký CSV</Button>
        </AuthenticationCaregiver>
       ) : null}
      </StyledBox>,
     ]),
    ]}
   />
   <BlockModal
    open={open}
    member={member}
    onClose={() => {
     setOpen(false)
     getList()
    }}
    type={"member"}
   />
  </Box>
 )
}

export default Members
