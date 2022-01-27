import React from "react";
import { makeStyles } from "@mui/styles";
import VarietyInput from "./VarietyInput";

const useStyle = makeStyles({
  inputBox: {
    height: "45px",
    margin: "32px 10px 22px 10px",
    border: (props) => (props.editing ? "1px solid #0000004D" : "none"),
    borderRadius: "5px",
    position: "relative",
    "& p": {
      fontSize: "16px",
      lineHeight: "80%",
      color: "#0000004D",
      fontWeight: "700",
      margin: 0,
      position: "absolute",
      top: "-5px",
      left: "7px",
      backgroundColor: "#fff",
      padding: "0px 2px 0px 2px",
    },
    "& .MuiInputBase-input": {
      height: "100%",
      fontSize: "16px",
      fontWeight: "700",
      color: "#000",
      WebkitTextFillColor: "#000",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      height: "100%",
      fontSize: "16px",
      fontWeight: "700",
      color: "#000",
      WebkitTextFillColor: "#000",
    },
  },
});

export default function InfoBox({
  field,
  check,
  object,
  variant,
  noBox,
  editing,
  form,
  setForm,
  curUser,
  curRole,
}) {
  const { label, content, type, editable } = field;

  const flag0 = editable == null ? true : editable;

  let flag = flag0 && editing;
  const props = { editing: flag };
  const classes = useStyle(props);

  return (
    <div className={classes.inputBox}>
      <VarietyInput
        editing={flag}
        content={content}
        variant={variant}
        check={check}
        object={object}
        type={type}
        form={form}
        setForm={setForm}
        curUser={curUser}
        curRole={curRole}
      />
      <p style={{ margin: 0 }}>{label}</p>
    </div>
  );
}
