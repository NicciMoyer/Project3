import React from "react";

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
                {/* //<h5 className="card-title">{props.title}</h5>// */}
                <p className="">Class: {props.classTitle}</p>
                <p className="">Teacher: {props.teacher}</p>
                <p className="">Assignment: {props.assignmentName}</p>
                <p className="">Notes: {props.notes}</p>
                <p className=""style={{"background-color": gradeColor}}>Grade: {props.score}</p>
                <p className="" style={{"background-color": statusColor}}>Status: {props.status}</p>
            </div>
        </div>
    )
}

export default StudentGradeCard;