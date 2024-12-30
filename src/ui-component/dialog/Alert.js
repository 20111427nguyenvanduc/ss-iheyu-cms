import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const AlertDialog = ({ open, title, description, handleClose = () => {}, handleCancel, handleConfirm}) => {
 return (
  <React.Fragment>
   <Dialog fullWidth maxWidth={"xs"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle sx={{ padding: "16px" }}>{title}</DialogTitle>
    <DialogContent sx={{ padding: "16px" }}>
     <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ padding: "16px" }}>
     {handleCancel ? (
      <Button size='large' variant='outlined' onClick={handleCancel}>
       Đóng
      </Button>
     ) : null}
     {handleConfirm ? (
      <Button onClick={handleConfirm} size='large' variant='contained' sx={{ background: "#007CFE", borderRadius: "12px", textTransform: "inherit" }}>
       Đồng ý
      </Button>
     ) : null}
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default AlertDialog
