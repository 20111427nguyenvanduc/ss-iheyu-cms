import React, { Component } from "react"

class SuccessMessage extends Component {
 render() {
  var message = this.props.message

  return (
   <span className='ui__form-group status'>
    <label className='update-handler--message update-handler--success '>
     <i className='material-icons' style={{ positon: "relative", top: "6px" }}></i> {message}
    </label>
   </span>
  )
 }
}

export default SuccessMessage
