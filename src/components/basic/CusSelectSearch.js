import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  selectQuery,
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
export default function CusSelect({
  label,
  value,
  flagSlice,
  api,
  placeholder,
  defaultSel,
  handleChange,
  disabled,
  options = [],
//   handleSelect,
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const search = useSelector(selectQuery(flagSlice))?.search || "";

  const handleSelect = (e, val) => {
    // const val = e.target.value;
    dispatch(
      setQuery({ flagSlice, query: { key: "search", val }, isReload: true })
    );
    // // 如果找到完全匹配的code
    // if (matchSearchCode) matchSearchCode(val);
  };
  // 根据本身 filter 的变化, 更新 reducer 中对应查找的数据 (如果加载此组件， 则不用在父组件中加载)
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // 根据父组件 defaultSel 的变化 及时更新 recucer 中的 filter, (比如点击卡片 search input 会变为 obj.code)
  useEffect(() => {
    if (defaultSel && typeof defaultSel === "string") {
      dispatch(
        setQuery({
          flagSlice,
          query: { key: "search", val: defaultSel },
          isReload: true,
        })
      );
    }
  }, [dispatch, defaultSel, flagSlice]);
  // console.log(search);

  // 卸载
  useEffect(() => {
    return () => {
      flagSlice && dispatch(unObjectsSlice(flagSlice));
    };
  }, [dispatch, flagSlice]);
  return (
    <Autocomplete
      getOptionsLabel={(option) =>
        typeof option?.code === "string" ? option.code : ""
      }
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      value={value}
      // getOptionSelected={(option) => option.id === value.id}
      onChange={(e, val) => handleSelect(e, val)}
      id='custom-input-demo'
      options={options}
      renderInput={(params) => (
        <div ref={params.InputProps.ref} className={classes.inputBox}>
          <input
            type='text'
            {...params.inputProps}
            className={classes.inputStyle}
          />
          <label className={classes.inputLabel}>{label}</label>
        </div>
      )}
    />
  );
}
