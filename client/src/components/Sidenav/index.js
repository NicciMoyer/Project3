
import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext"
import { Sidenav, Nav} from 'rsuite';
import "./style.css"

function SideBar({children}) {

    const { userId, prefix, firstName, lastName, userName, isTeacher } = useContext(UserContext)
    return (
        <div style={{ "width": 250, height: "100%", "backgroundColor": "#eee" }}>
            <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">

                <Sidenav.Body id= "navBody">
                    <Nav> Destinations
                        {children}
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>

    )
}

export default SideBar;

