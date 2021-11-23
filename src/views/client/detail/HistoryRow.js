import React from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import moment from "moment";

const useStyle = makeStyles({
  cardBox: {
    "&>div": {
      height: "80px",
      width: "100%",
      marginBottom: "31px",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "#0000004D",
      },
    },
    textDecoration: "none",
    color: "#000",
    "&:hover": {
      color: "#000",
    },
  },
});

export default function HistoryRow({ object }) {
  const classes = useStyle();

  console.log(object);

  return (
    <Link to={`${object._id}`} className={classes.cardBox}>
      <div>
        <div>{object.Shop?.code}</div>
        <div>{object.code}</div>
        <div>{moment(object.at_crt).format("MM/DD/YYYY")}</div>
        <div>{object.total_quantity}</div>
        <div>{"€" + object.imp.toFixed(2)}</div>
        <div>{object.status}</div>
      </div>
    </Link>
  );
}
