import { TextField, Autocomplete } from "@mui/material";

export default function VarietyInput({
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

  function handleListShop(event, newValue) {
    console.log(newValue);
  }
  function handleListRole(event, newValue) {
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

  switch (variant?.name) {
    case "shop":
      return (
        <Autocomplete
          disablePortal
          id={type}
          options={variant.variantObj.testlist}
          onChange={handleListShop}
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
          id={type}
          options={variant.variantObj.testlist}
          onChange={handleListRole}
          fullWidth
          value={roleName(form[type])}
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
        <TextField
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
