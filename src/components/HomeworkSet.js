import React, { Component } from "react";
import { Typography, TextField, Button, Stack } from "@mui/material";

class HomeworkSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      this.setState({ input: value });
    }
  };

  handleCheckInClick = () => {
    const { onCheckIn, projectId, hw } = this.props;
    const { input } = this.state;
    const amount = Number(input);

    if (amount > 0) {
      onCheckIn(projectId, hw.id, amount);
      this.setState({ input: "" });
    }
  };

  handleCheckOutClick = () => {
    const { onCheckOut, projectId, hw } = this.props;
    const { input } = this.state;
    const amount = Number(input);

    if (amount > 0) {
      onCheckOut(projectId, hw.id, amount);
      this.setState({ input: "" });
    }
  };

  render() {
    const { hw, joined } = this.props;
    const { input } = this.state;

    return (
      <div style={{ marginTop: "10px" }}>
        <Typography variant="subtitle1">{hw.name}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Capacity: {hw.capacity} | Available: {hw.available} | Checked Out: {hw.checkedOut}
        </Typography>

        {joined && (
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              label="Qty"
              variant="outlined"
              value={input}
              onChange={this.handleChange}
              sx={{ width: "80px" }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={this.handleCheckInClick}
            >
              Check In
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={this.handleCheckOutClick}
            >
              Check Out
            </Button>
          </Stack>
        )}
      </div>
    );
  }
}

export default HomeworkSet;