import React, { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext"
import { InputClear, FormBtn } from "../../components/Form";
import { Container, Col, Row } from "../../components/Grid";
import axios from "axios";
import ClassCard from "../../components/ClassCard";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css"
import "./style.css";
import {Dropdown, Icon} from "rsuite";
import NavItem from "../../components/Navitem";
import SideBar from "../../components/Sidenav"; 


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

  function handleFormSubmit(event) {
    event.preventDefault();
    axios.post("/api/newclass", formObject)
      .then((res) => {
        console.log(res)
        let newClass = {
          title: formObject.title,
          subtitle: formObject.subtitle,
          id: res.data.id
        }
        setFormObject({ title: "", subtitle: "" })
        setClassList([...classList, newClass])
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <Container >
        <Animated animationIn="bounceInDown" animationOut="fadeOut" isVisible={true}>
        <h1 id= "teacherDashLogo">School<i class="icon-content rs-icon rs-icon-wrench" id= "wrench"></i>Box</h1>
          <h1 id="teacherLandingJumbotron">Hello, {prefix}.  {lastName}!</h1>
        </Animated>
        <Row>
        <Col size="md-4 sm-12">
                <SideBar>
                <NavItem eventkey={"1"} icon={"dashboard"} path={"/teacherdashboard"} navtext={"Dashboard"}/>
                <NavItem eventkey={"2"} icon={"stop-circle"} path={"/login"} navtext={"Log Out"}/>
                <Dropdown className= "classDropdown" eventKey="3" title="Classes" icon={<Icon icon="magic" />}>
                    {classList.map(item =>(
                      <Link to={"/classes/" + item.id} key={item.id}>
                      <Dropdown.Item className= "classDropdown" eventKey={"3-"+item.id}>{item.title}</Dropdown.Item>
                      </Link>   
                    ))}
                </Dropdown> 
                </SideBar> 

                </Col>
          <Col size="md-4 sm-12" >
            <div id= "createClassDiv">
            <h2 className= "teacherHeader" id= "createClassHeader">Create a New Class</h2>
            <form>
              <InputClear
                id="classNameInput"
                className="inputField"
                onChange={handleInputChange}
                value={formObject.title || ""}
                name="title"
                placeholder="Class Name"
              // label="Class Name"
              />
              <InputClear
                id="classSubtitleInput"
                className="inputField"
                onChange={handleInputChange}
                value={formObject.subtitle || ""}
                name="subtitle"
                placeholder="Subtitle"
              // label="Subtitle"
              />
              <FormBtn
                id="createClassButton"
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >Create Class
                </FormBtn>
              {/* </form> */}
            </form>
            </div>
          </Col>
          <Col size="md-4 sm-12"  id="showClassCol">
            <div id="classCard">
              <h2 className= "teacherHeader" id="showClassHeader">My Classes</h2>
              {classList.map((item) => (
                <Link to={"/classes/" + item.id} key={item.id}>
                  <ClassCard title={item.title} subtitle={item.subtitle} key={item.id} />
                </Link>
            ))}
            </div>
          </Col>
          </Row>
    </Container >
      </>

  )
}

export default TeacherDashboard;