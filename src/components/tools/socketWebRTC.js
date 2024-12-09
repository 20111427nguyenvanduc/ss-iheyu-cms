import {WEBRTC_URL} from '../../config.js';
import MediaHandler from './MediaHandler';
import socketIOClient from 'socket.io-client';

const noOp = () => {}
class WebRTCManager {
   constructor(options) {
     this.localStream = null;
     this.socketURL = WEBRTC_URL;
     this.socket = null;
     this.mediaDevices = new MediaHandler();
     this.peerConnections = null;
      // {"iceServers": [{"url": "turn:tuanhm@turn.heyu.asia:2222", "credential": "123456aA@", "username": "tuanhm"}]};
     this.hasConnect = false;
     // function like callback
     this.onError = noOp;
     this.onFriendConnected = noOp;
     this.onStartCall = noOp;
     this.onConnecting = noOp;
     this.onFriendLeft = noOp;
     this.onRinging = noOp;
     this.onCancel = noOp;
     this.onDisconectVideo = noOp;
     this.onReconnectVideo = noOp;
     this.handleTrackEvent = noOp;
   }
   connectSocket() {
     return new Promise((resolve, reject) => {
       this.socket = socketIOClient(this.socketURL, {transports: ['websocket'], jsonp: false, reconnection: true});
       this.socket.on('exchange', (data) => {
         this.exchange(data);
       });
       this.socket.on('leave', (data) => {
         this.leave(data);
       });
       this.socket.on('connect', (data) => {
         this.hasConnect = true;
         return resolve();
       });
       this.socket.on('rejectCall', (data) => {
         this.onError({
           message: 'Người dùng đã từ chối cuộc gọi của bạn.'
         })
       });
       this.socket.on('cancelCall', (data) => {

         this.onCancel();
       });
       this.socket.on('userNotReply', (data) => {
         this.onError({
           message: 'Người dùng không phản hồi cuộc gọi của bạn. Vui lòng gọi lại bằng số điện thoại theo cách thông thường'
         })
       })
       this.socket.on('disconnectVideo',() => {
         this.onDisconectVideo()
       })
       this.socket.on('reconnectVideo',() => {
         this.onReconnectVideo()
       })
       this.socket.on('disconnect', (data) => {
       })
       this.socket.on('connect_error', (err) => {
         if(!this.hasConnect) {
           return reject();
         }
       });
     })
   }
   login(memberToken) {
     return new Promise((resolve, reject) => {
       this.socket.emit('login', {memberToken}, (result) => {
         if(result.code === 200) {
           return resolve();
         }
         return reject();
       })
     });
   }
   getLocalStream(video, audio) {
     var self = this;
     return new Promise((resolve, reject) => {
       this.mediaDevices
        .getPermissions(video, audio)
        .then(stream=>{
          self.localStream = stream;
          resolve(stream);
        }).catch(err => {
          reject(err)
        });
     })
   }

