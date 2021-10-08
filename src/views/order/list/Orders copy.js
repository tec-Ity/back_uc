import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "../../../components/universal/query/SearchInput";
import { selectObjects, setQueryFixed, getObjects } from "../../../features/objectsSlice";

export default function Orders() {
  const dispatch = useDispatch()
  const flagSlice = "orders";
  const api = "/Orders";
  const populateObjs = [
    { path: "Client", select: "code nome phone" },
    { path: "Shop", select: "code nome" },
  ];
  const queryFixed = "&populateObjs=" + JSON.stringify(populateObjs);
  // 先把queryFixed设置好
  useEffect(() => {
    dispatch(setQueryFixed({ flagSlice, queryFixed }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [filter, setFilter] = useState({
    //order status
    status: {
      toPay: true,
      paid: true,
      inProgress: true,
      completed: true,
      canceled: true,
    },
  });
  const [queryApi, setQueryApi] = useState("");
  // console.log(filter)
  useEffect(() => {
    let query = "?";
    for (const key in filter) {
      if (Object.hasOwnProperty.call(filter, key)) {
        const element = filter[key];
        query += "&" + String(key) + "=";
        switch (key) {
          case "status":
            query += [
              element.toPay ? 100 : "",
              element.toPay ? 70 : "",
              element.paid ? 200 : "",
              element.inProgress ? 400 : "",
              element.inProgress ? 700 : "",
              element.completed ? 800 : "",
              element.canceled ? 10 : "",
              element.canceled ? 60 : "",
            ];
            break;
          default:
            break;
        }
      }
    }
    // console.log(query);
    setQueryApi(query);

    //return queryApi
  }, [filter]);

  const objects = useSelector(selectObjects(flagSlice));

  const handleChangeOrderStatus = (status) => () => {
    // console.log(status);
    setFilter((prev) => ({
      ...prev,
      status: { ...prev.status, [status]: !prev.status[status] },
    }));
    // (prev.orderStatus[status] = !prev.orderStatus[status]));
  };



  let imp_Orders = 0;
  // console.log(api+queryApi)
  return (
    <>

      <div className='d-flex justify-content-evenly'>
        <button onClick={handleChangeOrderStatus("toPay")}>to pay</button>
        <button onClick={handleChangeOrderStatus("paid")}>paid</button>
        <button onClick={handleChangeOrderStatus("inProgress")}>
          in progress
        </button>
        <button onClick={handleChangeOrderStatus("completed")}>finished</button>
        <button onClick={handleChangeOrderStatus("canceled")}>canceled</button>
      </div>

      {objects.map((order) => {
        imp_Orders += order.imp || 0;
        return (
          <div key={order._id} className='row py-3 my-2 border rounded'>
            <div className='col-6 col-md-4 mt-2   '>{order.code} </div>
            <div className='col-3 col-md-2 mt-2   '>{order.Shop?.code} </div>
            <div className='col-3 col-md-4 mt-2 d-none d-md-block  '>
              {order.Client?.code}{" "}
            </div>
            <div className='col-3 col-md-2 mt-2   '>
              {order.imp?.toFixed(2)}{" "}
            </div>
          </div>
        );
      })}
      <h3>{imp_Orders.toFixed(2)}</h3>
    </>
  );
}
