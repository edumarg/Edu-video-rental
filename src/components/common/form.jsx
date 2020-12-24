import React, { Component } from "react";

import FormInput from "./formInput";
import FormSelect from "./formSelect";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate() {
    // from https://joi.dev/api/?v=17.3.0
    const options = {
      abortEarly: false,
    };
    const result = this.schema.validate(this.state.data, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.map((item) => (errors[item.path[0]] = item.message));
    // the map is the same as doing for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  validateProperty(input) {
    const { name, value } = input;
    //.extract is use to Return a sub-schema based on a path.
    const schema = this.schema.extract([name]);
    const result = schema.validate(value);
    if (!result.error) return null;
    return result.error.details[0].message;
  }

  handleSumbmit(event) {
    event.preventDefault();
    const myErrors = this.validate();
    this.setState({ errors: myErrors || {} });
    if (myErrors) return;
    this.doSumbit();
  }

  handleChange(event) {
    const input = event.currentTarget;
    const { data, errors } = this.state;

    const myErrors = { ...errors };
    const errorMesssage = this.validateProperty(input);
    if (errorMesssage) myErrors[input.name] = errorMesssage;
    else delete myErrors[input.name];

    const myData = { ...data };
    myData[input.name] = input.value;

    this.setState({ data: myData, errors: myErrors });
  }

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <FormInput
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        type={type}
        onChange={(event) => this.handleChange(event)}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <FormSelect
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        options={options}
        onChange={(event) => this.handleChange(event)}
      />
    );
  }
}

export default Form;
