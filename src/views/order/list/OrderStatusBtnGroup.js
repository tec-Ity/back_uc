import {
  Checkbox,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  List,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../../features/objectsSlice";
import { statusName } from "../../../js/conf/confOrder";

export default function OrderStatusBtnGroup(props) {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState({
    //order status
    placing: true,
    responding: true,
    preparing: true,
    inProgress: true,
    failPay: true,
    completed: true,
    canceled: true,
  });
  const [init, setInit] = useState(true);

  const ongoingOrderCount = useSelector((state) => {
    return state.objects.ongoingOrderCount;
  });

  useEffect(() => {
    const queryTemp = [
      orderStatus.placing ? 100 : "",
      orderStatus.failPay ? 70 : "",
      orderStatus.responding ? 200 : "",
      orderStatus.preparing ? 400 : "",
      orderStatus.inProgress ? 700 : "",
      orderStatus.completed ? 800 : "",
      orderStatus.canceled ? 10 : "",
      orderStatus.canceled ? 60 : "",
    ];
    // console.log(queryTemp);
    dispatch(
      setQuery({
        flagSlice: "orders",
        query: { key: "status", val: String(queryTemp) },
      })
    );
  }, [dispatch, orderStatus]);

  useEffect(() => {});
  const handleChangeOrderStatus = (status) => () => {
    // console.log(status);
    if (init === true) {
      const initObj = { ...orderStatus };
      //set all stauts to false except the first clicked button
      for (const key in initObj) {
        if (Object.hasOwnProperty.call(initObj, key)) {
          if (key === status) {
            initObj[key] = true;
          } else {
            initObj[key] = false;
          }
        }
      }
      setOrderStatus(initObj);
      setInit(false);
    } else {
      setOrderStatus((prev) => ({
        ...prev,
        [status]: !prev[status],
      }));
    }
  };

  return (
    <Popover {...props}>
      <List>
        {Object.keys(orderStatus).map((status, index) => {
          return (
            <React.Fragment key={status}>
              {index !== 0 && <Divider variant='middle' />}
              <ListItemButtonComp
                handleChangeOrderStatus={handleChangeOrderStatus}
                orderStatus={orderStatus[status]}
                init={init}
                type={status}
                count={status === "responding" && ongoingOrderCount}
                name={statusName[status]}
              />
            </React.Fragment>
          );
        })}
      </List>
    </Popover>
  );
}

const ListItemButtonComp = (props) => {
  const { handleChangeOrderStatus, init, orderStatus, type, name, count } =
    props;
  return (
    <ListItemButton
      onClick={handleChangeOrderStatus(type)}
      style={{ display: "flex", justifyContent: "space-between" }}>
      <ListItemIcon>
        <ListItemText>
          {name}
          <span style={{ color: "red" }}>{count && " (" + count + ")"}</span>
        </ListItemText>
      </ListItemIcon>
      <ListItemIcon>
        <Checkbox
          edge='end'
          checked={init === true ? false : orderStatus}
          disableRipple
        />
      </ListItemIcon>
    </ListItemButton>
  );
};
