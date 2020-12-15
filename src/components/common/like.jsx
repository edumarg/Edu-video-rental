import React, { Component } from "react";

class Like extends Component {
  state = {};
  render() {
    const { myElement, onLike } = this.props;
    return (
      <div onClick={() => onLike(myElement)}>
        {myElement.like && <i className="fa fa-heart" aria-hidden="true"></i>}
        {!myElement.like && (
          <i className="fa fa-heart-o" aria-hidden="true"></i>
        )}
      </div>
    );
  }
}

export default Like;
