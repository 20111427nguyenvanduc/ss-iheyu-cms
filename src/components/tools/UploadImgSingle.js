import React, {useState, useEffect, Fragment, useRef} from "react"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import ClearIcon from "@mui/icons-material/Clear"
import {Box, IconButton, Stack, Avatar, Button} from "@mui/material"
import {uploadFile, deleteFile} from "../../services/media"
import {MEDIA_URL} from "../../config"
import toastr from "toastr"
import _ from "lodash"

const UpdloadImg = ({children, folder = "iheyu-hp", imageUrl, onUploadSuccess = () => {}, onDeleteFile = () => {}, width = 50, height = 50, type = ""}) => {
 const [image, setImage] = useState("")

 const inputRef = useRef(null)

 useEffect(() => {
  setImage(imageUrl)
 }, [imageUrl])

 const onChangeImg = (e) => {
  e.preventDefault()
  let file = e.target.files
  uploadFile({file: file[0]}).then((res) => {
   if (res.code === 200) {
    setImage(MEDIA_URL + _.get(res, "filename"))
    onUploadSuccess(MEDIA_URL + _.get(res, "filename"))
   }
  })
 }

 const deleteImg = (url) => {
  deleteFile({url}).then((res) => {
   if (res.code === 200) {
    setImage("")
    onDeleteFile()
   }
  })
 }

 return (
  <Fragment>
   {image ? (
    type == "category" ? (
     <Stack direction='collumn' spacing={2} sx={{justifyContent: "center", alignItems: "center", gap: 2}}>
      <Box sx={{borderRadius: "16px", border: "1px dashed #007CFE", background: "#E5F1FF", padding: "32px"}}>
       <Avatar src={image} sx={{width: "55px", height: "55px"}} />
      </Box>

      <Stack direction='column' spacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
       <Button
        onClick={() => {
         if (inputRef && inputRef.current) inputRef.current.click()
        }}
        variant='contained'
        size='large'
        sx={{width: "160px", background: "#E5F1FF", borderRadius: "12px", textTransform: "inherit", color: "#007CFE", "&:hover": {backgroundColor: "#E5F1FF", color: "#007CFE"}}}
        startIcon={<i className='icon-bold-edit-2' style={{color: "#007CFE"}} />}
       >
        Chọn lại ảnh
       </Button>

       <Button
        onClick={() => deleteImg(image)}
        variant='contained'
        size='large'
        sx={{width: "160px", background: "#FFE2E2", borderRadius: "12px", textTransform: "inherit", color: "#D30500", "&:hover": {backgroundColor: "#FFE2E2", color: "#D30500"}}}
        startIcon={<i className='icon-bold-trash' style={{color: "#D30500"}} />}
       >
        Xóa ảnh
       </Button>
      </Stack>
      <input type='file' accept='image/*' style={{display: "none"}} onChange={onChangeImg} ref={inputRef} />
     </Stack>
    ) : (
     <Box sx={{borderRadius: "16px", border: "1px dashed #007CFE", background: "#E5F1FF", width: "100%"}} p={2}>
      <Stack direction='row' spacing={2} sx={{justifyContent: "space-between", alignItems: "center"}}>
       <Avatar src={image} sx={{width: "70px", height: "70px"}} />
       <Stack direction='row' spacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
        <Avatar
         sx={{bgcolor: "#FFF"}}
         onClick={() => {
          console.log("haha", inputRef)

          if (inputRef && inputRef.current) inputRef.current.click()
         }}
        >
         <i className='icon-bold-edit-2' style={{color: "#1589D8"}} />
        </Avatar>
        <Avatar onClick={() => deleteImg(image)} sx={{bgcolor: "#FFE2E2", cursor: "pointer"}}>
         <i className='icon-bold-trash' style={{color: "#D30500"}} />
        </Avatar>
       </Stack>
      </Stack>
      <input type='file' accept='image/*' style={{display: "none"}} onChange={onChangeImg} ref={inputRef} />
     </Box>
    )
   ) : (
    <label
     style={{
      cursor: "pointer",
      width: width,
      height: height,
      borderRadius: "16px",
      border: "1px dashed #A1A7AE",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     }}
    >
     {children ? React.cloneElement(children) : <InsertPhotoIcon />}
     <input type='file' accept='image/*' style={{display: "none"}} onChange={onChangeImg} ref={inputRef} />
    </label>
   )}
  </Fragment>
 )
}
export default UpdloadImg