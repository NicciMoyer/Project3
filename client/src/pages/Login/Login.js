import React, { useState, useContext, useEffect } from "react";
import { Input, PasswordInput, FormBtn } from "../../components/Form";
import { Link, Redirect } from "react-router-dom";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import "./style.css";
import { Animated } from "react-animated-css";


function Login(props) {
  const { id, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)

  const [formObject, setFormObject] = useState({});
  const [errState, setErrState] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false)
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  useEffect(() => {
  props.setUserState({
    userName: "",
    prefix: "",
    firstName: "",
    lastName: "",
    userId: "",
    isTeacher: false
  })
}, [])

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrState("");
    axios.post("/api/login", { ...formObject })
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          props.setUserState({ userName: res.data.userName, prefix: res.data.prefix, firstName: res.data.firstName, lastName: res.data.lastName, userId: res.data.id, isTeacher: res.data.isTeacher })
          setLoginSuccess(true)
        }
      })
      .catch(err => {
        setErrState("Incorrect username and/or password")
        console.log(err)
      })
  };
   

  return (
    <Container >
      {loginSuccess ? isTeacher ? <Redirect to="/teacherdashboard" /> : <Redirect to="/studentdashboard" /> :
        <>
          <Jumbotron >
            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
              <h1 id="logInJumbotron">Login or <Link to="/">Sign Up</Link></h1>
            </Animated>
          </Jumbotron>
          <div>
            <FormBtn id="signUpButton"
              disabled={!(formObject.email && formObject.password)}
              onClick={handleFormSubmit}
            >Log In</FormBtn>
            <form id="logInForm">
              <Input className="inputField"
                id="emailInputLogin"
                onChange={handleInputChange}
                name="email"
                placeholder="Email (required)"
                // label="Email address:  "
              />
              <PasswordInput className="inputField"
                id="passwordInputLogin"
                onChange={handleInputChange}
                name="password"
                placeholder="Password"
                // label="Password:  "
              />

            </form>
          </div>
          <div className="errorBox">{errState}</div></>}
    </Container>
  )

}

export default Login;