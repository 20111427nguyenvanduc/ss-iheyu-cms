import React, { Component } from "react"

class Loading extends Component {
 render() {
  return (
   <div className={"loading"}>
    <img className={"loadingimg"} src='/img/loading.gif' />
   </div>
  )
 }
}

export default Loading
