import React, { Component } from "react";
import ProjectCard from "./ProjectCard";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "" // use same domain on Heroku
    : "http://localhost:5000"; // use Flask locally

const initialProjects = [
  {
    id: 1,
    name: "Project Name 1",
    joined: false,
    hwsets: [
      { id: 1, name: "HWSet1", capacity: 100, available: 70, checkedOut: 30 },
      { id: 2, name: "HWSet2", capacity: 100, available: 50, checkedOut: 50 },
    ],
  },
  {
    id: 2,
    name: "Project Name 2",
    joined: false,
    hwsets: [
      { id: 1, name: "HWSet1", capacity: 100, available: 80, checkedOut: 20 },
      { id: 2, name: "HWSet2", capacity: 100, available: 60, checkedOut: 40 },
    ],
  },
  {
    id: 3,
    name: "Project Name 3",
    joined: false,
    hwsets: [
      { id: 1, name: "HWSet1", capacity: 100, available: 100, checkedOut: 0 },
      { id: 2, name: "HWSet2", capacity: 100, available: 0, checkedOut: 100 },
    ],
  },
];

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: initialProjects,
    };
  }

  // --- Join / Leave a Project ---
  toggleJoin = async (project) => {
    const url = project.joined
      ? `${API_BASE}/leave?projectId=${project.id}`
      : `${API_BASE}/join?projectId=${project.id}`;

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
      alert(data.message);

      this.setState((prevState) => ({
        projects: prevState.projects.map((p) =>
          p.id === project.id ? { ...p, joined: !p.joined } : p
        ),
      }));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // --- Check In Hardware ---
  handleCheckIn = async (projectId, hwId, amount) => {
    const url = `${API_BASE}/checkin?projectId=${projectId}&qty=${amount}`;
    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
      alert(data.message);

      // update local state for UI
      this.setState((prevState) => ({
        projects: prevState.projects.map((project) => {
          if (project.id !== projectId) return project;
          return {
            ...project,
            hwsets: project.hwsets.map((hw) => {
              if (hw.id !== hwId) return hw;
              const validAmount = Math.min(hw.checkedOut, amount);
              const checkedOut = hw.checkedOut - validAmount;
              const available = Math.min(hw.capacity, hw.available + validAmount);
              return { ...hw, checkedOut, available };
            }),
          };
        }),
      }));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // --- Check Out Hardware ---
  handleCheckOut = async (projectId, hwId, amount) => {
    const url = `${API_BASE}/checkout?projectId=${projectId}&qty=${amount}`;
    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
      alert(data.message);

      // update local state for UI
      this.setState((prevState) => ({
        projects: prevState.projects.map((project) => {
          if (project.id !== projectId) return project;
          return {
            ...project,
            hwsets: project.hwsets.map((hw) => {
              if (hw.id !== hwId) return hw;
              const actualAmount = Math.min(hw.available, amount);
              const checkedOut = hw.checkedOut + actualAmount;
              const available = hw.available - actualAmount;
              return { ...hw, checkedOut, available };
            }),
          };
        }),
      }));
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  render() {
    const { projects } = this.state;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onToggleJoin={() => this.toggleJoin(project)}
            onCheckIn={this.handleCheckIn}
            onCheckOut={this.handleCheckOut}
          />
        ))}
      </div>
    );
  }
}

export default Projects;