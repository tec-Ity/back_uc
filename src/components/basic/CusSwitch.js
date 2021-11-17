import { Switch } from "@mui/material";
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
      background: "#e5e5e5",
    },
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
        // opacity: 0.5,
        backgroundColor: "#e5e5e5",
      },
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

    backgroundColor: "#ffffff",
    opacity: 0.3,
    transition: {
      duration: 500,
    },
  },
}));

export default function CusSwitch({ checked, handleSwitch, disabled = false }) {
  const [status, setStatus] = useState(checked);

  function handleChange() {
    if (disabled === false) {
      handleSwitch(!status);
      setStatus((prev) => !prev);
    }
  }

  return (
    <CustSwitch checked={checked} onChange={handleChange} disabled={disabled} />
  );
}
