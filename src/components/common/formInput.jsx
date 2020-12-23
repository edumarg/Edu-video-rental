import React from "react";

const FormInput = (props) => {
  const { name, label, value, error, onChange } = props;

  return (
    <div className="mb-3 my-input">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        autoFocus
        value={value}
        type="text"
        className="form-control"
        id={name}
        name={name}
        onChange={onChange}
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
