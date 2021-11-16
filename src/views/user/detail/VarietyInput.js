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

  function handleList(event, newValue) {
    setForm({ ...form, [type]: newValue?.id });
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
          clearOnBlur={false}
          id={type}
          options={variant.variantObj.options}
          getOptionLabel={(option) => option.label}
          onChange={handleList}
          fullWidth
          inputValue={form[type]}
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
