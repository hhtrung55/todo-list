import React from "react";
import './Button.css'

export default function Button({ title = 'Button', style = {}, onClick }) {
  return (
    <div className="base--button" style={style} onClick={onClick}>
      {title}
    </div>
  );
}
