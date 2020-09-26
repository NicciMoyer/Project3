import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Books from "./pages/Books"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <Router>
    <div className="App">

      <Route exact path = "/" component={Signup}/>
      <Route exact path = "/login" component={Login}/>
      <Route exact path= "/books" component={Books}/>
    </div>
    </Router>
  );
}

export default App;
