import React from "react";
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
    width: "30%",
  },
  detailsContainer: {
    display: "flex",
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "50px",
    width: "70%",
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
});

export default function ProdRow(props) {
  const {
    object,
    // clickEvent
  } = props;
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  const classes = useStyle();

  return (
    <>
      {object ? (
        <div className={classes.cardBox} key={object._id}>
          <img alt={object.code} src={img_url} className={classes.imgStyle} />
          {/* <div
            className='col-1 text-primary'
            onClick={clickEvent && clickEvent(object)}>
            {object.code}
          </div> */}
          <div className={classes.infoContainer}>
            <div className='col-1'>{object.nome}</div>
          </div>
          <div className={classes.detailsContainer}>
            <div className='col-1'>
              {object.price_max === object.price_min ? object.price_min : object.price_min + "~" + object.price_max}
            </div>
            <div className='col-1'>{object.desp}</div>
            <div className='col-1'>{object.addr}</div>
          </div>
        </div>
      ) : (
        <h3 className='text-danger'> PdRow parameter Error! </h3>
      )}
    </>
  );
}
