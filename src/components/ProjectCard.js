import React, { Component } from "react";
import { Card, CardContent, Typography, Button, Divider } from "@mui/material";
import HomeworkSet from "./HomeworkSet";

class ProjectCard extends Component {
  render() {
    const { project, onToggleJoin, onCheckIn, onCheckOut } = this.props;

    return (
      <Card
        variant="outlined"
        sx={{
          backgroundColor: project.joined ? "#e8f5e9" : "#fafafa",
          borderColor: project.joined ? "#81c784" : "#ccc",
        }}
      >
        <CardContent>
          <Typography variant="h6">{project.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            list, of, authorized, users
          </Typography>
          <Divider sx={{ my: 1 }} />

          {project.hwsets.map((hw) => (
            <HomeworkSet
              key={hw.id}
              hw={hw}
              joined={project.joined}
              projectId={project.id}
              onCheckIn={onCheckIn}
              onCheckOut={onCheckOut}
            />
          ))}

          <Divider sx={{ my: 1 }} />
          <Button
            variant="contained"
            color={project.joined ? "secondary" : "primary"}
            onClick={onToggleJoin}
            sx={{ mt: 1 }}
          >
            {project.joined ? "Leave" : "Join"}
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default ProjectCard;