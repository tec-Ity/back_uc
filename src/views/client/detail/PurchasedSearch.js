import React, { useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import { ReactComponent as SearchIcon } from "../../../components/icon/searchIcon.svg";

const useStyle = makeStyles({
  magnifierStyle: { width: "30px", height: "30px", opacity: "0.5" },
  inputBox: {
    width: "286px",
    height: "40px",
    position: "relative",
  },
  inputIcon: {
    width: "24px",
    height: "20px",
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  inputStyle: {
    height: "100%",
    width: "100%",
    paddingRight: "30px",
    paddingLeft: "12px",
    border: "2px solid #0000004d",
    borderRadius: 0,
    "&:focus": { borderColor: "#000", borderRadius: "0" },
  },
});

export default function PurchasedSearch({
  setFilter,
  placeholder,
  hidden = false,
}) {
  const classes = useStyle();
  const search = "";
  const [Val, setVal] = useState(search);
  function onChangeSearch(e) {
    // console.log(e.target.value);
    setVal(e.target.value);
    setFilter(e.target.value);
  }
  return (
    <div
      className={classes.inputBox}
      style={{ display: hidden === true ? "none" : "" }}
    >
      <SearchIcon className={classes.inputIcon} />
      <input
        className={classes.inputStyle}
        placeholder={placeholder}
        value={Val}
        onChange={onChangeSearch}
      />
    </div>
  );
}
