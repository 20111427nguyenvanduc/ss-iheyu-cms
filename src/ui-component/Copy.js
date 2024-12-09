import React from "react"
import toastr from "toastr"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Box, ButtonBase } from "@mui/material"

const Copy = ({ children, text, sx }) => {
 if (!text) {
  return null
 }
 return (
  <CopyToClipboard text={text} onCopy={() => toastr.success(`Đã sao chép ${text}`)}>
   <Box component='span' sx={{ color: "#1589D8", cursor: "pointer", ...sx }}>
    <span>{children || text}</span> <span className='icon-bold-document-copy'></span>
   </Box>
  </CopyToClipboard>
 )
}

export default Copy
