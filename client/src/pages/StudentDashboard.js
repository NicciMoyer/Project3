import React, { useContext } from "react"
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { InputClear, FormBtn } from "../components/Form";
import { Container, Col, Row } from "../components/Grid";
import { Link } from "react-router-dom";
import ClassCard from "../components/ClassCard";
import StudentGradeCard from "../components/StudentGradesCard";
import coloredPencilsBottom from "../images/coloredPencilsBottom.jpg";

function StudentDashboard() {
    const { id, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    const [classLIst, setClassList] = useState([]);

    useEffect(() => {
        axios.get("/api/classes/" + id)
            .then((res) => {
                console.log(res.data)
                setClassList(res.data)
            })
        axios.get("/api/grades/" + id)
            .then((res) => {
                setGradesList(res.data)
            })
    }, [])
}

return (
    <div styles={{ backgroundImage: `url(${coloredPencilsBottom})` }}>
        <h2>Hello, {prefix} {firstName} {lastName}</h2>
        <h3>Username: {userName} </h3>
        <p>You {isTeacher ? "are" : "are not"} a teacher</p>
        <Row>
            <Col size="md-6 sm-12">
                <h2>My Classes</h2>
                {classList.map((item) => (
                    <>
                        <Link to={"/classes/" + item.id} key={item.id}>
                            <ClassCard title={item.title} subtitle={item.subtitle} key={item.id} />
                        </Link>
                    </>
                ))}
            </Col>
            <Col size="md-6 sm-12">
                <h2>My Grades</h2>
                {classList.map((item) => (
                    <>
                        <StudentGradesCard score={item.score} notes={item.notes} status={item.status} />
                    </>
                ))}
            </Col>

        </Row>




    </div>
)
}

export default StudentDashboard;

