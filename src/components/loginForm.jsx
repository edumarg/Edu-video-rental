import React, { Component } from "react";
import Joi from "joi";

import FormInput from "./common/formInput";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
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

  validate() {
    // from https://joi.dev/api/?v=17.3.0
    const options = {
      abortEarly: false,
    };
    const result = this.schema.validate(this.state.account, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((item) => (errors[item.path[0]] = item.message));
    // the map is the same as doing for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  handleLogin(event) {
    event.preventDefault();
    const myErrors = this.validate();
    this.setState({ errors: myErrors || {} });
    if (myErrors) return;
    this.props.history.replace("/movies");
  }

  validateProperty(input) {
    const { name, value } = input;
    //.extract is use to Return a sub-schema based on a path.
    const schema = this.schema.extract([name]);
    const result = schema.validate(value);
    if (!result.error) return null;
    return result.error.details[0].message;
  }

  handleChange(event) {
    const input = event.currentTarget;
    const { account, errors } = this.state;

    const myErrors = { ...errors };
    const errorMesssage = this.validateProperty(input);
    if (errorMesssage) myErrors[input.name] = errorMesssage;
    else delete myErrors[input.name];

    const myAccount = { ...account };
    myAccount[input.name] = input.value;

    this.setState({ account: myAccount, errors: myErrors });
  }

  render() {
    const { account, errors } = this.state;
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
            error={errors.username}
            onChange={(event) => this.handleChange(event)}
          />
          <FormInput
            name="password"
            label="Password"
            value={account.password}
            error={errors.password}
            onChange={(event) => this.handleChange(event)}
          />
          <button className="btn btn-primary" disabled={this.validate()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
