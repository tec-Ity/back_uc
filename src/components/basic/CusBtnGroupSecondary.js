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
    justifyContent: "flex-end",
    paddingRight: "5px",
    width: "255px",
    "& > div": {
      //   border: "1px solid yellow",
      cursor: "pointer",
      height: "30px",
      width: "74px",
      display: "flex",
      fontSize: "16px",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      margin: "5px",
    },
  },
  deleteRed: {
    "& rect": { fill: "#d83535" },
  },
  blackMain: {
    backgroundColor: "#000",
    color: "#fff",
  },
  blackSec: {
    // "&>:nth-child(1)": { marginRight: "5px" },
  },
  redSec: {
    color: "#d83535",
    '& line':{stroke:'#d83535'},
    '& path':{stroke:'#d83535'},
    '& ellipse':{stroke:'#d83535',fill:'#d83535'},
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
          <div onClick={handleDelete} className={classes.redSec}>
            <DeleteSec />
            <div>删除</div>
          </div>
          <div onClick={handleSubmit}>
            <ConfirmSec />
          </div>
          <div onClick={handleCancel}>
            <CancelSec />
          </div>
        </>
      ) : (
        <div onClick={handleEdit} className={classes.blackSec}>
          <EditSec />
          <div>编辑</div>
        </div>
      )}
    </div>
  );
}
