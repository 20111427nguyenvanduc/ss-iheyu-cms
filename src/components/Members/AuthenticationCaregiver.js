import React, {useState, useEffect} from "react"
import {styled} from "@mui/material/styles"
import {
 Avatar,
 AppBar,
 Button,
 Divider,
 Dialog,
 Grid,
 ListItemText,
 ListItemButton,
 List,
 Toolbar,
 IconButton,
 Typography,
 TextField,
 Slide,
 Box,
 Stepper,
 Step,
 StepLabel,
 Paper,
    FormControlLabel,
    Chip
} from "@mui/material"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"

import CloseIcon from "@mui/icons-material/Close"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import UploadImgSingle from "../tools/UploadImgSingle"
import toastr from "toastr"
import LoadingBackdrop from "../../ui-component/loading/LoadingBackdrop"
import Checkbox from "../../ui-component/checkbox/Checkbox"
import moment from "moment"
import {authen} from "../../services/member"
const VisuallyHiddenInput = styled("input")({
 clip: "rect(0 0 0 0)",
 clipPath: "inset(50%)",
 height: 1,
 overflow: "hidden",
 position: "absolute",
 bottom: 0,
 left: 0,
 whiteSpace: "nowrap",
 width: 1,
})

const Transition = React.forwardRef(function Transition(props, ref) {
 return <Slide direction='up' ref={ref} {...props} />
})

export default function AuthenticationCaregiver({children, member, onClose = () => {}}) {
 const [open, setOpen] = useState(false)

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
  onClose()
 }

 return (
  <React.Fragment>
   {React.cloneElement(children || <Button variant='outlined'>Xác thực nhân viên HeyCare</Button>, {onClick: handleClickOpen})}
   <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
    <AppBar sx={{position: "relative"}}>
     <Toolbar>
      <Typography sx={{ml: 2, flex: 1}} variant='h6' component='div'>
       Xác thực thông tin chăm sóc viên
      </Typography>
      <IconButton edge='end' color='inherit' onClick={handleClose} aria-label='close'>
       <CloseIcon />
      </IconButton>
     </Toolbar>
    </AppBar>
    <AuthenticationStep member={member} handleClose={handleClose} />
   </Dialog>
  </React.Fragment>
 )
}

