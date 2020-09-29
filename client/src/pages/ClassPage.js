import React , {useState, useEffect, useContext} from "react"
import {useParams } from "react-router-dom"
import axios from "axios"
import { Container, Col , Row} from "../components/Grid";
import UserContext from "../contexts/UserContext";
import {FormBtn} from "../components/Form";


function ClassPage(){
    const{userId} =useContext(UserContext)
    const{id} = useParams()
    const [className, setClassName] = useState("")
    const[owner, setOwner] =useState(false)
    const [studentList, setStudentList] =useState([])
    const [classRoster, setClassRoster] =useState([])
    const [dropdown, setDropdown] = useState("")

    useEffect(() => {
        axios.get("/api/class/"+id)
        .then((res) => {
            setClassName(res.data.title)
            setOwner(res.data.UserId===userId)
        })
        axios.get("/api/students")
        .then((res) => {
            setStudentList(res.data)
            makeRoster()
        })
    },[])

    function addStudent(event) {
        event.preventDefault();
        axios.post("/api/roster/",
        {
            studentId: dropdown,
            ClassId: id
        })
        .then((res) => console.log(res))
        .catch(err=> {
            console.log(err)})

    }

    function makeRoster(){
        axios.get("/api/roster/"+id)
        .then((res) =>{
            console.log(res.data.map((item) =>item.UserId))
            setClassRoster(res.data.map((item) =>item.UserId))
        })
    }

    function handleInputChange(event){
        const selection=(event.target.options[event.target.selectedIndex].id)
        setDropdown(selection)
    }

    return(
        <div>
        <h3>Hello, class ID is {id}</h3>
        <h3>Class Name is {className}</h3>
        <h3>You {owner? "are" : "are not" } the teacher of this class</h3>
        <Container>
            <Row>
            <Col size="md-4 sm-12">
                <h2>Add Assignment</h2>
                <h2>Add Student</h2>
                <div className="form-group">
                    <select className="form-control" name="studentDropdown" onChange={handleInputChange}>
                    {studentList.filter(item => (!classRoster.includes(item.id))).map((student) => <option  id={student.id} >{student.lastName + ", " + student.firstName}</option>)}
                    </select>
                </div>
                <FormBtn
                onClick={addStudent}
              >Add Student</FormBtn>
            </Col>
            <Col size="md-4 sm-12">
                <h2>Students</h2>
                {studentList.filter(item => (classRoster.includes(item.id))).map((student) => <li>{student.lastName + ", " + student.firstName}</li>)}

            </Col>
            <Col size="md-4 sm-12">
            <h2>Assignments</h2>
            </Col>
            </Row>
        </Container>
        </div>
    )
}

export default ClassPage;