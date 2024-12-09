import React, { useState, useEffect, Fragment } from "react"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import ClearIcon from "@mui/icons-material/Clear"
import { Box, IconButton } from "@mui/material"
import { uploadFile, deleteFile } from "../../services/media"
import { MEDIA_URL } from "../../config"
import toastr from "toastr"
import _ from "lodash"

const UpdloadImg = ({ children, folder = "hey-care", imageUrl, onUploadSuccess = () => {}, onDeleteFile = () => {}, width = 50, height = 50 }) => {
 const [image, setImage] = useState("")

 useEffect(() => {
  setImage(imageUrl)
 }, [imageUrl])

 const onChangeImg = (e) => {
  e.preventDefault()
  let file = e.target.files
  uploadFile({ file: file[0] }).then((res) => {
   if (res.code === 200) {
    setImage(MEDIA_URL + _.get(res, "filename"))
    onUploadSuccess(MEDIA_URL + _.get(res, "filename"))
   }
  })
 }

 const deleteImg = (url) => {
  deleteFile({ url }).then((res) => {
   if (res.code === 200) {
    setImage("")
    onDeleteFile()
   }
  })
 }

 return (
  <Fragment>
   {image ? (
    <Box sx={{ position: "relative", width, height }}>
     <IconButton onClick={() => deleteImg(image)} className='close' sx={{position: 'absolute', top: '-10px', right: '-10px'}}>
      <ClearIcon />
     </IconButton>
     <img
      src={image}
      style={{
       cursor: "pointer",
       width,
       height,
       borderRadius: "10%",
      }}
     />
    </Box>
   ) : (
    <label
     style={{
      cursor: "pointer",
      width: width,
      height: height,
      borderRadius: "10%",
      border: "1px solid silver",
      fontSize: width < height ? width / 2 : height / 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     }}
    >
     {children ? React.cloneElement(children) : <InsertPhotoIcon />}
     <input type='file' accept='image/*' style={{ display: "none" }} onChange={onChangeImg} />
    </label>
   )}
  </Fragment>
 )
}
export default UpdloadImg
