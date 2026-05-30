import React from "react";
import "./index.css";

const Input = ({
  placeholder,
  onChange,
  variation,
  type,
  name
}: {
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  variation?: string;
  type?: string;
  name: string;
}) => {
  return (
    <input
      className={`input ${variation}`}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
export default Input;