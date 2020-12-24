import React from "react";
import Joi from "joi";

import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .label("Username")
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string()
      .label("Password")
      .required()
      .pattern(new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,18}$"))
      .messages({
        "string.pattern.base":
          "Password must be between 6  and 18 characters and must include at least one upper case letter, one lower case letter, and one numeric digit.",
      }),
    // list of error from https://github.com/sideway/joi/blob/master/API.md#list-of-errors
    name: Joi.string().label("Name").required().min(3).max(30),
  });

  doSumbit() {
    console.log("Register");
    this.props.history.replace("/movies");
  }

  render() {
    return (
      <div className="component-div">
        <h1 className="title">Register</h1>

        <form onSubmit={(event) => this.handleSumbmit(event)}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
