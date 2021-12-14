import React from "react";
import { get_DNS } from "../../../js/api";
import { makeStyles } from "@mui/styles";
import { default as customerProfile } from "../../../components/icon/customerProfileLightGrey.svg";

const useStyle = makeStyles({
  rowCard: {
    height: "84px",
    width: "100%",
    marginBottom: "25px",
    padding: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#0000000D",
    },
  },
  image: {
    height: "64px",
    width: "64px",
    marginRight: "10px",
  },
  container: {
    width: "100%",
    display: "flex",
    "& >div": {
      flexGrow: "1",
      //       border: "1px solid #000",
    },
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#000000",
  },
  desc: {
    fontSize: "20px",
    fontWeight: "400",
    color: "#0000004D",
  },
  tag: {
    fontSize: "20px",
    fontWeight: "400",
    color: "#000000",
  },
});

export default function ClientRow({ object, clickEvent }) {
  const classes = useStyle();
  //   let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  let img_url = customerProfile;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  return (
    <>
      {object ? (
        <div
          key={object._id}
          onClick={clickEvent && clickEvent(object)}
          className={classes.rowCard}
          style={{ display: "flex" }}
        >
          <img alt={object.code} src={img_url} className={classes.image} />
          <div className={classes.container}>
            <div className={classes.title}>{object.code}</div>
            <div className={classes.desc}>{object.nome}</div>
            <div className={classes.tag}>{object.addr}</div>
          </div>
        </div>
      ) : (
        <h3 className="text-danger"> ClientRow parameter Error! </h3>
      )}
    </>
  );
}
