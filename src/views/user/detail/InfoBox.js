import React from "react";
import { Typography, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

function roleName(roleId) {
  const roleMap = {
    1: "拥有者",
    3: "管理者",
    5: "超级员工",
    101: "店铺老板",
    103: "店铺员工",
  };

  return roleMap[roleId];
}

export default function InfoBox({
  label,
  type,
  object,
  altObject = null,
  altType = null,
  variant,
  noBox,
  editing,
  form,
  setForm,
  curUser,
  curRole,
  permMap,
}) {
  //calculate if editable
  let editable = editing && curRole < object.role;
  if (type === "nome") {
    editable =
      editing && (curRole < object.role || curUser.code === object.code);
  }
  let custOut = null;
  if (type === "role") {
    custOut = roleName(object?.[type]);
  }
  if (type === "Shop") {
    custOut = altObject?.[altType];
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
          {custOut ? custOut : object[type]}
        </Typography>
      )}
    </Box>
  );
}
