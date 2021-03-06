import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi";

import Form from "./common/form";
import { getCurrentUser, login } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // from https://joi.dev/api/?v=17.3.0
  schema = Joi.object({
    username: Joi.string()
      .label("Username")
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string()
      .label("Password")
      .required()
      .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*s).{8,16}$"))
      .messages({
        "string.pattern.base":
          "Password must be between 8  and 18 characters and must include at least one upper case letter, one lower case letter, and one numeric digit.",
      }),
    // list of error from https://github.com/sideway/joi/blob/master/API.md#list-of-errors
  });

  async doSumbit() {
    console.log("login");
    try {
      await login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        const myErrors = {
          ...this.state.errors,
        };
        myErrors.username = exception.response.data;
        this.setState({ errors: myErrors });
      }
    }
  }

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="component-div">
        <h1>Login</h1>

        <form
          className="centered"
          onSubmit={(event) => this.handleSumbmit(event)}
        >
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
