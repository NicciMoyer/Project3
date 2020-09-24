import React, { useState, useEffect } from "react"
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Login(){
    const [formObject, setFormObject] = useState({})

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

      function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.email && formObject.password) {
            console.log(formObject)
        }
      };

    return(
        <Container>
        <Jumbotron>
        <h1>Login</h1>
        <h2>or</h2>
        <h1><Link to="/">Sign </Link></h1>
      </Jumbotron>
      <form>
            <Input
            onChange={handleInputChange}
            name="email"
            placeholder="email (required)"
            />
            <Input
            onChange={handleInputChange}
            name="password"
            placeholder="password"
        />
                      <FormBtn
                disabled={!(formObject.email && formObject.password)}
                onClick={handleFormSubmit}
              >Log In</FormBtn>
      </form>
      </Container>
    )

}

export default Login;