import React, {useState, Fragment, useEffect} from "react"
import {
 AppBar,
 Box,
 Drawer,
 Button,
 List,
 Divider,
 Grid,
 ListItem,
 ListItemButton,
 ListItemIcon,
 ListItemText,
 Typography,
 IconButton,
 MenuItem,
 TextField,
 FormGroup,
 FormControlLabel,
 Autocomplete,
} from "@mui/material"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import CloseIcon from "@mui/icons-material/Close"
import Checkbox from "../../ui-component/checkbox/Checkbox"
import {list as listCategory} from "../../services/category"

export default function FilterOptions({filter, setFilter}) {
 const [isOpen, setIsOpen] = useState(false)
 const [filterState, setFilterState] = useState({})
 const updateFilterState = (newState) => {
  setFilterState((oldState) => ({...oldState, ...newState}))
 }

 const [listCat, setListCat] = useState("")

 useEffect(() => {
  if (isOpen) {
   setFilterState(filter)
   getList()
  }
 }, [isOpen])

 useEffect(() => {
  if (filter.isFilter) {
   setFilter(filterState)
  }
 }, [filterState])

 const getList = () => {
  listCategory({}).then((res) => {
   if (_.get(res, "code") === 200) {
    setListCat(_.get(res, "data"))
   }
  })
 }

 const confirmFilter = () => {
  setFilter({
   ...filterState,
   isFilter: true,
  })
  setIsOpen(false)
 }

 const deleteFilter = () => {
  setFilter({
   unit: "",
   position: "",
   gender: "",
   active: "",
   sort: 1,
   isFilter: false,
  })
 }

 const toggleDrawer = (event) => {
  if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
   return
  }
  setIsOpen(!isOpen)
 }

 const list = () => (
  <Box sx={{width: 395, height: "100%"}} role='presentation' onKeyDown={toggleDrawer} position='relative' p={2}>
   <Box sx={{width: "100%"}} display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap='16px'>
    <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
     Danh mục
    </Typography>
    <Autocomplete
     fullWidth
     options={listCat}
     getOptionLabel={(option) => _.get(option, "name", "")}
     value={null}
     onChange={(e, value) => {}}
     renderInput={(params) => (
      <TextField
       {...params}
       fullWidth
       size='small'
       placeholder='Chọn danh mục'
       variant='outlined'
       sx={{
        "& .MuiOutlinedInput-root": {
         borderRadius: "16px",
        },
       }}
      />
     )}
    />
    <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
     Mức độ ưu tiên{" "}
    </Typography>
    <Autocomplete
     fullWidth
     options={listCat}
     getOptionLabel={(option) => _.get(option, "name", "")}
     value={null}
     onChange={(e, value) => {}}
     renderInput={(params) => (
      <TextField
       {...params}
       fullWidth
       size='small'
       placeholder='Chọn mức độ'
       variant='outlined'
       sx={{
        "& .MuiOutlinedInput-root": {
         borderRadius: "16px",
        },
       }}
      />
     )}
    />

    <Typography variant='p' sx={{fontSize: "18px", color: "#4A4F55", fontWeight: 400}}>
     Trạng thái công việc
    </Typography>
    <Autocomplete
     fullWidth
     options={listCat}
     getOptionLabel={(option) => _.get(option, "name", "")}
     value={null}
     onChange={(e, value) => {}}
     renderInput={(params) => (
      <TextField
       {...params}
       fullWidth
       size='small'
       placeholder='Chọn trạng thái'
       variant='outlined'
       sx={{
        "& .MuiOutlinedInput-root": {
         borderRadius: "16px",
        },
       }}
      />
     )}
    />
   </Box>

   <Box position='absolute' sx={{top: "auto", bottom: 0, p: "16px", left: 0, right: 0}}>
    {filter.isFilter ? (
     <Button size='large' variant='outlined' fullWidth onClick={deleteFilter}>
      Xóa bộ lọc
     </Button>
    ) : (
     <Button size='large' variant='contained' fullWidth onClick={confirmFilter}>
      Tạo bộ lọc
     </Button>
    )}
   </Box>
  </Box>
 )

 return (
  <Fragment>
   <Button sx={{width: "125px"}} aria-label='Bộ lọc' variant={filter.isFilter ? "contained" : "outlined"} onClick={toggleDrawer} startIcon={<i className='icon-linear-filter' />}>
    {filter.isFilter ? "Bộ lọc" : "Bộ lọc"}
   </Button>
   <Drawer anchor='left' open={isOpen} onClose={toggleDrawer}>
    <Box sx={{display: "flex", alignItems: "center", padding: "16px", gap: 2}}>
     <i className='icon-linear-filter' />
     <Typography sx={{flexGrow: 1}} variant='h6'>
      Bộ lọc tìm kiếm
     </Typography>
     <IconButton onClick={toggleDrawer}>
      <CloseIcon onClick={toggleDrawer} />
     </IconButton>
    </Box>
    <Divider />
    {list()}
   </Drawer>
  </Fragment>
 )
}
