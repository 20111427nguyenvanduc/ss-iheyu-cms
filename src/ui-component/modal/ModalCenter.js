import * as React from "react"
import { useSelector } from "react-redux"

import { styled } from "@mui/material/styles"
import { Backdrop, Box, Modal, Slide, IconButton, Typography } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

const ModalWrap = styled(Modal)(({ theme }) => ({
 zIndex: 1200,
 display: "grid",
 justifyContent: "center",
 alignItems: "center",
 backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
 top: 0,
 left: 0,
 width: "100%",
 height: "100%",
 overflow: "auto",
}))

const ModalContent = styled(Box)(({ theme }) => ({
 borderRadius: theme.spacing(1),
 position: "relative",
 backgroundColor: theme.palette.background.paper,
 boxShadow: 24,
 minWidth: "300px",
 maxWidth: "100vw",
}))

const ButtonIcon = styled(IconButton)(({ theme }) => ({
 position: "absolute",
 top: theme.spacing(1),
 right: theme.spacing(1),
}))
const Close = (props) => {
 return (
  <ButtonIcon {...props}>
   <ClearIcon size='md' />
  </ButtonIcon>
 )
}
export default function ModalCenter({ open, children, onClose }) {
 return (
  <ModalWrap aria-labelledby='transition-modal-title' aria-describedby='transition-modal-description' open={open} onClose={onClose} closeAfterTransition>
   <ModalContent>
    <Close onClick={onClose} />
    {children}
   </ModalContent>
  </ModalWrap>
 )
}
