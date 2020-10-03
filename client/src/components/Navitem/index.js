import React from "react"
import { Nav, Icon } from 'rsuite';
import { Link } from "react-router-dom";


function NavItem(props){

    return(
        <Nav.Item eventKey={props.eventkey} icon={<Icon icon={props.icon} />} href={props.path} className= "navLink">
            {props.navtext}
    </Nav.Item>
    )

}

export default NavItem