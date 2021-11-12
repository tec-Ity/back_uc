import React, { useEffect, useState } from "react";
import { get_DNS } from "../../../js/api";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/authSlice";
// import CusSettingCart from "../../../components/basic/CusSettingCart";
import makeStyles from "@mui/styles/makeStyles";
import { postObject } from "../../../features/objectsSlice";
import { useHistory } from "react-router";
import { getRolePath } from "../../../js/conf/confUser";
const useStyle = makeStyles({
  root: {
    paddingBottom: "40px",
  },
  innerBox: {
    position: "relative",
    boxSizing: "border-box",
    cursor: "pointer",
    height: "340px",
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
    borderBottom: "1px solid",
    paddingBottom: "10px",
  },
  infoStyle: {
    marginTop: "5px",

    overflowWrap: "break-word",
    "& > :nth-child(1)": {
      height: "140px",
      fontSize: "14px",
      fontWeight: "600",
    },
    // "& > :nth-child(2)": {
    //   fontSize: "12px",
    //   color: "#00000080",
    //   height: "3em",
    //   overflow: "hidden",
    // },
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

const prodSyncSlice = "prods";
const prodSyncApi = "/Prod";
export default function PdCard(props) {
  const { object, clickEvent } = props;
  const classes = useStyle();
  const dispatch = useDispatch();
  const rolePath = getRolePath();
  const hist = useHistory();
  const curUser = useSelector(selectUser);
  //   const status = useSelector((state) => state.objects.status);
  const Prods = useSelector((state) => state.objects[prodSyncSlice]?.objects);
  //   console.log(Prods);
  const [justPosted, setJustPosted] = useState(false);
  const curRole = localStorage.getItem("role");
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }
  //   console.log(object);
  //   console.log(curUser);
  const syncProd = (e) => {
    e.stopPropagation();
    dispatch(
      postObject({
        flagSlice: prodSyncSlice,
        api: prodSyncApi,
        data: { Pd: object?._id, Shop: curUser.Shop },
      })
    );
    setJustPosted(true);
  };

  useEffect(() => {
    // console.log(Prods);
    if (justPosted === true) {
      const prodId = Prods?.find((prod) => prod.Pd === object?._id)?._id;
      prodId && hist.push(`/${rolePath}/prod/${prodId}`);
    }
  }, [Prods, hist, justPosted, object?._id, rolePath]);

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
              {/* <div>{object.desp || " "}</div> */}
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
                <div className={classes.bottomBtn} onClick={syncProd}>
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
