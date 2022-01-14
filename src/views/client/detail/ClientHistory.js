import React, { useEffect } from "react";
import HistoryRow from "./HistoryRow";
import { useSelector, useDispatch } from "react-redux";
import {
  getObjects,
  selectObjects,
  cleanField,
  setQueryFixed,
} from "../../../features/objectsSlice";
import SearchInputMod from "../../../components/universal/query/SearchInputMod";

const api = "/Orders";
const flagSlice = "orders";

const populateObjs = [
  {
    path: "Shop",
    select: "code",
  },
];

const styles = {
  searchRow: {
    width: "100%",
    marginBottom: "40px",
    // border: "1px solid #000000",
    display: "flex",
    flexDirection: "row-reverse",
  },
};

export default function ClientHistory({ object }) {
  const dispatch = useDispatch();
  const selectedOrders = useSelector(selectObjects(flagSlice));
  const query = `Clients=[${object._id}]&populateObjs=${JSON.stringify(
    populateObjs
  )}`;

  useEffect(() => {
    dispatch(setQueryFixed({ flagSlice, queryFixed: query }));
    dispatch(
      getObjects({
        flagSlice,
        api,
      })
    );

    return () => {
      dispatch(cleanField({ flagSlice, flagField: "objects" }));
    };
  }, [dispatch]);

  // console.log(orders);

  return (
    <div>
      <div style={styles.searchRow}>
        <SearchInputMod
          api={api}
          flagSlice={flagSlice}
          placeholder={"search by order code"}
        />
      </div>
      {selectedOrders.length > 0
        ? selectedOrders.map((order) => (
            <HistoryRow object={order} client={object._id} key={order._id} />
          ))
        : "Empty"}
    </div>
  );
}
