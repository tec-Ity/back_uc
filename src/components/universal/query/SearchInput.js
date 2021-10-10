import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  selectQuery,
  getObjects,
  unObjectsSlice,
} from "../../../features/objectsSlice";
import makeStyles from "@mui/styles/makeStyles";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { ReactComponent as Magnifier } from "./magnifier.svg";
const useStyle = makeStyles({
  root: { width: "392px", borderRadius: "0" },
  magnifierStyle: { width: "30px", height: "30px", opacity: "0.5" },
});

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
    dispatch(getObjects({ flagSlice, api, isReload: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // 根据父组件 farSearch 的变化 及时更新 recucer 中的 filter, (比如点击卡片 search input 会变为 obj.code)
  useEffect(() => {
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
      dispatch(unObjectsSlice(flagSlice));
    };
  }, [dispatch, flagSlice]);

  return (
    <OutlinedInput
      style={{ display: hidden === true ? "none" : "" }}
      size='small'
      variant='outlined'
      classes={{ root: classes.root }}
      onChange={onChangeSearch}
      placeholder={placeholder}
      value={search}
      endAdornment={
        <InputAdornment position='end'>
          <Magnifier className={classes.magnifierStyle} />
        </InputAdornment>
      }
    />
  );
}
