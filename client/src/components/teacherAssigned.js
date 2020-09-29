import React from "react";

function TeacherAssigned() {

    return (
        <div>
            <h2>My Assignments</h2>
            <br></br>
            <row>
                <col>${assignment.class}</col>
                <col>${assignment.name}</col>
                <col>${assignment.weight}</col>
            </row>
            <row>
                <col>${assignment.class}</col>
                <col>${assignment.name}</col>
                <col>${assignment.weight}</col>
            </row>
            <row>
                <col>${assignment.class}</col>
                <col>${assignment.name}</col>
                <col>${assignment.weight}</col>
            </row>
            <row>
                <col>${assignment.class}</col>
                <col>${assignment.name}</col>
                <col>${assignment.weight}</col>
            </row>
        </div>
    )
};

export default TeacherAssigned;