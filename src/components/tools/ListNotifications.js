/*jslint es6 */
import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
import { Box, Button, Checkbox, FormGroup, FormControlLabel, Typography, TextField, Grid, Paper, Stack } from "@mui/material"
import toastr from "toastr"
import _ from "lodash"

import ModalCenter from "../../ui-component/modal/ModalCenter"
import ModalHeader from "../../ui-component/modal/common/Header"
import ModalBody from "../../ui-component/modal/common/Body"
import ModalFooter from "../../ui-component/modal/common/Footer"

import { getCMSConfig } from "../../services/app"

const Item = styled(Paper, { shouldForwardProp: (prop) => prop !== "active" })(({ theme, active }) => ({
 padding: theme.spacing(1),
 cursor: "pointer",
 ...(active && {
  backgroundColor: "#1976d2",
  color: "#ffffff",
 }),
}))

const ListNotifications = ({ onChangeNotification = () => {}, data = {}, configType, type, filter }) => {
 const { user } = useSelector((state) => state)
 const [state, updateState] = useState({
  notifications: [],
  notification: null,
  templates: [],
 })

 const setState = (newState) => {
  updateState((oldState) => ({
   ...oldState,
   ...newState,
  }))
 }

 const setNotifications = (templates) => {
  data.user = user
  const notifications = templates
   .filter((notification, i) => {
    let valid = false
    if (!filter || _.isEmpty(filter)) {
     valid = true
    } else {
     valid = Object.keys(filter).every((key) => {
      if (_.isArray(notification[key])) {
       return notification[key].includes(filter[key])
      }
      return filter[key] === notification[key]
     })
    }
    return valid
   })
   .map((notification, i) => {
    let notifyMsg = notification.content
    Object.keys(notification.mapData || {}).forEach((field, i) => {
     let regex = new RegExp(`[${field}]`, "gi")
     notifyMsg = notifyMsg.replaceAll(`[${field}]`, _.get(data, notification.mapData[field], "..."))
    })
    return notifyMsg
   })
  setState({
   notifications,
   templates,
  })
 }

 const configNotify = () => {
  data.user = user
  getCMSConfig({type: configType}).then((res) => {
   if (res.code === 200) {
    let { config } = res
    setNotifications(_.get(config[type || "all"], "templates", []))
   }
  })
 }

 useEffect(() => {
  setNotifications(state.templates)
 }, [data, filter])

 useEffect(() => {
  configNotify()
 }, [configType])

 const setNotification = (notification) => {
  setState({ notification })
  onChangeNotification(notification)
 }

 const { notifications, notification } = state
 return (
  <Box sx={{ width: "100%" }}>
   <Stack spacing={2}>
    {notifications.map((noti, i) => (
     <Item key={i} active={noti === notification} onClick={() => setNotification(noti)}>
      <strong>{i + 1}.</strong> "{noti}"
     </Item>
    ))}
   </Stack>
  </Box>
 )
}

export default ListNotifications
