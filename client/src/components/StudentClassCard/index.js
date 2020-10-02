import React from "react"

function StudentClassCard(props){
    return(
<div className="card">
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Teacher: {props.teacher}</h6>
    <h6 className="card-subtitle mb-2 text-muted">Average: {isNaN(props.average) ? "No grades yet" : props.average}</h6>
  </div>
</div>
    )
}

export default StudentClassCard