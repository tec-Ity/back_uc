import React from "react";
import { Typography, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

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

  return (
    <Box
      sx={{
        border: noBox || !flag ? 0 : 1,
        p: "10px",
        m: "17px",
        mt: "27px",
        position: "relative",
        borderRadius: "5px",
        height: "50px",
        width: "90%",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "#0000004D",
          fontWeight: "700",
          position: "absolute",
          top: "-10px",
          bgcolor: "white",
        }}
      >
        {label}
      </Typography>
      {flag && editing ? (
        <VarietyInput
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
      ) : (
        <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
          {content ? content : null}
        </Typography>
      )}
    </Box>
  );
}
