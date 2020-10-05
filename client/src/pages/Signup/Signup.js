import React, { useState, useContext } from "react"
import { Input, PasswordInput, FormBtn, YesNo } from "../../components/Form";
import { Link, Redirect } from "react-router-dom";
import { Container, Col, Row } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import "./style.css";
import { Animated } from "react-animated-css"

function Signup(props) {
  const { id, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
  const [formObject, setFormObject] = useState({})
  const [errState, setErrState] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)


  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    setErrState("");
    if (formObject.email && formObject.userName && formObject.firstName && formObject.lastName && formObject.password && formObject.password2) {
      if (formObject.password !== formObject.password2) {
        setErrState("Passwords do not match")
      } else {
        if (formObject.isTeacher === "Teacher") {
          formObject.isTeacher = true;
        } else {
          formObject.isTeacher = false;
        }
      }
      console.log(formObject)
      const newObject = { ...formObject }
      axios.post("/api/signup", newObject)
        .then((res) => {
          props.setUserState({ userName: res.data.userName, prefix: res.data.prefix, firstName: res.data.firstName, lastName: res.data.lastName, userId: res.data.id, isTeacher: res.data.isTeacher })
          setLoginSuccess(true)
        })
        .catch(err => {
          console.log(err)
        })

    }
  };

  return (
    <Container >
      {loginSuccess ? isTeacher ? <Redirect to="/teacherdashboard" /> : <Redirect to="/studentdashboard" /> :
        <>
          <Jumbotron>
            <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
              <h1 id="signUpLogo">School<i class="icon-content rs-icon rs-icon-wrench" id= "wrench"></i>Box</h1>
              <h1 id="signUpJumbotron">
                Sign Up or <Link to="/login">Log in</Link>
              </h1>
            </Animated>
          </Jumbotron>
          <div >
            <Row>
            <Col size="md-5 sm-12" >
                <div id= "signUpButtonCol">
                <FormBtn id="signUpButton"
                  disabled={!(formObject.email && formObject.userName && formObject.firstName && formObject.lastName && formObject.password && formObject.password2)}
                  onClick={handleFormSubmit}
                >Sign Up!</FormBtn>
                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div id="signUpForm">
                <form>
                  <Input className="inputField"
                    id="emailInput"
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Email (required)"
                  // label="Email Address:  "
                  />
                  <Input className="inputField"
                    id="userNameInput"
                    onChange={handleInputChange}
                    name="userName"
                    placeholder="Username"
                  // label="User Name:  "
                  />
                  <Input className="inputField"
                    id="firstNameInput"
                    onChange={handleInputChange}
                    name="firstName"
                    placeholder="First Name"
                  // label="First Name:  "
                  />
                  <Input className="inputField"
                    id="lastNameInput"
                    onChange={handleInputChange}
                    name="lastName"
                    placeholder="Last Name"
                  // label="Last Name:  "
                  />
                  <Input className="inputField"
                    id="prefixInput"
                    onChange={handleInputChange}
                    name="prefix"
                    placeholder="Prefix (ex. Mr. Mrs, etc.)"
                  // label="Prefix:  "
                  />
                  <YesNo className="inputField"
                    id="roleSelector"
                    option1="Student"
                    option2="Teacher"
                    onChange={handleInputChange}
                    name="isTeacher"
                  // label="Student or teacher?  "
                  />
                  <PasswordInput className="inputField"
                    id="passwordInput1"
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Password"
                  // label="Enter a password:  "
                  />
                  <PasswordInput className="inputField"
                    id="passwordInput2"
                    onChange={handleInputChange}
                    name="password2"
                    placeholder="Enter password again"
                  // label="Enter password again:  "
                  />


                  <div className="errorBox">{errState}</div>

                </form>
                </div>
              </Col>
            
            </Row>
          </div>
        </>

      }

    </Container>
  )
}


export default Signup;