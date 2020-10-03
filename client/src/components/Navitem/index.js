import React from "react"
import { Nav, Icon } from 'rsuite';
import { Link } from "react-router-dom";


function NavItem(props){

    return(
        <Nav.Item eventKey={props.eventkey} icon={<Icon icon={props.icon} />} className= "navLink">

        <Link
                                            to= {{pathname: props.path}}
        >
            {props.navtext}</Link>
    </Nav.Item>
    )

}

export default NavItem