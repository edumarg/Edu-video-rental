import React, { Component } from "react";
import FormInput from "./common/formInput";

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
          <FormInput
            name="username"
            label="Username"
            value={account.username}
            onChange={(event) => this.handleChange(event)}
          />
          <FormInput
            name="password"
            label="Password"
            value={account.password}
            onChange={(event) => this.handleChange(event)}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
