import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import UserContext from "./contexts/UserContext";
import ClassPage from "./pages/ClassPage/ClassPage";
import AssignmentPage from "./pages/AssignmentPage";
import PrivateRoute from "./components/PrivateRoute";
import 'rsuite/lib/styles/index.less';

function App() {
  const [userState, setUserState] =useState({
    userName: "",
    prefix: "",
    firstName: "",
    lastName: "",
    userId: "",
    isTeacher: false
  })

  return (
    <UserContext.Provider value={userState}>
    <Router>
    <div className="App">
      <Switch>
      <Route exact path = "/" ><Signup setUserState={setUserState}/></Route>
      <Route exact path = "/login"><Login setUserState={setUserState}/></Route>
      <PrivateRoute exact path= "/studentdashboard" component={StudentDashboard}/>
      <PrivateRoute exact path= "/teacherdashboard" component={TeacherDashboard}/>
      <PrivateRoute exact path= "/classes/:id" component={ClassPage}/>
      <PrivateRoute exact path= "/assignments/:assignmentid/:classid" component={AssignmentPage}/>

      </Switch> 

    </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
