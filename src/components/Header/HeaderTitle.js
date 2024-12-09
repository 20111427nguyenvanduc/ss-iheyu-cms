import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
import { AppBar, Box, Toolbar, Typography, Slide, useScrollTrigger } from "@mui/material"
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
 backgroundColor: theme.palette.background.paper,
 minHeight: "56px",
}))

const StyledTitle = styled(Typography)(({ theme }) => ({
 color: theme.palette.text.primary,
}))
function HideOnScroll(props) {
 const { children, window } = props
 // Note that you normally won't need to set the window ref as useScrollTrigger
 // will default to window.
 // This is only being set here because the demo is in an iframe.
 const trigger = useScrollTrigger({
  target: window ? window() : undefined,
 })

 return (
  <Slide appear={false} direction='down' in={!trigger}>
   {children}
  </Slide>
 )
}
export default function HeaderTitle({ title, children, titleProps, ...props }) {
 const { configs, user } = useSelector((state) => state)
 return (
  <HideOnScroll>
   <AppBar position='static'>
    <StyledToolbar {...props}>
     <StyledTitle variant='h6' component='div' {...titleProps}>
      {title}
     </StyledTitle>
     {children}
    </StyledToolbar>
   </AppBar>
  </HideOnScroll>
 )
}
