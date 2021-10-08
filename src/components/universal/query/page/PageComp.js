import React from "react";
import { Pagination } from "@mui/material";
import { setQuery } from "../../../../features/objectsSlice";
import { useDispatch } from "react-redux";

export default function PageComp(props) {
  const { flagSlice, count } = props;
  const dispatch = useDispatch();
  const handleChangePage = (e, val) => {
    dispatch(
      setQuery({
        flagSlice,
        query: {
          key: "page",
          val,
        },
        isReload: false,
      })
    );
  };
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <Pagination
        count={parseInt(count) || 1}
        shape='rounded'
        size='large'
        color='primary'
        onChange={handleChangePage}
      />
    </div>
  );
}
