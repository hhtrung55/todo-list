import React, { useCallback, useEffect, useState } from "react";
import "./Modal.css";

export default function Modal({ header, body, footer, isOpen, onClose, onSubmit }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (isOpen) return setStatus("opened");
    setStatus("");
  }, [isOpen]);

  return (
    <div id="base--modal">
      <div className={`modale ${status}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-header">
            <div>{header}</div>
            <a
              href="#"
              className="btn-close closemodale"
              aria-hidden="true"
              onClick={onClose}
            >
              &times;
            </a>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <div onClick={onSubmit}>{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
