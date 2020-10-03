
import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext"
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon } from 'rsuite';
import "./style.css"
import NavItem from "../../components/Navitem"

function SideBar() {

    const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    return (
        <div style={{ "width": 250, height: "100%", "background-color": "#eee" }}>
            <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">

                <Sidenav.Body id= "navBody">
                    <Nav> Destinations
                        <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />} className= "navLink">


                            <Link
                                to={isTeacher ? {
                                    pathname: "/teacherdashboard"
                                } : { pathname: "/studentdashboard" }
                                }

                            > Dashboard </Link>
                        </Nav.Item>
                        <NavItem eventkey={"2"} icon={"stop-circle"} path={"/login"} navtext={"Log Out"}/>

                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>

    )
}

export default SideBar;

