import _ from 'lodash';
import ms from 'ms';
import socketIOClient from 'socket.io-client';
import {CHAT_URL} from '../../config.js'
// Enable playback in silence mode
const SOCKET_STATUS = {
  CONNECTING: 1,
  CONNECTED: 2,
  ERROR: 3
}
const MAX_TIME_PICKING_IMG = ms('5m');
const noOp = () => {}
class SocketChatManager {
  constructor() {
    this.socketURL = CHAT_URL;
    this.socket = null;
    this.timeoutTyping = {};
    this.statusSocket = SOCKET_STATUS.CONNECTING;
    this.currentNetInfoType = '';
    this.isPickingPhoto = false;
    this.newMessageHandle = noOp;
    this.typingMessageHandle = noOp;
    this.loginFail = noOp;
  }
  init(member) {
    this.connectSocket(member);
  }

  connectSocket(member) {
    this.socket = socketIOClient(this.socketURL, {transports: ['websocket'], jsonp: false, reconnection: true});
    this.socket.on('connect', (data) => {
      // console.log('socket:connect', data);
      this.login(member);
    });
    this.socket.on('connect_error', (err) => {
      // console.log('socket:connect_error', err);
      this.statusSocket = SOCKET_STATUS.ERROR;
    });
    this.socket.on('error', (err) => {
      // console.log('socket:error', err);
      this.statusSocket = SOCKET_STATUS.ERROR;
    });
    this.socket.on('disconnect', (reason) => {
      // console.log('socket:disconnect', reason);
      this.statusSocket = SOCKET_STATUS.ERROR;
    });
    this.socket.on('reconnecting', (data) => {
      // console.log('socket:reconnecting', data);
      this.statusSocket = SOCKET_STATUS.CONNECTING;
    });
    this.socket.on('newMessage', (data) => {
      // console.log('newMessage', data);
      this.newMessageHandle(data)
    });
    this.socket.on('typingMessage', (data) => {
      // console.log('typingMessage', data);
      this.typingMessageHandle(data)
    });
    this.socket.on('seenMessage', (data) => {

    });
  }

  destroy() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(arg) {
    return new Promise((resolve, reject) => {
      if(!arg._id) {
        const fakeId = Date.now() + '';
        arg._id = fakeId;
      }
      this.socket.emit('sendMessage', {message: arg.newMessage, conversation: arg.conversation, receiverId: arg.receiverId, file: arg.file}, (dataBack) => {
        if(!arg.conversation) {
        }
        if(dataBack && dataBack.code === 200) {
          return resolve(dataBack);
        } else {
          return reject();
        }
      });
    });
  }

  typingMessage(conversation) {
    this.socket.emit('typingMessage',{conversation});
  }

  seenMessage(messageInfo) {
    this.socket.emit('seenMessage', {id: messageInfo.id}, (dataBack) => {
      if(dataBack && dataBack.code === 200) {
        if(messageInfo && messageInfo.senderId) {

        }
      }
    });
  }
  login(member) {
    const memberToken = _.get(member, 'memberToken', '');
    if(memberToken) {
      this.socket.emit('login', {memberToken}, (data) => {
        // console.log('socket: login', data);
        if(data && data.code === 200) {
          this.statusSocket = SOCKET_STATUS.CONNECTED;
        } else {
          this.loginFail()
        }
      })
    } else {
      this.handleError();
    }
  }
  handleError(err) {
    setTimeout(() => {
      this.destroy();
      this.init();
    }, 2000);
    this.statusSocket = SOCKET_STATUS.ERROR;
  }
}
export default SocketChatManager;
