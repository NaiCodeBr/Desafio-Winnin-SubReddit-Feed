import React from "react";
import "./styles.css";

function Button(props) {
  const { onClick, label, variant } = props;
  return (
    <button type="button" onClick={onClick} className={`button ${variant}`}>
      {label}
    </button>
  );
}

export default Button;
