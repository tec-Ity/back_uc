import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Autocomplete } from "@mui/material";
const useStyle = makeStyles({
  inputBox: {
    position: "relative",
    // border: "1px solid",
    height: "50px",
  },
  inputLabel: {
    // border:'1px solid',
    fontFamily: "Montserrat",
    padding: "0 2px",
    lineHeight: "1em",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: "10px",
    fontWeight: "700",
    color: "#1d1d384d",
    fontSize: "14px"
  },
  inputStyle: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    paddingLeft: "20px",
    paddingTop: "0",
    fontWeight: "400",
    fontSize: "16px",
    border: "2px solid #1d1d384d",
  },
});
export default function CusSelect({
  label,
  value,
  disabled,
  options = [],
  handleSelect,
  placeholder,
}) {
  const classes = useStyle();
  const [vauleUpdate, setVauleUpdate] = useState(value || "");
  //init input value to prop value
  React.useEffect(() => {
    setVauleUpdate(value);
  }, [value]);
  const handleInputChange = (val) => {
    setVauleUpdate(val);
  };
  return (
    <Autocomplete
      //   getOptionsLabel={(option) =>
      //     typeof option?.label === "string" ? option.label : ""
      //   }
      disabled={disabled}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      inputValue={vauleUpdate}
      // getOptionSelected={(option) => option.id === value.id}
      clearOnBlur={false}
      onChange={(e, val) => e && handleSelect(val)}
      onInputChange={(e, val) => e && handleInputChange(val)}
      id='custom-input-demo'
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className={classes.inputBox}>
          <input
            type='text'
            {...params.inputProps}
            className={classes.inputStyle}
            placeholder={placeholder}
          />
          <label className={classes.inputLabel}>{label}</label>
        </div>
      )}
    />
  );
}
