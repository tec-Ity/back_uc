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
          `?client=[` +
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

  console.log(orders);

  return (
    <div>
      {orders.map((order) => (
        <HistoryRow object={order} />
      ))}
    </div>
  );
}