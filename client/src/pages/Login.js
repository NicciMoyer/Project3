import React, { useState} from "react"
import { Input, PasswordInput, FormBtn } from "../components/Form";
import { Link, Redirect } from "react-router-dom";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import axios from "axios"

function Login(){
    const [formObject, setFormObject] = useState({});
    const [errState, setErrState]= useState("");
    const [loginSuccess, setLoginSuccess] =useState(false)
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
      };

      function handleFormSubmit(event) {
        event.preventDefault();
        setErrState("");
            axios.post("/api/login", {...formObject})
            .then((res) => {if(res.status === 200){
              console.log(res)
              setLoginSuccess(true)
            }})
            .catch(err=> {
              setErrState("Incorrect username and/or password")
              console.log(err)})
      };

    return(
      <Container>
        {loginSuccess ? <Redirect to ="/dashboard" /> :
        <>
        <Jumbotron>
        <h1>Login</h1>
        <h2>or</h2>
        <h1><Link to="/">Sign Up</Link></h1>
      </Jumbotron>
      <form>
            <Input
            onChange={handleInputChange}
            name="email"
            placeholder="email (required)"
            />
            <PasswordInput
            onChange={handleInputChange}
            name="password"
            placeholder="password"
        />
                      <FormBtn
                disabled={!(formObject.email && formObject.password)}
                onClick={handleFormSubmit}
              >Log In</FormBtn>
      </form>
      <div className="errorBox">{errState}</div></>}
      </Container>
    )

}

export default Login;