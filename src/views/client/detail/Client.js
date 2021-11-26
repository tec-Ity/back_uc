import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import CusSwitchTabs from "../../../components/basic/CusSwitchTabs";
import ClientBasic from "./ClientBasic.js";
import ClientHistory from "./ClientHistory.js";
import ClientPurchased from "./ClientPurchased.js";

const flagSlice = "client";
const flagField = "object";

const links = [{ label: "clients", to: `/clients` }, { label: "client" }];

const switchList = [
  {
    selKey: 1,
    label: "basic",
    url: "basic",
  },
  {
    selKey: 2,
    label: "history",
    url: "history",
  },
  {
    selKey: 3,
    label: "purchased",
    url: "purchased",
  },
];

export default function Client() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const api = `/client/${id}`;

  useEffect(() => {
    dispatch(
      getObject({
        flagSlice,
        api: api,
      })
    );
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);

  const object = useSelector(selectObject(flagSlice));

  const [Key, setKey] = useState(1);
  const routeFunc = () => {
    switch (Key) {
      case 1:
        return <ClientBasic object={object} />;
      case 2:
        return <ClientHistory object={object} />;
      case 3:
        return <ClientPurchased />;
      default:
        return <div>empty</div>;
    }
  };

  console.log(object);

  return (
    <>
      <ListPageHeader links={links} showSearch={false} showAddIcon={false} />
      <CusSwitchTabs
        switchList={switchList}
        setSel={(section) => setKey(section)}
        selected={Key}
      />
      {routeFunc()}
    </>
  );
}
