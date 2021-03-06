import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ProdAttr from "./ProdAttr";
import ProdBasic from "./ProdBasic";
import ProdSku from "./ProdSku";
// import { getRolePath } from "../../../js/conf/confUser";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import CusSwitchTabs from "../../../components/basic/CusSwitchTabs";

const populateObjs = [
  {
    path: "Categ",
    select: "Categ_far code",
    populate: { path: "Categ_far", select: "code" },
  },
  { path: "Brand", select: "code nome" },
  { path: "Attrs", select: "nome options Prod" },
  { path: "Nation", select: "code" },
  {
    path: "Skus",
    select:
      "Prod attrs price_regular price_sale limit_quantity purchase_note is_controlStock quantity quantity_alert allow_backorder",
  },
];
const switchList = [
  {
    selKey: 1,
    label: "basic",
    url: "basic",
  },
  {
    selKey: 2,
    label: "attr&sku",
    url: "attrandskus",
  },
];

export default function Prod(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const flagSlice = "prod";
  const flagField = "object";
  const api = `/prod/${id}`;
  const Prod = useSelector(selectObject(flagSlice));
  const param = new URLSearchParams(useLocation().search);
  const section = param.get("section");

  const [Key, setKey] = useState(1);
  useEffect(() => {
    setKey(section === "attrandskus" ? 2 : 1);
  }, [section]);
  const routeFunc = () => {
    switch (Key) {
      case 1:
        return <ProdBasic Prod={Prod} api={api} />;
      case 2:
        return (
          <>
            <ProdAttr Attrs={Prod?.Attrs} prodId={id} flagSlice={flagSlice} />
            <ProdSku Skus={Prod?.Skus} Attrs={Prod?.Attrs} api={api} />
          </>
        );
      default:
        // return <ProdProds />;
        return "";
    }
  };

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
          { label: "prods", to: `/prods`, prevView: true },
          { label: "prod" },
        ]}
        showAddIcon={false}
        showSearch={false}
      />

      <CusSwitchTabs
        switchList={switchList}
        setSel={(val) => setKey(val)}
        selected={Key}
      />
      {routeFunc()}
    </>
  );
}
