/* jslint es6 */
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import _ from "lodash"
import axios from "../../services/axios"
import ms from "ms"
import toastr from "toastr"
import CONSTANT from "../../const"
import { moneyFomat, timeTrans } from "../../helpers"
import { Box, Button, Checkbox, FormGroup, FormControlLabel, Typography, TextField, Grid, Radio, RadioGroup, FormControl, FormLabel } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

import ModalCenter from "../../ui-component/modal/ModalCenter"
import ModalHeader from "../../ui-component/modal/common/Header"
import ModalBody from "../../ui-component/modal/common/Body"
import ModalFooter from "../../ui-component/modal/common/Footer"

import ListNotifications from "../tools/ListNotifications"
import { getCMSConfig } from "../../services/app"
import { blockMember } from "../../services/member"

const blockTrans = {
 blockUtil: "Khóa tài khoản",
 blockOrderUtil: "Chặn nhận đơn",
 blockCreateOrder: "Chặn tạo đơn",
}

const reTrainingTrans = {
 [CONSTANT.BLOCK_LOGS_RETRAINING.NONE]: "Không",
 [CONSTANT.BLOCK_LOGS_RETRAINING.BIKE]: "Giao hàng",
 [CONSTANT.BLOCK_LOGS_RETRAINING.CAR]: "Taxi",
 [CONSTANT.BLOCK_LOGS_RETRAINING.HIRE_DRIVER]: "Lái hộ",
}

