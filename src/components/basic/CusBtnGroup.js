import React from "react";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Confirm } from "../icon/confirm.svg";
import { ReactComponent as Cancel } from "../icon/cancel.svg";
import { ReactComponent as Delete } from "../icon/delete.svg";
import { ReactComponent as Edit } from "../icon/edit.svg";

const useStyle = makeStyles({
  btnGroup: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "5px",
    width: "255px",
    "& > div": {
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
  redMain: {
    backgroundColor: "#d83535",
    color: "#fff",
  },
});

export default function CusBtnGroup(props) {
  const {
    modifying = false,
    handleSubmit,
    handleDelete,
    handleCancel,
    handleEdit,
    disableDelete = false,
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.btnGroup}>
      {modifying === true ? (
        <>
          {!disableDelete && (
            <div onClick={handleDelete} className={classes.redMain}>
              <Delete className={classes.deleteRed} />
              <div>删除</div>
            </div>
          )}
          <div onClick={handleSubmit} className={classes.blackMain}>
            <Confirm />
            <div>确认</div>
          </div>
          <div onClick={handleCancel} className={classes.blackMain}>
            <Cancel />
            <div>取消</div>
          </div>
        </>
      ) : (
        <div onClick={handleEdit} className={classes.blackMain}>
          <Edit />
          <div>编辑</div>
        </div>
      )}
    </div>
  );
}
