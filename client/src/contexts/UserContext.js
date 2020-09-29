import React from "react"

const UserContext=React.createContext({
    userName: "",
    prefix: "",
    firstName: "",
    lastName: "",
    userId: "",
    isTeacher: false
})

export default UserContext