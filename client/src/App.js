import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
    <div className="App">

      <Route exact path = "/" component={Signup}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path= "/dashboard" component={Dashboard}/>
    </div>
    </Router>
  );
}

export default App;
