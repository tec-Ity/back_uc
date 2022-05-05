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
  { label: "客户正在下单", status: 100 },
  { label: "等待商家接单", status: 200 }, //已确认下单
  { label: "安排备货", status: 400 },
  { label: "安排配送", status: 700 },
  { label: "已完成", status: 800 },
  { label: "异常", status: [10, 70] },
];

function OrderStatusSection(props) {
  const { orderStatus, id } = props;
  const classes = useStyle();
  const status = useSelector((state) => state.objects.status);
  const [justSubmitted, setJustSubmitted] = useState();
  const dispatch = useDispatch();
  const curRole = localStorage.getItem("role");
  const handleChangeOrderStatus = (action) => () => {
    //立即接单-CONFIRM
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
    <SectionHeader label="订单状态">
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
              立即接单
            </div>
          ) : orderStatus === 400 ? (
            <div
              className={classes.takeOrderBtnStyle}
              onClick={handleChangeOrderStatus("DONE")}
            >
              立即发货
            </div>
          ) : orderStatus === 700 ? (
            <div
              className={classes.takeOrderBtnStyle}
              onClick={handleChangeOrderStatus("COMPLETE")}
            >
              确认送达
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
        { key: "商铺", value: order.Shop?.nome },
        { key: "客户应付", value: order.total },
        {
          key: "预计收货时间",
          value: moment(order.at_schedule).format("DD/MM/YYYY HH:mm"),
        },
      ]
    : [];
  const orderInfoObjsFull = order
    ? [
        { key: "商铺", value: order.Shop?.nome }, //pop
        { key: "付款方式", value: order.type_paid },
        {
          key: "创建时间",
          value: moment(order.at_crt).format("DD/MM/YYYY HH:mm"),
        },
        { key: "客户编号", value: order.Client?.code }, //pop
        { key: "付款状态", value: order.is_paid },
        {
          key: "更新时间",
          value: moment(order.at_upd).format("DD/MM/YYYY HH:mm"),
        },
        { key: "订单备注", value: order.note_Client },
        { key: "付款信息", value: order.paid_info }, //obj 付款人信息
        {
          key: "预计收货时间",
          value: moment(order.at_schedule).format("DD/MM/YYYY HH:mm"),
        },
        {
          key: "订单类型",
          value:
            order.type_Order === -1
              ? "采购订单"
              : order.type_Order === 1
              ? "销售订单"
              : "",
        },
        { key: "初始总额", value: "€" + order.total_regular?.toFixed(2) },
        {
          key: "确认订单时间",
          value: moment(order.at_confirm).format("DD/MM/YYYY HH:mm"),
        },
        { key: "订单管理员", value: order.User_Oder }, //接单后台用户
        { key: "折后总额", value: "€" + order.total_sale?.toFixed(2) }, // sale -> sell
        {
          key: "付款时间",
          value: moment(order.at_paid).format("DD/MM/YYYY HH:mm"),
        },
        { key: "管理员备注", value: order.note_Oder },
        { key: "折扣金额", value: "€" + order.total_discount?.toFixed(2) },
        {
          key: "配送时间",
          value: moment(order.at_shipping).format("DD/MM/YYYY HH:mm"),
        },
        { key: "订单配送员", value: order.User_Dver },
        { key: "客户应付", value: "€" + order.total?.toFixed(2) },
        {
          key: "完成时间",
          value: moment(order.at_completed).format("DD/MM/YYYY HH:mm"),
        },
        { key: "配送员备注", value: order.note_Dver },
        { key: "店铺实收", value: "€" + order.imp?.toFixed(2) },
        { key: "", value: " " }, //empty offsets
        { key: "第三方物流信息", value: order.log_info },
        { key: "配送费", value: "€" + order.price_ship?.toFixed(2) },
        { key: "", value: " " }, //empty offsets
        {
          key: "商品总数",
          value: `${order.goods_quantity}件/${order.OrderProds?.length}种`,
        },
        { key: "配送状态", value: order.is_ship },
      ]
    : [];
  return (
    <>
      <SectionHeader label="订单信息">
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
          商品信息
        </Grid>
        <Grid contaienr item xs={8} md={2}>
          名称
        </Grid>
        <Grid contaienr item xs={3} md={2}>
          分类
        </Grid>
        <Grid contaienr item xs={3} md={2}>
          属性
        </Grid>
        <Grid contaienr item xs={2} md={1}>
          单价
        </Grid>
        <Grid contaienr item xs={2}>
          数量
        </Grid>
        <Grid contaienr item xs={2} md={1}>
          价格
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
              €{op.prod_regular?.toFixed(2)}
            </Grid>
            <Grid
              container
              item
              xs={2}
              style={{ overflow: "hidden", textwrap: "nowrap" }}
            >
              {op.prod_quantity}&nbsp;{op.unit || "件"}
            </Grid>
            <Grid container item xs={2} md={1}>
              €{op.prod_sale?.toFixed(2)}
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
      key: "收货人",
      value:
        shipInfo?.firstname && shipInfo?.firstname + " " + shipInfo?.lastname,
    },
    { key: "收货地址", value: shipInfo?.address },
    { key: "", value: " " },
    { key: "邮箱", value: shipInfo?.email },
    { key: "城市", value: shipInfo?.city },
    { key: "", value: " " },
    { key: "手机", value: shipInfo?.phone },
    { key: "大区", value: shipInfo?.state },
    { key: "", value: " " },
    { key: "公司名称", value: shipInfo?.company },
    { key: "邮编", value: shipInfo?.postcode },
    { key: "", value: " " },
    { key: "", value: " " },
    { key: "国家", value: shipInfo?.country },
  ];

  return (
    <>
      <SectionHeader label="配送信息" />
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
