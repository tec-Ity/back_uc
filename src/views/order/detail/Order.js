import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
// import NavBread from "../../../components/universal/navBread/NavBread";
import { getRolePath } from "../../../js/conf/confUser";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import api_DNS from "../../../js/_dns";
import clsx from "clsx";
import {
  getObject,
  selectObject,
  cleanField,
  putObject,
} from "../../../features/objectsSlice";
import moment from "moment";
import { ReactComponent as ViewMore } from "../../../components/icon/orderDetailViewMore.svg";
import { ReactComponent as ViewLess } from "../../../components/icon/orderDetailViewLess.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import { FormattedMessage } from "react-intl";

const useStyle = makeStyles((theme) => ({
  root: { fontFamily: "Montserrat", paddingBottom: "100px" },
  containerItem: {
    marginBottom: "20px",
  },
  sectionHeaderStyle: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    backgroundColor: "rgba(0, 0, 0, 0.1);",
    color: "#00000080",
  },
  headerSubLabel: {
    width: "20%",
    fontSize: "20px",
  },
  headerSubContentStyle: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
  },
  //progressBar
  progressBarStyle: {
    // width: "50px",
    width: "100%",
    maxWidth: "100px",
    height: "50px",
    padding: "0 3px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    //label
    "& > :nth-child(1)": {
      fontSize: "12px",
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.3)",
    },
    //status bar
    "& > :nth-child(2)": {
      width: "100%",
      height: "8px",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  },
  //prods Info
  //custom header
  prodsInfoHeaderStyle: {
    width: "100%",
    display: "flex",
    fontSize: "12px",
    justifyContent: "space-between",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    //header label
    "& >:nth-child(1)": {
      justifyContent: "flex-start",
      fontSize: "20px",
    },
  },
  prodsListStyle: {
    padding: "10px 20px 0 20px",
    "& > div": {
      fontSize: "14px",
      //   border: "1px solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    //num
    // "& > :nth-child(1)": {
    //   justifyContent: "flex-start",
    //   "& img": { height: "50px", width: "50px", border: "1px solid" },
    // },
    //img

    //name
    "& > :nth-child(2)": { fontWeight: "700" },
    //categs
    "& > :nth-child(3)": {
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
    },
    // "& :last-child": { justifyContent: "flex-end" },
  },
  OrderInfoTd: {
    fontSize: "14px",
    padding: "10px 0",
    "& > :nth-child(1)": {
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  //order status
  takeOrderBtnStyle: {
    boxSizing: "border-box",
    height: "30px",
    width: "84px",
    border: "2px solid #D83535",
    borderRadius: "4px",
    fontSize: "14px",
    color: "#D83535",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D835351A",
    cursor: "pointer",
  },

  //orderProds
}));

const rolePath = getRolePath();
const flagSlice = "order";
const flagField = "object";
//populate objs
const categPopObj = {
  path: "Categ",
  select: "code Categ_far",
  populate: { path: "Categ_far", select: "code" },
};
const pdPopObj = {
  path: "Pd",
  select: "img_urls Categ",
  populate: [categPopObj],
};
const orderSkuPopObj = { path: "OrderSkus", select: "attrs" };
const populateObjs = [
  { path: "Shop", select: "nome" },
  { path: "Client", select: "code" },
  {
    path: "OrderProds",
    select: "nome unit prod_regular prod_quantity prod_sale Pd OrderSkus",
    populate: [pdPopObj, orderSkuPopObj],
  },
  { path: "ship_info", select: "Cita.code" },
];
const links = [
  { label: "orders", to: `/orders`, prevView: true },
  { label: "order" },
];

////////////////////////////////////////////////////////////////
export default function Order() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { id } = useParams();
  const api = `/Order/${id}`;
  const order = useSelector(selectObject(flagSlice));
  console.log(order);
  useEffect(() => {
    dispatch(
      getObject({
        flagSlice,
        api: api + "?populateObjs=" + JSON.stringify(populateObjs),
      })
    );
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);

  const param = new URLSearchParams(useLocation().search);
  const client = param.get("fromClient");
  return (
    <Container className={classes.root} disableGutters>
      {/* bread */}
      {!client ? (
        <ListPageHeader links={links} showSearch={false} />
      ) : (
        <Link
          to={`/${rolePath}/client/${client}`}
          style={{
            color: "#000",
            textDecoration: "none",
          }}
        >
          <FormattedMessage id="navLabel-back" />
        </Link>
      )}
      {/* order status */}
      <div className={classes.containerItem}>
        <OrderStatusSection orderStatus={order.status} id={id} />
      </div>
      {/* order info */}
      <div className={classes.containerItem}>
        <OrderInfoSection order={order} />
      </div>
      {/* ship info */}
      <ShipInfoSection shipInfo={order.ship_info} />
      {/* prods info */}
      <div className={classes.containerItem}>
        <ProdsInfoSection orderProds={order.OrderProds} />
      </div>
      {/* control btns */}
    </Container>
  );
}
// ------------------------ order Status -------------------------
//progress bar component
function OrderStatusProgressBar(props) {
  const { label, isActive, isPassed } = props;
  const classes = useStyle();
  const color =
    isActive === true
      ? "#D83535"
      : isPassed === true
      ? "#000"
      : "rgba(0, 0, 0, 0.3)";

  return (
    <div className={classes.progressBarStyle}>
      <div style={{ color }}>{label}</div>
      {/* pregress bar */}
      <div
        style={{
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}

const orderStatusObjs = [
  { label: "??????????????????", status: 100 },
  { label: "??????????????????", status: 200 }, //???????????????
  { label: "????????????", status: 400 },
  { label: "????????????", status: 700 },
  { label: "?????????", status: 800 },
  { label: "??????", status: [10, 70] },
];

function OrderStatusSection(props) {
  const { orderStatus, id } = props;
  const classes = useStyle();
  const status = useSelector((state) => state.objects.status);
  const [justSubmitted, setJustSubmitted] = useState();
  const dispatch = useDispatch();
  const curRole = localStorage.getItem("role");
  const handleChangeOrderStatus = (action) => () => {
    //????????????-CONFIRM
    console.log(action);
    action &&
      dispatch(
        putObject({
          flagSlice,
          api: "/Order_change_status/" + id,
          data: { action },
        })
      );
    setJustSubmitted(true);
  };

  useEffect(() => {
    if (justSubmitted === true && status === "succeed") {
      window.location.reload();
    }
  });

  return (
    <SectionHeader label="????????????">
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", width: "80%" }}>
          {orderStatusObjs.map((oStatus) => (
            <OrderStatusProgressBar
              label={oStatus.label}
              isActive={orderStatus === oStatus.status}
              isPassed={oStatus.status >= 100 && orderStatus > oStatus.status}
            />
          ))}
        </div>
        {curRole > 100 &&
          (orderStatus === 200 ? (
            <div
              className={classes.takeOrderBtnStyle}
              onClick={handleChangeOrderStatus("CONFIRM")}
            >
              ????????????
            </div>
          ) : orderStatus === 400 ? (
            <div
              className={classes.takeOrderBtnStyle}
              onClick={handleChangeOrderStatus("DONE")}
            >
              ????????????
            </div>
          ) : orderStatus === 700 ? (
            <div
              className={classes.takeOrderBtnStyle}
              onClick={handleChangeOrderStatus("COMPLETE")}
            >
              ????????????
            </div>
          ) : (
            ""
          ))}
      </div>
    </SectionHeader>
  );
}

//-----------------------order info--------------------------------
function OrderInfoSection({ order }) {
  const classes = useStyle();
  const [showMore, setShowMore] = useState(false);
  const orderInfoObjsLess = order
    ? [
        { key: "??????", value: order.Shop?.nome },
        { key: "????????????", value: order.total },
        {
          key: "??????????????????",
          value: moment(order.at_schedule).format("DD/MM/YYYY HH:mm"),
        },
      ]
    : [];
  const orderInfoObjsFull = order
    ? [
        { key: "??????", value: order.Shop?.nome }, //pop
        { key: "????????????", value: order.type_paid },
        {
          key: "????????????",
          value: moment(order.at_crt).format("DD/MM/YYYY HH:mm"),
        },
        { key: "????????????", value: order.Client?.code }, //pop
        { key: "????????????", value: order.is_paid },
        {
          key: "????????????",
          value: moment(order.at_upd).format("DD/MM/YYYY HH:mm"),
        },
        { key: "????????????", value: order.note_Client },
        { key: "????????????", value: order.paid_info }, //obj ???????????????
        {
          key: "??????????????????",
          value: moment(order.at_schedule).format("DD/MM/YYYY HH:mm"),
        },
        {
          key: "????????????",
          value:
            order.type_Order === -1
              ? "????????????"
              : order.type_Order === 1
              ? "????????????"
              : "",
        },
        { key: "????????????", value: "???" + order.total_regular?.toFixed(2) },
        {
          key: "??????????????????",
          value: moment(order.at_confirm).format("DD/MM/YYYY HH:mm"),
        },
        { key: "???????????????", value: order.User_Oder }, //??????????????????
        { key: "????????????", value: "???" + order.total_sale?.toFixed(2) }, // sale -> sell
        {
          key: "????????????",
          value: moment(order.at_paid).format("DD/MM/YYYY HH:mm"),
        },
        { key: "???????????????", value: order.note_Oder },
        { key: "????????????", value: "???" + order.total_discount?.toFixed(2) },
        {
          key: "????????????",
          value: moment(order.at_shipping).format("DD/MM/YYYY HH:mm"),
        },
        { key: "???????????????", value: order.User_Dver },
        { key: "????????????", value: "???" + order.total?.toFixed(2) },
        {
          key: "????????????",
          value: moment(order.at_completed).format("DD/MM/YYYY HH:mm"),
        },
        { key: "???????????????", value: order.note_Dver },
        { key: "????????????", value: "???" + order.imp?.toFixed(2) },
        { key: "", value: " " }, //empty offsets
        { key: "?????????????????????", value: order.log_info },
        { key: "?????????", value: "???" + order.price_ship?.toFixed(2) },
        { key: "", value: " " }, //empty offsets
        {
          key: "????????????",
          value: `${order.goods_quantity}???/${order.OrderProds?.length}???`,
        },
        { key: "????????????", value: order.is_ship },
      ]
    : [];
  return (
    <>
      <SectionHeader label="????????????">
        <>
          <div>{order?.code}</div>
          {showMore === true ? (
            <div onClick={() => setShowMore(false)}>
              <ViewLess style={{ cursor: "pointer" }} />
            </div>
          ) : (
            <div onClick={() => setShowMore(true)}>
              <ViewMore style={{ cursor: "pointer" }} />
            </div>
          )}
        </>
      </SectionHeader>
      {/* information */}
      <Container style={{ marginTop: "10px" }}>
        {showMore === false ? (
          <Grid container>
            {orderInfoObjsLess?.map((obj) => (
              <Grid container item xs={4} className={classes.OrderInfoTd}>
                <Grid item xs={5}>
                  {obj.key}
                </Grid>
                <Grid item xs={7}>
                  {obj.value || "-"}
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container>
            {orderInfoObjsFull.map((obj) => (
              <Grid container item xs={4} className={classes.OrderInfoTd}>
                <Grid item xs={5}>
                  {obj.key}
                </Grid>
                <Grid item xs={7}>
                  {obj.value || "-"}
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

//-----------------------prods info------------------------------------------
function ProdsInfoSection({ orderProds }) {
  const classes = useStyle();
  return (
    <>
      {/* header */}
      <Grid
        container
        className={clsx(
          classes.sectionHeaderStyle,
          classes.prodsInfoHeaderStyle
        )}
      >
        <Grid container item xs={4} md={2}>
          ????????????
        </Grid>
        <Grid contaienr item xs={8} md={2}>
          ??????
        </Grid>
        <Grid contaienr item xs={3} md={2}>
          ??????
        </Grid>
        <Grid contaienr item xs={3} md={2}>
          ??????
        </Grid>
        <Grid contaienr item xs={2} md={1}>
          ??????
        </Grid>
        <Grid contaienr item xs={2}>
          ??????
        </Grid>
        <Grid contaienr item xs={2} md={1}>
          ??????
        </Grid>
      </Grid>
      <Grid>
        {orderProds?.map((op, index) => (
          <Grid
            container
            item
            xs={12}
            className={classes.prodsListStyle}
            key={index}
          >
            <Grid
              container
              item
              xs={4}
              md={2}
              style={{ justifyContent: "space-around" }}
            >
              <div>{index + 1}</div>
              <div>
                <img
                  src={api_DNS + op?.Pd?.img_urls[0]}
                  alt={""}
                  style={{ width: 80, height: 80 }}
                />
              </div>
            </Grid>
            <Grid container item xs={8} md={2}>
              {op.nome}
            </Grid>
            <Grid container item xs={4} md={2}>
              <div>{op.Pd?.Categ?.Categ_far?.code}</div>
              <div>{op.Pd?.Categ?.code}</div>
            </Grid>
            <Grid container item xs={2} md={2}>
              {op.OrderProds?.OrderSkus[0]?.attrs || "-"}
            </Grid>
            <Grid container item xs={2} md={1}>
              ???{op.prod_regular?.toFixed(2)}
            </Grid>
            <Grid
              container
              item
              xs={2}
              style={{ overflow: "hidden", textwrap: "nowrap" }}
            >
              {op.prod_quantity}&nbsp;{op.unit || "???"}
            </Grid>
            <Grid container item xs={2} md={1}>
              ???{op.prod_sale?.toFixed(2)}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function ShipInfoSection({ shipInfo }) {
  const classes = useStyle();
  const shipInfoObjs = [
    {
      key: "?????????",
      value:
        shipInfo?.firstname && shipInfo?.firstname + " " + shipInfo?.lastname,
    },
    { key: "????????????", value: shipInfo?.address },
    { key: "", value: " " },
    { key: "??????", value: shipInfo?.email },
    { key: "??????", value: shipInfo?.city },
    { key: "", value: " " },
    { key: "??????", value: shipInfo?.phone },
    { key: "??????", value: shipInfo?.state },
    { key: "", value: " " },
    { key: "????????????", value: shipInfo?.company },
    { key: "??????", value: shipInfo?.postcode },
    { key: "", value: " " },
    { key: "", value: " " },
    { key: "??????", value: shipInfo?.country },
  ];

  return (
    <>
      <SectionHeader label="????????????" />
      <Container>
        <Grid container>
          {shipInfoObjs.map((info) => (
            <Grid container item xs={4} className={classes.OrderInfoTd}>
              <Grid item xs={5}>
                {info.key}
              </Grid>
              <Grid item xs={7}>
                {info.value || "-"}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

//----------------------component section header-----------------------
function SectionHeader(props) {
  const { label, children } = props;
  const classes = useStyle();
  return (
    <div className={classes.sectionHeaderStyle}>
      <div className={classes.headerSubLabel}>{label}</div>
      <div className={classes.headerSubContentStyle}>{children}</div>
    </div>
  );
}
