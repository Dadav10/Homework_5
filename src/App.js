import React, { Component } from "react";
import Projects from "./components/Projects";

class App extends Component {
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Projects</h2>
        <Projects />
      </div>
    );
  }
}

export default App;