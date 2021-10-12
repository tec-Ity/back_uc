import React from "react";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Confirm } from "../icon/confirm.svg";
import { ReactComponent as Cancel } from "../icon/cancel.svg";
import { ReactComponent as Delete } from "../icon/delete.svg";
import { ReactComponent as Edit } from "../icon/edit.svg";
const useStyle = makeStyles({
  btnGroup: {
    display: "flex",
    paddingRight: "5px",
    "& > div": {
      "&:hover": {
        cursor: "pointer",
      },
      height: "30px",
      width: "30px",
      // backgroundColor: "#1d1d3840",
      //   backgroundColor: "#fff",
      margin: "5px",
      //   border: "2px solid #000",
      //   borderRadius: "5px",
    },
  },
});

export default function CusBtnGroup(props) {
  const {
    modifying = false,
    handleSubmit,
    handleDelete,
    handleCancel,
    handleEdit,
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.btnGroup}>
      {modifying === true ? (
        <>
          <div onClick={handleSubmit}>
            <Confirm />
          </div>
          <div onClick={handleCancel}>
            <Cancel />
          </div>
          <div onClick={handleDelete}>
            <Delete />
          </div>
        </>
      ) : (
        <>
          <div onClick={handleEdit}>
            <Edit />
          </div>
          <div onClick={handleDelete}>
            <Delete />
          </div>
        </>
      )}
    </div>
  );
}
