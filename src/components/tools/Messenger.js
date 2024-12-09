import React from "react"
import axios from "../../services/axios"
import moment from "moment"
import ms from "ms"
import _ from "lodash"
import toastr from "toastr"
import Loading from "../others/loading-image"
import SocketChatManager from "./socketChatManager"
import CallToMember from "./CallToMember"
import {creatLog} from "../../helpers"
import Avatar from "@mui/material/Avatar"
import PreviewImage from "./PreviewImage"

import {Box, Button, ButtonBase, Checkbox, Divider, Typography, TextField, Paper} from "@mui/material"

class Messenger extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   openModalCall: false,
   sender: props.from,
   receiver: props.to,
   messages: [],
   message: "",
   isLoading: false,
   isTyping: false,
   video: false,
  }
  this.conversation = null
  this.timeoutTyping = () => {}
  this.socket = new SocketChatManager()
  this.socket.newMessageHandle = this.newMessageIncomming.bind(this)
  this.socket.typingMessageHandle = this.typingMessageIncomming.bind(this)
  this.socket.loginFail = this.loginFail.bind(this)
  this.setFrom = props.setFrom
 }

 loginFail() {
  toastr.warning("Phiên đăng nhập hết hiệu lực, mời đăng nhập lại để tiếp tục")
  localStorage.removeItem("user")
  this.setFrom({})
 }

 componentWillReceiveProps(nextProps) {
  const {sender, receiver} = this.state
  if (_.get(sender, "_id", "").toString() !== _.get(nextProps, "from._id", "").toString()) {
   if (!_.isEmpty(nextProps.from) && !nextProps.showOnly) {
    this.socket.destroy()
    this.socket.init(nextProps.from)
   }
   this.state.sender = nextProps.from
  }

  if (_.get(receiver, "_id", "").toString() !== _.get(nextProps, "to._id", "").toString()) {
   this.state.receiver = nextProps.to
   this.initConversation()
  }
 }

 componentDidMount() {
  this.initConversation()
 }

 componentDidUpdate() {
  let mesContent = document.getElementById("message-content")
  mesContent.scrollTop = mesContent.scrollHeight
 }

 initConversation() {
  this.getConversation()
  this.getMessages()
 }

 getConversation() {}

 getMessages() {
  const {isReceiver, index} = this.props
  const {sender, receiver} = this.state
  if (!sender._id || !receiver._id) return
  this.setState({
   isLoading: true,
  })
  axios
   .post("/api/messages/get", {
    members: [sender._id, receiver._id],
    limit: 999,
    from: 0,
    isReceiver,
   })
   .then((res) => {
    let result = []
    if (res.code === 200) {
     result = _.get(res, "data", [])
    }
    this.setState({
     isLoading: false,
     messages: result,
    })
   })
 }

 newMessageIncomming(data) {
  const {receiver} = this.state
  if (receiver._id && data.senderId.toString() === receiver._id.toString()) {
   this.conversation = data.conversation
   this.getMessages()
   this.setState({
    isTyping: false,
   })
  }
 }

 typingMessageIncomming(data) {
  const {receiver} = this.state
  let self = this
  clearTimeout(this.timeoutTyping)
  if (this.conversation === data.conversation) {
   this.setState({
    isTyping: true,
   })
  }

  this.timeoutTyping = setTimeout(function () {
   self.setState({
    isTyping: false,
   })
  }, 1000)
 }

 sendMessage() {
  const {message, receiver} = this.state
  if (!message.trim()) return
  this.socket
   .sendMessage({
    newMessage: message,
    receiverId: receiver._id,
   })
   .then((res) => {
    if (res.code === 200) {
     creatLog(
      {
       action: "Gửi tin nhắn",
       reason: message,
       phone: receiver.phone,
       member: receiver._id,
      },
      () => {},
     )
     this.state.message = ""
    }
    this.getMessages()
   })
   .catch((err) => {
    toastr.error("Hệ thống bận xin thử lại sau")
   })
 }

 submitSendMessage(e) {
  e.preventDefault()
  this.sendMessage()
 }

 onClickCallHandle(e) {
  this.setState({
   openModalCall: true,
   video: false,
  })
 }

 onClickVideoCallHandle(e) {
  this.setState({
   openModalCall: true,
   video: true,
  })
 }

 onCloseModal(isOpenValue) {
  this.setState({
   openModalCall: isOpenValue,
  })
 }

 render() {
  const {sender, receiver, messages, message, isLoading, isTyping, openModalCall, video} = this.state
  const {showOnly} = this.props
  return (
   <Paper className='fadeInRight animated m-n' sx={{position: "relative", width: "100%", height: "100%", border: "none", borderRadius: "8px"}}>
    <Box sx={{minHeight: "64px", padding: "8px", color: "#ffffff", borderRadius: "8px 8px 0px 0px", background: "#1589D8", display: "flex", flexWrap: "wrap"}}>
     {!showOnly ? (
      this.renderHeadName(receiver, showOnly)
     ) : (
      <React.Fragment>
       {this.renderHeadName(receiver, showOnly)}
       {this.renderHeadName(sender, showOnly)}
      </React.Fragment>
     )}
    </Box>
    {!showOnly && <CallToMember from={sender} to={receiver} video={video} modalIsOpen={openModalCall} setModalIsOpen={(value) => this.onCloseModal(value)} />}
    <Box sx={{position: "absolute", top: "64px", bottom: "0px", width: "100%"}}>
     <Box
      name='message-content'
      id='message-content'
      className='p-xs message-content'
      sx={{display: "flex", flexDirection: "column", position: "absolute", width: "100%", top: "0px", bottom: "50px", overflow: "auto", wordWrap: "break-word"}}
     >
      {isLoading ? <Loading /> : null}
      {messages && _.isArray(messages) && messages.length ? (
       messages.map((mes) => {
        if (mes.senderId === receiver._id) {
         return this.renderLeftMes(mes)
        } else {
         return this.renderRightMes(mes)
        }
       })
      ) : (
       <Box className='text-center' p={2}>
        Không có tin nhắn
       </Box>
      )}
      {isTyping &&
       this.renderLeftMes({
        message: (
         <Box className='loading-chat'>
          <i className='fa fa-circle material-icons'></i>
          <i className='fa fa-circle material-icons'></i>
          <i className='fa fa-circle material-icons'></i>
         </Box>
        ),
       })}
     </Box>
     {!showOnly && !_.isEmpty(receiver) && (
      <Box sx={{position: "absolute", width: "100%", bottom: "0px", height: "56px", p: 1}}>
       <form onSubmit={(e) => this.submitSendMessage(e)}>
        <Box display='flex' alignItems='center' gap='8px'>
         <TextField type='text' value={message} onChange={(e) => this.setState({message: e.target.value})} variant='outlined' size='small' placeholder='Nhập tin nhắn' sx={{flexGrow: 1}} />
         <Button type='submit' sx={{fontSize: "26px", background: "#90caf9", color: "#1976d2", minWidth: "0px"}}>
          <i className='fa fa-send' />
         </Button>
        </Box>
       </form>
      </Box>
     )}
    </Box>
   </Paper>
  )
 }

 renderHeadName(member, showOnly) {
  if (_.isEmpty(this.state.sender) || _.isEmpty(member)) {
   return (
    <Box display='flex' justifyContent='center' alignItems='center' flexGrow={1}>
     <strong className='text-uppercase'>Tin nhắn</strong>
     <br />
    </Box>
   )
  } else {
   let img = _.get(member, "facebook.picture", null) || "/img/HeyUfavicon.png"
   return (
    <Box display='flex' alignItems='center' flexGrow={1} gap='8px'>
     <Avatar alt='Remy Sharp' src={img} />
     <Box flexGrow={1}>
      <strong className='h4'>{_.get(member, "facebook.name", "")}</strong>
      <br />
      <small>{_.get(member, "phone", "")}</small>
     </Box>
     {!showOnly && this.renderToolBtn()}
    </Box>
   )
  }
 }

 renderToolBtn() {
  const {sender, receiver} = this.state
  return (
   <Box display='flex' gap='8px'>
    <Button type='button' variant='contained' color='info' fontSize='large' onClick={(e) => this.onClickCallHandle(e)}>
     <i className='fa fa-phone' />
    </Button>
    <Button type='button' variant='contained' color='info' fontSize='large' onClick={(e) => this.onClickVideoCallHandle(e)}>
     <i className='fa fa-video-camera' />
    </Button>
   </Box>
  )
 }

 renderLeftMes(message) {
  return (
   <Box key={message._id} className='m-xs'>
    {message.createdAt ? (
     <Box style={{display: "flex"}}>
      <small className='clearfix'>{moment(message.createdAt).format("DD/MM/YYYY HH:mm")}</small>
     </Box>
    ) : null}

    <Box style={{display: "flex"}}>
     <Box
      className='p-xs'
      style={{display: "inline-block", width: "auto", backgroundColor: "#F0F0F2", color: "#364152", maxWidth: message.imageUrl ? "30%" : "80%", borderRadius: "0px 12px 12px 12px"}}
     >
      {_.get(message, "message", "")}
      {message.imageUrl && this.imgMessage(message.imageUrl)}
     </Box>
    </Box>
   </Box>
  )
 }

 renderRightMes(message) {
  return (
   <Box key={message._id} className='m-xs'>
    {message.createdAt ? (
     <Box style={{display: "flex", justifyContent: "flex-end"}}>
      <small className='clearfix'>{moment(message.createdAt).format("DD/MM/YYYY HH:mm")}</small>
     </Box>
    ) : null}
    <Box style={{display: "flex", justifyContent: "flex-end"}}>
     <Box
      className='p-xs'
      style={{
       display: "inline-block",
       position: "relative",
       right: "0px",
       width: "auto",
       backgroundColor: "#1589D8",
       color: "#FFFFFF",
       maxWidth: message.imageUrl ? "30%" : "80%",
       borderRadius: "12px 0px 12px 12px",
      }}
     >
      {_.get(message, "message", "")}
      {message.imageUrl && this.imgMessage(message.imageUrl)}
     </Box>
    </Box>
   </Box>
  )
 }

 imgMessage(img) {
  return (
   <PreviewImage data={[{img, title: ""}]} onClose={() => {}}>
    <img src={img} style={{width: "100%"}} />
   </PreviewImage>
  )
 }
}

export default Messenger
