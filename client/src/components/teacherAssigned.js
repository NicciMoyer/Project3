import React from "react";

function TeacherAssigned() {

    return (
        <div>
            <h2>Assignments for ${this.class}</h2>
            <br></br>
            <row>
                <col>${assignment.name}</col>
                <col>${assignment.grade}</col>
                <col>${assignment.weight}</col>
            </row>
            <row>
                <col>${assignment.name}</col>
                <col>${assignment.grade}</col>
                <col>${assignment.weight}</col>
            </row>
            <row>
                <col>${assignment.name}</col>
                <col>${assignment.grade}</col>
                <col>${assignment.weight}</col>
            </row>
            <row>
                <col>${assignment.name}</col>
                <col>${assignment.grade}</col>
                <col>${assignment.weight}</col>
            </row>
        </div>
    )
};

export default TeacherAssigned;