import React, { Component } from "react";

export default class MyButton extends Component {
  render() {
    const { text, type, className, onClick } = this.props;
    return (
      <button className={className} type={type} onClick={onClick}>
        {text}
      </button>
    );
  }
}