function AuthenticationStep({member, handleClose}) {
 const [activeStep, setActiveStep] = useState(0)
 const [loading, setLoading] = useState(false)
 const [profile, setProfile] = useState({
  member: _.get(member, "_id"),
  name: _.get(member, "facebook.name"),
  phone: _.get(member, "phone"),
  levelStaff: "caregiver",
  identityCard: "",
  identityCardInf: {
   id: "",
   address: "",
   accommodation: "",
   birthday: moment("1/1/2000"),
   gender: "female",
  },
  certificationImg: "",
  certificationInf: {},
  diplomaImg: "",
  diplomaInf: {},
  signatureImg: "",
  imgs: [],
  isMaid: 0,
  hasUniform: 0,
  hasCleaningTools: 0,
 })
 const profileChange = (key, value) => {
  setProfile((oldState) => {
   _.set(oldState, key, value)
   return {
    ...oldState,
   }
  })
 }

 const [steps, setStep] = useState([
  {
   label: "Thông tin cơ bản",
   stepProps: {
    skip: false,
    completed: false,
   },
   labelProps: {
    optional: "",
   },
  },
  {
   label: "Tải lên hồ sơ",
   stepProps: {
    skip: false,
    completed: false,
   },
   labelProps: {
    optional: "",
   },
  },
  {
   label: "Kiểm tra thông tin",
   stepProps: {
    skip: false,
    completed: false,
   },
   labelProps: {
    optional: "",
   },
  },
 ])

 const checkStepInfo = (profile) => {
  if (
   !_.get(profile, "phone") ||
   !_.get(profile, "name") ||
   !_.get(profile, "identityCardInf.id") ||
   !_.get(profile, "identityCardInf.birthday") ||
   !_.get(profile, "identityCardInf.gender") ||
   !_.get(profile, "identityCardInf.accommodation") ||
   !_.get(profile, "identityCardInf.address")
  ) {
   return false
  }
  return true
 }

 const checkStepUpload = (profile) => {
  if (
   !_.get(profile, "photo") ||
   !_.get(profile, "identityCard") ||
   (_.get(profile, "levelStaff") === "nurse" && !_.get(profile, "certificationImg")) ||
   (_.get(profile, "levelStaff") === "nurse" && !_.get(profile, "diplomaImg"))
  ) {
   return false
  }
  return true
 }

 const handleAuthen = () => {
  setLoading(true)
  if (!checkStepInfo(profile) || !checkStepUpload(profile)) {
   return toastr.warning("Thông tin chưa đầy đủ vui lòng kiểm tra lại")
  }
  let objProfile = _.cloneDeep(profile)
  _.set(objProfile, "identityCardInf.birthday", moment(_.get(profile, "identityCardInf.birthday")).format("DD/MM/YYYY"))
  authen({profile: objProfile}).then((response) => {
   setLoading(false)
   if (_.get(response, "code") === 200) {
    _.set(steps[activeStep], "stepProps.completed", true)
    return handleClose()
   }
  })
 }

 const handleNext = () => {
  if (activeStep === 0 && !checkStepInfo(profile)) {
   _.set(steps[activeStep], "stepProps.completed", false)
   return toastr.warning("Nhập thông tin chưa đầy đủ")
  }
  if (activeStep === 1 && !checkStepUpload(profile)) {
   _.set(steps[activeStep], "stepProps.completed", false)
   return toastr.warning("Hình ảnh chưa đầy đủ")
  }
  _.set(steps[activeStep], "stepProps.completed", true)
  setActiveStep((prevActiveStep) => prevActiveStep + 1)
 }

 const handleBack = () => {
  setActiveStep((prevActiveStep) => {
   let newStep = prevActiveStep - 1
   _.set(steps[newStep], "stepProps.completed", false)
   return newStep
  })
 }

 const handleReset = () => {
  setActiveStep(0)
 }

 return (
  <React.Fragment>
   <LoadingBackdrop loading={loading} />
   <Box
    sx={{
     width: "100%",
     p: 2,
     height: "100vh",
     display: "flex",
     flexDirection: "column",
    }}
   >
    <Stepper activeStep={activeStep} alternativeLabel>
     {steps.map(({label, stepProps, labelProps}, index) => {
      return (
       <Step key={label} {...stepProps}>
        <StepLabel {...labelProps}>{label}</StepLabel>
       </Step>
      )
     })}
    </Stepper>
    {activeStep === steps.length ? (
     <React.Fragment>
      <Box flexGrow={1}>
       <Typography sx={{mt: 2, mb: 1, textAlign: "cennter"}}>Thông tin đã được xác thực</Typography>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
       <Box sx={{flex: "1 1 auto"}} />
       <Button onClick={handleClose}>Đóng</Button>
      </Box>
     </React.Fragment>
    ) : (
     <React.Fragment>
      <Box
       sx={{
        overflow: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        pt: 2,
       }}
      >
       {
        [<InputInfo profile={profile} setProfile={profileChange} />, <UploadDocument profile={profile} setProfile={profileChange} />, <ReviewInfo profile={profile} setProfile={profileChange} />][
         activeStep
        ]
       }
       <Box sx={{maxWidth: "500px", width: "100%", display: "flex", flexDirection: "row", pt: 2}}>
        <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
         Trở lại
        </Button>
        <Box sx={{flex: "1 1 auto"}} />
        {activeStep !== 2 ? <Button onClick={handleNext}>Tiếp tục</Button> : <Button onClick={handleAuthen}>Gửi xác thực</Button>}
       </Box>
      </Box>
     </React.Fragment>
    )}
   </Box>
  </React.Fragment>
 )
}

