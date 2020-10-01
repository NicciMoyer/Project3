import React, {useContext} from "react"
import UserContext from "../../contexts/UserContext"
import {Route, Redirect} from "react-router-dom"

function PrivateRoute({ component: Component, ...rest }){
    const {userId} = useContext(UserContext)

    return(
        <Route {...rest}
        render={(props) => 
        (userId !==""
        ? <Component {...props}/>
        :<Redirect to ="/login"/>)}
        />
    )


}

export default PrivateRoute;