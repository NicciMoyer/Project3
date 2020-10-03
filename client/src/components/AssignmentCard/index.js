import React from "react"; 
import "./style.css"

function AssignmentCard(props){
    return(
<div className="card" id= "assmtList">
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <h6 className="card-subtitle">{props.notes}</h6>
    <h6 className="card-subtitle">Weight: {props.weight}</h6>
  </div>
</div>
    )
}

export default AssignmentCard