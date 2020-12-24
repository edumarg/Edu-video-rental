import React from "react";
import Joi from "joi";

import Form from "./common/form";

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
      .pattern(new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$"))
      .messages({
        "string.pattern.base":
          "Password must be between 6  and 18 characters and must include at least one upper case letter, one lower case letter, and one numeric digit.",
      }),
    // list of error from https://github.com/sideway/joi/blob/master/API.md#list-of-errors
  });

  doSumbit() {
    console.log("login");
    this.props.history.replace("/movies");
  }

  render() {
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
