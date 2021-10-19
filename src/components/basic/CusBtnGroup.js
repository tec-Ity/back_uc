import React from "react";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Confirm } from "../icon/confirm.svg";
import { ReactComponent as Cancel } from "../icon/cancel.svg";
import { ReactComponent as Delete } from "../icon/delete.svg";
import { ReactComponent as Edit } from "../icon/edit.svg";
import { ReactComponent as ConfirmSec } from "../icon/doneBlack.svg";
import { ReactComponent as CancelSec } from "../icon/cancelBlack.svg";
import { ReactComponent as DeleteSec } from "../icon/deleteBlack.svg";
import { ReactComponent as EditSec } from "../icon/editBlack.svg";

const useStyle = makeStyles({
  btnGroup: {
    display: "flex",
    // alignItems: "center",
    paddingRight: "5px",
    "& > div": {
      "&:hover": {
        cursor: "pointer",
      },
      height: "30px",
      width: "30px",
      margin: "5px",
    },
  },
  deleteRed: {
    "& rect": { fill: "#d83535" },
  },
});

export default function CusBtnGroup(props) {
  const {
    secondary = false,
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
            {secondary === true ? <ConfirmSec /> : <Confirm />}
          </div>
          <div onClick={handleCancel}>
            {secondary === true ? <CancelSec /> : <Cancel />}
          </div>
          <div onClick={handleDelete}>
            {secondary === true ? (
              <DeleteSec />
            ) : (
              <Delete className={classes.deleteRed} />
            )}
          </div>
        </>
      ) : (
        <>
          <div onClick={handleEdit}>
            {secondary === true ? <EditSec /> : <Edit />}
          </div>
          <div onClick={handleDelete}>
            {secondary === true ? (
              <DeleteSec />
            ) : (
              <Delete className={classes.deleteRed} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
