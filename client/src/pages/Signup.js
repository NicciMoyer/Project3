import React, { useState, useEffect } from "react"
import { Input, PasswordInput, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import axios from "axios"

function Signup(){

    const [formObject, setFormObject] = useState({})

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

      function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.email && formObject.userName && formObject.firstName &&formObject.lastName && formObject.isTeacher && formObject.password && formObject.password2) {
            if(formObject.password !== formObject.password2){
                console.log("Passwords do not match")
            }else{
            console.log(formObject)}
            formObject.isTeacher=true;
            const newObject={...formObject, isTeacher:true}
            axios.post("/api/signup", newObject)
            .then(console.log("ok"))
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
      </Container>
    
    )

}

export default Signup;