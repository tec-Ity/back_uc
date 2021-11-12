import React from "react";
import { Typography, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

export default function InfoBox({
  label,
  content,
  type,
  object,
  variant,
  noBox,
  editing,
  form,
  setForm,
  curUser,
  curRole,
}) {
  //calculate if editable
  let editable = editing && curRole < object.role;
  if (type === "nome") {
    editable =
      editing && (curRole < object.role || curUser.code === object.code);
  }

  return (
    <Box
      sx={{
        border: noBox || !editable ? 0 : 1,
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
      {editable ? (
        <VarietyInput
          editable={editable}
          content={content}
          object={object}
          type={type}
          variant={variant}
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
