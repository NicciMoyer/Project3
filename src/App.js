import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Books from "./pages/Books"

function App() {
  return (
    <Router>
    <div className="App">

      <Route exact path = "/" component={Books}/>

    </div>
    </Router>
  );
}

export default App;
