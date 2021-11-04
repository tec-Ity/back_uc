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
import clsx from "clsx";

const useStyle = makeStyles({
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    paddingRight: "5px",
    width: "135px",
  },
  modifyGroup: {
    cursor: "pointer",
    height: "30px",
    width: "30px",
    margin: "5px",
  },
  deleteRed: {
    "& rect": { fill: "#d83535" },
  },
  btnBox: {
    height: "30px",
    width: "74px",
    display: "flex",
    fontSize: "16px",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: "4px",
  },
  editBoxFir: {
    backgroundColor: "#000",
    color: "#fff",
  },
  editBoxSec: {
    // "&>:nth-child(1)": { marginRight: "5px" },
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
    <di v className={classes.btnGroup}>
      {modifying === true ? (
        <div className={classes.modifyGroup}>
          <div onClick={handleDelete}>
            {secondary === true ? (
              <div className={clsx(classes.btnBox, classes.deleteBoxSec)}>
                <DeleteSec />
              </div>
            ) : (
              <div className={clsx(classes.btnBox, classes.deleteBoxFir)}>
                <Delete className={classes.deleteRed} />
              </div>
            )}
          </div>
          <div onClick={handleSubmit}>
            {secondary === true ? <ConfirmSec /> : <Confirm />}
          </div>
          <div onClick={handleCancel}>
            {secondary === true ? <CancelSec /> : <Cancel />}
          </div>
        </div>
      ) : secondary === true ? (
        <div
          onClick={handleEdit}
          className={clsx(classes.btnBox, classes.editBoxSec)}>
          <EditSec />
          <div>编辑</div>
        </div>
      ) : (
        <div
          onClick={handleEdit}
          className={clsx(classes.btnBox, classes.editBoxFir)}>
          <Edit />
          <div>编辑</div>
        </div>
      )}
    </di>
  );
}
