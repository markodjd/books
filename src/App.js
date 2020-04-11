import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container-fluid">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/about/:id" component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;
