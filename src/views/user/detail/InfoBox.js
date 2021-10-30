import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

const permMap = {
  1: ["uid", "name", "role", "shop", "phone", "usable", "phonePre"],
  3: ["name", "role"],
};

export default function InfoBox({
  label,
  content,
  type,
  variant,
  variantObj,
  noBox,
  editing,
  form,
  setForm,
  curRole,
}) {
  const { [curRole]: userPerms } = permMap;
  return (
    <Grid item xs={1} sm={1}>
      <Box
        sx={{
          border: noBox || !(editing && userPerms.includes(type)) ? 0 : 1,
          p: "10px",
          mt: "10px",
          position: "relative",
          borderRadius: "5px",
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
        {editing && userPerms.includes(type) ? (
          <VarietyInput
            content={content}
            variant={variant}
            variantObj={variantObj}
            type={type}
            form={form}
            setForm={setForm}
          />
        ) : (
          <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
            {content}
          </Typography>
        )}
      </Box>
    </Grid>
  );
}
