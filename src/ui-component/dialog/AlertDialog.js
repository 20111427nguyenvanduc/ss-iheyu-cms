import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const AlertDialog = ({children, title, description, onHandle = () => {}, onClose = () => {}}) => {
 const [open, setOpen] = React.useState(false)

 const handleClickOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 const handleConfirm = () => {
  onHandle()
  onClose()
  handleClose()
 }

 return (
  <React.Fragment>
   {React.cloneElement(children, {onClick: handleClickOpen})}
   <Dialog fullWidth maxWidth={"xs"} open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
    <DialogTitle sx={{padding: "16px"}}>{title}</DialogTitle>
    <DialogContent sx={{padding: "16px"}}>
     <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{padding: "16px"}}>
     <Button size='large' variant='outlined' onClick={handleClose} sx={{borderRadius: "12px", textTransform: "inherit"}}>
      Hủy
     </Button>
     <Button onClick={handleConfirm} size='large' variant='contained' sx={{background: "#007CFE", borderRadius: "12px", textTransform: "inherit"}}>
      Đồng ý
     </Button>
    </DialogActions>
   </Dialog>
  </React.Fragment>
 )
}

export default AlertDialog
