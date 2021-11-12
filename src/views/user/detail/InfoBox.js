import React from "react";
import { Typography, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

export default function InfoBox({
  label,
  content,
  type,
  permissions,
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
  //calculate if editable
  let editable;
  if (false) {
    let arr = permissions.map((permission) => {
      switch (permission) {
        case "hierachy":
          return object.role > curRole;
        case "self":
          return object.code === curUser.code;
        default:
          console.log("not a permission");
          return false;
      }
    });
    console.log("[PERM]", arr);
    editable = editing && arr.every((perm) => perm === true);
  } else {
    editable = editing;
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
