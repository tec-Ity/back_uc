import { TextField, Autocomplete } from "@mui/material";

export default function VarietyInput({
  content,
  variant,
  variantObj,
  setForm,
  form,
  type,
}) {
  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }
  switch (variant) {
    case "shop":
      return (
        <Autocomplete
          disablePortal
          id={type}
          options={variantObj.testlist}
          fullWidth
          renderInput={(params) => (
            <TextField
              variant="standard"
              InputProps={{ disableUnderline: true }}
              {...params}
              label="Shop"
            />
          )}
        />
      );
    default:
      return (
        <TextField
          id={type}
          variant="standard"
          value={form[type] ? form[type] : content}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
      );
  }
}
