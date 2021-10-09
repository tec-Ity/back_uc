import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "../../../components/universal/query/SearchInput";
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
export default function Orders() {
  const dispatch = useDispatch();
  const flagSlice = "orders";
  const api = "/Orders";
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
      <SearchInput flagSlice={flagSlice} api={api} />
      {/* genral filter */}
      <FilterGeneral objects={objects} flagSlice={flagSlice} />
      {/* list */}
      {objects.map((order) => {
        imp_Orders += order.imp || 0;
        return (
          <div key={order._id} className='row py-3 my-2 border rounded'>
            <div className='col-3 col-md-2 mt-2'>{order.code} </div>
            <div className='col-3 col-md-2 mt-2'>
              {moment(order.at_crt).format("DD/MM/YYYY HH:mm")}{" "}
            </div>
            <div className='col-3 col-md-2 mt-2'>{order.Shop?.code} </div>
            <div className='col-3 col-md-2 mt-2 d-none d-md-block'>
              {order.Client?.code}
            </div>
            <div className='col-3 col-md-2 mt-2'>{order.imp?.toFixed(2)}</div>
            <div className='col-3 col-md-2 mt-2'>
              {statusName[statusCode[order.status]]}
            </div>
          </div>
        );
      })}
      <h3>{imp_Orders.toFixed(2)}</h3>
      {/* page control */}
      <PageComp flagSlice={flagSlice} count={objects?.length / pageSize} />
    </>
  );
}
