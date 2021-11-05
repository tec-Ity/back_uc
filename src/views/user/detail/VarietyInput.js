import { TextField, Autocomplete } from "@mui/material";

export default function VarietyInput({ object, variant, setForm, form, type, curRole }) {
  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }

  function handleListShop(event, newValue) {
    console.log(newValue);
  }
  function handleListRole(event, newValue) {
    console.log(newValue.id);
    setForm({ ...form, [type]: newValue.id });
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
          renderInput={(params) => {
            return (
              <TextField variant='standard' {...params} InputProps={{ ...params.InputProps, disableUnderline: true }} />
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
          renderInput={(params) => {
            return (
              <TextField variant='standard' {...params} InputProps={{ ...params.InputProps, disableUnderline: true }} />
            );
          }}
          getOptionDisabled={(option) => curRole >= option.id}
        />
      );
    default:
      return (
        <TextField
          id={type}
          variant='standard'
          value={form[type] ? form[type] : object[type]}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
      );
  }
}
