import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectObjects, getObjects } from "../../../features/objectsSlice";
import { makeStyles } from "@mui/styles";
import { default as image } from "./square_img.png";

const useStyle = makeStyles({
  box: {
    width: "100%",
    // border: "1px solid #000",
  },
  filterDate: {
    width: "100%",
    textAlign: "right",
  },
  topBar: {
    height: "50px",
    width: "100%",
    margin: "9px 0px 9px 0px",
    padding: "0px 32px 0px 32px",
    backgroundColor: "#0000001A",
    display: "grid",
    gridTemplateColumns: "2fr 6fr 1fr 1.5fr 1fr 1fr 1fr",
    columnGap: "10px",
    "&>div": {
      alignSelf: "center",
    },
  },
  rowBox: {
    height: "74px",
    width: "100%",
    margin: "10px 0px 10px 0px",
    padding: "0px 32px 0px 32px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 6fr 1fr 1.5fr 1fr 1fr 0.5fr 0.5fr",
    columnGap: "10px",
    overflow: "hidden",
    "&>div": {
      alignSelf: "center",
      overflowWrap: "anywhere",
    },
  },
  imgStyle: {
    height: "74px",
    width: "74px",
    objectFit: "scale-down",
    borderRadius: "5px",
  },
  countryStyle: {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    objectFit: "scale-down",
    margin: "auto",
  },
  textBold: {
    fontSize: "14px",
    fontWeight: "700",
    flexGrow: "10",
  },
  textNormal: {
    fontSize: "14px",
    fontWeight: "400",
  },
  textLight: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#00000080",
    flexGrow: "2",
  },
});

const flagSlice = "prods";
const api = "/Prods";
const populateObjs = [
  { path: "Prods", select: "code Shop" },
  { path: "Brand", select: "nome" },
  { path: "Nation", select: "code" },
  {
    path: "Categ",
    select: "code Categ_far",
    populate: {
      path: "Categ_far",
      select: "code",
    },
  },
];

function RowField({ object }) {
  const classes = useStyle();

  return (
    <div className={classes.rowBox}>
      <div className={classes.textNormal}>{object.sort}</div>
      <img alt={"alt"} src={image} className={classes.imgStyle} />
      <div className={classes.textBold}>{object.nome}</div>
      <div>
        <div className={classes.textNormal}>{object.Categ?.code}</div>
        <div className={classes.textNormal}>
          {object.Categ?.Categ_far?.code}
        </div>
      </div>
      <div className={classes.textNormal}>{object.desp}</div>
      <img alt={"country"} src={image} className={classes.countryStyle} />
      <div className={classes.textNormal}>€{object.price?.toFixed(2)}</div>
      <div className={classes.textNormal}>count</div>
      <div className={classes.textLight}>件</div>
    </div>
  );
}

export default function ClientPurchased({ object }) {
  const dispatch = useDispatch();
  const classes = useStyle();
  const [Sort, setSort] = useState("");
  const [Order, setOrder] = useState("1");

  const objects = useSelector(selectObjects(flagSlice));
  useEffect(() => {
    dispatch(
      getObjects({
        flagSlice,
        api:
          api +
          "?sortKey=" +
          Sort +
          "&sortVal=" +
          Order +
          "&populateObjs=" +
          JSON.stringify(populateObjs),
        isReload: true,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Sort, Order]);

  console.log(objects);

  function handleSort(value) {
    if (value === Sort) return setOrder(Order * -1);
    setSort(value);
    setOrder(Order * -1);
  }

  function checkSort(value) {
    if (Sort !== value) return "";
    return Order > 0 ? "^" : "v";
  }

  return (
    <div className={classes.box}>
      <div>filter date^</div>
      <div className={classes.topBar}>
        <div></div>
        <div className={classes.textBold} onClick={() => handleSort("nome")}>
          商品名称{checkSort("nome")}
        </div>
        <div className={classes.textLight}>商品分类</div>
        <div className={classes.textLight}>商品属性</div>
        <div className={classes.textLight}>商品国家</div>
        <div className={classes.textLight} onClick={() => handleSort("price")}>
          商品单价{checkSort("price")}
        </div>
        <div className={classes.textLight}>已购数量</div>
      </div>
      {objects.map((object) => (
        <RowField object={object} />
      ))}
    </div>
  );
}
