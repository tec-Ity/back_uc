import React from "react";
import makeStyles from "@mui/styles/makeStyles";
const useStyle = makeStyles({
  inputBox: {
    position: "relative",
    // border: "1px solid",
    width: "100%",
    height: "50px",
  },
  inputlabel: {
    // border:'1px solid',
    fontFamily: "Montserrat",
    fontSize: "14px",
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
    fontWeight: "400",
    fontSize: "16px",
    border: "2px solid #1d1d384d",
  },
});
export default function CusInput({
  label,
  value,
  handleChange,
  disabled,
  ref,
  placeholder = "",
  autoCompleteParam,
}) {
  const classes = useStyle();
  return (
    <div className={classes.inputBox} ref={ref}>
      <input
        value={value}
        onChange={!disabled ? handleChange : () => {}}
        {...autoCompleteParam}
        disabled={disabled}
        className={classes.inputStyle}
        placeholder={placeholder}
      />
      <label className={classes.inputlabel}>{label}</label>
    </div>
  );
}
