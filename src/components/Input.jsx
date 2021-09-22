import React from "react";
import './Input.css';

export default function Input(props) {
  return <div>
    <input className="base--input" {...props} />
  </div>;
}
