/* jslint es6 */
import React, {useEffect, useState, Fragment} from "react"
import {useSelector, useDispatch} from "react-redux"
import {styled, useTheme} from "@mui/material/styles"
import moment from "moment"
import _ from "lodash"
import ms from "ms"
import toastr from "toastr"
import {Button, Typography, Dialog, Stack, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete, InputAdornment, Chip} from "@mui/material"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import {list as listUnit} from "../../services/unit"
import {list as listUser} from "../../services/user"

const BtnChuyenXuLy = ({children, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)
 const [reson, setReson] = useState("")
 const [icon, setIcon] = useState("")
 const [type, setType] = useState("can_bo")
 const [dataListUnit, setDataListUnit] = useState([])
 const [unit, setUnit] = useState(null)
 const [dataListUser, setDataListUser] = useState([])
 const [user, setUser] = useState(null)

 useEffect(() => {
  if (type === "can_bo") {
   getListUser()
  } else {
   getListUnit()
  }
 }, [type])

 const getListUnit = () => {
  listUnit({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setDataListUnit(_.get(res, "data"))
   }
  })
 }

 const getListUser = () => {
  listUser({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setDataListUser(_.get(res, "data"))
   }
  })
 }

 const handleChange = (event) => {
  const selectedType = event.target.value
  setType(selectedType)
 }

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
       width: "180px",
       background: "#E5F1FF",
       textTransform: "inherit",
       color: "#007CFE",
       "&:hover": {
        backgroundColor: "#E5F1FF",
        color: "#007CFE",
       },
      }}
     >
      Chuyển xử lý
     </Button>
    ),
    {onClick: handleClickOpen},
   )}

   <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose}>
    <DialogTitle>
     <Typography component='p' sx={{fontSize: "22px", color: "#2E3236", fontWeight: 700}}>
      Chuyển xử lý
     </Typography>
    </DialogTitle>
    <DialogContent>
     <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='20px'>
      <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Chuyển công việc cho
       </Typography>

       <FormControl>
        <RadioGroup row aria-labelledby='demo-form-control-label-placement' name='position' value={type} onChange={handleChange}>
         <FormControlLabel value='can_bo' control={<Radio />} label='Cán bộ xử lý' />
         <FormControlLabel value='don_vi' control={<Radio />} label='Đơn vị xử lý' />
        </RadioGroup>
       </FormControl>
       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        {type == "can_bo" ? "Cán bộ xử lý" : "Đơn vị xử lý"}{" "}
        <Typography component='span' sx={{color: "#D30500", fontWeight: 500, fontSize: "18px"}}>
         *
        </Typography>
       </Typography>
       {type == "can_bo" ? (
        <Autocomplete
         fullWidth
         options={dataListUser}
         getOptionLabel={(option) => _.get(option, "name", "")}
         value={unit}
         onChange={(e, value) => {
          setUser(value)
         }}
         renderInput={(params) => (
          <TextField
           {...params}
           fullWidth
           placeholder='Chọn cán bộ'
           variant='outlined'
           sx={{
            "& .MuiOutlinedInput-root": {
             borderRadius: "16px",
            },
           }}
          />
         )}
        />
       ) : (
        <Autocomplete
         fullWidth
         options={dataListUnit}
         getOptionLabel={(option) => _.get(option, "name", "")}
         value={unit}
         onChange={(e, value) => {
          setUnit(value)
         }}
         renderInput={(params) => (
          <TextField
           {...params}
           fullWidth
           placeholder='Chọn phòng ban'
           variant='outlined'
           sx={{
            "& .MuiOutlinedInput-root": {
             borderRadius: "16px",
            },
           }}
          />
         )}
        />
       )}

       <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
        Nội dung
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
      Chuyển xử lý
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default BtnChuyenXuLy
