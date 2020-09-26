import React, { useState } from "react"
import { Input, PasswordInput, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import axios from "axios"

function Signup(){

    const [formObject, setFormObject] = useState({})
    const [errState, setErrState]= useState("")

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

      function handleFormSubmit(event) {
        event.preventDefault();
        setErrState("");
        if (formObject.email && formObject.userName && formObject.firstName &&formObject.lastName && formObject.isTeacher && formObject.password && formObject.password2) {
          if(formObject.password !== formObject.password2){
                setErrState("Passwords do not match")
            }else{
            formObject.isTeacher=true;
            const newObject={...formObject, isTeacher:true}
            axios.post("/api/signup", newObject)
            .then(console.log("ok"))
            .catch(err => {
              console.log(err)
            })
            }
        }
      };

    return(
        <Container>
        <Jumbotron>
        <h1>Sign Up</h1>
        <h2>or</h2>
        <h1><Link to="/login">Log in</Link></h1>
      </Jumbotron>
      <form>
            <Input
            onChange={handleInputChange}
            name="email"
            placeholder="email (required)"
            />
            <Input
            onChange={handleInputChange}
            name="userName"
            placeholder="username"
            />
            <Input
            onChange={handleInputChange}
            name="firstName"
            placeholder="First Name"
            />
            <Input
            onChange={handleInputChange}
            name="lastName"
            placeholder="Last Name"
            />
            <Input
            onChange={handleInputChange}
            name="isTeacher"
            placeholder="teacher(Y/N)"
            />
            <PasswordInput
            onChange={handleInputChange}
            name="password"
            placeholder="password"
            />
            <PasswordInput
            onChange={handleInputChange}
            name="password2"
            placeholder="enter password again"
            />
                <FormBtn
                disabled={!(formObject.email && formObject.userName && formObject.firstName &&formObject.lastName && formObject.isTeacher && formObject.password && formObject.password2)}
                onClick={handleFormSubmit}
              >Sign Up</FormBtn>
      </form>
      <div className="errorBox">{errState}</div>
      </Container>
    
    )

}

export default Signup;