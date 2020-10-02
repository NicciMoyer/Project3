import React, { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext"
import { InputClear, FormBtn } from "../../components/Form";
import { Container, Col, Row } from "../../components/Grid";
import axios from "axios";
import ClassCard from "../../components/ClassCard";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css"
import "./style.css";

import SideBar from "../../components/Sidenav" 


function TeacherDashboard() {
  const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
  const [formObject, setFormObject] = useState({});
  const [classList, setClassList] = useState([])

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  useEffect(() => {
    axios.get("/api/teacherclass/" + userId)
      .then((res) => {
        console.log(res.data)
        console.log(UserContext)
        setClassList(res.data)
      })
  }, [])

  function handleFormSubmit(event){
    event.preventDefault();
    axios.post("/api/newclass", formObject)
    .then((res) => {
      console.log(res)
      let newClass={
        title: formObject.title,
        subtitle: formObject.subtitle,
        id: res.data.id
      }
      setFormObject({title: "", subtitle: ""})
      setClassList([...classList, newClass])
    })
    .catch(err => {
      console.log(err)
    })
}
  return (
    <Container >
      <>
        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
          <h1 id= "teacherLandingJumbotron">Hello, {prefix}  {lastName}</h1>
        </Animated>
        <Row>
          <Col size= "4">

        <SideBar/> 

        </Col>
          <Col size="md-4 sm-8" id= "createClassCol">
            <h2 id= "createClassHeader">Create a New Class</h2>
            <form>
              <InputClear
                id= "classNameInput"
                className="inputField"
                onChange={handleInputChange}
                value={formObject.title || ""}
                name="title"
                placeholder="Class Name"
                label="Class Name"
              />
              <InputClear
                id= "classSubtitleInput"
                className="inputField"
                onChange={handleInputChange}
                value={formObject.subtitle || ""}
                name="subtitle"
                placeholder="subtitle"
                label="Subtitle"
              />
              <br></br>
              <br></br>
              <br></br>
              <FormBtn id= "createClassButton"
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >Create Class</FormBtn>
            </form>
          </Col>
          <Col size="md-4 sm-8" id= "showClassCol">
            <h2 id= "showClassHeader">My Classes</h2>
            {classList.map((item) => (
              // <>
                <Link to={"/classes/" + item.id} key={item.id}>
                  <ClassCard title={item.title} subtitle={item.subtitle} key={item.id} />
                </Link>
              // </>
            ))}
          </Col></Row>
      </>
    </Container >

  )
}

export default TeacherDashboard;