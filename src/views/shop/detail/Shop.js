import React, { useState, useEffect } from "react";
import { useParams, useLocation, } from "react-router";
import { useSelector, useDispatch } from "react-redux";
// import { getRolePath } from "../../../js/conf/confUser";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ShopBasic from "./ShopBasic";
import ShopAreas from "./ShopAreas";
import ShopProds from "./ShopProds";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import CusSwitchTabs from "../../../components/basic/CusSwitchTabs";

const populateObjs = [
  { path: "serve_Citas.Cita", select: "code nome" },
  { path: "Cita", select: "code nome" },
];

export default function Shop() {
//   const rolePath = getRolePath();
  const dispatch = useDispatch();
  const { id } = useParams();
  const flagSlice = "shop";
  const flagField = "object";
  const api = `/Shop/${id}`;
  const [Comp, setComp] = useState(1);
  const param = new URLSearchParams(useLocation().search);
  const section = param.get("section");
  //   console.log(section);
  const Shop = useSelector(selectObject(flagSlice));

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

  //remember last visited section
  useEffect(() => {
    switch (section) {
      case "basic":
        setComp(1);
        break;
      case "serviceAreas":
        setComp(2);
        break;
      case "products":
        setComp(3);
        break;

      default:
        break;
    }
  }, [section]);

  const switchList = [
    {
      selKey: 1,
      label: "Basic",
      url: "basic",
    },
    {
      selKey: 2,
      label: "Service Areas",
      url: "serviceAreas",
    },
    {
      selKey: 3,
      label: "Products",
      url: "products",
    },
  ];

  return (
    <div>
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={[
          { label: "主页", to: "/home" },
          { label: "店铺列表", to: `/shops` },
          { label: "店铺详情" },
        ]}
        showAddIcon={false}
        showSearch={false}
      />
      <div>
        <CusSwitchTabs
          switchList={switchList}
          setSel={(section) => setComp(section)}
          selected={Comp}
        />

        {Comp === 1 ? (
          <ShopBasic Shop={Shop} flagSlice={flagSlice} api={api} />
        ) : Comp === 2 ? (
          <ShopAreas Shop={Shop} flagSlice={flagSlice} api={api} />
        ) : (
          <ShopProds shopId={Shop._id} flagSlice={flagSlice} api={api} />
        )}
      </div>
    </div>
  );
}
