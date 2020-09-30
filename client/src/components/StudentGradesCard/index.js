import React from "react";

function StudentGradeCard(props) {
    return (
        <div className="card">
            <div className="card-body">
                {/* //<h5 className="card-title">{props.title}</h5>// */}
                <p className="">{props.score}</p>
                <p className="">{props.notes}</p>
                <p className="">{props.status}</p>
            </div>
        </div>
    )
}

export default StudentGradeCard;