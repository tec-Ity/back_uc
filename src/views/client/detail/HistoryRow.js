import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import moment from "moment";
import { getRolePath } from "../../../js/conf/confUser";

const useStyle = makeStyles({
  cardBox: {
    "&>div": {
      height: "80px",
      width: "100%",
      marginBottom: "31px",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "#0000000D",
        color: "#000",
      },
    },
    textDecoration: "none",
    color: "#000",
  },
});

export default function HistoryRow({ object, client }) {
  const classes = useStyle();
  const rolePath = getRolePath();

  // console.log(object);

  return (
    <Link
      to={`/${rolePath}/order/${object._id}?fromClient=${client}`}
      className={classes.cardBox}
    >
      <div>
        <div>{object.Shop?.code}</div>
        <div>{object.code}</div>
        <div>{moment(object.at_crt).format("MM/DD/YYYY")}</div>
        <div>{object.total_quantity}</div>
        <div>{"€" + object.imp?.toFixed(2)}</div>
        <div>{object.status}</div>
      </div>
    </Link>
  );
}
