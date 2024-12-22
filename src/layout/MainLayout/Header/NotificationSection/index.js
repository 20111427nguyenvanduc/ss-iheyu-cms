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
import NotificationList from "./NotificationList"

// assets
import IconBell from "@mui/icons-material/NotificationsActive"

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
const NotificationChip = styled(Chip)(({ theme }) => ({
 //  color: theme.palette.background.default,
 //  backgroundColor: theme.palette.warning.dark,
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

// notification status options
const status = [
 {
  value: "all",
  label: "All Notification",
 },
 {
  value: "new",
  label: "New",
 },
 {
  value: "unread",
  label: "Unread",
 },
 {
  value: "other",
  label: "Other",
 },
]

// ===========================|| NOTIFICATION ||=========================== //

const NotificationSection = () => {
 const theme = useTheme()
 const matchesXs = useMediaQuery(theme.breakpoints.down("sm"))

 const [open, setOpen] = React.useState(false)
 const [value, setValue] = React.useState("")
 const anchorRef = React.useRef(null)

 const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen)
 }

 const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
   return
  }
  setOpen(false)
 }

 const prevOpen = React.useRef(open)
 React.useEffect(() => {
  if (prevOpen.current === true && open === false) {
   anchorRef.current.focus()
  }
  prevOpen.current = open
 }, [open])

 const handleChange = (event) => {
  setValue(event.target.value)
 }

 return (
  <Box>
   <BoxWrap>
    <ButtonBase>
     <HeaderAvatar variant='outlined' ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup='true' onClick={handleToggle} color='inherit'>
      <IconBell stroke={1.5} size='1.3rem' />
     </HeaderAvatar>
    </ButtonBase>
   </BoxWrap>
   <Popper
    placement={matchesXs ? "bottom" : "bottom-end"}
    open={open}
    anchorEl={anchorRef.current}
    role={undefined}
    transition
    disablePortal
    popperOptions={{
     modifiers: [
      {
       name: "offset",
       options: {
        offset: [matchesXs ? 5 : 0, 20],
       },
      },
     ],
    }}
   >
    {({ TransitionProps }) => (
     <Transitions in={open} {...TransitionProps}>
      <Paper sx={{ boxShadow: "none" }}>
       <ClickAwayListener onClickAway={handleClose}>
        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
         <CardContent style={{ padding: "0px !important" }}>
          <Grid container direction='column' spacing={2}>
           <Grid item xs={12}>
            <div style={{ padding: "16px 16px 0" }}>
             <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item>
               <Stack direction='row' spacing={2}>
                <Typography variant='subtitle1'>All Notification</Typography>
                <NotificationChip size='small' label='01' />
               </Stack>
              </Grid>
              <Grid item>
               <Typography component={Link} to='#' variant='subtitle2' color='primary'>
                Mark as all read
               </Typography>
              </Grid>
             </Grid>
            </div>
           </Grid>
           <Grid item xs={12}>
            <PerfectScrollbar
             style={{
              height: "100%",
              maxHeight: "calc(100vh - 205px)",
              overflowX: "hidden",
             }}
            >
             <Grid container direction='column' spacing={2}>
              <Grid item xs={12}>
               <div style={{ padding: "0px 16px" }}>
                <TextField
                 id='outlined-select-currency-native'
                 select
                 fullWidth
                 value={value}
                 onChange={handleChange}
                 SelectProps={{
                  native: true,
                 }}
                >
                 {status.map((option) => (
                  <option key={option.value} value={option.value}>
                   {option.label}
                  </option>
                 ))}
                </TextField>
               </div>
              </Grid>
              <Grid item xs={12} p={0}>
               <Divider
                style={{
                 marginTop: 0,
                 marginBottom: 0,
                }}
               />
              </Grid>
              <Grid item xs={12}>
               {/* <NotificationList /> */}
              </Grid>
             </Grid>
            </PerfectScrollbar>
           </Grid>
          </Grid>
         </CardContent>
         <Divider />
         <CardActions
          style={{
           padding: "10px",
           justifyContent: "center",
          }}
         >
          <Button size='small' disableElevation>
           View All
          </Button>
         </CardActions>
        </MainCard>
       </ClickAwayListener>
      </Paper>
     </Transitions>
    )}
   </Popper>
  </Box>
 )
}

export default NotificationSection
