import React, { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { InputClear, FormBtn } from "../../components/Form";
import { Container, Col, Row } from "../../components/Grid";
import { Link } from "react-router-dom";
import StudentClassCard from "../../components/StudentClassCard";
import StudentGradeCard from "../../components/StudentGradesCard";
import NavItem from "../../components/Navitem";
import SideBar from "../../components/Sidenav"; 
import "./style.css";
import { Animated } from "react-animated-css";

function StudentDashboard() {
    const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    const [classList, setClassList] = useState([]);
    const [gradeList, setGradeList] = useState([])
    const [filteredGradeList, setFilteredGradeList] = useState([])

    useEffect(() => {
        let classItem = []
        axios.get("/api/classnames/" + userId)
            .then((res) => {
                console.log(res.data.map(item => item.Class))
                classItem = (res.data.map(item => item.Class))
            })
            .then(
                axios.get("/api/assignmentdata/" + userId)
                    .then((res) => {
                        setGradeList(res.data)
                        setFilteredGradeList(res.data)
                        let classSummary = classItem.map(item => {
                            let gradeSum = 0;
                            let weightSum = 0;
                            let classId = 0;
                            let teacher = "";
                            for (let i = 0; i < res.data.length; i++) {
                                let current = res.data[i]
                                if (classId === 0) {
                                    classId = current.Assignment.Class.id
                                }
                                if (teacher === "") {
                                    if (current.Assignment.User.prefix !== null) {
                                        teacher += current.Assignment.User.prefix + " "
                                    }
                                    teacher += current.Assignment.User.lastName
                                }
                                if (item.title === current.Assignment.Class.title && current.status === "Complete") {
                                    gradeSum += current.score * current.Assignment.weight
                                    weightSum += current.Assignment.weight * 100
                                }
                            }
                            return { id: item.id, teacher: teacher, title: item.title, subtitle: item.subtitle, average: Math.round(gradeSum / weightSum * 100) }
                        });
                        console.log(classSummary)
                        setClassList(classSummary)
                    })
            )
    }, [])

    function filterByClass(event) {
        setFilteredGradeList(gradeList.filter(grade => grade.Assignment.ClassId === parseInt(event.target.id)))
    }


    return (
        <Container>
            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
                <h1 id= "studentLandLogo">School<i class="icon-content rs-icon rs-icon-wrench" id= "wrench"></i>Box</h1>
                <h2 id="studentLandHeader">Hi {firstName}!</h2>
            </Animated>
            <Row>
            <Col size="md-4 sm-12">
        <SideBar>
       
        <NavItem eventkey={"2"} icon={"stop-circle"} path={"/login"} navtext={"Log Out"}/>
        </SideBar>
        </Col>
                <Col size="md-4 sm-12" id="classCol">
                    <div className= "studentPgCol">
                        <h2 id="classColHeader">My Classes</h2>
                        {classList.map((item) => (
                            <>
                                <StudentClassCard onClick={filterByClass} teacher={item.teacher} average={item.average} title={item.title} subtitle={item.subtitle} id={item.id} key={item.id} />
                            </>
                        ))}

                    </div>
                </Col>
                <Col size="md-4 sm-12" id="gradesCol">
                    <div className= "studentPgCol">
                        <h2 id="assmtColHeader">My Grades</h2>
                        {filteredGradeList.map((item) => (
                            <>
                                <StudentGradeCard classTitle={item.Assignment.Class.title}
                                    teacher={item.Assignment.User.firstName + " " + item.Assignment.User.lastName}
                                    assignmentName={item.Assignment.title}
                                    score={item.score} notes={item.notes} status={item.status} />

                            </>
                        ))}
                    </div>
                </Col>

            </Row>

        </Container>
    )
}

export default StudentDashboard;

