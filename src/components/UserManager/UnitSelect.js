import React, {useState} from "react"
import {Box, Button, Typography, Alert} from "@mui/material"
import RecursiveSelectDynamic from "./RecursiveSelectDynamic"

const ParentComponent = () => {
 const [unitsAndPositions, setUnitsAndPositions] = useState([{unit: null, position: null}]) // Danh sách các phòng ban và chức vụ
 const [error, setError] = useState(null) // Trạng thái lỗi

 // Thêm một bộ mới
 const handleAdd = () => {
  setError(null) // Xóa thông báo lỗi trước đó
  setUnitsAndPositions([...unitsAndPositions, {unit: null, position: null}])
 }

 // Kiểm tra trùng lặp cặp phòng ban và chức vụ
 const isDuplicate = (index, unit, position) => {
  return unitsAndPositions.some((item, i) => i !== index && item.unit === unit && item.position === position)
 }

 // Cập nhật phòng ban và chức vụ
 const handleUpdate = (index, key, value) => {
  setError(null) // Xóa lỗi trước đó

  const updatedList = [...unitsAndPositions]
  updatedList[index][key] = value

  // Nếu đã có đủ `unit` và `position`, kiểm tra trùng lặp
  const {unit, position} = updatedList[index]
  if (unit && position && isDuplicate(index, unit, position)) {
   setError(`Phòng ban "${unit}" và chức vụ "${position}" đã tồn tại!`)
   return
  }

  setUnitsAndPositions(updatedList)
 }

 return (
  <Box>
   <Typography variant='h5' gutterBottom>
    Quản lý Phòng Ban và Chức Vụ
   </Typography>

   {error && (
    <Box mb={2}>
     <Alert severity='error'>{error}</Alert>
    </Box>
   )}

   {/* Hiển thị các RecursiveSelectDynamic */}
   {unitsAndPositions.map((item, index) => (
    <Box key={index} mt={2} border='1px solid #ddd' borderRadius='8px' p={2}>
     <Typography variant='h6'>Phòng ban và chức vụ {index + 1}</Typography>
     <RecursiveSelectDynamic unit={item.unit} position={item.position} setUnit={(value) => handleUpdate(index, "unit", value)} setPosition={(value) => handleUpdate(index, "position", value)} />
     <Box mt={1}>
      <Typography>
       Phòng ban: {item.unit || "Chưa chọn"} | Chức vụ: {item.position || "Chưa chọn"}
      </Typography>
     </Box>
    </Box>
   ))}

   {/* Nút thêm mới */}
   <Box mt={4}>
    <Button variant='contained' color='primary' onClick={handleAdd}>
     Thêm Phòng Ban và Chức Vụ
    </Button>
   </Box>
  </Box>
 )
}

export default ParentComponent
