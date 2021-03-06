import React, { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Container, Col, Row } from "../../components/Grid";
import UserContext from "../../contexts/UserContext";
import { FormBtn, Input, NumInput } from "../../components/Form";
import AssignmentCard from "../../components/AssignmentCard";
import "./style.css"
import SideBar from "../../components/Sidenav" 
import NavItem from "../../components/Navitem"
import {Dropdown, Icon} from "rsuite"
import { Animated } from "react-animated-css"

function ClassPage() {
    const { userId, isTeacher, prefix, lastName } = useContext(UserContext)
    const { id } = useParams()
    const [classInfo, setClassInfo] = useState({ classTitle: "", classSubtitle: "" })
    const [owner, setOwner] = useState(false)
    const [studentList, setStudentList] = useState([])
    const [classRoster, setClassRoster] = useState([])
    const [dropdown, setDropdown] = useState("")
    const [formObject, setFormObject] = useState({});
    const [assignmentList, setAssignmentList] = useState([])
    const [classList, setClassList] = useState([])


    useEffect(() => {

        axios.get("/api/class/" + id)
            .then((res) => {
                setClassInfo({ classTitle: res.data.title, classSubtitle: res.data.subtitle })
                setOwner(res.data.UserId === userId)
            })

        axios.get("/api/assignments/" + id)
            .then((res) => {
                console.log(res.data)
                setAssignmentList(res.data)
            })
            makeRoster()
    }, [id])

    useEffect(() => {
        axios.get("/api/students")
        .then((res) => {
            const stuList=res.data
            stuList.sort((a,b)=> {
                return a.lastName > b.lastName ? 1 : -1
            })
            setStudentList(stuList)
            makeRoster()
        })
        axios.get("/api/teacherclass/" + userId)
        .then((res) => {
            console.log(res)
            setClassList(res.data)
        })
    }, [])

    function addStudent(event) {
        event.preventDefault();
        let newId = ""
        console.log(dropdown)
        if (!dropdown) {
            const firstItem = studentList.filter(item => (!classRoster.includes(item.id)))
            if (firstItem[0].id) {
                newId = firstItem[0].id
            }
        } else {
            newId = dropdown;
        }
        console.log(newId)
        axios.post("/api/roster/",
            {
                studentId: newId,
                ClassId: id
            })
            .then((res) => {
                console.log("ok")
                setClassRoster([...classRoster, parseInt(newId)])
                setDropdown("")
            })
            .catch(err => {
                console.log(err)
            })

    }

    function makeRoster() {
        axios.get("/api/roster/" + id)
            .then((res) => {
                setClassRoster(res.data.map((item) => item.UserId))
            })
    }

    function handleDropdownChange(event) {
        console.log(classRoster)
        const selection = (event.target.options[event.target.selectedIndex].id)
        setDropdown(selection)
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };


    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(id)
        const newAssignment = {
            title: formObject.title,
            notes: formObject.notes,
            weight: formObject.weight,
            id: id
        }
        // setFormObject({...formObject, id:id})
        axios.post("/api/newassignment", {
            title: formObject.title,
            notes: formObject.notes,
            weight: formObject.weight,
            id: id
        })
            .then((res) => {
                newAssignment.id = res.data.id
                setFormObject({ title: "", notes: "", weight: 0 })
                setAssignmentList([...assignmentList, newAssignment])
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container>
            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
            <h1 id="classLogo">School<i class="icon-content rs-icon rs-icon-wrench" id= "wrench"></i>Box</h1>
            <h1 id="classJumbotron">Hello, {prefix} {lastName}!</h1>
            <h3 id="classSubtitle">{classInfo.classTitle} {classInfo.classSubtitle}</h3>
            </Animated>
            <Row>
                <Col size="md-4 sm-12">
                <SideBar>
                <NavItem eventkey={"1"} icon={"dashboard"} path={"/teacherdashboard"} navtext={"Dashboard"}/>
                <NavItem eventkey={"2"} icon={"stop-circle"} path={"/login"} navtext={"Log Out"}/>
                <Dropdown eventKey="3" title="Classes" icon={<Icon icon="magic" />}>
                    {classList.map(item =>(
                      <Link to={"/classes/" + item.id} key={item.id}>
                      <Dropdown.Item  eventKey={"3-"+item.id}>{item.title}</Dropdown.Item>
                      </Link>   
                    ))}
                </Dropdown> 
                </SideBar> 

                </Col>
                {owner ?
                    <Col size="lg-4 md-9" >
                        <div className="classCard" id="assignmentCard">
                            <h2 className="classHeader">Assignments</h2>
                            {assignmentList.map((assignment) => (
                                <Link to={"/assignments/" + assignment.id + "/" + id} key={assignment.id} >
                                    <AssignmentCard title={assignment.title} notes={assignment.notes} weight={assignment.weight} />
                                </Link>
                            ))}
                        </div>
                        <div className="classCard" id="addAssmtDiv">
                            <h2 className="classHeader">Add an Assignment</h2>

                            <form>
                                <Input
                                    id="assmtNameInput"
                                    className="inputField"
                                    onChange={handleInputChange}
                                    value={formObject.title || ""}
                                    name="title"
                                    placeholder="Assignment name"
                                // label="Assignment name"
                                />
                                <Input
                                    id="assmtNoteInput"
                                    className="inputField"
                                    onChange={handleInputChange}
                                    value={formObject.notes || ""}
                                    name="notes"
                                    placeholder="Assignment notes"
                                // label="Notes"
                                />
                                <NumInput
                                    id="assmtWeightNum"
                                    className="inputField"
                                    onChange={handleInputChange}
                                    value={formObject.weight || ""}
                                    name="weight"
                                    placeholder="Grade weight (numerical)"
                                // label="Weight (must be a number)"
                                />
                                <FormBtn
                                    id="assmtCreateBtn"
                                    disabled={!(formObject.title)}
                                    onClick={handleFormSubmit}
                                >Create Assignment</FormBtn>
                            </form>
                        </div>
                    </Col> : <></>}
                <Col size={owner ? "lg-4 md-12" : "lg-6 md-9"} >
                    <div className="classCard" id="showStudentCard">
                        <h2 className="classHeader">Students</h2>
                        {studentList.filter(item => (classRoster.includes(item.id))).map((student) =>
                            <li id="studentList" key={student.id}>{student.lastName + ", " + student.firstName}
                            </li>)}
                    </div>
                    <div className="classCard" id="addStudentCard">
                        <h2
                            className="classHeader">
                        Add a Student
                        </h2>
                        <div className="form-group">
                            <select id="studentDropdown"
                                className="form-control"
                                name="studentDropdown"
                                onChange={handleDropdownChange}>
                                {studentList.filter(item => (!classRoster.includes(item.id))).map((student) => <option key={student.id} id={student.id} >{student.lastName + ", " + student.firstName}</option>)}
                            </select>
                        </div>
                        <FormBtn
                            id="studentAddBtn"
                            onClick={addStudent}
                        >Add Student</FormBtn>
                    </div>
                </Col>

            </Row>
        </Container >

    )
}

export default ClassPage;