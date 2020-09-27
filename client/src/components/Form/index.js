import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <label for={props.name}>{props.label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}
export function YesNo(props) {
  return(
  <div classname="form-group">
    <label for={props.name}>{props.label}</label>
    <select className="form-control" {...props}>
      <option>{props.option1}</option>
      <option>{props.option2}</option>
    </select>
  </div>
  )
}
export function PasswordInput(props) {
  return (
    <div className="form-group">
      <label for={props.name}>{props.label}</label>
      <input type="password" className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">

    </button>
  );
}
