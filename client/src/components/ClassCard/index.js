import React from "react"
import "./style.css"

function ClassCard(props) {
  return (
    <div className="card">
      <div className="card-body" id= "classCard">
        <h5 className="card-title" id= "className">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted" id= "classDesc">{props.subtitle}</h6>
      </div>
    </div>
  )
}

export default ClassCard