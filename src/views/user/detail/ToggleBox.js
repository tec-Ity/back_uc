import { Switch, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

const CustSwitch = styled(Switch)(() => ({
  width: 40,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 4,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      "& + .MuiSwitch-track": {
        backgroundColor: "#ffffff",
        opacity: 1,
        border: "2px solid #000000",
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#000000",
        opacity: 1,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#000000",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "#000000",
      opacity: 0.3,
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    width: 12,
    height: 12,
    backgroundColor: "#000000",
    opacity: 0.3,
    boxSizing: "border-box",
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    border: "2px solid #000000",
    borderColor: "111111",
    backgroundColor: "#ffffff",
    opacity: 0.3,
    transition: {
      duration: 500,
    },
  },
}));

export default function ToggleBox({ checked, label }) {
  const [status, setStatus] = useState(checked);

  function handleChange() {
    return setStatus((prev) => !prev);
  }

  return (
    <div>
      {label && (
        <Typography
          sx={{
            fontSize: "16px",
            color: "#0000004D",
            fontWeight: "700",
          }}
        >
          {label}
        </Typography>
      )}
      <CustSwitch checked={status} onChange={handleChange} />
    </div>
  );
}
