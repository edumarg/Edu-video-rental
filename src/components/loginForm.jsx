import React from "react";
import Joi from "joi";

import Form from "./common/form";
import FormInput from "./common/formInput";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // from https://joi.dev/api/?v=17.3.0
  schema = Joi.object({
    username: Joi.string().label("Username").required().min(3).max(30),
    password: Joi.string()
      .label("Password")
      .required()
      .min(6)
      .max(18)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,18}$")),
  });

  doSumbit() {
    console.log("login");
    this.props.history.replace("/movies");
  }

  render() {
    const { data, errors } = this.state;
    return (
      <div className="component-div">
        <h1 className="title">Login</h1>

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
