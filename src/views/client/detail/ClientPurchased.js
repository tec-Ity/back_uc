import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectObjects, getObjects, setQueryFixed } from "../../../features/objectsSlice";
import { makeStyles } from "@mui/styles";
import { get_DNS } from "../../../js/api";
import clsx from "clsx";
import CN_flag from "../../../components/icon/CN.svg";
import IT_flag from "../../../components/icon/IT.svg";
import JP_flag from "../../../components/icon/JP.svg";
import KR_flag from "../../../components/icon/KR.svg";
import { ReactComponent as Chevron } from "../../../components/icon/chevron-down.svg";
import DateFilter from "../../../components/universal/query/filter/DateFilter.js";

const flags = {
  CN: CN_flag,
  IT: IT_flag,
  JP: JP_flag,
  KR: KR_flag,
};

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
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#0000001A",
    display: "grid",
    gridTemplateColumns: "2fr 6fr 1fr 1.5fr 1fr 1fr 1fr",
    columnGap: "10px",
    "&>div": {
      alignSelf: "center",
      overflow: "hidden",
      userSelect: "none",
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
  textButton: {
    cursor: "pointer",
    userSelect: "none",
  },
  button: {
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
  },
  button_svg: {
    height: "20px",
    width: "auto",
    float: "right",
    objectFit: "scale-down",
    "& path": {
      fill: "#00000080",
    },
  },
  button_svg_active: {
    "& path": {
      fill: "#000000",
    },
  },
  dateFilter: {
    border: "none",
    backgroundColor: "transparent",
  },
});

const flagSlice = "orderSku";
const api = "/OrderSkus";
const populateObjs = [
  {
    path: "Sku",
    select: "attrs",
    populate: [{ path: "attrs", select: "nome option" }],
  },
  {
    path: "Prod",
    select: "nome img_urls Nation sort Categ code",
    populate: [
      { path: "Nation", select: "code" },
      {
        path: "Categ",
        select: "code Categ_far",
        populate: [{ path: "Categ_far", select: "code" }],
      },
    ],
  },
];

export default function ClientPurchased({ object }) {
  const dispatch = useDispatch();
  const classes = useStyle();
  const [Sort, setSort] = useState("");
  const [Order, setOrder] = useState(1);
  const [FilteredDate, setFilteredDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(
      setQueryFixed({
        flagSlice,
        queryFixed: `Clients=[${object._id}]&populateObjs=${JSON.stringify(populateObjs)}&pagesize=600`,
      })
    );
    dispatch(
      getObjects({
        flagSlice,
        api,
        isReload: true,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const objects = useSelector(selectObjects(flagSlice));

  const [list, setList] = useState([]);
  useEffect(() => {
    let list_ = sumSku(objects);
    console.log(list_);
    setList(list_);
  }, [objects]);

  function handleSort(value) {
    let tmpOrder;
    if (value === Sort) {
      tmpOrder = Order * -1;
    } else {
      setSort(value);
      tmpOrder = 1;
    }
    sortList(list, value, tmpOrder);
    tmpOrder && setOrder(tmpOrder);
  }

  function sortList(l, type, order) {
    function getfunction(t) {
      switch (t) {
        case "nome":
          return (firstEl, secondEl) => firstEl.Prod[type].localeCompare(secondEl.Prod[type]) * order;
        case "price_sale":
          return (firstEl, secondEl) =>
            secondEl[type] > firstEl[type] ? 1 * order : secondEl[type] < firstEl[type] ? -1 * order : 0;
        default:
          return () => 0;
      }
    }
    l?.sort(getfunction(type));
  }

  function checkSort(value) {
    return (
      <div className={{ display: "flex", flexDirection: "column", height: "50px" }}>
        <div className={classes.button}>
          <Chevron
            className={clsx(classes.button_svg, Sort === value && Order === 1 && classes.button_svg_active)}
            style={{ transform: "rotate(180deg)" }}
          />
        </div>
        <div className={classes.button}>
          <Chevron className={clsx(classes.button_svg, Sort === value && Order === -1 && classes.button_svg_active)} />
        </div>
      </div>
    );
  }

  function sumSku(input) {
    const result = {};
    if (input.length < 1) return;
    for (const orderSku of input) {
      if (result[orderSku.Prod._id]) {
        if (result[orderSku.Prod._id][orderSku.attrs]) {
          result[orderSku.Prod._id][orderSku.attrs].quantity += orderSku.quantity;
        } else {
          result[orderSku.Prod._id][orderSku.attrs] = { ...orderSku };
        }
      } else {
        Object.assign(result, {
          [orderSku.Prod._id]: { [orderSku.attrs]: { ...orderSku } },
        });
      }
    }
    const r1 = Object.values(result).map((v) => Object.values(v));
    return [].concat.apply([], r1);
  }

  function handleDateFilter(e) {
    setAnchorEl(e.currentTarget);
    setFilteredDate(true);
  }

  function handleDateFilterClose() {
    dispatch(
      getObjects({
        flagSlice,
        api,
        isReload: true,
      })
    );
    setFilteredDate(false);
  }

  return (
    <div className={classes.box}>
      <button className={classes.dateFilter} onClick={handleDateFilter}>
        filter date
        <Chevron className={classes.button_svg} />
      </button>
      {FilteredDate && (
        <DateFilter
          flagSlice={flagSlice}
          id={"dateFilter"}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleDateFilterClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      )}
      <div className={classes.topBar}>
        <div></div>
        <div
          className={clsx(classes.textBold, classes.textButton)}
          onClick={() => handleSort("nome")}
          style={{ height: "50px", display: "flex", alignItems: "center" }}
        >
          商品名称
          {checkSort("nome")}
        </div>
        <div className={classes.textLight}>商品分类</div>
        <div className={classes.textLight}>商品属性</div>
        <div className={classes.textLight}>商品国家</div>
        <div
          className={clsx(classes.textLight, classes.textButton)}
          onClick={() => handleSort("price_sale")}
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          商品单价
          {checkSort("price_sale")}
        </div>
        <div className={classes.textLight}>已购数量</div>
      </div>
      {objects.length > 0 ? list?.map((order) => <RowField object={order} key={order._id} />) : "Empty"}
    </div>
  );
}

function RowField({ object }) {
  const classes = useStyle();

  return (
    <div className={classes.rowBox}>
      <div className={classes.textNormal}>{object.Prod.sort}</div>
      <img alt={"Prod"} src={get_DNS() + object.Prod.img_urls[0]} className={classes.imgStyle} />
      <div className={classes.textBold}>{object.Prod.nome}</div>
      <div>
        <div className={classes.textNormal}>{object.Prod.Categ.Categ_far.code}</div>
        <div className={classes.textNormal}>{object.Prod.Categ.code}</div>
      </div>
      <div className={classes.textNormal}>
        {object.Sku.attrs?.map((attr) => `${attr.nome}: ${attr.option}`).join(", ") || ""}
      </div>
      <img alt={"country"} src={flags[object.Prod.Nation.code]} className={classes.countryStyle} />
      <div className={classes.textNormal}>€ {object.price_sale?.toFixed(2) || "N/A"}</div>
      <div className={classes.textNormal}>{object.quantity}</div>
      <div className={classes.textLight}>件</div>
    </div>
  );
}
