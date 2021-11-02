import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import SearchInput from "../../../components/universal/query/SearchInput";
import {
  selectObjects,
  selectQuery,
  setQueryFixed,
} from "../../../features/objectsSlice";
import { getObjects } from "../../../features/objectsSlice";
import FilterGeneral from "../../../components/universal/query/filter/FilterGeneral";
import moment from "moment";
import PageComp from "../../../components/universal/query/page/PageComp";
import { statusName, statusCode } from "../../../js/conf/confOrder";
import { useHistory } from "react-router";
import { getRolePath } from "../../../js/conf/confUser";
import makeStyles from "@mui/styles/makeStyles";
import { Card, CardActionArea, Grid } from "@mui/material";
import ListPageHeader from "../../../components/basic/ListPageHeader";
const useStyle = makeStyles({
  root: {},
  orderListItemContainer: {
    position: "relative",
    padding: "10px 0",
  },
  orderListItemStyle: {
    height: "80px",
    fontSize: "14px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    // marginTop: "20px",
    padding: "0 20px",
    justifyContent: "space-between",
    alignItems: "center",
    "& > div": { textAlign: "center" },
    "& > :last-child": {
      textAlign: "start",
    },
    cursor: "pointer",
  },
  alertStyle: {
    position: "absolute",
    height: "80px",
    width: "75px",
    // border: "1px solid",
    borderRadius: "0 5px 5px 0",
    right: 0,
    display: "flex",
    alignItems: "center",
    "& > :nth-child(1)": {
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
    },
    "& > :nth-child(2)": {
      //   border: "1px solid",
      position: "absolute",
      borderRadius: "0 5px 5px 0",
      right: 0,
      top: 0,
      height: "100%",
      width: "10px",
    },
  },
});

const flagSlice = "orders";
const api = "/Orders";
const links = [{ label: "主页", to: "/home" }, { label: "订单列表" }];
export default function Orders() {
  const dispatch = useDispatch();
  const hist = useHistory();
  const classes = useStyle();
  const rolePath = getRolePath();
  const populateObjs = [
    { path: "Client", select: "code nome phone" },
    { path: "Shop", select: "code nome" },
  ];
  const queryFixed = "&populateObjs=" + JSON.stringify(populateObjs);
  const queryObj = useSelector(selectQuery(flagSlice));
  // 先把queryFixed设置好
  useEffect(() => {
    dispatch(setQueryFixed({ flagSlice, queryFixed }));
  }, [dispatch, queryFixed]);

  // 根据本身 filter 的变化, 更新 reducer 中对应查找的数据 (如果加载此组件， 则不用在父组件中加载)
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api }));
  }, [
    dispatch,
    queryObj.status,
    queryObj.crt_after,
    queryObj.crt_before,
    queryObj.Shops,
  ]);

  const objects = useSelector(selectObjects(flagSlice));
  const pageSize = 50;
  let imp_Orders = 0;
  return (
    <>
      {/* search bar */}
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={links}
        showAddIcon={false}
      />
      {/* genral filter */}
      <FilterGeneral objects={objects} flagSlice={flagSlice} />
      {/* list */}
      <Grid container>
        {objects.map((order) => {
          imp_Orders += order.imp || 0;
          const colorStyle =
            order.status === 200
              ? "#D83535"
              : order.status === 400
              ? "#FFBF44"
              : order.status === 700
              ? "#C0E57B"
              : "";
          return (
            <Grid
              container
              item
              xs={12}
              key={order._id}
              className={classes.orderListItemContainer}>
              <Card
                elevation={0}
                style={{
                  width: "100%",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                }}>
                <CardActionArea>
                  <Grid
                    container
                    item
                    xs={12}
                    className={classes.orderListItemStyle}
                    onClick={() =>
                      hist.push(`/${rolePath}/order/${order._id}`)
                    }>
                    <Grid item xs={1}>
                      {order.Shop?.code}
                    </Grid>
                    <Grid item xs={2}>
                      {order.code}
                    </Grid>
                    <Grid item xs={2}>
                      {moment(order.at_crt).format("DD/MM/YYYY HH:mm")}
                    </Grid>
                    <Grid item xs={2}>
                      {order.Client?.code}
                    </Grid>
                    <Grid item xs={1}>
                      €{order.imp?.toFixed(2)}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      style={{
                        fontWeight:
                          (order.status === 200 ||
                            order.status === 400 ||
                            order.status === 700) &&
                          "700",
                      }}>
                      {statusName[statusCode[order.status]]}
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
              {colorStyle && (
                <div className={classes.alertStyle}>
                  <div style={{ backgroundColor: colorStyle }}>!</div>
                  <div style={{ backgroundColor: colorStyle }}></div>
                </div>
              )}
            </Grid>
          );
        })}
      </Grid>
      <h3>{imp_Orders.toFixed(2)}</h3>
      {/* page control */}
      <PageComp flagSlice={flagSlice} count={objects?.length / pageSize} />
    </>
  );
}
