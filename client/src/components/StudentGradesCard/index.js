import React from "react";
import "./style.css"

function StudentGradeCard(props) {
    let statusColor="white"
    switch(props.status){
        case "Assigned":
            statusColor="yellow"
            break;
        case "Incomplete":
            statusColor="red"
            break;
        case "Complete":
            statusColor="limegreen"
            break;
    }
    const x=props.score
    let gradeColor="white"
    switch(true){
        case (x>90):
            gradeColor="limegreen"
            break;
        case (x>80):
            gradeColor="yellow"
            break;
        case (x>70):
            gradeColor="orange"
            break;
        default:
            gradeColor="red"
            break;
    }

    return (
        <div className="card" >
            <div className="card-body">
                <p className="gradeLi">Class: {props.classTitle}</p>
                <p className="gradeLi">Teacher: {props.teacher}</p>
                <p className="gradeLi">Assignment: {props.assignmentName}</p>
                <p className="gradeLi">Notes: {props.notes}</p>
                <p className="gradeLi"style={{"background-color": gradeColor}}>Grade: {props.score}</p>
                <p className="gradeLi" style={{"background-color": statusColor}}>Status: {props.status}</p>
            </div>
        </div>
    )
}

export default StudentGradeCard;