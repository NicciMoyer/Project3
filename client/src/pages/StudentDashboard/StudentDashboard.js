import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { InputClear, FormBtn } from "../../components/Form";
import { Container, Col, Row } from "../../components/Grid";
import { Link } from "react-router-dom";
import ClassCard from "../../components/ClassCard";
import StudentGradeCard from "../../components/StudentGradesCard";
// import coloredPencilsBottom from "../../public/images/coloredPencilsBottom.jpg";
import "./style.css"

function StudentDashboard() {
    const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    const [classList, setClassList] = useState([]);
    const [gradeList, setGradeList] = useState([])

    useEffect(() => {
        axios.get("/api/classnames/" + userId)
            .then((res) => {
                console.log(res.data.map(item => item.Class))
                setClassList(res.data.map(item => item.Class))
            })
        axios.get("/api/grades/" + userId)
            .then((res) => {
                console.log(res.data)
                setGradeList(res.data)
            })
    }, [])


return (
    <Container>
    
        <h2>Hello, {prefix} {firstName} {lastName}</h2>
        <h3>Username: {userName} </h3>
        <p>You {isTeacher ? "are" : "are not"} a teacher</p>
        <Row>
            <Col size="md-6 sm-12" id= "classCol">
                <h2>My Classes</h2>
                {classList.map((item) => (
                    <>
                        <Link to={"/classes/" + item.id} key={item.id}>
                            <ClassCard title={item.title} subtitle={item.subtitle} key={item.id} />
                        </Link>
                    </>
                ))}
            </Col>
            <Col size="md-6 sm-12" id= "gradesCol">
                <h2>My Grades</h2>
                {gradeList.map((item) =>(
                    <>
                    <StudentGradeCard score={item.score} notes={item.notes} status={item.status}/>    

                    </>
                ))}
            </Col>

        </Row>

    </Container>
)
}

export default StudentDashboard;

