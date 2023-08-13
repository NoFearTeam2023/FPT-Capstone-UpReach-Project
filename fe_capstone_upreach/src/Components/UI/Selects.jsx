import { Select } from "antd";
import React from "react";

const Selects = ({ options, className, mode, placeholder, onChange, value }) => {
  return (
    <Select
      className={className}
      options={options}
      mode={mode}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Selects;
