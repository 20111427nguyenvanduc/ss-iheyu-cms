import React from "react"
import moment from "moment"
import Modal from "react-modal"
import {customStyles} from "../style.js"
import {saveLog, listLogs} from "../../services/member.js"
import toastr from "toastr"
import CONSTANT from "../../const"

class MemberLogs extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   filter: props.filter || [],
   type: props.type || "NOTE",
   note: "",
   result: "",
   logs: [],
  }
 }

 componentWillReceiveProps(nextProps) {
  this.getMemberLogs()
 }

 componentDidMount() {
  this.getMemberLogs()
 }

 createLog() {
  const {member, phone} = this.props
  const {type, note, result} = this.state
  saveLog({
   member,
   phone,
   type,
   note,
   result,
  })
   .then((res) => {
    if (res.code !== 200) {
     toastr.warning("Có gì đó sai sai, F5 thử lại")
    }
    this.state.note = ""
    this.state.result = ""
    this.getMemberLogs()
   })
   .catch((err) => console.log(err))
 }

 getMemberLogs() {
  const {member} = this.props
  let {filter, logs} = this.state
  let body = {
   member: member,
   type: filter,
  }
  logs = []
  listLogs(body)
   .then((res) => {
    if (res.code === 200) {
     this.setState({
      logs: res.data,
     })
    }
   })
   .catch((err) => console.log(err))
 }

 handlSaveLog(e) {
  e.preventDefault()
  const {note} = this.state
  if (!note) {
   return toastr.warning("Bạn chưa điền nội dung ghi chú")
  }
  this.createLog()
 }

 onChangeFilter(value) {
  const {filter} = this.state
  if (filter.includes(value)) {
   filter.splice(filter.indexOf(value), 1)
  } else {
   filter.push(value)
  }
  this.getMemberLogs()
 }

 onChangeType(type) {
  if (type !== this.state.type) {
   this.state.type = type
   this.state.result = ""
   this.state.filter = [type]
   this.getMemberLogs()
  }
 }

 onKeyDown = (e) => {
  e.stopPropagation()
 }

 render() {
  const {MEMBER_LOG_RESULT} = CONSTANT
  const {logs, note, type, filter, result} = this.state
  const {key} = this.props || 1
  const types = [
   "NOTE",
   //  , "ACCOUNT_CHECK", "UNIFORM_CHECK"
  ]
  const typeTrans = {
   NOTE: "Ghi chú",
   //  ACCOUNT_CHECK: "Kiểm tra tài khoản",
   //  UNIFORM_CHECK: "Kiểm tra đồng phục",
  }
  const resultTrans = Object.values(MEMBER_LOG_RESULT).reduce((lastObj, obj) => {
   let result = lastObj || {}
   return obj ? Object.assign(result, obj) : result
  }, {})
  return (
   <div className='row m-n' key={key}>
    <div className='col-12'>
     <div style={{display: "flex", justifyContent: "space-between"}}>
      {/* <p>Bộ lọc:</p>
      {types.map((value) => (
       <div key={value} className='col-4'>
        <input id={value} type='checkbox' value={value} checked={filter.includes(value)} readOnly onClick={() => this.onChangeFilter(value)} />
        <label htmlFor={value}>{typeTrans[value]}</label>
       </div>
      ))} */}
     </div>
    </div>
    <div className='col-12'>
     <p>Lịch sử:</p>
     <div
      className='tab-pane'
      style={{
       maxHeight: "300px",
       minHeight: "100px",
       overflow: "auto",
       backgroundColor: "#ecf0f1",
       padding: "8px",
      }}
     >
      {logs.length
       ? logs.map((log, i, arrlogs) => (
          <p key={log._id} style={{borderBottom: "1px solid silver"}} className='p-xxs'>
           <span style={{fontWeight: "bold", fontSize: "12"}}>{i + 1}</span>. {_.get(log, "note")}
           <br />
           <span
            style={{
             fontStyle: "italic",
             fontWeight: "bold",
             color: "#CC00CC",
             fontSize: "10",
            }}
           >
            {moment(log.createdAt).format("DD-MM-YYYY HH:mm")} - {typeTrans[log.type] || "Ghi chú"}
            {log.result ? `(${resultTrans[log.result]})` : null} - {_.get(log, "supporter.name.first")} {_.get(log, "supporter.name.last")}
           </span>
          </p>
         ))
       : "Chưa có ghi chú"}
     </div>
    </div>
    <div className='col-12 pt-xs'>
     <div className='p-h-xs' style={{display: "flex", justifyContent: "space-between"}}>
      <label>Lưu lại ghi chú:</label>
      {/* {types.map((value) => (
       <div key={value} className='col-4'>
        <input id={"type" + value} type='checkbox' value={value} checked={value === type} readOnly onClick={() => this.onChangeType(value)} />
        <label htmlFor={"type" + value}>{typeTrans[value]}</label>
       </div>
      ))} */}
     </div>
     {MEMBER_LOG_RESULT[type] ? (
      <div style={{display: "flex", justifyContent: "space-between"}}>
       <label>Kết quả:</label>
       {Object.keys(MEMBER_LOG_RESULT[type]).map((value, i) => (
        <div key={value} className='col-4'>
         <input id={"result" + value} type='checkbox' value={value} checked={value === result} readOnly onClick={() => this.setState({result: value})} />
         <label htmlFor={"result" + value}>{MEMBER_LOG_RESULT[type][value]}</label>
        </div>
       ))}
      </div>
     ) : null}
    </div>
    <div className='tab-pane col-12 p-h-xs' style={{backgroundColor: "#f3f3f4", padding: "8px"}}>
     <form onSubmit={(e) => this.handlSaveLog(e)}>
      <div className='input-group'>
       <input
        type='text'
        onKeyDown={this.onKeyDown.bind(this)}
        value={note}
        onChange={(e) => this.setState({note: e.target.value})}
        className='input-lg form-control'
        style={{position: "static"}}
        rows='3'
       />
       <span className='input-group-btn'>
        <button type='submit' className='btn btn-lg btn-primary' style={{marginLeft: "5", height: "100%"}}>
         Lưu
        </button>
       </span>
      </div>
     </form>
    </div>
   </div>
  )
 }
}

export default MemberLogs
