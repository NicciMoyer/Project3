import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext"
import { Sidenav, Nav } from 'rsuite';
import "./style.css"

function SideBar({ children }) {
    const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    return (

        <Sidenav id="navDiv" defaultOpenKeys={['3', '4']} activeKey="1">
            <div >
                <Sidenav.Body >
                    <Nav> 
                        {children}
                    </Nav>
                </Sidenav.Body>

            </div>
        </Sidenav>
    )
}

export default SideBar;

