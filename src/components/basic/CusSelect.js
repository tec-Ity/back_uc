import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Autocomplete } from "@mui/material";
const useStyle = makeStyles({
  inputBox: {
    position: "relative",
    // border: "1px solid",
    height: "50px",
  },
  inputLabel: {
    // border:'1px solid',
    fontFamily: "Montserrat",
    padding: "0 2px",
    lineHeight: "1em",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: "10px",
    fontWeight: "700",
    color: "#1d1d384d",
  },
  inputStyle: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    paddingLeft: "20px",
    paddingTop: "0",
    fontWeight: "700",
    fontSize: "20px",
    border: "2px solid #1d1d384d",
  },
});
export default function CusSelect({
  label,
  value,
  handleChange,
  disabled,
  options = [],
  handleSelect,
}) {
  const classes = useStyle();
  return (
    <Autocomplete
      // sx={{
      //   display: "inline-block",
      //   "& input": {
      //     width: 200,
      //     bgcolor: "background.paper",
      //     color: (theme) =>
      //       theme.palette.getContrastText(theme.palette.background.paper),
      //   },
      // }}
      // getOptionsLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={value}
      // getOptionSelected={(option) => option.id === value.id}
      onChange={(e, val) => handleSelect(e, val)}
      id='custom-input-demo'
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className={classes.inputBox}>
          <input
            type='text'
            {...params.inputProps}
            className={classes.inputStyle}
          />
          <label className={classes.inputLabel}>{label}</label>
        </div>
      )}
    />
  );
}
