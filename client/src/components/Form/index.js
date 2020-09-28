import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}

//this is an input that will have the option to clear if the blank formobject item is passed through as value.
export function InputClear(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" className="form-control" {...props}/>
    </div>
  );
}
export function YesNo(props) {
  return(
  <div className="form-group">
    <label htmlFor={props.name}>{props.label}</label>
    <select className="form-control" defaultValue={props.option1} {...props}>
      <option>{props.option1}</option>
      <option>{props.option2}</option>
    </select>
  </div>
  )
}
export function PasswordInput(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
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
