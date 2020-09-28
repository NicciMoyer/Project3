import React , {useContext} from "react"
import UserContext from "../contexts/UserContext"

function StudentDashboard(){
const{id, prefix, firstName, lastName, userName, isTeacher} =useContext(UserContext)
return(
    <>
    <h2>Hello, {prefix} {firstName} {lastName}</h2>
    <h3>Username: {userName} </h3>
    <p>You {isTeacher ? "are" : "are not"} a teacher</p>
    </>
)
}

export default StudentDashboard;