const BlockModal = ({ open = false, member, order = {}, data, type, onClose }) => {
 const { user } = useSelector((state) => state)
 const [state, updateState] = useState({
  blockType: "blockOrderUtil",
  timeBlock: ms("30m"),
  amount: 0,
  reTraining: 0,
  message: "",
  types: [],
  selectedType: {},
  loading: false,
 })

 const setState = (newState) => {
  updateState((oldState) => ({
   ...oldState,
   ...newState,
  }))
 }

 const getConfig = () => {
  getCMSConfig({ type: CONSTANT.CMS_CONFIG_TYPE.BLOCK_REQ_CONFIG }).then((res) => {
   setState({
    types: _.get(res, "config", []),
   })
  })
 }

 const closeModal = () => {
  setState({
   blockType: "blockOrderUtil",
   timeBlock: ms("30m"),
   message: "",
   loading: false,
  })
  if (typeof onClose === "function") {
   onClose()
  }
 }

 const setBlockUtil = (value) => {
  setState({ timeBlock: value })
 }

 const handleBlock = () => {
  const { selectedType, blockType, timeBlock, message, amount, reTraining } = state
  if (!message || !blockType || !timeBlock) {
   return toastr.warning("Kiểm tra nội dung nhập")
  }
  if (!member._id) {
   return toastr.warning("Không thấy thành viên")
  }
  const bodyData = {
   type: selectedType.code,
   blockType,
   timeBlock,
   message,
   amount,
   reTraining,
   member: member._id,
  }
  setState({ loading: true })
  blockMember(bodyData).then((response) => {
   setState({ loading: false })
   if (_.get(response, "code") === 200) {
    closeModal()
   }
  })
 }

 useEffect(() => {
  if (open) {
   getConfig()
  }
 }, [open])
 const { message, blockType, timeBlock, types, selectedType, loading, amount, reTraining } = state

 return (
  <ModalCenter open={open} onClose={closeModal}>
   <Box component='form' noValidate autoComplete='off'>
    <ModalHeader>
     <Typography>Khoá tài khoản {_.get(member, "facebook.name")}</Typography>
    </ModalHeader>
    <ModalBody sx={{ maxWidth: "600px" }}>
     <FormControl>
      <FormLabel id='reason-type' sx={{ fontSize: "16px" }}>
       Loại vi phạm
      </FormLabel>
      <RadioGroup row aria-labelledby='reason-type' name='reason-type' sx={{ justifyContent: "space-between" }}>
       {types
        .filter((typ) => typ.blockShow)
        .map((typ) => (
         <FormControlLabel
          key={typ.code}
          value={typ.code}
          control={<Radio checked={_.get(selectedType, "code", "") === typ.code} onClick={() => setState({ selectedType: typ })} />}
          label={<Typography sx={{ fontSize: "16px" }}>{typ.title}</Typography>}
         />
        ))}
      </RadioGroup>
     </FormControl>
     {!_.isEmpty(selectedType) ? (
      <React.Fragment>
       <FormControl>
        <FormLabel id='block-type' sx={{ fontSize: "16px" }}>
         Loại khóa
        </FormLabel>
        <RadioGroup row aria-labelledby='block-type' name='block-type' sx={{ justifyContent: "space-between" }}>
         {_.get(selectedType, "blockTypes", []).map((blockT) => (
          <FormControlLabel
           key={blockT}
           value={blockT}
           control={<Radio checked={blockType === blockT} onClick={() => setState({ blockType: blockT })} />}
           label={<Typography sx={{ fontSize: "16px" }}>{blockTrans[blockT] || blockT}</Typography>}
          />
         ))}
        </RadioGroup>
       </FormControl>

       <FormControl>
        <FormLabel id='block-time' sx={{ fontSize: "16px" }}>
         Thời gian khóa
        </FormLabel>
        <RadioGroup row aria-labelledby='block-time' name='block-time' sx={{ justifyContent: "space-between" }}>
         {_.get(selectedType, "listTimeBlock", []).map((time) => (
          <FormControlLabel
           key={time}
           value={time}
           control={<Radio checked={timeBlock === ms(time)} onClick={() => setState({ timeBlock: ms(time) })} />}
           label={<Typography sx={{ fontSize: "16px" }}>{timeTrans(time)}</Typography>}
          />
         ))}
        </RadioGroup>
       </FormControl>
       <FormControl>
        <FormLabel id='money' sx={{ fontSize: "16px" }}>
         Nộp phạt
        </FormLabel>
        <RadioGroup row aria-labelledby='money' name='money' sx={{ justifyContent: "space-between" }}>
         {_.get(selectedType, "listPenaltyMoney", []).map((money) => (
          <FormControlLabel
           key={money}
           value={money}
           control={<Radio checked={amount === money} onClick={() => setState({ amount: money })} />}
           label={<Typography sx={{ fontSize: "16px" }}>{moneyFomat(money)}</Typography>}
          />
         ))}
        </RadioGroup>
       </FormControl>
       <FormControl>
        <FormLabel id='re-edu' sx={{ fontSize: "16px" }}>
         Đào tạo
        </FormLabel>
        <RadioGroup row aria-labelledby='re-edu' name='re-edu' sx={{ justifyContent: "space-between" }}>
         {_.get(selectedType, "listTraining", []).map((item) => (
          <FormControlLabel
           key={item}
           value={item}
           control={<Radio checked={reTraining === item} onClick={() => setState({ reTraining: item })} />}
           label={<Typography sx={{ fontSize: "16px" }}>{reTrainingTrans[item]}</Typography>}
          />
         ))}
        </RadioGroup>
       </FormControl>

       <FormControl fullWidth>
        <FormLabel id='block-time' sx={{ fontSize: "16px" }}>
         Nội dung khóa
        </FormLabel>
        <Box sx={{ maxHeight: "300px", overflow: "auto" }}>
         <ListNotifications
          data={{
           ...data,
           member,
           timeBlock: moment(Date.now() + timeBlock).format("hh:mm DD/MM/YYYY"),
           blockType: blockTrans[blockType],
           selectedType,
          }}
          configType={12}
          type={type}
          filter={{
           type: _.get(selectedType, "code"),
          }}
          onChangeNotification={(newNoti) => setState({ message: newNoti })}
         />
        </Box>
        <TextField sx={{ mt: 2 }} label='Nội dung khóa' multiline rows={4} value={message} onChange={(e) => setState({ message: e.target.value })} />
       </FormControl>
      </React.Fragment>
     ) : null}
    </ModalBody>
    <ModalFooter>
     <Box
      sx={{
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       gap: "16px",
      }}
     >
      <LoadingButton fullWidth color='primary' variant='contained' loading={loading} onClick={handleBlock}>
       Khóa
      </LoadingButton>
      <Button fullWidth variant='outlined' onClick={closeModal}>
       Đóng
      </Button>
     </Box>
    </ModalFooter>
   </Box>
  </ModalCenter>
 )
}

export default BlockModal
