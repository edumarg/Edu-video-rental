import React, { Component } from "react";

class Like extends Component {
  render() {
    const { like, onClick } = this.props;
    let iconClass = "fa fa-heart";
    if (!like) iconClass += "-o";
    return (
      <div onClick={onClick}>
        <i
          className={iconClass}
          style={{ cursor: "pointer" }}
          aria-hidden="true"
        ></i>
      </div>
    );
  }
}

export default Like;
