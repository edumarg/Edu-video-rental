import React from "react";

const FormSelect = (props) => {
  const { name, label, error, options, ...rest } = props;
  return (
    <div className="mb-3 my-input">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-control" id={name} name={name} {...rest}>
        <option defaultValue>Select an option</option>
        {options.map((option) => (
          <option value={option._id} key={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger my-alert" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
