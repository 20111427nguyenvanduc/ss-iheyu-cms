import React from "react"
import axios from "../../services/axios"
import ms from "ms"
import moment from "moment"
import _ from "lodash"
import Modal from "react-modal"
import toastr from "toastr"
import Loading from "../others/loading-image"
import SocketWebRTC from "./socketWebRTC"
// import PopupImage from "../Elements/PopupImage/PopupImage.js"
import {creatLog} from "../../helpers"
import {customStyles} from "../style.js"

class Messenger extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   modalIsOpen: props.modalIsOpen,
   sender: props.from,
   receiver: props.to,
   video: props.video,
   audio: true,
   muted: false,
   isLoading: false,
   textStatus: "",
   connected: false,
   reCall: false,
   count: "00:00:00",
   screenVideo: true,
  }
  this.setModalIsOpen = props.setModalIsOpen
  this.callingTime = null
  this.conversation = null
  this.socket = new SocketWebRTC()
  this.socket.onFriendLeft = this.onFriendLeft.bind(this)
  this.socket.onError = this.onError.bind(this)
  this.socket.handleTrackEvent = this.handleTrackEvent.bind(this)
  this.socket.onFriendConnected = this.onFriendConnected.bind(this)
  this.socket.onStartCall = this.onStartCall.bind(this)
  this.socket.onConnecting = this.onConnecting.bind(this)
  this.socket.onRinging = this.onRinging.bind(this)
  this.socket.onCancel = this.onCancel.bind(this)
  this.socket.onDisconectVideo = this.onDisconectVideo.bind(this)
  this.socket.onReconnectVideo = this.onReconnectVideo.bind(this)
 }

 componentWillReceiveProps(nextProps) {
  const {sender, receiver} = this.state
  if (_.get(sender, "_id", "").toString() !== _.get(nextProps, "from._id", "").toString()) {
   if (!_.isEmpty(nextProps.from)) {
    this.socket.destroy()
    this.socket.connectSocket().then(() => this.socket.login(_.get(nextProps, "from.memberToken", "")))
   }
   this.state.sender = nextProps.from
  }

  if (_.get(receiver, "_id", "").toString() !== _.get(nextProps, "to._id", "").toString()) {
   this.state.receiver = nextProps.to
  }
  this.setState({
   modalIsOpen: nextProps.modalIsOpen,
   video: nextProps.video,
  })
 }

 componentDidMount() {
  this.ringtone = new Audio("/sound/ringtone.mp3")
 }

 openModal() {
  this.setModalIsOpen(true)
 }

 afterOpenModal() {
  this.setState({
   reCall: false,
   audio: true,
   count: "00:00:00",
  })
  this.callToMember()
 }

 callToMember() {
  const {video, audio, sender, receiver} = this.state
  this.socket
   .getLocalStream(video, audio)
   .then((stream) => {
    this.senderVideo.srcObject = stream
    // this.senderVideo.play()
    // this.setState({
    //   sender
    // })
    if (_.isEmpty(receiver)) return this.onError({message: "Không tìm thấy người nhận!"})
    this.socket
     .callToMember(receiver._id, video, () => {})
     .then((resolve) => {
      creatLog(
       {
        action: "Gọi qua App",
        reason: "Bắt đầu gọi",
        phone: receiver.phone,
        member: receiver._id,
       },
       () => {},
      )
      this.setState({
       reCall: false,
       count: "00:00:00",
      })
     })
     .catch((reject) => {
      this.closeModal()
      toastr.warning(reject.message || "Hệ thống bận vui lòng thử lại sau")
     })
   })
   .catch((err) => {
    creatLog(
     {
      action: "Gọi qua App",
      reason: "Lỗi kết nối",
      phone: receiver.phone,
      member: receiver._id,
     },
     () => {},
    )
    this.closeModal()
    toastr.error(err || "Vui lòng kiểm tra lại quyền truy cập của máy")
   })
 }

 onFriendConnected(userId, stream) {
  const {receiver} = this.state
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Người dùng kết nối",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
  this.setState({
   connected: true,
   statusText: "Đã kết nối",
  })
 }

 onConnecting() {
  const {receiver} = this.state
  this.setState({
   statusText: "Đang kết nối...",
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Đang kết nối...",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
  this.ringtone.pause()
  this.ringtone.currentTime = 0
 }

 onRinging() {
  const {receiver} = this.state
  this.setState({
   statusText: "Đang đổ chuông...",
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Đang đổ chuông...",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
  this.ringtone.play()
 }

 onCancel() {
  const {receiver} = this.state
  this.setState({
   statusText: "Cuộc gọi bị hủy",
   reCall: true,
   audio: true,
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Cuộc gọi bị hủy",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
  this.ringtone.pause()
 }

 onDisconectVideo() {
  const {receiver} = this.state
  this.setState({
   statusText: "Mất kết nối video",
   screenVideo: false,
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Mất kết nối video",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
 }

 onReconnectVideo() {
  const {receiver} = this.state
  this.setState({
   statusText: "Đã kết nối",
   screenVideo: true,
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Kết nối lại video",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
 }

 handleTrackEvent(e) {
  const {receiver} = this.state
  this.receiverVideo.srcObject = e.streams[0]
  this.receiverVideo.play()
  this.setState({
   connected: true,
   statusText: "Đã kết nối",
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Kết nối video",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
 }

 onStartCall() {
  const {receiver} = this.state
  this.setState({
   statusText: "Đã kết nối",
   connected: true,
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Bắt đầu gọi",
    phone: receiver.phone,
    member: receiver._id,
   },
   () => {},
  )
  this.startCountingTime()
 }

 onFriendLeft() {
  const {receiver, count} = this.state

  this.stopStreamedVideo(this.senderVideo)
  this.stopCountingTime()
  this.setState({
   statusText: "Ngắt kết nối cuộc gọi",
   connected: false,
   reCall: true,
   audio: true,
  })
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Người dùng ngắt kết nối cuộc gọi",
    phone: receiver.phone,
    member: receiver._id,
    data: {
     timeToDone: count
      .split(":")
      .map((time, i) => ms(`${time}${i == 0 ? "h" : i == 1 ? "m" : "s"}`))
      .reduce((total, time) => total + time, 0),
    },
   },
   () => {},
  )
  this.ringtone.pause()
 }

 onError(error) {
  this.stopStreamedVideo(this.senderVideo)
  this.stopCountingTime()
  this.ringtone.pause()
  this.ringtone.currentTime = 0
  this.setState({
   statusText: error.message || "Có lỗi xảy ra vui lòng thử lại sau",
   connected: false,
   reCall: true,
   audio: true,
  })
  const {receiver, count} = this.state
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Lỗi kết nối",
    phone: receiver.phone,
    member: receiver._id,
    data: {
     timeToDone: count
      .split(":")
      .map((time, i) => ms(`${time}${i == 0 ? "h" : i == 1 ? "m" : "s"}`))
      .reduce((total, time) => total + time, 0),
    },
   },
   () => {},
  )
  this.closeModal()
 }

 closeModal() {
  this.socket.endCall()
  this.ringtone.pause()
  this.ringtone.currentTime = 0
  const {video, sender} = this.state
  this.stopStreamedVideo(this.senderVideo)
  // this.stopStreamedVideo(this.receiverVideo)
  this.setState({
   audio: true,
   reCall: false,
   connected: false,
   statusText: "",
  })
  const {receiver, count} = this.state
  creatLog(
   {
    action: "Gọi qua App",
    reason: "Kết thúc cuộc gọi",
    phone: receiver.phone,
    member: receiver._id,
    data: {
     timeToDone: count
      .split(":")
      .map((time, i) => ms(`${time}${i == 0 ? "h" : i == 1 ? "m" : "s"}`))
      .reduce((total, time) => total + time, 0),
    },
   },
   () => {},
  )
  this.setModalIsOpen(false)
 }

 stopStreamedVideo(videoElem) {
  const stream = videoElem && videoElem.srcObject
  if (!stream) return
  const tracks = stream.getTracks()
  tracks.length &&
   tracks.forEach(function (track) {
    track.stop()
   })
 }

 onUpdateLocalStream(newVideoState, newAudioState) {
  const {video, audio} = this.state
  this.socket.updateLocalStream(_.isUndefined(newVideoState) ? video : newVideoState, _.isUndefined(newAudioState) ? audio : newAudioState)
  this.forceUpdate()
 }

 mutedSender() {
  this.state.audio = !this.state.audio
  this.onUpdateLocalStream()
 }

 mutedReceiver() {
  this.setState({
   muted: !this.state.muted,
  })
 }

 startCountingTime() {
  this.stopCountingTime()
  let seconds = 0
  let minutes = 0
  let hours = 0
  this.callingTime = setInterval(() => {
   seconds++
   if (seconds > 59) {
    seconds = 0
    minutes++
    if (minutes > 59) {
     minutes = 0
     hours++
     if (hours > 23) {
      hours = 0
     }
    }
   }
   this.renderTime(seconds, minutes, hours)
  }, 1000)
 }

 stopCountingTime() {
  clearInterval(this.callingTime)
 }

 renderTime(s, m, h) {
  if (s < 10) {
   s = "0" + s
  }
  if (m < 10) {
   m = "0" + m
  }
  if (h < 10) {
   h = "0" + h
  }
  this.setState({
   count: `${h}:${m}:${s}`,
  })
 }

 render() {
  const {sender, receiver, isLoading, video, muted, audio, statusText, connected, reCall, count, screenVideo} = this.state
  return (
   <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal.bind(this)} onRequestClose={() => {}} style={customStyles} contentLabel='Example Modal'>
    <div style={{width: "60vw", height: "85vh", position: "relative"}}>
     {connected ? (
      <div style={{width: "100%", height: "100%", position: "relative"}}>
       <div style={{width: "100%", height: "10%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div className='feed-element p-n'>
         <a className='pull-left'>
          {/* <PopupImage imagesData={_.get(receiver, "facebook.picture", "")}> */}
           <img alt='image' className='img-circle img-sm' src={_.get(receiver, "facebook.picture", "")} />
          {/* </PopupImage> */}
         </a>
         <div className='media-body'>
          <strong style={{fontSize: "16px", fontWeight: "bold"}}>{_.get(receiver, "facebook.name", "")}</strong>
          <br />
          <span>{statusText}</span>
         </div>
        </div>
        <span className='font-bold m-t-xs'>{count}</span>
       </div>
       <div style={{width: "100%", height: "89%", position: "relative"}}>
        <video
         ref={(ref) => {
          this.receiverVideo = ref
         }}
         muted={muted}
         hidden={!screenVideo}
        ></video>
       </div>
       <div style={{position: "fixed", bottom: "20px", left: "0px", right: "0px", display: "flex", justifyContent: "center"}}>
        <div className='p-md'>
         <button type='button' className='btn btn-rounded btn-default btn-lg' onClick={() => this.mutedReceiver()}>
          {muted ? <i className='fa fa-volume-off' /> : <i className='fa fa-volume-up' />}
         </button>
        </div>

        <div className='p-md'>
         <button type='button' className='btn btn-rounded btn-default btn-lg' onClick={() => this.mutedSender()}>
          {audio ? <i className='fa fa-microphone' /> : <i className='fa fa-microphone-slash' />}
         </button>
        </div>

        <div className='p-md'>
         <button type='button' className='btn btn-rounded btn-danger btn-lg' onClick={() => this.closeModal()}>
          <i className='fa fa-times' />
         </button>
        </div>
       </div>
      </div>
     ) : (
      <div className='text-center' style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
       <span style={{fontSize: "20px", fontWeight: "bold"}}>{statusText}</span>
       <img alt='image' className='img-circle img-lg m-t-md' src={_.get(receiver, "facebook.picture", "")} />
       <strong style={{fontSize: "16px", fontWeight: "bold"}}>{_.get(receiver, "facebook.name", "")}</strong>
       {reCall && (
        <button className='btn btn-success m-t-md' onClick={() => this.callToMember()}>
         Gọi lại
        </button>
       )}
      </div>
     )}

     <div style={{width: "200px", height: "200px", position: "fixed", top: "10px", left: "50px"}} hidden>
      <div style={{width: "100%", height: "100%", position: "relative"}}>
       <video
        ref={(ref) => {
         this.senderVideo = ref
        }}
        muted
       ></video>
      </div>
     </div>
    </div>
    <i onClick={this.closeModal.bind(this)} className='fa fa-times closepopup'></i>
   </Modal>
  )
 }
}

export default Messenger
