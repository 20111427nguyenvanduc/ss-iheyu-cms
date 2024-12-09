import React, {useState, useEffect, Fragment} from "react"
import Modal from "react-modal"
import {Divider} from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

const ZoomImg = ({data = [], index = 0, setIndex = () => {}, isOpen = false, setIsOpen = () => {}}) => {
 const closeModal = () => {
  setIsOpen(false)
 }
 return (
  <Fragment>
   <Dialog open={isOpen} onClose={closeModal}>
    <DialogTitle id='alert-dialog-title'>
     <button style={{marginTop: "0px", opacity: "1", top: "16px", right: "16px"}} type='button' className='close' onClick={closeModal}>
      <i className='fa fa-times' />
     </button>
    </DialogTitle>
    <DialogContent sx={{marginTop: "24px"}}>
     <div className='carousel slide' id='carousel1'>
      <div className='carousel-inner'>
       {data.length ? (
        typeof data == "string" ? (
         <div style={{width: "100%"}}>
          <img alt='image' style={{width: "100%", height: "100%", objectFit: "contain"}} src={data} />
         </div>
        ) : (
         data.map((img, i) => (
          <div key={i} className={`item ${i === index ? "active" : ""}`} style={{width: "100%"}}>
           <img alt='image' style={{width: "100%", height: "100%", objectFit: "contain"}} src={img} />
          </div>
         ))
        )
       ) : null}
      </div>
      {data.length > 1 && typeof data != "string" ? (
       <div>
        <a data-slide='prev' href='#carousel1' className='left carousel-control'>
         <span className='icon-prev' />
        </a>
        <a data-slide='next' href='#carousel1' className='right carousel-control'>
         <span className='icon-next' />
        </a>
       </div>
      ) : null}
     </div>
    </DialogContent>
    <DialogActions>
     <Button onClick={closeModal} autoFocus>
      Đóng
     </Button>
    </DialogActions>
   </Dialog>
  </Fragment>
 )
}
export default ZoomImg
