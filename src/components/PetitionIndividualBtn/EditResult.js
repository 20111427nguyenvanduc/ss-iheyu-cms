/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, Chip} from "@mui/material"
import {create as createUnit, update as updateUnit} from "../../services/unit"
import UploadImgSingle from "../tools/UploadImgSingle"
import {Editor} from "@tinymce/tinymce-react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

const EditResult = ({children, onClose = () => {}}) => {
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
     <Button variant='contained' size='large' sx={{padding: "12px 32px", background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}} startIcon={<i className='icon-bold-add-circle' />}>
      Thêm đơn vị mới
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose}>
    <DialogTitle>
     <Typography component='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Sửa kết quả
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Nội dung kết quả xử lý
        <Typography component='span' sx={{color: "#D30500", fontWeight: 500, fontSize: "18px"}}>
         *
        </Typography>
       </Typography>
       <Editor
        onEditorChange={(editedValue) => {
         setReson(editedValue)
        }}
        apiKey='sqvdxm07q23ih36ctijf9mvec8dyzd254g0ng5cs0wb2svy0'
        value={reson}
        init={{
         selector: "textarea",
         toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
        }}
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

       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Công khai phản ánh
        <Typography component='span' sx={{color: "#D30500", fontWeight: 500, fontSize: "18px"}}>
         *
        </Typography>{" "}
       </Typography>
       <FormControl>
        <RadioGroup row aria-labelledby='demo-form-control-label-placement' name='position'>
         <FormControlLabel value='bottom' control={<Radio />} label='Có' />
         <FormControlLabel value='end' control={<Radio />} label='Không' />
        </RadioGroup>
       </FormControl>
      </Box>
     </Box>
    </DialogContent>
    <DialogActions sx={{padding: "0 24px 24px"}}>
     <Button
      variant='contained'
      size='large'
      sx={{
       width: "50%",
       background: "#FFF",
       textTransform: "inherit",
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
     <Button onClick={() => {}} size='large' fullWidth variant='contained' type='submit' sx={{width: "50%", background: "#007CFE", fontSize: "16px", textTransform: "initial"}}>
      Từ chối phản ánh
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default EditResult