const InputInfo = ({profile, setProfile}) => {
 return (
  <Box sx={{maxWidth: "500px"}}>
   <Grid container spacing={2}>
    <Grid item xs={12}>
     <Box sx={{display: "flex", gap: 2}}>
      <Box
       flex={1}
       sx={{
        borderRadius: 2,
        p: 2,
        border: `1px solid ${_.get(profile, "levelStaff") === "caregiver" ? "#1589D8" : "#EEF0F0"}`,
        color: _.get(profile, "levelStaff") === "caregiver" ? "#1589D8" : "inherit",
        height: "120px",
        backgroundImage: `url("/img/caregiver.png")`,
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100px",
        cursor: "pointer",
       }}
       onClick={() => setProfile("levelStaff", _.get(profile, "levelStaff") === "caregiver" ? null : "caregiver")}
      >
       Chăm sóc viên
      </Box>
      <Box
       flex={1}
       sx={{
        borderRadius: 2,
        p: 2,
        border: `1px solid ${_.get(profile, "levelStaff") === "nurse" ? "#1589D8" : "#EEF0F0"}`,
        color: _.get(profile, "levelStaff") === "nurse" ? "#1589D8" : "inherit",
        height: "120px",
        backgroundImage: `url("/img/nurse.png")`,
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100px",
        cursor: "pointer",
       }}
       onClick={() => setProfile("levelStaff", _.get(profile, "levelStaff") === "nurse" ? null : "nurse")}
      >
       Điều dưỡng viên
      </Box>
     </Box>
    </Grid>
    <Grid item xs={12}>
     <FormControlLabel
      control={<Checkbox checked={_.get(profile, "isMaid") ? true : false} onChange={() => setProfile("isMaid", _.get(profile, "isMaid") ? 0 : 1)} />}
      label='Đăng ký giúp việc'
      labelPlacement='end'
     />
    </Grid>
    <Grid item xs={12}>
     <FormControlLabel
      control={<Checkbox checked={_.get(profile, "hasUniform") ? true : false} onChange={() => setProfile("hasUniform", _.get(profile, "hasUniform") ? 0 : 1)} />}
      label='Đã nhận đồng phục'
      labelPlacement='end'
     />
    </Grid>
    <Grid item xs={12}>
     <FormControlLabel
      control={<Checkbox checked={_.get(profile, "hasCleaningTools") ? true : false} onChange={() => setProfile("hasCleaningTools", _.get(profile, "hasCleaningTools") ? 0 : 1)} />}
      label='Đã nhận bộ dụng cụ dọn dẹp'
      labelPlacement='end'
     />
    </Grid>
    <Grid item xs={12}>
     <Typography sx={{textAlign: "center"}}>SĐT: {_.get(profile, "phone")}</Typography>
    </Grid>
    <Grid item xs={12}>
     <TextField
      fullWidth
      value={_.get(profile, "name")}
      onChange={(e) => setProfile("name", e.target.value)}
      label={
       <Typography>
        Họ và tên
        <Box component='span' sx={{color: "red"}}>
         *
        </Box>
       </Typography>
      }
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      fullWidth
      value={_.get(profile, "identityCardInf.id")}
      onChange={(e) => setProfile("identityCardInf.id", e.target.value)}
      label={
       <Typography>
        Số CMT/CCCD
        <Box component='span' sx={{color: "red"}}>
         *
        </Box>
       </Typography>
      }
     />
    </Grid>
    <Grid item xs={12}>
     <Box sx={{display: "flex", gap: 2, justifyContent: "space-evenly"}}>
      <Box
       sx={{
        borderRadius: 2,
        p: 2,
        border: `1px solid ${_.get(profile, "identityCardInf.gender") === "male" ? "#1589D8" : "#EEF0F0"}`,
        color: _.get(profile, "identityCardInf.gender") === "male" ? "#1589D8" : "inherit",
        height: "56px",
        width: "80px",
        cursor: "pointer",
        textAlign: "center",
       }}
       onClick={() => setProfile("identityCardInf.gender", "male")}
      >
       Nam
      </Box>
      <Box
       sx={{
        borderRadius: 2,
        p: 2,
        border: `1px solid ${_.get(profile, "identityCardInf.gender") === "female" ? "#1589D8" : "#EEF0F0"}`,
        color: _.get(profile, "identityCardInf.gender") === "female" ? "#1589D8" : "inherit",
        height: "56px",
        width: "80px",
        cursor: "pointer",
        textAlign: "center",
       }}
       onClick={() => setProfile("identityCardInf.gender", "female")}
      >
       Nữ
      </Box>
     </Box>
    </Grid>
    <Grid item xs={12}>
     <DatePicker
      label={
       <Typography>
        Ngày sinh
        <Box component='span' sx={{color: "red"}}>
         *
        </Box>
       </Typography>
      }
      disableFuture
      openTo='year'
      views={["year", "month", "day"]}
      inputFormat='DD/MM/YYYY'
      toolbarFormat='DD/MM/YYYY'
      value={_.get(profile, "identityCardInf.birthday")}
      onChange={(newValue) => {
       setProfile("identityCardInf.birthday", newValue)
      }}
      renderInput={(params) => <TextField {...params} size='medium' fullWidth />}
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      fullWidth
      value={_.get(profile, "identityCardInf.accommodation")}
      onChange={(e) => setProfile("identityCardInf.accommodation", e.target.value)}
      label={
       <Typography>
        Địa chỉ thường trú
        <Box component='span' sx={{color: "red"}}>
         *
        </Box>
       </Typography>
      }
     />
    </Grid>
    <Grid item xs={12}>
     <TextField
      fullWidth
      value={_.get(profile, "identityCardInf.address")}
      onChange={(e) => setProfile("identityCardInf.address", e.target.value)}
      label={
       <Typography>
        Địa chỉ tạm trú
        <Box component='span' sx={{color: "red"}}>
         *
        </Box>
       </Typography>
      }
     />
    </Grid>
   </Grid>
  </Box>
 )
}

