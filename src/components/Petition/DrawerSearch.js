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

   <Divider sx={{my: "26px"}} />
   <Grid container spacing={2} sx={{p: "0px 32px 0px 16px"}}>
    <Grid item xs={12}>
     <Typography variant='h5' sx={{fontSize: "18px", fontWeight: 400, mb: 1}}>
      Giới tính
     </Typography>
     <Box sx={{display: "flex", gap: 2}}>
      <FormGroup sx={{width: "50%"}}>
       <FormControlLabel
        control={<Checkbox checked={filterState.gender === "male"} onChange={(e) => updateFilterState({gender: filterState.gender === "male" ? "" : "male"})} />}
        label={
         <Typography variant='h5' sx={{fontSize: "16px", color: "#2E3236"}}>
          Nam
         </Typography>
        }
       />
      </FormGroup>
      <FormGroup sx={{width: "50%"}}>
       <FormControlLabel
        control={<Checkbox checked={filterState.gender === "female"} onChange={(e) => updateFilterState({gender: filterState.gender === "female" ? "" : "female"})} />}
        label={
         <Typography variant='h5' sx={{fontSize: "16px", color: "#2E3236"}}>
          Nữ
         </Typography>
        }
       />
      </FormGroup>
     </Box>
    </Grid>
    <Grid item xs={6}>
     <Typography variant='h5' sx={{fontSize: "18px", fontWeight: 400, mb: 1}}>
      Trạng thái
     </Typography>
     <TextField
      fullWidth
      select
      sx={{
       "& .MuiSelect-select span::before": {
        content: "'Chọn trạng thái'",
       },
      }}
      variant='outlined'
      value={_.get(filterState, "active", "")}
      onChange={(e) => updateFilterState({active: e.target.value})}
      inputProps={{name: "active", ariallabel: "active"}}
     >
      {[
       {label: "Đã kích hoạt", code: 1},
       {label: "Chưa kích hoạt", code: 0},
       {label: "Tất cả", code: ""},
      ].map((option) => (
       <MenuItem key={option.code} value={option.code}>
        {option.label}
       </MenuItem>
      ))}
     </TextField>
    </Grid>
    <Grid item xs={6}>
     <Typography variant='h5' sx={{fontSize: "18px", fontWeight: 400, mb: 1}}>
      Thời gian tạo
     </Typography>
     <TextField
      fullWidth
      select
      sx={{
       "& .MuiSelect-select span::before": {
        content: "'Chọn trạng thái'",
       },
      }}
      variant='outlined'
      value={_.get(filterState, "sort", "")}
      onChange={(e) => updateFilterState({sort: e.target.value})}
      inputProps={{name: "sort", ariallabel: "sort"}}
     >
      {[
       {label: "Mới nhất", code: 1},
       {label: "Cũ nhất", code: 0},
      ].map((option) => (
       <MenuItem key={option.code} value={option.code}>
        {option.label}
       </MenuItem>
      ))}
     </TextField>
    </Grid>
   </Grid>
   <Box position='absolute' sx={{top: "auto", bottom: 0, p: "16px", left: 0, right: 0}}>
    {filter.isFilter ? (
     <Button variant='outlined' fullWidth onClick={deleteFilter}>
      Xóa bộ lọc
     </Button>
    ) : (
     <Button variant='contained' fullWidth onClick={confirmFilter}>
      Tạo bộ lọc
     </Button>
    )}
   </Box>
  </Box>
 )

 return (
  <Fragment>
   <Button aria-label='Bộ lọc' variant={filter.isFilter ? "contained" : "outlined"} onClick={toggleDrawer} startIcon={<i className='icon-linear-filter' />}>
    {filter.isFilter ? "Bọ lọc đang dùng" : "Bộ lọc nâng cao"}
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
