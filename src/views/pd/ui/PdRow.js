import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { get_DNS } from "../../../js/api";
import { getRolePath } from "../../../js/conf/confUser";
import { makeStyles } from "@mui/styles";
import { selectUser } from "../../../features/authSlice";
import { postObject } from "../../../features/objectsSlice";

const useStyle = makeStyles({
  cardBox: {
    minHeight: "84px",
    width: "100%",
    margin: "20px 0px 20px 0px",
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
  statusDone: {
    width: "74px",
    backgroundColor: "#F0F0F0",
    borderRadius: "0px 5px 5px 0px",
    fontSize: "12px",
    fontWeight: "400",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const prodSyncSlice = "prods";
const prodSyncApi = "/Prod";

export default function PdRow(props) {
  const { object, clickEvent } = props;
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  const classes = useStyle();
  const hist = useHistory();
  const curUser = useSelector(selectUser);
  const rolePath = getRolePath();
  const [justPosted, setJustPosted] = useState(false);
  const Prods = useSelector((state) => state.objects[prodSyncSlice]?.objects);

  const dispatch = useDispatch();
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
      //   prodId && hist.push(`/${rolePath}/prod/${prodId}`);
      prodId && hist.push(`/${rolePath}/reload`);
    }
  }, [Prods, hist, justPosted, object?._id, rolePath]);

  return (
    <>
      {object ? (
        <div className={classes.cardBox}>
          <Link
            to={`pd/${object._id}`}
            className={classes.mainBox}
            style={{ textDecoration: "none" }}
            key={object._id}
          >
            <img alt={object.code} src={img_url} className={classes.imgStyle} />
            <div className={classes.infoContainer}>
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
          </Link>
          {curUser.role > 100 &&
            (object?.Prods &&
            object.Prods.length > 0 &&
            object.Prods.find((prod) => prod.Shop === curUser.Shop) ? (
              <div className={classes.statusDone}>Synced</div>
            ) : (
              <div
                className={classes.status}
                onClick={(e) => {
                  e.stopPropagation();
                  syncProd(e);
                }}
              >
                Sync
              </div>
            ))}
        </div>
      ) : (
        <h3 className="text-danger"> PdRow parameter Error! </h3>
      )}
    </>
  );
}
