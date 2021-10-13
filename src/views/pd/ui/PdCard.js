import React from "react";
import { get_DNS } from "../../../js/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/authSlice";
// import CusSettingCart from "../../../components/basic/CusSettingCart";
import makeStyles from "@mui/styles/makeStyles";

const useStyle = makeStyles({
  root: {
    paddingBottom: "40px",
  },
  innerBox: {
    position: "relative",
    boxSizing: "border-box",
    height: "250px",
    width: "200px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: "20px",
  },
  imgStyle: {
    height: "160px",
    width: "160px",
    display: "block",
    objectFit: "scale-down",
  },
  infoStyle: {
    marginTop: "5px",
    "& > :nth-child(1)": {
      fontSize: "14px",
      fontWeight: "600",
      overflowWrap: "break-word",
    },
    "& > :nth-child(2)": {
      fontSize: "12px",
      color: "#00000080",
      height: "1.5em",
    },
  },
  bottomBtn: {
    position: "absolute",
    height: "30px",
    bottom: "-30px",
    left: 0,
    width: "100%",
    borderRadius: " 0px 0px 5px 5px",
    backgroundColor: "#c0e57b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
});

export default function PdCard(props) {
  const { object, clickEvent } = props;
  const classes = useStyle();
  const curRole = localStorage.getItem("role");
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }
  console.log(object);
  const curUser = useSelector(selectUser);

  return (
    <>
      {object ? (
        <div className={classes.root}>
          <div
            className={classes.innerBox}
            onClick={clickEvent && clickEvent(object)}>
            <img src={img_url} className={classes.imgStyle} alt={object.code} />
            <div className={classes.infoStyle}>
              <div>{object.nome}</div>
              <div>{object.desp || " "}</div>
            </div>
            {curRole > 100 &&
              (object?.Prods &&
              object.Prods.length > 0 &&
              object.Prods.find((prod) => prod.Shop === curUser.Shop) ? (
                <div
                  className={classes.bottomBtn}
                  style={{ backgroundColor: "#F0F0F0", cursor: "default" }}
                  onClick={(e) => e.stopPropagation()}>
                  已同步
                </div>
              ) : (
                <div
                  className={classes.bottomBtn}
                  onClick={(e) => e.stopPropagation()}>
                  同步
                </div>
              ))}
          </div>
        </div>
      ) : (
        <h3 className='text-danger'> PdCard parameter Error! </h3>
      )}
    </>
  );
}
