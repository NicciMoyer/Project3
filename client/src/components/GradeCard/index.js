import React from "react"

function GradeCard(props){
    return(
<div className="card">
  <div className="card-body">
    <h5 className="card-title">Student Name: {props.name}</h5>

    <div className="form">
    <label >Status</label>
    <select className="form" defaultValue={props.status}>
      <option>Assigned</option>
      <option>Incomplete</option>
      <option>Coomplete</option>
    </select>
  </div>

    
    <div className="input-group mb-3">
    <div className="input-group-prepend">
        <span className="input-group-text">Grade</span>
    </div>
    <input type="text" className="form-control" defaultValue={props.grade}></input>

    </div>
    <div className="input-group">
    <div className="input-group-prepend">
    <span className="input-group-text" >Notes</span>
    </div>
    <textarea className="form-control"defaultValue={props.notes}></textarea>
    </div>
    <hr/>
  <button type="button" className="btn btn-success">Update</button>
  </div>
</div>
    )
}

export default GradeCard