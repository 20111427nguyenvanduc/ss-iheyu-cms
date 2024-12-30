import React, {Fragment, useState} from "react"
import {Box, Button, Typography, Alert, Paper, Grid} from "@mui/material"
import RecursiveSelectDynamic from "./RecursiveSelectDynamic"

const ParentComponent = ({unitsAndPositions, setUnitsAndPositions, permissions, setPermissions, groupPermissions, setGroupPermissions}) => {
 const [error, setError] = useState(null) // Trạng thái lỗi

 // Thêm một bộ mới
 const handleAdd = () => {
  setError(null) // Xóa thông báo lỗi trước đó
  setUnitsAndPositions([...unitsAndPositions, {unit: null, position: null}])
 }

 // Kiểm tra và thêm `permissions` hoặc `groupPermissions`
 const handleUpdatePermissionsAndGroups = (newPermissions, newGroupPermissions) => {
  // Thêm `permissions` nếu chưa tồn tại
  const updatedPermissions = [...permissions]
  newPermissions.forEach((perm) => {
   if (!updatedPermissions.some((p) => p._id === perm._id)) {
    updatedPermissions.push(perm)
   }
  })

  // Thêm `groupPermissions` nếu chưa tồn tại
  const updatedGroupPermissions = [...groupPermissions]
  newGroupPermissions.forEach((groupPerm) => {
   if (!updatedGroupPermissions.some((gp) => gp._id === groupPerm._id)) {
    updatedGroupPermissions.push(groupPerm)
   }
  })

  setPermissions(updatedPermissions)
  setGroupPermissions(updatedGroupPermissions)
 }

 // Cập nhật phòng ban và chức vụ
 const handleUpdate = (index, key, value) => {
  setError(null) // Xóa lỗi trước đó

  const updatedList = [...unitsAndPositions]
  updatedList[index][key] = value

  setUnitsAndPositions(updatedList)
 }

 return (
  <Fragment>
   {/* Hiển thị lỗi nếu có */}
   {error && (
    <Box mb={2}>
     <Alert severity='error'>{error}</Alert>
    </Box>
   )}

   {/* Hiển thị danh sách công tác */}
   {unitsAndPositions.map((item, index) => (
    <Paper key={index} sx={{p: 2, border: "1px solid #CCCFD3", borderRadius: "12px", mb: 2}} elevation={0}>
     <Typography variant='h5' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Thông tin công tác
     </Typography>
     <Grid container spacing={2} mt={1}>
      <RecursiveSelectDynamic
       unit={item.unit}
       position={item.position}
       setUnit={(value) => handleUpdate(index, "unit", value)}
       setPosition={(value) => handleUpdate(index, "position", value)}
       handleUpdatePermissionsAndGroups={handleUpdatePermissionsAndGroups}
      />
     </Grid>
    </Paper>
   ))}

   {/* Nút thêm công tác */}
   <Grid item xs={12} mt={2}>
    <Box
     sx={{
      display: "flex",
      gap: "16px",
      width: "100%",
      justifyContent: "center",
     }}
    >
     <Button
      onClick={handleAdd}
      variant='contained'
      size='large'
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
      Thêm đơn vị công tác
     </Button>
    </Box>
   </Grid>
  </Fragment>
 )
}

export default ParentComponent
