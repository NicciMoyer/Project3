import React , {useState, useContext} from "react"
import UserContext from "../contexts/UserContext"
import { Input, FormBtn } from "../components/Form";
import { Container } from "../components/Grid";



function TeacherDashboard(){

    const [formObject, setFormObject] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };
    
      function handleFormSubmit(event){
          event.preventDefault();
      }

    const{id, prefix, firstName, lastName, userName, isTeacher} =useContext(UserContext)
    return(
        <Container>
        <h2>Hello, {prefix} {firstName} {lastName}</h2>
        <h3>Username: {userName} </h3>
        <p>You {isTeacher ? "are" : "are not"} a teacher</p>
        <h2>Create New Class</h2>
        <Input
        onChange={handleInputChange}
        name="title"
        placeholder="Class Name"
        label="Class Name"
        />
        <Input
        onChange={handleInputChange}
        name="subtitle"
        placeholder="subtitle"
        label="Subtitle"
        />
        <FormBtn
            disabled={!(formObject.title)}
            onClick={handleFormSubmit}
        >Create</FormBtn>

        </Container>
    )
    }

export default TeacherDashboard;