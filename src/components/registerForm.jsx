import React from "react";
import Joi from "joi";

import Form from "./common/form";
import { register } from "../services/userService";

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

  async doSumbit() {
    try {
      const response = await register(this.state.data);
      const token = response.headers["x-auth-token"];
      localStorage.setItem("token", token);
      this.props.history.replace("/movies");
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
    return (
      <div className="component-div">
        <h1>Register</h1>

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
