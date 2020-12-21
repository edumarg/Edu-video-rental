import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleLogin(event) {
    event.preventDefault();
    console.log("Logedin");

    this.props.history.replace("/movies");
  }

  handleChange(event) {
    const input = event.currentTarget;
    const myAccount = { ...this.state.account };
    myAccount[input.name] = input.value;
    this.setState({ account: myAccount });
  }

  render() {
    const { account } = this.state;
    return (
      <div className="component-div">
        <h1 className="title">Login</h1>

        <form
          className="centered"
          onSubmit={(event) => this.handleLogin(event)}
        >
          <div className="mb-3 my-input">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              autoFocus
              value={account.username}
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className="mb-3 my-input">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={account.password}
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(event) => this.handleChange(event)}
            />
          </div>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
