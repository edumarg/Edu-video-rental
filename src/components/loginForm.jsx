import React, { Component } from "react";

class LoginForm extends Component {
  state = {};
  handleLogin() {
    this.props.history.replace("/movies");
  }
  render() {
    return (
      <div className="m-4 component-div">
        <h1 className="title mx-4">Login</h1>
      </div>
    );
  }
}

export default LoginForm;
