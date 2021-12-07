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
    minWidth: "255px",
    "& > div": {
      height: "30px",
      maxWidth: "30px",
      minWidth: "30px",
      paddingRight: "5px",
      display: "flex",
      fontSize: "16px",
      alignItems: "center",
      borderRadius: "4px",
      margin: "5px",
      transition: "max-width 0.5s",
      overflow: "hidden",
      whiteSpace: "nowrap",
      "&:hover": {
        maxWidth: "100%",
        cursor: "pointer",
        opacity: 0.7,
      },
      "& :nth-child(1)": {
        height: "30px",
        width: "30px",
      },
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
    other_buttons, //other_buttons:[{label,style,icon,handler,}]
  } = props;
  const classes = useStyle();
  return (
    <div className={classes.btnGroup}>
      {modifying === true ? (
        <>
          {!disableDelete && (
            <div
              onClick={handleDelete}
              className={clsx(classes.redMain, disabled && classes.disableBg)}
              style={{ order: "1" }}
            >
              <div>
                <Delete className={classes.deleteRed} />
              </div>
              <div>
                <FormattedMessage id="btnLabel-delete" />
              </div>
            </div>
          )}
          <div
            onClick={handleSubmit}
            className={clsx(classes.blackMain, disabled && classes.disableBg)}
            style={{ order: "2" }}
          >
            <div>
              <Confirm />
            </div>

            <div>
              <FormattedMessage id="btnLabel-submit" />
            </div>
          </div>
          <div
            onClick={handleCancel}
            className={clsx(classes.blackMain, disabled && classes.disableBg)}
            style={{ order: "3" }}
          >
            <div>
              <Cancel />
            </div>

            <div>
              <FormattedMessage id="btnLabel-cancel" />
            </div>
          </div>
          {other_buttons &&
            other_buttons.map((button) => {
              return (
                <div onClick={button.handler} style={button.style}>
                  <div>{button.icon}</div>
                  <div>
                    <FormattedMessage id={button.label} />
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <div
          onClick={disabled === false ? handleEdit : () => {}}
          className={clsx(classes.blackMain, disabled && classes.disableBg)}
        >
          <div>
            <Edit />
          </div>

          <div>
            <FormattedMessage id="btnLabel-edit" />
          </div>
        </div>
      )}
    </div>
  );
}
