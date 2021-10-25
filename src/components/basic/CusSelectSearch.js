import React, { useEffect, useState, useCallback } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  //   setQuery,
  //   selectQuery,
  getObjects,
  unObjectsSlice,
} from "../../features/objectsSlice";
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
export default function CusSelectSearch({
  label,
  optionLabelType = "code",
  extraValueType,
  flagSlice,
  populateObjs = null,
  api,
  placeholder,
  defaultSel,
  disabled,
  handleSelect,
  queryUrl = "",
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  //   const search = useSelector(selectQuery(flagSlice))?.search || "";
  const objects = useSelector((state) => state.objects[flagSlice]?.objects);
  const [inputValue, setInputValue] = useState(defaultSel || "");
  //on select autocompelete option
  const handleSelectOption = (e, val) => {
    handleSelect(val);
  };
  //   console.log(queryUrl);
  //on inputvalue change
  //   console.log(queryUrl);
  //   console.log("flag", flagSlice);
  //   console.log(objects);
  const handleChangeInputValue = useCallback(
    (e, val) => {
      //e passed null at first time with no reason
      if (e) {
        setInputValue(val);
        flagSlice &&
          dispatch(
            getObjects({
              flagSlice,
              api:
                api +
                "?search=" +
                val +
                queryUrl +
                (populateObjs
                  ? "&populateObjs=" + JSON.stringify(populateObjs)
                  : ""),
              isReload: true,
            })
          );
      }
    },
    [api, dispatch, flagSlice, populateObjs, queryUrl]
  );

  //init default selection provided by parent component
  useEffect(() => {
    if (defaultSel && typeof defaultSel === "string") {
      handleChangeInputValue("init", defaultSel);
    }
  }, [defaultSel, handleChangeInputValue]);

  // 卸载
  useEffect(() => {
    return () => {
      flagSlice && dispatch(unObjectsSlice(flagSlice));
    };
  }, [dispatch, flagSlice]);
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      //   getOptionsLabel={(option) =>
      //     typeof option?.label === "string" ? option.label : ""
      //   }
      disabled={disabled}
      inputValue={inputValue}
      onChange={handleSelectOption}
      onInputChange={handleChangeInputValue}
      filterOptions={(x) => x}
      id={"custom-input-demo" + flagSlice + api}
      clearOnBlur={false}
      options={
        objects
          ? objects.map((obj) => ({
              id: obj._id,
              label: obj[optionLabelType],
              [extraValueType]: obj[extraValueType],
            }))
          : []
      }
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className={classes.inputBox}>
          <input
            type='text'
            placeholder={placeholder}
            {...params.inputProps}
            className={classes.inputStyle}
          />
          <label className={classes.inputLabel}>{label}</label>
        </div>
      )}
    />
  );
}
