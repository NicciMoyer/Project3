import React from "react"
import { Nav, Icon } from 'rsuite';
// import { Link } from "react-router-dom";
import "./style.css"


function NavItem(props) {

    return (
        <Nav.Item id="navLi" eventKey={props.eventkey} icon={<Icon icon={props.icon} />} href={props.path} className="navLink">
            <div >
                {props.navtext}

            </div>
        </Nav.Item>
    )

}

export default NavItem