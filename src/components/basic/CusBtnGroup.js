import React from "react";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  btnGroup: {
    display: "flex",
    // position: "absolute",
    // right: "0",
    // top: 0,
    "& > div": {
      "&:hover": {
        cursor: "pointer",
      },
      height: "30px",
      width: "30px",
      // backgroundColor: "#1d1d3840",
      backgroundColor: "#fff",
      margin: "5px",
      border: "2px solid #000",
      borderRadius: "5px",
    },
  },
});
export default function CusBtnGroup(props) {
  const {
    modifying = false,
    handleSubmitUpdate,
    handleDelete,
    handleCancel,
    handleEdit,
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.btnGroup}>
      {modifying === true ? (
        <>
          <div onClick={handleSubmitUpdate}>Done</div>
          <div onClick={handleCancel}>Cancle</div>
          <div onClick={handleDelete}>Del</div>
        </>
      ) : (
        <>
          <div onClick={handleEdit}>edit</div>
          <div onClick={handleDelete}>del</div>
        </>
      )}
    </div>
  );
}
