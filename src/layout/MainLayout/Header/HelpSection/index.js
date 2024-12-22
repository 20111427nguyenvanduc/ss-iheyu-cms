import React from "react"
import { Link } from "react-router-dom"

// material-ui
import { styled, useTheme } from "@mui/material/styles"
import { Avatar, Box, Button, ButtonBase, CardActions, CardContent, Chip, ClickAwayListener, Divider, Grid, Paper, Popper, Stack, TextField, Typography, useMediaQuery } from "@mui/material"

// third-party
import PerfectScrollbar from "react-perfect-scrollbar"

// project imports
import MainCard from "../../../../ui-component/cards/MainCard"
import Transitions from "../../../../ui-component/extended/Transitions"

// assets
import HelpIcon from '@mui/icons-material/Help';
// style constant
const HeaderAvatar = styled(Avatar)(({ theme }) => ({
 ...theme.typography.commonAvatar,
 ...theme.typography.mediumAvatar,
 transition: "all .2s ease-in-out",
 borderColor: "transparent",
 background: 'transparent'
 //  background: theme.palette.primary.light,
 //  color: theme.palette.primary.dark,
 //  '&[aria-controls="menu-list-grow"],&:hover': {
 //   background: theme.palette.primary.dark,
 //   color: theme.palette.primary.light,
 //  },
}))

const BoxWrap = styled(Box)(({ theme }) => ({
    height: "65px",
    width: "100%",
    alignItems: "center",
    padding: "13px 4px",
    justifyContent: "start",
    transition: "all .2s ease-in-out",
    // borderColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    '&[aria-controls="menu-list-grow"], &:hover': {
     // borderColor: theme.palette.primary.light,
     // background: `${theme.palette.primary.dark}!important`,
    //  "& svg": {
    //   stroke: theme.palette.primary.main,
    //  },
    },
   }))

// ===========================|| NOTIFICATION ||=========================== //

const NotificationSection = () => {
 const theme = useTheme()
 return (
  <Box>
   <BoxWrap>
    <ButtonBase>
     <HeaderAvatar variant='outlined' color='inherit'>
      <HelpIcon stroke={1.5} size='1.3rem' />
     </HeaderAvatar>
    </ButtonBase>
   </BoxWrap>
  
  </Box>
 )
}

export default NotificationSection
