import React from "react"

const UserContext=React.createContext({
    userName: "",
    prefix: "",
    firstName: "",
    lastName: "",
    id: "",
    isTeacher: false
})

export default UserContext