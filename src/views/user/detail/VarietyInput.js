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

  switch (variant?.name) {
    case "select":
      return (
        <Autocomplete
          disablePortal
          id={type}
          options={variant.variantObj.options}
          onChange={handleList}
          fullWidth
          value={content}
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
