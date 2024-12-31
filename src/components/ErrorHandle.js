import React from "react";

export class ErrorHandle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(error, errorInfo) {
    this.writeLog(error, errorInfo);
  }

  writeLog(error, errorInfo) {
    const passError = ["ReferenceError: Can't find variable: zaloJSV2", "Uncaught ReferenceError: zaloJSV2 is not defined"];
    if (passError.includes(error.message)) {
      return;
    }
    return false;
  }

  render() {
    return this.props.children;
  }
}
