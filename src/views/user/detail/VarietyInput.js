import { TextField } from "@mui/material";
import React from "react";

export default function VarietyInput({ content, variant, handleChange }) {
  switch (variant) {
    case "shop":
      return (
        <TextField
          id="standard-basic"
          select
          variant="standard"
          defaultValue={content}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
      );
    default:
      return (
        <TextField
          id="standard-basic"
          variant="standard"
          value={content}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
      );
  }
}
