import React, { useState } from "react"
import { useSelector } from "react-redux"

import { styled, useTheme } from "@mui/material/styles"
import { Button, Backdrop, Box, Modal, Slide, IconButton, Typography } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

import Header from "./common/Header"
import Body from "./common/Body"
import Footer from "./common/Footer"

const ModalWrap = styled(Modal)(({ theme }) => ({
 zIndex: 1200,
 display: "flex",
 justifyContent: "center",
 alignItems: "start",
 backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
 top: 0,
 left: 0,
 width: "100%",
 height: "100%",
 overflow: "auto",
}))

const ModalContent = styled(Box)(({ theme }) => ({
 marginTop: "80px",
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
export default function ModalCenter({ title, body, children, onConfirm, onClose, visible = false, confirmText, cancelText, afterOpen = () => {} }) {
 const theme = useTheme()
 const [open, setOpen] = useState(visible)
 const closeModal = () => {
  setOpen(false)
  if (onClose) {
   onClose()
  }
 }

 const confirmBtn = () => {
  setOpen(false)
  if (onConfirm) {
   onConfirm()
  }
 }

 const openModal = (e) => {
  e.stopPropagation()
  setOpen(true)
  afterOpen()
 }
 return (
  <React.Fragment>
   {React.cloneElement(children, { onClick: openModal })}
   <ModalWrap aria-labelledby='transition-modal-title' aria-describedby='transition-modal-description' open={open} onClose={closeModal} closeAfterTransition onClick={(e) => e.stopPropagation()}>
    <ModalContent>
     <Close onClick={closeModal} />
     <Header>{title}</Header>
     <Body>{body}</Body>
     <Footer sx={{ display: "flex", gap: theme.spacing(1) }}>
      <Button fullWidth variant='contained' onClick={confirmBtn}>
       {confirmText || "Xác nhận"}
      </Button>
      {cancelText ? (
       <Button fullWidth variant='outlined' onClick={closeModal}>
        {cancelText || "Hủy"}
       </Button>
      ) : null}
     </Footer>
    </ModalContent>
   </ModalWrap>
  </React.Fragment>
 )
}
