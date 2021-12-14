import React, { useEffect } from "react";
import HistoryRow from "./HistoryRow";
import { useSelector, useDispatch } from "react-redux";
import {
  getObjects,
  selectObjects,
  cleanField,
} from "../../../features/objectsSlice";

const flagSlice = "orders";
const flagField = "object";

const populateObjs = [
  {
    path: "Shop",
    select: "code",
  },
];

export default function ClientHistory({ object }) {
  const dispatch = useDispatch();
  const api = "/Orders";

  useEffect(() => {
    dispatch(
      getObjects({
        flagSlice,
        api:
          api +
          `?Clients=[` +
          object._id +
          "]&populateObjs=" +
          JSON.stringify(populateObjs),
      })
    );
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch, object]);

  const orders = useSelector(selectObjects(flagSlice));

  // console.log(orders);

  return (
    <div>
      {orders.length > 0
        ? orders.map((order) => (
            <HistoryRow object={order} client={object._id} />
          ))
        : "Empty"}
    </div>
  );
}
