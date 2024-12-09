import React from "react"
import moment from "moment"
import Modal from "react-modal"
import {customStyles} from "../style.js"
import toastr from "toastr"
import MemberLogsComponent from "./MemberLogs"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"

class ViewDiary extends React.Component {
 constructor(props) {
  super(props)
  this.state = {
   modalIsOpen: false,
   historyLogs: [],
   isLoading: true,
   tabActive: 0,
  }
 }

 openModal() {
  this.setState({
   modalIsOpen: true,
  })
 }

 afterOpenModal() {}

 closeModal() {
  this.setState({
   modalIsOpen: false,
  })
 }

 tabsSelected(index, phone) {
  this.setState({
   tabActive: index,
  })
 }

 render() {
  let tab = this.props.phones
  let activeStyle = {backgroundColor: "#ffffff", fontWeight: "bold", boxShadow: "2px -2px gray"}
  let pendingStyle = {backgroundColor: "#dddddd", display: "inline-block", padding: "10px", cursor: "pointer", marginRight: "5px", borderRadius: "5px 5px 0px 0px", width: "100px", textAlign: "center"}
  const contents = tab.map((member) => <MemberLogsComponent member={member.member} type='NOTE' filter={["NOTE"]} />)
  const {tabActive} = this.state
  return (
   <div>
    <div onClick={this.openModal.bind(this)}>
     <div>{this.props.children}</div>
    </div>
    <Modal
     ariaHideApp={false}
     isOpen={this.state.modalIsOpen}
     onAfterOpen={this.afterOpenModal.bind(this)}
     onRequestClose={this.closeModal.bind(this)}
     style={customStyles}
     contentLabel='Example Modal'
    >
     <div className='change-status-modal'>
      <div className='change-status-modal-title'>Nhật ký chăm sóc thành viên</div>
      <div className='change-status-modal-body'>
       <Box sx={{width: "100%", typography: "body1"}}>
        <TabContext value={tabActive}>
         <Box sx={{borderBottom: 1, borderColor: "divider"}}>
          <TabList>
           {tab.map((t, i) => (
            <Tab
             onClick={() => {
              this.tabsSelected(i, t)
             }}
             label={t.title}
             value={i}
            />
           ))}
          </TabList>
         </Box>
         {tab.map((member, i) => (
          <TabPanel value={i}>
           <MemberLogsComponent key={member.member} member={member.member} type='NOTE' filter={["NOTE"]} />
          </TabPanel>
         ))}
        </TabContext>
       </Box>
      </div>
      <div className='change-status-modal-btn'>
       <div className='btn-contain'>
        <input type='button' className='btn btn-secondary' value='Đóng' onClick={this.closeModal.bind(this)} />
       </div>
      </div>
     </div>

     <i onClick={this.closeModal.bind(this)} className='fa fa-times closepopup'></i>
    </Modal>
   </div>
  )
 }
}

export default ViewDiary
