import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

export default function InfoBox({ label, type, object, variant, noBox, editing, form, setForm, curRole, permMap }) {
  //calculate if editable
  const { [curRole]: userPerms } = permMap;
  let editable = editing && curRole < object.role;
  if (type === "nome") {
    editable = editing && curRole < object.role;
  }
  if (type === "shop") {
    editable = editing && curRole < object.role && curRole < 100;
  }

  return (
    <Grid item xs={1} sm={1}>
      <Box
        sx={{
          border: noBox || !editable ? 0 : 1,
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
        {editable ? (
          <VarietyInput object={object} type={type} variant={variant} form={form} setForm={setForm} curRole={curRole} />
        ) : (
          <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>{object[type]}</Typography>
          // <div></div>
        )}
      </Box>
    </Grid>
  );
}
