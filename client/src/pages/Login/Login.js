import React, { useState, useContext} from "react"
import { Input, PasswordInput, FormBtn } from "../../components/Form";
import { Link, Redirect } from "react-router-dom";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import axios from "axios"
import UserContext from "../../contexts/UserContext"

function Login(props){
    const{id, prefix, firstName, lastName, userName, isTeacher} =useContext(UserContext)

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
              props.setUserState({userName: res.data.userName, prefix: res.data.prefix, firstName: res.data.firstName, lastName: res.data.lastName, userId: res.data.id, isTeacher: res.data.isTeacher})
              setLoginSuccess(true)
            }})
            .catch(err=> {
              setErrState("Incorrect username and/or password")
              console.log(err)})
      };

    return(
      <Container>
          {loginSuccess ? isTeacher ? <Redirect to ="/teacherdashboard" />: <Redirect to ="/studentdashboard"/> :
        <>
        <Jumbotron>
        <h1>Login</h1>
        <h2>or</h2>
        <h1><Link to="/">Sign Up</Link></h1>
      </Jumbotron>
      <form>
            <Input id= "EmailInput"
            onChange={handleInputChange}
            name="email"
            placeholder="email (required)"
            />
            <PasswordInput id= "PasswordInput"
            onChange={handleInputChange}
            name="password"
            placeholder="password"
        />
                      <FormBtn id= "SignUpButton"
                disabled={!(formObject.email && formObject.password)}
                onClick={handleFormSubmit}
              >Log In</FormBtn>
      </form>
      <div className="errorBox">{errState}</div></>}
      </Container>
    )

}

export default Login;