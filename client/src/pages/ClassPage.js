import React , {useState, useEffect, useContext} from "react"
import {useParams } from "react-router-dom"
import axios from "axios"
import { Container, Col , Row} from "../components/Grid";
import UserContext from "../contexts/UserContext"


function ClassPage(props){
    const{userId} =useContext(UserContext)
    const{id} = useParams()
    const [className, setClassName] = useState("")
    const[owner, setOwner] =useState(false)

    useEffect(() => {
        axios.get("/api/class/"+id)
        .then((res) => {
            setClassName(res.data.title)
            setOwner(res.data.UserId===userId)
        })
    })

    return(
        <div>
        <h3>Hello, class ID is {id}</h3>
        <h3>Class Name is {className}</h3>
        <h3>You {owner? "are" : "are not" } the teacher of this class</h3>
        <Container>
            <Row>
            <Col size="md-4 sm-12">
                <h2>Add Assignment</h2>
                <h2>Add Student</h2>
            </Col>
            <Col size="md-4 sm-12">
                <h2>Students</h2>
            </Col>
            <Col size="md-4 sm-12">
            <h2>Assignments</h2>
            </Col>
            </Row>
        </Container>
        </div>
    )
}

export default ClassPage;