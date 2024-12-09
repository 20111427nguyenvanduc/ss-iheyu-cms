import React, { Component } from "react"

class ErrorMessage extends Component {
 render() {
  var message = this.props.message

  return (
   <span className='ui__form-group status'>
    <label className='update-handler--message update-handler--error '>{message}</label>
   </span>
  )
 }
}

export default ErrorMessage
