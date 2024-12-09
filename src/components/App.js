import React, { useState, useEffect } from "react"
import MainLayout from "../layout/MainLayout"
import { StyledEngineProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import NoSsr from "@mui/base/NoSsr"
import { Provider, useSelector } from "react-redux"
import toastr from "toastr"
import { store } from "../store"
import history from "../core/history"

const App = (props) => {
 // const {customization} = useSelector(state=>state.customization)
 const [state, updateState] = useState({
  loading: true,
  hasLayout: false,
 })

 const setState = (newState) => {
  updateState((oldState) => ({
   ...oldState,
   ...newState,
  }))
 }

 useEffect(() => {
  const { pathname } = history.location
  const checkLayout = !["/login"].includes(pathname)

  if (checkLayout !== state.hasLayout) {
   setState({
    hasLayout: checkLayout,
   })
  }
 }, [history.location])
 useEffect(() => {
  if (toastr) {
   toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: true,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "500",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "slideDown",
    hideMethod: "slideUp",
   }
  }
  setState({
   loading: false,
  })
 }, [])

 const checkApp = () => {
  const { loading, hasLayout } = state

  if (hasLayout) {
   return <MainLayout>{React.Children.only(props.children)}</MainLayout>
  }
  return <div style={{ width: "100%", height: "100%" }}>{React.Children.only(props.children)}</div>
 }

 return (
  <NoSsr>
   <Provider store={store}>
    <StyledEngineProvider injectFirst>
     <LocalizationProvider dateAdapter={AdapterMoment}>{checkApp()}</LocalizationProvider>
    </StyledEngineProvider>
   </Provider>
  </NoSsr>
 )
}

export default App
