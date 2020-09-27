import React, { useState } from "react"
import { Input, PasswordInput, FormBtn, YesNo } from "../components/Form";
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
              if(formObject.isTeacher==="Teacher"){
                formObject.isTeacher=true;
              }else{
                formObject.isTeacher=false;
              }
            }
            const newObject={...formObject}
            axios.post("/api/signup", newObject)
            .then(console.log("ok"))
            .catch(err => {
              console.log(err)
            })
            
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
            id="email"
            placeholder="email (required)"
            label="Email Address"
            />
            <Input
            onChange={handleInputChange}
            id="userName"
            placeholder="username"
            label="User Name"
            />
            <Input
            onChange={handleInputChange}
            id="firstName"
            placeholder="First Name"
            label="First Name"
            />
            <Input
            onChange={handleInputChange}
            id="lastName"
            placeholder="Last Name"
            label="Last Name"
            />
            <YesNo
            option1="Teacher"
            option2="Student"
            onChange={handleInputChange}
            id="isTeacher"
            placeholder="teacher(Y/N)"
            label="Student or teacher?"
            />
            <br/>
            <PasswordInput
            onChange={handleInputChange}
            id="password"
            placeholder="password"
            label="Enter a password"
            />
            <PasswordInput
            onChange={handleInputChange}
            id="password2"
            placeholder="enter password again"
            label="Enter password again"
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