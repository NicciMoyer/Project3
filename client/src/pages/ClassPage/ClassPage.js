import React, { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import { Container, Col, Row } from "../../components/Grid";
import UserContext from "../../contexts/UserContext";
import { FormBtn, Input, NumInput } from "../../components/Form";
import AssignmentCard from "../../components/AssignmentCard";
import "./style.css"

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


    useEffect(() => {
        axios.get("/api/class/" + id)
            .then((res) => {
                setClassInfo({ classTitle: res.data.title, classSubtitle: res.data.subtitle })
                setOwner(res.data.UserId === userId)
            })
        axios.get("/api/students")
            .then((res) => {
                setStudentList(res.data)
                makeRoster()
            })
        axios.get("/api/assignments/" + id)
            .then((res) => {
                console.log(res.data)
                setAssignmentList(res.data)
            })
    }, [])

    function addStudent(event) {
        event.preventDefault();
        let newId = ""
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

                setClassRoster([...classRoster, newId])
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

            <h1 id="classJumbotron">Hello, {prefix} {lastName}!</h1>
            <h3 id="classSubtitle">{classInfo.classTitle} {classInfo.classSubtitle}</h3>

            <Row>
                {owner ?
                    <Col size="md-4 sm-9" id="assmtCol">
                        <div  className= "classCard" id= "assignmentCard">
                            <h2 className="classHeader">Assignments</h2>
                            {assignmentList.map((assignment) => (
                                <Link to={"/assignments/" + assignment.id + "/" + id} key={assignment.id} >
                                    <AssignmentCard title={assignment.title} notes={assignment.notes} weight={assignment.weight} />
                                </Link>
                            ))}
                        </div>
                        <div className= "classCard" id="addAssmtDiv">
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
                                    placeholder="Final weight (must be a number)"
                                    // label="Weight (must be a number)"
                                />
                                <FormBtn
                                    id="assmtCreateBtn"
                                    disabled={!(formObject.title)}
                                    onClick={handleFormSubmit}
                                >Create</FormBtn>
                            </form>
                        </div>
                    </Col> : <></>}
                <Col size={owner ? "md-4 sm-12" : "md-6 sm-9"} >
                    <div className= "classCard" id="showStudentCard">
                        <h2 className="classHeader">Students</h2>
                        {studentList.filter(item => (classRoster.includes(item.id))).map((student) => <li key={student.id}>{student.lastName + ", " + student.firstName}</li>)}
                    </div>
                    <div className= "classCard" id="addStudentCard">
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
        </Container>

    )
}

export default ClassPage;