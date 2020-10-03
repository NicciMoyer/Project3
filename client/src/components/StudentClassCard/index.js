import React from "react";
import "./style.css"

function StudentClassCard(props){
    return(
<div className="card" id= "studentsCard">
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <h6 className="card-subtitle">{props.subtitle}</h6>
    <h6 className="card-subtitle">Teacher: {props.teacher}</h6>
    <h6 className="card-subtitle">Average: {isNaN(props.average) ? "No grades yet" : props.average}</h6>
    <h6 className="card-subtitle mb-2" style={{"color": "blue"}} id={props.id} onClick={props.onClick}>View Grades</h6>
  </div>
</div>
    )
}

export default StudentClassCard