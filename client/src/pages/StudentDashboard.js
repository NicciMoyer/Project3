import React , {useContext} from "react"
import UserContext from "../contexts/UserContext";
import coloredPencilsBottom from "../images/coloredPencilsBottom.jpg";

function StudentDashboard(){
const{id, prefix, firstName, lastName, userName, isTeacher} =useContext(UserContext)
return(
    <div styles={{ backgroundImage: `url(${coloredPencilsBottom})` }}>
    <h2>Hello, {prefix} {firstName} {lastName}</h2>
    <h3>Username: {userName} </h3>
    <p>You {isTeacher ? "are" : "are not"} a teacher</p>
    </div>
)
}

export default StudentDashboard;