const UploadDocument = ({profile, setProfile}) => {
 return (
  <Box sx={{maxWidth: "500px"}}>
   <Grid container spacing={2}>
    <Grid item xs={12}>
     <Box
      sx={{
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
      }}
     >
      <Typography variant='body1' component='div'>
       Ảnh đại diện
      </Typography>
      <UploadImgSingle
       id={"photo" + _.get(profile, "member")}
       width={150}
       height={150}
       folder='photo'
       imageUrl={_.get(profile, "photo")}
       onUploadSuccess={(imageUrl) => {
        setProfile("photo", imageUrl)
       }}
       onDeleteFile={(filename) => {
        setProfile("photo", "")
       }}
      />
     </Box>
    </Grid>
    <Grid item xs={6}>
     <Box
      sx={{
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
      }}
     >
      <Typography variant='body1' component='div'>
       CCCD mặt trước
      </Typography>
      <UploadImgSingle
       id={"identity-card-front" + _.get(profile, "member")}
       width={150}
       height={150}
       folder='identityCard'
       imageUrl={_.get(profile, "identityCard")}
       onUploadSuccess={(imageUrl) => {
        setProfile("identityCard", imageUrl)
        setProfile("identityCardInf.identityCardFront", imageUrl)
       }}
       onDeleteFile={(filename) => {
        setProfile("identityCard", "")
        setProfile("identityCardInf.identityCardFront", "")
       }}
      />
     </Box>
    </Grid>
    <Grid item xs={6}>
     <Box
      sx={{
       display: "flex",
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
      }}
     >
      <Typography variant='body1' component='div'>
       CCCD mặt sau
      </Typography>
      <UploadImgSingle
       id={"identity-card-back" + _.get(profile, "member")}
       width={150}
       height={150}
       folder='identityCard'
       imageUrl={_.get(profile, "identityCardInf.identityCardBack")}
       onUploadSuccess={(imageUrl) => {
        setProfile("identityCardInf.identityCardBack", imageUrl)
       }}
       onDeleteFile={(filename) => {
        setProfile("identityCardInf.identityCardBack", "")
       }}
      />
     </Box>
    </Grid>
    {_.get(profile, "levelStaff") === "nurse" ? (
     <React.Fragment>
      <Grid item xs={6}>
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center",
        }}
       >
        <Typography variant='body1' component='div'>
         Bằng tốt nghiệp
        </Typography>
        <UploadImgSingle
         id={"diploma" + _.get(profile, "member")}
         width={150}
         height={150}
         folder='diploma'
         imageUrl={_.get(profile, "diplomaImg")}
         onUploadSuccess={(imageUrl) => {
          setProfile("diplomaImg", imageUrl)
         }}
         onDeleteFile={(filename) => {
          setProfile("diplomaImg", "")
         }}
        />
       </Box>
      </Grid>
      <Grid item xs={6}>
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center",
        }}
       >
        <Typography variant='body1' component='div'>
         Chứng chỉ
        </Typography>
        <UploadImgSingle
         id={"certificationImg" + _.get(profile, "member")}
         width={150}
         height={150}
         folder='certification'
         imageUrl={_.get(profile, "certificationImg")}
         onUploadSuccess={(imageUrl) => {
          setProfile("certificationImg", imageUrl)
         }}
         onDeleteFile={(filename) => {
          setProfile("certificationImg", "")
         }}
        />
       </Box>
      </Grid>
     </React.Fragment>
    ) : null}
   </Grid>
  </Box>
 )
}

