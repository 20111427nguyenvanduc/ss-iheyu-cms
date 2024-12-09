import * as React from "react"
import { useSelector } from "react-redux"

import { styled, useTheme } from "@mui/material/styles"
import { Backdrop, Box, Modal, Slide, Button, Typography } from "@mui/material"

export default function ModalFooter({ children, sx = {} }) {
 const theme = useTheme()
 return (
  <Box sx={{ padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`, borderRadius: `0px 0px ${theme.spacing(1)} ${theme.spacing(1)}`, ...sx }}>{children}</Box>
 )
}
