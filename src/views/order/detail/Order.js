import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import NavBread from "../../../components/universal/navBread/NavBread";
import { getRolePath } from "../../../js/conf/confUser";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { getObject, selectObject } from "../../../features/objectsSlice";
const useStyle = makeStyles({
  root: { fontFamily: "Montserrat" },
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
    "& > :nth-child(1)": { justifyContent: "flex-start" },
    //img
    "& > :nth-child(2)": { height: "50px" },
    //name
    "& > :nth-child(3)": { fontWeight: "700" },
    //categs
    "& > :nth-child(4)": {
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
    },
    "& :last-child": { justifyContent: "flex-end" },
  },
});
const rolePath = getRolePath();
const flagSlice = "order";
// const flagField = "object";

export default function Order() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { id } = useParams();
  const api = `/Order/${id}`;
  const order = useSelector(selectObject(flagSlice));
  useEffect(() => {
    dispatch(getObject({ flagSlice, api }));
    return () => {
      //   dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);
  console.log(order);
  return (
    <Container className={classes.root}>
      {/* bread */}
      <NavBread activePage='OrderDetail'>
        <Link to={`/${rolePath}/orders`}>Orders</Link>
      </NavBread>
      {/* order status */}
      <div className={classes.containerItem}>
        <OrderStatusSection orderStatus={order.status} />
      </div>
      {/* order info */}
      <div className={classes.containerItem}>
        <OrderInfoSection />
      </div>
      {/* prods info */}
      <div className={classes.containerItem}>
        <ProdsInfoSection />
      </div>
      {/* ship info */}
      <ShipInfoSection />
      {/* control btns */}
    </Container>
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
  const { orderStatus } = props;
  return (
    <SectionHeader label='订单状态'>
      <>
        <div style={{ display: "flex", width: "90%" }}>
          {orderStatusObjs.map((oStatus) => (
            <OrderStatusProgressBar
              label={oStatus.label}
              isActive={orderStatus === oStatus.status}
              isPassed={oStatus.status >= 100 && orderStatus > oStatus.status}
            />
          ))}
        </div>
        <div>请接单</div>
      </>
    </SectionHeader>
  );
}

function OrderInfoSection() {
  return (
    <>
      <SectionHeader label='订单信息'>
        <>
          <div>订单编号</div>
          <div>查看更多</div>
        </>
      </SectionHeader>
      <Container>信息。。。。</Container>
    </>
  );
}

function ProdsInfoSection() {
  const classes = useStyle();
  return (
    <>
      {/* header */}
      <Grid
        container
        className={clsx(
          classes.sectionHeaderStyle,
          classes.prodsInfoHeaderStyle
        )}>
        <Grid container item xs={2}>
          商品信息
        </Grid>
        <Grid contaienr item xs={2}>
          商品名称
        </Grid>
        <Grid contaienr item xs={2}>
          商品分类
        </Grid>
        <Grid contaienr item xs={2}>
          商品属性
        </Grid>
        {/* <Grid contaienr item xs={1}>
          商品国家
        </Grid> */}
        <Grid contaienr item xs={1}>
          商品单价
        </Grid>
        <Grid contaienr item xs={2}>
          商品数量/单位
        </Grid>
        <Grid contaienr item xs={1}>
          商品价格
        </Grid>
      </Grid>
      <Grid>
        <Grid container item xs={12} className={classes.prodsListStyle}>
          <Grid container item xs={1}>
            1
          </Grid>
          <Grid container item xs={1}>
            img
          </Grid>
          <Grid container item xs={2}>
            名称
          </Grid>
          <Grid container item xs={2}>
            <div>一级分类</div>
            <div>二级分类</div>
          </Grid>
          <Grid container item xs={2}>
            属性...
          </Grid>
          {/* <Grid container item xs={1}>
          国家
        </Grid> */}
          <Grid container item xs={1}>
            €5,00
          </Grid>
          <Grid container item xs={2}>
            10 件
          </Grid>
          <Grid container item xs={1}>
            €5,00
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

function ShipInfoSection() {
  return (
    <>
      <SectionHeader label='配送信息' />
    </>
  );
}

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
        }}></div>
    </div>
  );
}
