import { Switch } from "@mui/material";
import React from "react";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function ToggleBox({ status }) {
  return (
    <div>
      <Switch {...label} defaultChecked={!status} />
    </div>
  );
}
