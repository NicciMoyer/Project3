import React from "react";
import "./style.css"

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form">
      <label htmlFor={props.name}>{props.label}</label>
      <input className="form" {...props} />
    </div>
  );
}
export function NumInput(props) {
  return (
    <div className="form">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="number" className="form" {...props} />
    </div>
  );
}

//this is an input that will have the option to clear if the blank formobject item is passed through as value.
export function InputClear(props) {
  return (
    <div className="form">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" className="form" {...props}/>
    </div>
  );
}
export function YesNo(props) {
  return(
  <div className="form">
    <label htmlFor={props.name}>{props.label}</label>
    <select defaultValue={props.option1} className="form" {...props}>
      <option value={props.option1}>{props.option1}</option>
      <option value={props.option2}>{props.option2}</option>
    </select>
  </div>
  )
}
export function PasswordInput(props) {
  return (
    <div className="form">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="password" className="form" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form">
      <textarea className="form" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">

    </button>
  );
}
