import React from "react"
import { Nav, Icon } from 'rsuite';
import { Link } from "react-router-dom";
import "./style.css"


function NavItem(props) {

    return (
        <Link to={props.path}>
        <Nav.Item id="navLi" eventKey={props.eventkey} icon={<Icon icon={props.icon} />} className="navLink">
            <div >
                {props.navtext}
            </div>
        </Nav.Item>
        </Link>
    )

}

export default NavItem