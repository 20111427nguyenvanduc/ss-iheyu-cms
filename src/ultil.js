import React from "react"
import CONSTANT from "./CONSTANT"
import {Box, Typography} from "@mui/material"

const STATUS_TEXT_MAP = {
 [CONSTANT.STATUS.CHO_TIEP_NHAN]: "Chờ tiếp nhận",
 [CONSTANT.STATUS.DA_TIEP_NHAN]: "Đã tiếp nhận",
 [CONSTANT.STATUS.DANG_XU_LY]: "Đang xử lý",
 [CONSTANT.STATUS.DA_XU_LY]: "Đã xử lý",
 [CONSTANT.STATUS.DA_TU_CHOI]: "Đã từ chối",
}

const STATUS_JOB_TEXT_MAP = {
 [CONSTANT.STATUS_JOB.CHO_TN_PA]: "Chờ tiếp nhận phản ánh",
 [CONSTANT.STATUS_JOB.CHO_PHAN_PHOI]: "Chờ phân phối",
 [CONSTANT.STATUS_JOB.CHO_XU_LY]: "Chờ xử lý",
 [CONSTANT.STATUS_JOB.DANG_XU_LY]: "Đang xử lý",
 [CONSTANT.STATUS_JOB.CHO_DUYET_KQ]: "Chờ duyệt kết quả",
 [CONSTANT.STATUS_JOB.HOAN_THANH]: "Hoàn thành",
 [CONSTANT.STATUS_JOB.DA_TU_CHOI]: "Đã từ chối",
}

export const TextTransStatus = ({status}) => {
 return STATUS_TEXT_MAP[status] || "Chờ tiếp nhận"
}

export const TextTransJob = ({status}) => {
 return STATUS_JOB_TEXT_MAP[status] || "Chờ tiếp nhận phản ánh"
}

export const translateStatus = (status) => {
 switch (status) {
  case CONSTANT.STATUS.CHO_TIEP_NHAN:
   return badge("Chờ tiếp nhận", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS.DA_TIEP_NHAN:
   return badge("Đã tiếp nhận", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS.DANG_XU_LY:
   return badge("Đang xử lý", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS.DA_XU_LY:
   return badge("Đã xử lý", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS.DA_TU_CHOI:
   return badge("Đã từ chối", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  default:
   return status
 }
}

export const translateStatusJob = (status) => {
 switch (status) {
  case CONSTANT.STATUS_JOB.CHO_TN_PA:
   return badge("Chờ tiếp nhận phản ánh", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS_JOB.CHO_PHAN_PHOI:
   return badge("Chờ phân phối", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS_JOB.CHO_XU_LY:
   return badge("Chờ xử lý", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS_JOB.DANG_XU_LY:
   return badge("Đang xử lý", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS_JOB.CHO_DUYET_KQ:
   return badge("Chờ duyệt kết quả", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS_JOB.HOAN_THANH:
   return badge("Hoàn thành", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  case CONSTANT.STATUS_JOB.DA_TU_CHOI:
   return badge("Đã từ chối", "icon-bold-clock", "#E5F1FF", "#007CFE")
   break
  default:
   return status
 }
}

const badge = (title, icon = "icon-bold-clock", gbcolor, textcolor) => {
 return (
  <Box
   sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: gbcolor,
    padding: "4px 8px",
    borderRadius: "100px",
    gap: 1,
    cursor: "pointer",
    flexShrink: 0,
   }}
  >
   <i className={icon} style={{color: textcolor, fontSize: "16px"}} />
   <Typography variant='p' sx={{fontSize: "14px", color: textcolor, fontWeight: 400}}>
    {title}
   </Typography>
  </Box>
 )
}
