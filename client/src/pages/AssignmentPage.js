import React , {useState, useEffect, useContext} from "react"
import {useParams } from "react-router-dom"
import axios from "axios"
import { Container, Col , Row} from "../components/Grid";
import UserContext from "../contexts/UserContext";
import {FormBtn, Input, NumInput} from "../components/Form";
import GradeCard from "../components/GradeCard"


function AssignmentPage(){
    const{userId} =useContext(UserContext)
    const {assignmentid, classid} = useParams()
    const [formObject, setFormObject] = useState({});
    const [studentList, setStudentList] =useState([])
    const [classRoster, setClassRoster] =useState([])
    const [gradeList, setGradeList] =useState({})


    useEffect(() => {
        axios.get("/api/students")
        .then((res) => {
            setStudentList(res.data)
            makeRoster()
        })
    },[])

    function makeRoster(){
        axios.get("/api/roster/"+classid)
        .then((res) =>{
            setClassRoster(res.data.map((item) =>item.UserId))
            getGrades();
        })
    }

    function getGrades(){
        classRoster.forEach(student => {
            axios.get("/api/")
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

                
      function handleFormSubmit(event){
          event.preventDefault();
          //insert code to update assignment here
            }


    return(
        <>
        <div>
            <h1>Hello</h1>
            <h1>User ID is {userId}</h1>
            <h2>assignment ID is {assignmentid} </h2>
            <h2>class ID is {classid} </h2>
        </div>
        <Container>
            <Row>
            <Col size="md-6 sm-12">
           
                <h2>Edit Assignment</h2>
                <form>
                <Input
                onChange={handleInputChange}
                value={formObject.title || ""}
                name="title"
                placeholder="Assignment Name"
                label="Assignment Name"
                />
                <Input
                onChange={handleInputChange}
                value={formObject.notes || ""}
                name="notes"
                placeholder="assignment notes"
                label="Notes"
                />
                <NumInput
                onChange={handleInputChange}
                value={formObject.weight || ""}
                name="weight"
                placeholder="Weight in final grade"
                label="Weight (please enter number)"
                />
                <FormBtn
                    disabled={!(formObject.title)}
                    onClick={handleFormSubmit}
                >Create</FormBtn>
                </form>  
                </Col>
                <Col size="md-6 sm-12">
                <h2>Grades</h2>
                {studentList.filter(item => (classRoster.includes(item.id))).map((student) => <GradeCard 
                name={student.firstName + " " + student.lastName} 
                grade={100} 
                status={"Assigned"}
                notes={""}
                key={student.id}
                />)}

                </Col>
            </Row>
        </Container>
        </>
    )
}

export default AssignmentPage;