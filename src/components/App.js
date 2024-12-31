import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import StyleContext from "isomorphic-style-loader/StyleContext";
import ApplicationContext from "./ApplicationContext";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import NoSsr from "@mui/base/NoSsr";
import { Provider, useSelector } from "react-redux";
import toastr from "toastr";
import { store } from "../store";
import history from "../core/history";
import { ErrorHandle } from "./ErrorHandle";
import CssBaseline from "@mui/material/CssBaseline";
import themes from "../themes";

const App = ({ context, insertCss, children }) => {
  const [state, updateState] = useState({
    loading: true,
    hasLayout: false,
  });

  const setState = (newState) => {
    updateState((oldState) => ({
      ...oldState,
      ...newState,
    }));
  };

  useEffect(() => {
    const { pathname } = history.location;
    const checkLayout = !["/login", "/forgot-password"].includes(pathname);

    if (checkLayout !== state.hasLayout) {
      setState({
        hasLayout: checkLayout,
      });
    }
  }, [history.location]);
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
      };
    }
    setState({
      loading: false,
    });
  }, []);

  const checkApp = () => {
    const { loading, hasLayout } = state;

    if (hasLayout) {
      return <MainLayout>{React.Children.only(children)}</MainLayout>;
    }
    return (
      <div className="layout-container-login" style={{ width: "100%", height: "100%" }}>
        {React.Children.only(children)}
      </div>
    );
  };

  return (
    <NoSsr>
      <StyleContext.Provider value={{ insertCss }}>
        <ApplicationContext.Provider value={{ context }}>
          <Provider store={store}>
            <MuiProvider>{checkApp()}</MuiProvider>
          </Provider>
        </ApplicationContext.Provider>
      </StyleContext.Provider>
    </NoSsr>
  );
};

const MuiProvider = ({ children }) => {
  const { customization } = useSelector((state) => state);
  return (
    <ThemeProvider theme={themes(customization)}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default App;