const ReviewInfo = ({profile, setProfile}) => {
 return (
  <Box sx={{maxWidth: "500px"}}>
   <Box sx={{display: "flex", gap: 2}}>
    <Box>
     <Avatar alt={_.get(profile, "name")} src={_.get(profile, "photo")} sx={{width: 72, height: 72}} />
    </Box>
    <Box flexGrow={1}>
     <Typography>SĐT: {_.get(profile, "phone")}</Typography>
     <Typography>Họ và tên: {_.get(profile, "name")}</Typography>
     <Typography>Vị trí: {_.get(profile, "levelStaff") === "caregiver" ? "Chăm sóc viên" : _.get(profile, "levelStaff") === "nurse" ? "Điều dưỡng viên" : _.get(profile, "levelStaff")}</Typography>
     {_.get(profile, "isMaid") ? (
      <Chip
       size='small'
       sx={{
        backgroundColor: "#1589d8",
        color: "#FFF",
       }}
       label='NV HeyClean'
      />
     ) : null}
     {_.get(profile, "hasUniform") ? <Typography>Đã nhận đồng phục</Typography> : null}
     {_.get(profile, "hasCleaningTools") ? <Typography>Đã nhận bộ dụng cụ dọn dẹp</Typography> : null}
    </Box>
   </Box>

   <Box mt={2}>
    <Typography variant='h6'>Thông tin CCCD</Typography>
    <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
     <Box component='img' src={_.get(profile, "identityCardInf.identityCardFront")} sx={{width: "150px", height: "auto"}} />
     <Box component='img' src={_.get(profile, "identityCardInf.identityCardBack")} sx={{width: "150px", height: "auto"}} />
    </Box>
    <Typography>Số: {_.get(profile, "identityCardInf.id")}</Typography>
    <Typography>Giới tính: {_.get(profile, "identityCardInf.gender") === "male" ? "Nam" : _.get(profile, "identityCardInf.gender") === "female" ? "Nữ" : ""}</Typography>
    <Typography>Ngày sinh: {moment(_.get(profile, "identityCardInf.birthday")).format("DD/MM/YYYY")}</Typography>
    <Typography>Địa chỉ thường trú: {_.get(profile, "identityCardInf.accommodation")}</Typography>
    <Typography>Địa chỉ tạm trú: {_.get(profile, "identityCardInf.address")}</Typography>
   </Box>
   {_.get(profile, "levelStaff") === "nurse" ? (
    <Box sx={{display: "flex", gap: 2, mt: 2}}>
     <Box flex={1}>
      <Typography variant='h6'>Bằng tốt nghiệp</Typography>
      <Box component='img' src={_.get(profile, "diplomaImg")} sx={{width: "150px", height: "auto"}} />
     </Box>
     <Box flex={1}>
      <Typography variant='h6'>Chứng chỉ</Typography>
      <Box component='img' src={_.get(profile, "certificationImg")} sx={{width: "150px", height: "auto"}} />
     </Box>
    </Box>
   ) : null}
  </Box>
 )
}
