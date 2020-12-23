import React from "react";

const FormInput = (props) => {
  const { name, label, error, ...rest } = props;

  return (
    <div className="mb-3 my-input">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        autoFocus
        id={name}
        name={name}
        {...rest}
      />
      {error && (
        <div className="alert alert-danger my-alert" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
