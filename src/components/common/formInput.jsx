import React from "react";

const FormInput = (props) => {
  const { name, label, value, onChange } = props;
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
    </div>
  );
};

export default FormInput;
