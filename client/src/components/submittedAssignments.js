import React from "react";

function submittedAssignments() {


    
    return (
        <div>
            <h2>Assignments for ${this.class}</h2>
            <br></br>
            <row>
                <col>${assignment.name}</col>
                <col>${student.name}</col>
                <col><input placeholder = "Enter Grade"></input></col>
            </row>
            <row>
                <col>${assignment.name}</col>
                <col>${student.name}</col>
                <col><input placeholder = "Enter Grade"></input></col>
            </row>
            <row>
                <col>${assignment.name}</col>
                <col>${student.name}</col>
                <col><input placeholder = "Enter Grade"></input></col>
            </row>
            <row>
                <col>${assignment.name}</col>
                <col>${student.name}</col>
                <col><input placeholder = "Enter Grade"></input></col>
            </row>
        </div>
    )
};

export default submittedAssignments;