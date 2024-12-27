import React, { useEffect, useState, memo } from "react"
import { useSelector } from "react-redux"
import { styled, useTheme } from "@mui/material/styles"
import { AppBar, Box, Button, ButtonGroup, IconButton, Toolbar, Typography } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SearchInput from "../input/Search"
import Select from "../input/Select"
import PagingButton from "../button/Paging"

const StyledBox = styled(Box)(({ theme }) => ({
 display: "flex",
 gap: theme.spacing(1),
 flexWrap: "wrap",
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
 wrapChildrenProps
}) => {
 const theme = useTheme()
 const { configs, user } = useSelector((state) => state)

 const onTextSearchChange = (value) => {
  searchChange(value)
 }
 const start = limit * page
 return (
  <Box
   component='form'
   autoComplete='off'
   noValidate
   sx={{ flexGrow: 1 }}
   onSubmit={(e) => {
    e.preventDefault()
    onSubmit()
   }}
  >
   <StyledBox>
    {!disableSearching ? (
     <Box sx={{ maxWidth: "340px" }}>
      <SearchInput placeholder='Tìm kiếm' type='search' autoComplete='off' fullWidth size='small' value={textSearch} onChange={(e) => onTextSearchChange(e.target.value)} />
     </Box>
    ) : null}
    <Box sx={{ flexGrow: 1, display: 'flex' }} {...wrapChildrenProps}>{children}</Box>
    <PagingButton page={page} limit={limit} count={count} onPageChange={onPageChange} onLimitChange={onLimitChange} disablePaging={disablePaging} />
   </StyledBox>
  </Box>
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
