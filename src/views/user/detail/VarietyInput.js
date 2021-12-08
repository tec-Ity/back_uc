import { TextField, Autocomplete, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

export default function VarietyInput({
  content,
  variant,
  check,
  setForm,
  form,
  type,
}) {
  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }

  const [listValue, setListValue] = useState({
    label: variant?.variantObj?.options?.filter(
      (option) => option.id === form[type]
    )[0]?.label,
    id: form[type],
  });
  function handleList(event, newValue) {
    setListValue(newValue);
    setForm({ ...form, [type]: newValue.id });
  }

  function handleSelect(event) {
    setForm({ ...form, [type]: event.target.value });
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
        <Select
          value={form[type]}
          variant="standard"
          fullWidth
          disableUnderline
          onChange={handleSelect}
        >
          {variant.variantObj.options.map((option) => (
            <MenuItem value={option.id}>
              <FormattedMessage id={`${type}-${option.id}`} />
            </MenuItem>
          ))}
        </Select>
      );
    case "autocomplete":
      return (
        <Autocomplete
          disablePortal
          id={type}
          options={variant.variantObj.options}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.label ?? option.id}
          onChange={handleList}
          fullWidth
          value={listValue}
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
    default:
      return (
        <TextField
          id={type}
          variant="standard"
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
