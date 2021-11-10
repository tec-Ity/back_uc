import { TextField, Autocomplete } from "@mui/material";
import { styled } from "@mui/system";

const CustTextField = styled(TextField)(() => ({
  marginRight: 8,
  "& .Mui-disabled": {
    fontWeight: 700,
    color: "rgba(0, 0, 0, 1)", // (default alpha is 0.38)
  },
}));

export default function VarietyInput({
  editable,
  object,
  variant,
  setForm,
  form,
  type,
  curRole,
}) {
  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }

  function handleList(event, newValue) {
    setForm({ ...form, [type]: newValue?.id });
  }

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

  let custOut = null;
  if (type === "role") {
    custOut = roleName(form[type]);
  }

  switch (variant?.name) {
    case "shop":
      return (
        <Autocomplete
          disablePortal
          id={variant.name}
          options={variant.variantObj.options}
          onChange={handleList}
          fullWidth
          value={form[type]}
          renderInput={(params) => {
            return (
              <TextField
                variant="standard"
                {...params}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            );
          }}
        />
      );
    case "role":
      return (
        <Autocomplete
          disablePortal
          id={variant.name}
          options={variant.variantObj.options}
          onChange={handleList}
          fullWidth
          value={custOut || form[type]}
          renderInput={(params) => {
            return (
              <TextField
                variant="standard"
                {...params}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            );
          }}
          getOptionDisabled={(option) => curRole >= option.id}
        />
      );
    default:
      return (
        <CustTextField
          id={type}
          variant="standard"
          value={form[type]}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
      );
  }
}
