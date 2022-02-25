import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  inputBox: {
    minHeight: "45px",
    margin: "32px 10px 22px 10px",
    "& legend": {
      float: "none",
      width: "auto",
    },
    "& .select": {
      "& legend": {
        maxWidth: "100%",
      },
    },
    "& .input, .select": {
      "& .MuiInputLabel-root, legend": {
        fontSize: "16px",
        fontWeight: "700",
        color: "#0000004D",
        transform: "translate(14px, -9px)",
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#1976d2",
        },
      },
      "& .MuiOutlinedInput-root, .MuiOutlinedInput": {
        height: "40px",
      },
      "& 	.MuiAutocomplete-inputRoot": {
        padding: "0px 8px",
      },
      "& .MuiInputBase-input, .select": {
        fontSize: "16px",
        fontWeight: "700",
        color: "#000",
        WebkitTextFillColor: "#000",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderStyle: (props) => (props.editing ? "solid" : "none"),
      },
    },
  },
});

export default function VarietyInput({
  field: { label, content, type, check, inputType },
  stateHandler: [form, setForm],
  editing,
}) {
  const props = { editing };
  const classes = useStyle(props);

  function handleChange(event) {
    setForm({ ...form, [type]: event.target.value });
  }
  function handleList(event, newValue) {
    setForm({ ...form, [type]: newValue?.id });
  }
  function handleSelect(event) {
    setForm({ ...form, [type]: event.target.value });
  }

  //calculate error
  let error = null;
  if (check && form[type]) {
    if (check.min && form[type].length < check.min) {
      error = { state: true, message: check.errMsg.minMsg + check.min };
    }
    if (check.max && form[type].length > check.max) {
      error = { state: true, message: check.errMsg.maxMsg + check.max };
    }
    if (check.trim && form[type].length !== check.trim) {
      error = { state: true, message: check.errMsg.trimMsg + check.trim };
    }
    if (check.regexp && !form[type].match("^[a-zA-Z0-9]*$")) {
      error = { state: true, message: check.errMsg.regexpMsg };
    }
  }

  let fieldTag;
  switch (inputType?.type) {
    case "static":
      fieldTag = <p>{content}</p>;
      break;
    case "select":
      fieldTag = (
        <>
          <FormControl className="select" fullWidth disabled={!editing}>
            <InputLabel id={`${type}-label`} shrink>
              {label}
            </InputLabel>
            <Select
              label={label}
              labelId={`${type}-label`}
              value={form[type] || ""}
              onChange={handleSelect}
            >
              {inputType.options.map((option) => (
                <MenuItem value={option.id}>
                  <FormattedMessage id={`${type}-${option.id}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      );

      break;
    case "autocomplete":
      fieldTag = (
        <Autocomplete
          disablePortal
          fullWidth
          disabled={!editing}
          options={inputType.options}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.label || option}
          value={
            inputType.options.filter((option) => option.id === form[type])[0] ||
            ""
          }
          onChange={handleList}
          renderInput={(params) => {
            return (
              <>
                <TextField
                  {...params}
                  className="input"
                  // className={classes.test}
                  label={label}
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              </>
            );
          }}
        />
      );
      break;
    default:
      fieldTag = (
        <TextField
          label={label}
          className="input"
          fullWidth
          // size="small"
          disabled={!editing}
          error={error?.state}
          helperText={error?.state && editing ? error?.message : null}
          value={form[type] || ""}
          onChange={handleChange}
        />
      );
      break;
  }

  return (
    <div key={type} className={classes.inputBox}>
      {fieldTag}
    </div>
  );
}
