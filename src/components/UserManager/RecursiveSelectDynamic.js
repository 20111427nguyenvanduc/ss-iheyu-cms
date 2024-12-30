import React, {useState, useEffect, Fragment} from "react"
import {Box, Typography, CircularProgress, Button, Grid, Avatar, TextField} from "@mui/material"
import {Autocomplete} from "@mui/material"
import {list as listUnit} from "../../services/unit"
import {list as listPosition} from "../../services/position"
import _ from "lodash"

const RecursiveSelectDynamic = ({unit, position, setUnit, setPosition, handleUpdatePermissionsAndGroups}) => {
 const [departments, setDepartments] = useState([]) // Danh sách các cấp
 const [selectedDepartments, setSelectedDepartments] = useState([]) // Lựa chọn hiện tại
 const [loading, setLoading] = useState(false) // Trạng thái tải dữ liệu
 const [listDataPosition, setListDataPosition] = useState([]) // Danh sách vị trí của phòng ban được chọn

 useEffect(() => {
  getParentCurrent()
 }, [])

 useEffect(() => {
  if (unit) {
   getListPosition(unit)
  } else {
   setListDataPosition([])
  }
 }, [unit])

 const getParentCurrent = () => {
  setLoading(true)
  listUnit({})
   .then((res) => {
    if (_.get(res, "code") === 200) {
     const data = _.get(res, "data", [])
     setDepartments([data]) // Khởi tạo danh sách cấp đầu tiên
    }
   })
   .catch((error) => {
    console.error("Lỗi khi tải danh sách cấp gốc:", error)
   })
   .finally(() => {
    setLoading(false)
   })
 }

 const fetchChildDepartments = (parentId, levelIndex) => {
  setLoading(true)
  listUnit({parent: parentId})
   .then((res) => {
    if (_.get(res, "code") === 200) {
     const childDepartments = _.get(res, "data", [])
     if (childDepartments.length) {
      setDepartments((prev) => [...prev.slice(0, levelIndex + 1), childDepartments])
     } else {
      setDepartments((prev) => [...prev.slice(0, levelIndex + 1)])
     }
    }
   })
   .catch((error) => {
    console.error("Lỗi khi tải danh sách con:", error)
   })
   .finally(() => {
    setLoading(false)
   })
 }

 const getListPosition = (unitId) => {
  listPosition({unit: unitId})
   .then((res) => {
    if (_.get(res, "code") === 200) {
     const data = _.get(res, "data", [])
     setListDataPosition(data)
    }
   })
   .catch((error) => {
    console.error("Lỗi khi tải danh sách vị trí:", error)
   })
 }

 const handleSelectChange = (value, levelIndex) => {
  const newSelectedDepartments = [...selectedDepartments]
  newSelectedDepartments[levelIndex] = value

  // Xóa các cấp dưới nếu người dùng thay đổi lựa chọn
  newSelectedDepartments.splice(levelIndex + 1)
  setSelectedDepartments(newSelectedDepartments)

  // Cập nhật phòng ban cuối cùng
  setUnit(_.get(value, "_id", ""))
 }

 const handlePositionChange = (value) => {
  const newPermissions = _.get(value, "permissions", [])
  const newGroupPermissions = _.get(value, "groupPermissions", [])
  setPosition(_.get(value, "_id", "")) // Cập nhật chức vụ
  handleUpdatePermissionsAndGroups(newPermissions, newGroupPermissions)
 }

 const handleDelete = (levelIndex) => {
  // Xóa danh sách cấp hiện tại và quay lại bước trước đó
  setDepartments((prev) => [...prev.slice(0, levelIndex)])
  setSelectedDepartments((prev) => [...prev.slice(0, levelIndex)])
 }

 const renderSelects = () =>
  departments.map((departmentList, level) => (
   <Box key={level} mt={2} display='flex' alignItems='center' gap={2}>
    <Autocomplete
     options={departmentList}
     getOptionLabel={(option) => _.get(option, "name", "Chưa rõ")}
     value={_.get(selectedDepartments, `[${level}]`, null)}
     onChange={(e, value) => handleSelectChange(value, level)}
     noOptionsText='Không có dữ liệu'
     renderInput={(params) => (
      <TextField
       {...params}
       placeholder='Chọn đơn vị trực thuộc'
       variant='outlined'
       sx={{
        width: "500px",
        "& .MuiOutlinedInput-root": {
         borderRadius: "16px",
        },
       }}
      />
     )}
    />
    {/* Nút Xóa: Hiển thị ở `Autocomplete` cuối cùng, nhưng không phải ở cấp đầu tiên */}
    {level > 0 && level === _.get(departments, "length", 0) - 1 && (
     <Avatar sx={{bgcolor: "#FFF", cursor: "pointer"}} onClick={() => handleDelete(level)}>
      <i className='icon-bold-close-circle' style={{color: "#656C75"}} />
     </Avatar>
    )}
   </Box>
  ))

 const renderAddButton = () => {
  const isLastSelectedValid = _.get(selectedDepartments, "length", 0) > 0 && _.get(selectedDepartments[selectedDepartments.length - 1], "_id", "")

  return (
   isLastSelectedValid && (
    <Box mt={3}>
     <Button
      onClick={() => fetchChildDepartments(_.get(selectedDepartments[selectedDepartments.length - 1], "_id", ""), _.get(selectedDepartments, "length", 0) - 1)}
      variant='contained'
      size='large'
      disabled={loading}
      sx={{
       background: "#E5F1FF",
       borderRadius: "12px",
       textTransform: "inherit",
       color: "#007CFE",
       "&:hover": {
        backgroundColor: "#E5F1FF",
        color: "#007CFE",
       },
      }}
      startIcon={<i className='icon-bold-add-circle' style={{color: "#007CFE"}} />}
     >
      Thêm đơn vị trực thuộc
     </Button>
    </Box>
   )
  )
 }

 const renderLocationSelect = () => (
  <Box>
   <Typography variant='h6' sx={{fontSize: "18px", color: "#010810"}}>
    Chức vụ
   </Typography>
   <Box mt={2}>
    <Autocomplete
     options={listDataPosition}
     getOptionLabel={(option) => _.get(option, "name", "Chưa rõ")}
     value={listDataPosition.find((pos) => _.get(pos, "_id") === position) || null}
     onChange={(e, value) => handlePositionChange(value)}
     noOptionsText='Không có dữ liệu'
     renderInput={(params) => (
      <TextField
       {...params}
       placeholder='Chọn chức vụ'
       variant='outlined'
       sx={{
        width: "500px",
        "& .MuiOutlinedInput-root": {
         borderRadius: "16px",
        },
       }}
      />
     )}
    />
   </Box>
  </Box>
 )

 return (
  <Fragment>
   <Grid item xs={6}>
    <Box flex={1}>
     <Typography variant='h6' sx={{fontSize: "18px", color: "#010810"}}>
      Đơn vị
     </Typography>
     {renderSelects()}
     {renderAddButton()}
     {loading && (
      <Box mt={2}>
       <CircularProgress size={24} />
      </Box>
     )}
    </Box>
   </Grid>
   <Grid item xs={6}>
    <Box flex={1}>{renderLocationSelect()}</Box>
   </Grid>
  </Fragment>
 )
}

export default RecursiveSelectDynamic
