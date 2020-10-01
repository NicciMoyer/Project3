import React, { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext"
import { InputClear, FormBtn } from "../../components/Form";
import { Container, Col, Row } from "../../components/Grid";
import axios from "axios";
import ClassCard from "../../components/ClassCard";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css"
import "./style.css";


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
        setClassList(res.data)
      })
  }, [])

  function handleFormSubmit(event) {
    event.preventDefault();
    axios.post("/api/newclass", formObject)
      .then((res) => {
        setFormObject({ title: "", subtitle: "" })
        setClassList([...classList, formObject])
        console.log("Hello")
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
          <Col size="md-6 sm-12">
            <h2>Create New Class</h2>
            <form>
              <InputClear
                onChange={handleInputChange}
                value={formObject.title || ""}
                name="title"
                placeholder="Class Name"
                label="Class Name"
              />
              <InputClear
                onChange={handleInputChange}
                value={formObject.subtitle || ""}
                name="subtitle"
                placeholder="subtitle"
                label="Subtitle"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >Create</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <h2>Your Classes</h2>
            {classList.map((item) => (
              <>
                <Link to={"/classes/" + item.id} key={item.id}>
                  <ClassCard title={item.title} subtitle={item.subtitle} key={item.id} />
                </Link>
              </>
            ))}
          </Col></Row>
      </>
    </Container >

  )
}

export default TeacherDashboard;