import React , {useState, useContext, useEffect} from "react"
import UserContext from "../contexts/UserContext"
import { InputClear, FormBtn } from "../components/Form";
import { Container, Col , Row} from "../components/Grid";
import axios from "axios";



function TeacherDashboard(){
    const{id, prefix, firstName, lastName, userName, isTeacher} =useContext(UserContext)
    const [formObject, setFormObject] = useState({});
    const [classList, setClassList] =useState([])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

    useEffect(() => {
        axios.get("/api/teacherclass/"+id)
        .then((res) => {
            console.log(res.data)
        })
    },[])
    
      function handleFormSubmit(event){
          event.preventDefault();
          axios.post("/api/newclass", formObject)
          .then((res) => {
            setFormObject({title: "", subtitle: ""})
            console.log("Hello")
          })
          .catch(err => {
            console.log(err)
          })
      }

    return(
        <Container>
        <h2>Hello, {prefix} {firstName} {lastName}</h2>
        <h3>Username: {userName} </h3>
        <p>You {isTeacher ? "are" : "are not"} a teacher</p>
        <p>id: {id}</p>
        <Row>
        <Col size="md-6 sm-12">
        <h2>Create New Class</h2>
        <form>
        <InputClear
        onChange={handleInputChange}
        value={formObject.title || ""}
        name="title"
        placeholder="Class Name"
        label="Class Name"
        />
        <InputClear
        onChange={handleInputChange}
        value={formObject.subtitle || ""}
        name="subtitle"
        placeholder="subtitle"
        label="Subtitle"
        />
        <FormBtn
            disabled={!(formObject.title)}
            onClick={handleFormSubmit}
        >Create</FormBtn>
        </form>
        </Col>
        <Col size="md-6 sm-12">
        <h2>Your Classes</h2>
        </Col></Row>
        </Container>

    )
    }

export default TeacherDashboard;