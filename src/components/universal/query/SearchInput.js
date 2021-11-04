import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  selectQuery,
  getObjects,
  unObjectsSlice,
} from "../../../features/objectsSlice";
import makeStyles from "@mui/styles/makeStyles";
// import { InputAdornment, OutlinedInput } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../icon/searchIcon.svg";
const useStyle = makeStyles({
  //   root: {
  //     width: "286px",
  //     "& .MuiOutlinedInput-notchedOutline": {
  //       border: "2px solid",
  //       borderColor: "rgba(0, 0, 0, 0.3)",
  //       borderRadius: "0",
  //     },
  //     "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "red" },
  //   },
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
/**
 *
 * @param {*} props
 * @returns
 */
export default function SearchInput(props) {
  const classes = useStyle();
  const {
    flagSlice,
    api,
    farSearch,
    matchSearchCode,
    placeholder,
    hidden = false,
  } = props;
  const dispatch = useDispatch();
  const search = useSelector(selectQuery(flagSlice))?.search || "";
  // console.log(flagSlice,api)
  const onChangeSearch = (e) => {
    const val = e.target.value;
    dispatch(
      setQuery({ flagSlice, query: { key: "search", val }, isReload: true })
    );
    // 如果找到完全匹配的code
    if (matchSearchCode) matchSearchCode(val);
  };
  // 根据本身 filter 的变化, 更新 reducer 中对应查找的数据 (如果加载此组件， 则不用在父组件中加载)
  useEffect(() => {
    flagSlice &&
      api &&
      dispatch(getObjects({ flagSlice, api, isReload: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // 根据父组件 farSearch 的变化 及时更新 recucer 中的 filter, (比如点击卡片 search input 会变为 obj.code)
  useEffect(() => {
    console.log(farSearch);
    if (farSearch && typeof farSearch === "string") {
      dispatch(
        setQuery({
          flagSlice,
          query: { key: "search", val: farSearch },
          isReload: true,
        })
      );
    }
  }, [dispatch, farSearch, flagSlice]);
  // console.log(search);

  // 卸载
  useEffect(() => {
    return () => {
      flagSlice && dispatch(unObjectsSlice(flagSlice));
    };
  }, [dispatch, flagSlice]);

  return (
    <div
      className={classes.inputBox}
      style={{ display: hidden === true ? "none" : "" }}>
      <SearchIcon className={classes.inputIcon} />
      <input
        className={classes.inputStyle}
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
      />
    </div>
  );
}
