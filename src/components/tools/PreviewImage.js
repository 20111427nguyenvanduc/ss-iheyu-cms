import React, { useState, Fragment, cloneElement } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog, { DialogProps } from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import ZoomImage from "./ZoomImage"

export default function PreviewImage({ children, onClose, data }) {
 const [open, setOpen] = useState(false)
 const handleOpen = () => {
  setOpen(true)
 }
 const handleClose = () => {
  setOpen(false)
  onClose()
 }
 return (
  <Fragment>
   {children ? cloneElement(children, { onClick: handleOpen }) : null}
   <Dialog open={open} onClose={handleClose} PaperProps={{
    sx: {maxWidth: '100vw'}
   }}>
    <DialogContent sx={{ textAlign: "center", width: "800px", maxWidth: "90vw", height: "800px", maxHeight: "90vh" }}>
     <ZoomImage data={data} />
    </DialogContent>
    <DialogActions>
     <Button onClick={handleClose}>Đóng</Button>
    </DialogActions>
   </Dialog>
  </Fragment>
 )
}
