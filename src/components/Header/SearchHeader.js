import React, {useEffect, useState, memo} from "react"
import {useSelector} from "react-redux"

import {styled, useTheme} from "@mui/material/styles"
import {AppBar, Box, Button, ButtonGroup, IconButton, Toolbar, Typography} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

import SearchInput from "../../ui-component/input/Search"
import Select from "../../ui-component/input/Select"
import PagingButton from "../../ui-component/button/Paging"

const StyledToolbar = styled(Toolbar)(({theme}) => ({
 padding: theme.spacing(0),
}))

const noOp = () => {}

const PrimarySearchAppBar = ({
 textSearch,
 searchChange = noOp,
 onSubmit = noOp,
 page = 0,
 limit = 0,
 count = 0,
 onPageChange = noOp,
 onLimitChange = noOp,
 children,
 disablePaging,
 disableSearching,
}) => {
 const theme = useTheme()
 const {configs, user} = useSelector((state) => state)

 const onTextSearchChange = (value) => {
  searchChange(value)
 }
 const start = limit * page
 return (
  <form
   autoComplete='off'
   noValidate
   style={{flexGrow: 1}}
   onSubmit={(e) => {
    e.preventDefault()
    onSubmit()
   }}
  >
   <StyledToolbar disableGutters={true}>
    {!disableSearching ? (
     <Box sx={{maxWidth: "340px"}}>
      <SearchInput label='Tìm kiếm' type='search' autoComplete='off' fullWidth size='small' value={textSearch} onChange={(e) => onTextSearchChange(e.target.value)} />
     </Box>
    ) : null}

    <Box
     sx={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "end",
      gap: theme.spacing(1),
     }}
    >
     {children}
     <PagingButton page={page} limit={limit} count={count} onPageChange={onPageChange} onLimitChange={onLimitChange} disablePaging={disablePaging} />
    </Box>
   </StyledToolbar>
  </form>
 )
}

export default PrimarySearchAppBar
// memo(PrimarySearchAppBar, (prevProps, nextProps)=>{
//   let noRender = true

//   if (prevProps.page !== nextProps.page || prevProps.limit !== nextProps.limit || prevProps.count !== nextProps.count) {
//     noRender = false
//   }

//   return noRender
// })
