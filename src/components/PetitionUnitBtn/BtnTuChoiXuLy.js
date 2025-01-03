/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, Chip} from "@mui/material"
import UploadImgSingle from "../tools/UploadImgSingle"

const BtnTuChoiXuLy = ({children, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)
 const [reson, setReson] = useState("")
 const [icon, setIcon] = useState("")

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 return (
  <React.Fragment>
   {React.cloneElement(
    children || (
     <Button
      variant='contained'
      size='large'
      sx={{
       background: "#FFE2E2",
       color: "#D30500",
       "&:hover": {
        backgroundColor: "#FFE2E2",
        color: "#D30500",
       },
      }}
     >
      Từ chối xử lý
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose}>
    <DialogTitle>
     <Typography component='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Từ chối xử lý
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Lý do từ chối <Typography component='span' sx={{color: "#D30500", fontWeight: 500, fontSize: "18px"}}>
         *
        </Typography>
       </Typography>
       <TextField
        fullWidth
        placeholder='Nhập nội dung'
        variant='outlined'
        value={reson}
        onChange={(e) => setReson(e.target.value)}
        inputProps={{name: "name", ariallabel: "name"}}
        multiline
        rows={4}
       />
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        File đính kèm
        <Typography component='span' sx={{color: "#D30500", fontWeight: 500, fontSize: "18px"}}>
         *
        </Typography>{" "}
       </Typography>

       <UploadImgSingle
        id={"icon-unut"}
        width={"100%"}
        height={"150px"}
        folder='icon-unit'
        imageUrl={icon}
        onUploadSuccess={(imageUrl) => {
         setIcon(imageUrl)
        }}
        onDeleteFile={(filename) => {
         setIcon("")
        }}
       >
        <Stack direction='column' spacing={2} sx={{justifyContent: "center", alignItems: "center"}}>
         <img src='/images/icon-upload.png' style={{width: "40px"}} />
         <Typography variant='p' sx={{fontSize: "14px", color: "#656C75", fontWeight: 400}}>
          Thêm file/ hình ảnh{" "}
         </Typography>
         <Chip label='Chọn file ' />
        </Stack>
       </UploadImgSingle>
      </Box>
     </Box>
    </DialogContent>
    <DialogActions sx={{padding: "0 24px 24px"}}>
     <Button
      onClick={handleClose}
      variant='contained'
      size='large'
      sx={{
       width: "50%",
       background: "#FFF",
       color: "#007CFE",
       border: "1px solid #007CFE",
       "&:hover": {
        backgroundColor: "#FFF",
        color: "#007CFE",
       },
      }}
     >
      Quay lại
     </Button>
     <Button disabled={!reson} onClick={() => {}} size='large' fullWidth variant='contained' type='submit' sx={{width: "50%", background: "#007CFE"}}>
      Từ chối xử lý
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default BtnTuChoiXuLy
