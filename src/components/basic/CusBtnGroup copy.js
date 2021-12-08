import React from "react";
import { makeStyles } from "@mui/styles";
import { ReactComponent as Confirm } from "../icon/confirm.svg";
import { ReactComponent as Cancel } from "../icon/cancel.svg";
import { ReactComponent as Delete } from "../icon/delete.svg";
import { ReactComponent as Edit } from "../icon/edit.svg";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";

const useStyle = makeStyles({
  btnGroup: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "5px",
    width: "255px",
    "& > div": {
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
    cursor: "pointer",
    backgroundColor: "#000",
    color: "#fff",
  },
  redMain: {
    backgroundColor: "#d83535",
    cursor: "pointer",
    color: "#fff",
  },
  disableBg: {
    opacity: "0.1",
    cursor: "not-allowed",
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
    disabled = false,
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.btnGroup}>
      {modifying === true ? (
        <>
          {!disableDelete && (
            <div
              onClick={handleDelete}
              className={clsx(classes.redMain, disabled && classes.disableBg)}>
              <Delete className={classes.deleteRed} />
              <FormattedMessage id='btnLabel-delete' />
              <div></div>
            </div>
          )}
          <div
            onClick={handleSubmit}
            className={clsx(classes.blackMain, disabled && classes.disableBg)}>
            <Confirm />
            <div>
              <FormattedMessage id='btnLabel-submit' />
            </div>
          </div>
          <div
            onClick={handleCancel}
            className={clsx(classes.blackMain, disabled && classes.disableBg)}>
            <Cancel />
            <div>
              <FormattedMessage id='btnLabel-cancel' />
            </div>
          </div>
        </>
      ) : (
        <div
          onClick={disabled === false ? handleEdit : () => {}}
          className={clsx(classes.blackMain, disabled && classes.disableBg)}>
          <Edit />
          <div>
            <FormattedMessage id='btnLabel-edit' />
          </div>
        </div>
      )}
    </div>
  );
}