   callToMember(userId, video, callbacks) {
     return new Promise((resolve, reject) => {
       this.socket.emit('callToMember', {userId, video}, (result) => {
         if(result.code === 200) {
           this.roomId = result.roomId;
           this.onRinging();
           return resolve();
         }
         if(result.code === 301) {
           return reject({
             message: result.message || 'Người dùng đang bận'
           })
         }
         if(result.code === 302) {
           return reject({
             message: result.message || 'Không thể tạo cuộc gọi với người dùng này'
           })
         }
         return reject();
       });
     })
   }
   answer(userId, roomId, video, callbacks) {
     this.roomId = roomId;
     this.createPeerConnection({userId, roomId, video}, true, false);
   }
   rejectCall(userId, roomId) {
     if(this.socket) {
       this.socket.emit('rejectCall', {userId, roomId});
     }
   }
   cancelCall() {
     if(this.socket) {
       this.socket.emit('cancelCall');
     }
   }
   exchange(data) {
     var userId = data.from;
     this.peerConnections = this.peerConnections || this.createPeerConnection({userId: userId, video: data.video}, false, true)
     var pc = this.peerConnections;
     if (data.sdp) {
       const desc = new RTCSessionDescription(data.sdp);
       pc.setRemoteDescription(desc).then(() => {
         if (pc.remoteDescription.type == "offer")
         pc.createAnswer().then(desc => {
           pc.setLocalDescription(desc).then(() => {
             this.socket.emit('exchange', {'to': userId, 'sdp': pc.localDescription, video: data.video  });
           }).catch(this.onError)
         }).catch(this.onError)
       }).catch(this.onError)
     } else {
       const candidate = new RTCIceCandidate(data.candidate);
       pc.addIceCandidate(candidate)
            .catch(e => console.log(e));
     }
   }
   createPeerConnection(friend, isOffer) {
     let userId = friend.userId;
     var self = this;
     var peer = new RTCPeerConnection({
            iceServers: [
                {"urls": "turn:turn-hcm.heyu.asia:2222", "credential": "123456aA@", "username": "tuanhm"},
                {"urls": "turn:turn.heyu.asia:2222", "credential": "123456aA@", "username": "tuanhm"}
                // {
                //     urls: "stun:stun.stunprotocol.org"
                // },
                // {
                //     urls: 'turn:numb.viagenie.ca',
                //     credential: 'muazkh',
                //     username: 'webrtc@live.com'
                // },
                // {
                //     urls: "stun:tuanhm@turn.heyu.asia:2221"
                // },
                // {
                //     urls: 'turn:tuanhm@turn.heyu.asia:2222',
                //     credential: '123456aA@',
                //     username: 'tuanhm'
                // },
            ]
          }
         );

     peer.onicecandidate = (e) => {
          if (e.candidate) {
            this.socket.emit('exchange', {'to': userId, 'candidate': event.candidate, video: friend.video});
          }
     };
     peer.ontrack = this.handleTrackEvent;
     peer.onnegotiationneeded = () => {
       if (isOffer) {
         createOffer.bind(this)();
       }
     };

     function createOffer() {
       peer.createOffer().then((desc) => {
         peer.setLocalDescription(desc).then(() => {
           self.socket.emit('acceptCall', {userId, 'sdp': peer.localDescription, roomId: friend.roomId, video: friend.video}, (result) => {
             if(result.code !== 200) {
               self.onError();
             }
           });
         }).catch(self.onError);
       }).catch(self.onError);
     }

     peer.oniceconnectionstatechange = (event) => {
       if (event.target.iceConnectionState === 'connected') {
         this.onStartCall();
         // this.createDataChannel();
       }
       if (event.target.iceConnectionState === 'checking') {
         this.onConnecting();
       }
       if (event.target.iceConnectionState === 'disconnected') {
         this.leave();
       }
       if(event.target.iceConnectionState === 'failed') {
         this.onError();
       }
     };

     peer.onsignalingstatechange = (event) => {
     };

     peer.onaddstream =  (event) => {
       this.onFriendConnected(userId, event.stream);
     };
     if(!self.localStream) {
       this
        .getLocalStream(friend.video, true)
        .then((stream) => {
          peer.addStream(stream);
        })
        .catch((err) => {
          this.onError();
        })
     } else {
       peer.addStream(self.localStream);
     }
     return peer;

   }

   updateLocalStream(video, audio){
     if (!this.localStream) return
     const audioTracks = this.localStream.getAudioTracks()
     if (audioTracks.length) {
       audioTracks.forEach((track, i) => {
         track.enabled = audio
       });
     }
   }

   sendMessage(data) {
     if(this.peerConnections && this.peerConnections.textDataChannel) {
       this.peerConnections.textDataChannel.send(data);
     }
   }
   createDataChannel() {
     if (this.peerConnections.textDataChannel) {
       return;
     }
     const dataChannel = this.peerConnections.createDataChannel("text");
     dataChannel.onmessage = (event) => {
       if(event.data === 'endCall') {
         this.leave();
       }
     }
     this.peerConnections.textDataChannel = dataChannel;
   }
   leave(data) {
     this.onFriendLeft(data);
     if(this.peerConnections) {
       this.peerConnections.close();
       this.peerConnections = null;
     }
   }
   endCall() {
     // this.sendMessage("endCall");
     if(this.peerConnections) {
       this.peerConnections.close();
       this.peerConnections = null;
     }
     if(this.socket && this.roomId) {
       this.socket.emit('endCall', this.roomId);
     }
   }
   disconnectVideo() {
     if(this.socket && this.roomId) {
       this.socket.emit('disconnectVideo', this.roomId);
     }
   }
   reconnectVideo() {
     if(this.socket && this.roomId) {
       this.socket.emit('reconnectVideo', this.roomId);
     }
   }
   destroy() {
     this._isDestroy = true;
     if(this.socket) {
       this.socket.disconnect();
     }
     if(this.peerConnections) {
       this.peerConnections.close();
       this.peerConnections = null;
     }
   }
 }
 export default WebRTCManager;
