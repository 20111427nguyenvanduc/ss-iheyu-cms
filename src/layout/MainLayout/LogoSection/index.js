import React from "react"

// material-ui
import { ButtonBase } from "@mui/material"

// project imports
import Logo from "../../../ui-component/Logo"

// ===========================|| MAIN LOGO ||=========================== //

const LogoSection = () => (
 <ButtonBase disableRipple>
  <img alt='image' src='/images/logo.png' width='auto' height='40' />
 </ButtonBase>
)

export default LogoSection
