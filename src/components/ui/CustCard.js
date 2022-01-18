import React from "react";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  cardBox: {
    height: (props) => props.height,
    width: (props) => props.width,
    padding: "10px",
    backgroundColor: "#fff",
    margin: "16px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#00000010",
    },
    "& .image": {
      height: (props) => props.img_h,
      width: (props) => props.img_w,
      display: "block",
      objectFit: "scale-down",
      marginBottom: "10px",
    },
    "& .content": {
      "& p": {
        padding: "0",
        margin: "0",
      },
      "& .duo": {
        display: "flex",
        justifyContent: "space-between",
      },
      "& .title": {
        fontSize: "12px",
        fontWeight: "700",
      },
      "& .desc": {
        fontSize: "12px",
        fontWeight: "400",
        color: "#0000004D",
      },
      "& .normal": {
        fontSize: "12px",
        fontWeight: "400",
        color: "#000000",
      },
    },
  },
  rowCard: {
    height: (props) => props.height,
    width: "100%",
    padding: "10px",
    marginBottom: "25px",
    borderRadius: "5px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    "&:hover": {
      backgroundColor: "#00000010",
    },
    "& .image": {
      height: (props) => props.img_h,
      width: (props) => props.img_w,
      display: "block",
      objectFit: "scale-down",
      marginRight: "10px",
    },
    "& .content": {
      width: "100%",
      "& p": {
        padding: "0",
        margin: "0",
      },
      "& .duo": {
        display: "flex",
        justifyContent: "space-between",
      },
      "& .title": {
        fontSize: "20px",
        fontWeight: "700",
      },
      "& .desc": {
        fontSize: "20px",
        fontWeight: "400",
        color: "#0000004D",
      },
      "& .normal": {
        fontSize: "20px",
        fontWeight: "400",
        color: "#000000",
      },
    },
  },
});

export default function CustCard({ dimensions, img, content, row = false }) {
  const props = {
    height: dimensions?.height || (row ? "84px" : "220px"),
    width: dimensions?.width || (row ? "100%" : "180px"),
    img_h: img?.dimensions?.height || (row ? "64px" : "160px"),
    img_w: img?.dimensions?.width || (row ? "64px" : "160px"),
  };
  const classes = useStyle(props);
  return row ? (
    <div className={classes.rowCard}>
      <img className="image" src={img.url} alt={img.alt} />
      <div className="content">{content}</div>
    </div>
  ) : (
    <div className={classes.cardBox}>
      <img className="image" src={img.url} alt={img.alt} />
      <div className="content">{content}</div>
    </div>
  );
}
