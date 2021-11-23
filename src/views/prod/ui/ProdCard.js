import React from "react";
import { get_DNS } from "../../../js/api";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  cardBox: {
    height: "350px",
    width: "200px",
    padding: "10px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    overflow: "hidden",
  },
  imgStyle: {
    height: "180px",
    width: "180px",
    marginBottom: "10px",
    objectFit: "scale-down",
  },
  mainBox: {
    borderTop: "1px solid #000",
  },
  nome: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#000000",
    overflowWrap: "anywhere",
  },
});

export default function ProdCard(props) {
  const { object, clickEvent } = props;
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }
  //   console.log(img_url);

  const classes = useStyle();

  return (
    <>
      {object ? (
        <div className={classes.cardBox} onClick={clickEvent && clickEvent(object)}>
          <img src={img_url} className={classes.imgStyle} alt={object.code} />
          <div className={classes.mainBox}>
            <p className={classes.nome}>{object.nome}</p>
          </div>
        </div>
      ) : (
        <h3 className='text-danger'> ProdCard parameter Error! </h3>
      )}
    </>
  );
}
