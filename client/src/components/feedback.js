import React from "react";

function Feedback() {

    return (
        <div>
            <h2>Feedback</h2>
            <br></br>
            <container>
                <h5>${assignment.name}</h5>
                <p>${assignment.message}</p>
            </container>
            <container>
                <h5>${assignment.name}</h5>
                <p>${assignment.message}</p>
            </container>
            <container>
                <h5>${assignment.name}</h5>
                <p>${assignment.message}</p>
            </container>
        </div>
    )
};

export default Feedback;