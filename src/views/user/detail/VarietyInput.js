import {
  Input,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  inputBox: {
    height: "45px",
    margin: "32px 10px 22px 10px",
    border: (props) => (props.editing ? "1px solid #0000004D" : "none"),
    borderRadius: "5px",
    position: "relative",
    "& p": {
      fontSize: "16px",
      lineHeight: "80%",
      color: "#0000004D",
      fontWeight: "700",
      margin: 0,
      position: "absolute",
      top: "-5px",
      left: "7px",
      backgroundColor: "#fff",
      padding: "0px 2px 0px 2px",
    },
    "& .MuiInputBase-input": {
      height: "100%",
      fontSize: "16px",
      fontWeight: "700",
      color: "#000",
      WebkitTextFillColor: "#000",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      height: "100%",
      fontSize: "16px",
      fontWeight: "700",
      color: "#000",
      WebkitTextFillColor: "#000",
    },
  },
});

export default function VarietyInput({
  field: { label, type, check, inputType },
  stateHandler: [form, setForm],
  editing,
}) {
  const props = { editing };
  const classes = useStyle(props);

  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }
  function handleList(event, newValue) {
    setForm({ ...form, [type]: newValue.id });
  }
  function handleSelect(event) {
    setForm({ ...form, [type]: event.target.value });
  }

  //calculate error
  let error = null;
  // if (check?.min && form[type].length < check?.min) {
  //   error = { state: true, message: check?.errMsg.minMsg + check?.min };
  // }
  // if (check?.max && form[type].length > check?.max) {
  //   error = { state: true, message: check?.errMsg.maxMsg + check?.max };
  // }
  // if (check?.trim && form[type].length === check?.trim) {
  //   error = { state: true, message: check?.errMsg.trimMsg + check?.trim };
  // }

  let fieldTag;
  switch (inputType?.[0]) {
    case "select":
      fieldTag = (
        <Select
          id={type}
          value={form[type] || ""}
          variant="standard"
          sx={{
            padding: "10px",
          }}
          fullWidth
          disableUnderline
          disabled={!editing}
          onChange={handleSelect}
        >
          {inputType[1].map((option) => (
            <MenuItem value={option.id}>
              <FormattedMessage id={`${type}-${option.id}`} />
            </MenuItem>
          ))}
        </Select>
      );

      break;
    case "autocomplete":
      fieldTag = (
        <Autocomplete
          disablePortal
          id={type}
          sx={{
            padding: "10px",
          }}
          fullWidth
          disabled={!editing}
          options={inputType[1]}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.label || option}
          value={
            inputType[1].filter((option) => option.id === form[type])[0] || ""
          }
          onChange={handleList}
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
      break;
    default:
      fieldTag = (
        <Input
          id={type}
          fullWidth
          disableUnderline
          disabled={!editing}
          error={error?.state}
          helperText={error?.state ? error?.message : null}
          value={form[type]}
          onChange={handleChange}
          sx={{
            padding: "10px",
          }}
        />
      );
      break;
  }

  return (
    <div className={classes.inputBox}>
      {fieldTag}
      <p>{label}</p>
    </div>
  );
}
