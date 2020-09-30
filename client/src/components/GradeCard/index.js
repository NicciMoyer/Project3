import axios from "axios";
import React, {useEffect, useState} from "react"

function GradeCard(props){
const AssignmentId=parseInt(props.assignmentid)
const StudentId=props.StudentId
const [gradeFormObject, setGradeFormObject] =useState({})
const [gradeState, setGradeState] = useState({
  grade: 0,
  notes: "",
  status: "Assigned"
})

useEffect(() => {
  axios.get("/api/assignmentgrades/"+props.AssignmentId+"/"+props.StudentId)
  .then((res) => {
    console.log(res.data)
    setGradeState({
      grade: res.data.score,
      notes: res.data.notes,
      status: res.data.status
    })
  })
},[])


function handleGradeInputChange(event){
  const { name, value } = event.target;
  setGradeFormObject({...gradeFormObject, [name]: value})
}

function handleFormSubmit(event){
  console.log(gradeFormObject)
  event.preventDefault();
  let status=""
  if(!gradeFormObject.status){
    status=gradeState.status
  }else{
    status=gradeFormObject.status
  }
  let grade=""
  if(!gradeFormObject.grade){
    grade=gradeState.grade
  }else{
    grade=gradeFormObject.grade
  }
  const newGrade={
    status: status,
    notes: gradeFormObject.notes,
    score: grade,
    UserId: StudentId,
    AssignmentId: AssignmentId
  }
  console.log(newGrade)
  axios.put("/api/grade/2", {
    status: status,
    notes: gradeFormObject.notes,
    score: grade,
    UserId: StudentId,
    AssignmentId: AssignmentId
  })
  .then((res) => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}


    return(
<div className="card">
  <div className="card-body">
    <h5 className="card-title">Student Name: {props.name}</h5>

    <div className="form">
    <label >Status</label>
    <select className="form" name="status" onChange={handleGradeInputChange} placeholder={gradeState.status}>
      <option>Assigned</option>
      <option>Incomplete</option>
      <option>Complete</option>
    </select>
  </div>

    
    <div className="input-group mb-3">
    <div className="input-group-prepend">
        <span className="input-group-text">Grade</span>
    </div>
    <input type="number" className="form-control" name="grade" onChange={handleGradeInputChange}  placeholder={gradeState.grade}></input>

    </div>
    <div className="input-group">
    <div className="input-group-prepend">
    <span className="input-group-text" >Notes</span>
    </div>
    <textarea className="form-control" name="notes" onChange={handleGradeInputChange}  defaultValue={gradeState.notes}></textarea>
    </div>
    <hr/>
  <button type="button" onClick={handleFormSubmit} className="btn btn-success">Update</button>
  </div>
</div>
    )
}

export default GradeCard