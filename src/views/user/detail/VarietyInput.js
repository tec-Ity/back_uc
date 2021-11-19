import { TextField, Autocomplete } from "@mui/material";
import { useState } from "react";



export default function VarietyInput({ content, variant, check, setForm, form, type }) {
  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }

  const [listValue, setListValue] = useState({
    label: variant?.variantObj?.options?.filter((option) => option.id === form[type])[0]?.label || "",
    id: form[type],
  });
  function handleList(event, newValue) {
    setListValue(newValue);
    setForm({ ...form, [type]: newValue.id });
  }

  //calculate error
  let error = null;
  if (check?.min && form[type].length < check?.min) {
    error = { state: true, message: check?.errMsg.minMsg + check?.min };
  }
  if (check?.max && form[type].length > check?.max) {
    error = { state: true, message: check?.errMsg.maxMsg + check?.max };
  }
  if (check?.trim && form[type].length === check?.trim) {
    error = { state: true, message: check?.errMsg.trimMsg + check?.trim };
  }

  switch (variant?.name) {
    case "select":
      return (
        <Autocomplete
          disablePortal
          id={type}
          options={variant.variantObj.options}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.label}
          onChange={handleList}
          fullWidth
          value={listValue}
          renderInput={(params) => {
            return (

              <TextField variant='standard' {...params} InputProps={{ ...params.InputProps, disableUnderline: true }} />
            );
          }}
        />
      );
    default:
      return (
        <TextField
          id={type}
          variant='standard'
          error={error?.state}
          helperText={error?.state ? error?.message : null}
          value={form[type]}
          onChange={handleChange}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
      );
  }
}
