import React, { useEffect } from "react";
import { get_DNS } from "../../../js/api";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  cardBox: {
    minHeight: "84px",
    width: "100%",
    margin: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "flex",
    overflow: "hidden",
  },
  mainBox: {
    width: "100%",
    display: "flex",
    "&:hover": {
      backgroundColor: "#F0F0F0",
      cursor: "pointer",
    },
  },
  imgStyle: {
    height: "64px",
    width: "64px",
    margin: "10px",
    objectFit: "scale-down",
  },
  infoContainer: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "60%",
  },
  detailsContainer: {
    display: "flex",
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "50px",
    width: "40%",
    "&  > div": {
      width: "33%",
    },
  },
  code: {
    fontSize: "20px",
    fontWeight: "700",
    overflowWrap: "break-word",
  },
  nome: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#0000004D",
    overflowWrap: "anywhere",
  },
  text: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#000000",
  },
  status: {
    width: "74px",
    backgroundColor: "#C0E57B",
    borderRadius: "0px 5px 5px 0px",
    fontSize: "12px",
    fontWeight: "400",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#C0E57B4D",
      cursor: "pointer",
    },
  },
});

export default function PdRow(props) {
  const { object, clickEvent } = props;
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  const classes = useStyle();
  console.log("[object]", object);

  return (
    <>
      {object ? (
        <div className={classes.cardBox}>
          <div
            className={classes.mainBox}
            onClick={clickEvent && clickEvent(object)}
            key={object._id}
          >
            <img alt={object.code} src={img_url} className={classes.imgStyle} />
            <div className={classes.infoContainer}>
              {/* <div className={classes.code}>{object.code}</div> */}
              <div className={classes.nome}>
                {object.nome.length < 100
                  ? object.nome
                  : object.nome.substring(0, 86) + "..."}
              </div>
            </div>
            <div className={classes.detailsContainer}>
              <div>
                <div className={classes.text}>
                  {object.Categ?.Categ_far?.code}
                </div>
                <div className={classes.text}>{object.Categ?.code}</div>
              </div>
              <div>
                <div className={classes.text}>{object.Brand?.nome}</div>
                <div className={classes.text}>{object.Nation?.code}</div>
              </div>
              <div className={classes.text}>
                {"€" + object.price_regular.toFixed(2)}
              </div>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              console.log("status");
            }}
            className={classes.status}
          >
            Status
          </div>
        </div>
      ) : (
        <h3 className="text-danger"> PdRow parameter Error! </h3>
      )}
    </>
  );
}
