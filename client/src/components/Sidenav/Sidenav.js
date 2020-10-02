import React, {useContext} from "react";
import UserContext from "../../contexts/UserContext"
import 'rsuite/lib/styles/index.less';
import { Link } from "react-router-dom";
import { Sidenav, Nav, Icon } from 'rsuite';

import "../../pages/AssignmentPage";
import "../../pages/ClassPage";
import "../../pages/StudentDashboard/StudentDashboard";
import "../../pages/TeacherDashboard/TeacherDashboard"

function SideTest() {
    const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    return (
        <div style={{ width: 250 }}>
            <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />} >

                            <Link
                                to={isTeacher ? {
                                    pathname: "/TeacherDashboard"
                                } : { pathname: "/StudentDashboard" }
                                }
                            /> Dashboard
                     </Nav.Item>
                        <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                            <Link
                                to={isTeacher ? {
                                    pathname: "/ClassPage"
                                } : { pathname: "/StudentDashboard" }
                                }
                            />
                        Classes
                     </Nav.Item>
                        <Nav.Item eventKey="3" icon={<Icon icon="magic" />}>
                            <Link
                                to={isTeacher ? {
                                    pathname: "/AssignmentPage"
                                } : { pathname: "/StudentDashboard" }
                                }
                            />
                        Assignments

                    </Nav.Item>

                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>

    )
}

export default SideTest;