import React from "react";
import CusInput from "./CusInput";
import makeStyles from "@mui/styles/makeStyles";
import { Grid } from "@mui/material";

const useStyle = makeStyles({
  root: {
    // border: "1px solid",
  },
  endIcon: {
    position: "absolute",
    height: "15px",
    width: "15px",
    right: "7px",
    top: "23px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0000001a",
      borderRadius: "10%",
    },
  },
});

export default function CusInputWithExtLabel({
  label,
  //   value,
  //   handleChange,
  //   disabled,
  endIcon,
  handleEndIcon,
  ...inputProps
}) {
  const classes = useStyle();
  return (
    <Grid container className={classes.root}>
      <Grid container item xs={3} alignItems='center'>
        <div>{label}</div>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={8} style={{ position: "relative" }}>
        <CusInput label='' {...inputProps} />
        {endIcon && (
          <img
            src={endIcon}
            alt=''
            className={classes.endIcon}
            onClick={handleEndIcon}
          />
        )}
      </Grid>
    </Grid>
  );
}
