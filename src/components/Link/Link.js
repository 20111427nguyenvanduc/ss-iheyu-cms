import React from 'react';
import history from '../../core/history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static defaultProps = {
    onClick: null,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    localStorage.setItem("last-link", this.props.to)
    history.push(this.props.to);
    this.closeMiniNavBar()
  };

  closeMiniNavBar = () => {
     var element = document.getElementsByTagName("body");
     if (element[0].classList.contains('body-small')) {
       element[0].classList.toggle("mini-navbar");
     }
  }

  render() {
    const { to, children, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}

export default Link;
