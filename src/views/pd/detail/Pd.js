import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import PdBasic from "./PdBasic";
import PdProds from "./PdProds";
// import { getRolePath } from "../../../js/conf/confUser";
import CusSwitchTabs from "../../../components/basic/CusSwitchTabs";

const flagSlice = "pd";
const flagField = "object";
const populateObjs = [
  {
    path: "Categ",
    select: "Categ_far code",
    populate: { path: "Categ_far", select: "code" },
  },
  { path: "Brand", select: "code nome" },
  { path: "Nation", select: "code nome" },
  { path: "Prods", populate: { path: "Shop", select: "code nome" } },
];

const switchList = [
  {
    selKey: 1,
    label: "Basic",
    url: "basic",
  },
  {
    selKey: 2,
    label: "Products",
    url: "products",
  },
];

export default function Pd(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
//   const rolePath = getRolePath();
  const api = `/pd/${id}`;
  const param = new URLSearchParams(useLocation().search);
  const section = param.get("section");
  const Pd = useSelector(selectObject(flagSlice));
  //   console.log(Pd);
  const [Key, setKey] = useState(1);
  const routeFunc = () => {
    switch (Key) {
      case 1:
        return <PdBasic Pd={Pd} flagSlice={flagSlice} api={api} />;
      default:
        return <PdProds prods={Pd.Prods} />;
    }
  };

  useEffect(() => {
    switch (section) {
      case "basic":
        setKey(1);
        break;
      case "products":
        setKey(2);
        break;
      default:
        break;
    }
  }, [section]);

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

  return (
    <>
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={[
          { label: "主页", to: "/home" },
          { label: "产品列表", to: `/pds` },
          { label: "产品详情" },
        ]}
        showAddIcon={false}
        showSearch={false}
      />
      <div>
        <CusSwitchTabs
          switchList={switchList}
          setSel={(section) => setKey(section)}
          selected={Key}
        />
        {routeFunc()}
      </div>
    </>
  );
}
