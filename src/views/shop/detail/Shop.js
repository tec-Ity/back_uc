import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CusSwitchBtn from "../../../components/basic/CusSwitchBtn";
import { getRolePath } from "../../../js/conf/confUser";

import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ShopBasic from "./ShopBasic";
import ShopAreas from "./ShopAreas";
import ShopProds from "./ShopProds";
import ListPageHeader from "../../../components/basic/ListPageHeader";

const populateObjs = [
  { path: "serve_Citas.Cita", select: "code nome" },
  { path: "Cita", select: "code nome" },
];

export default function Shop() {
  const rolePath = getRolePath();
  const dispatch = useDispatch();
  const hist = useHistory();
  const { id } = useParams();
  const flagSlice = "shop";
  const flagField = "object";
  const api = `/Shop/${id}`;
  const [Comp, setComp] = useState(1);
  const param = new URLSearchParams(useLocation().search);
  const section = param.get("section");
  //   console.log(section);
  const Shop = useSelector(selectObject(flagSlice));
  console.log(Shop);
  // const Shop = useSelector((state) => state.objects[flagSlice]?.object);
  const setKeyComp = (key) => {
    setComp(Number(key));
  };
  console.log(populateObjs);
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
      case "serviceArea":
        setComp(2);
        break;
      case "products":
        setComp(3);
        break;

      default:
        break;
    }
  }, [section]);

  return (
    <>
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={[
          { label: "主页", to: "/home" },
          { label: "店铺列表", to: `/${rolePath}/shops` },
          { label: "店铺详情" },
        ]}
        showAddIcon={false}
        showSearch={false}
      />
      <div>
        <div className='form-inline my-3'>
          <CusSwitchBtn
            label='Basic'
            selected={Boolean(Comp === 1)}
            handleClick={() => {
              setKeyComp(1);
              hist.push("?section=basic");
            }}
          />
          <CusSwitchBtn
            label='Service Areas'
            selected={Boolean(Comp === 2)}
            handleClick={() => {
              setKeyComp(2);
              hist.push("?section=serviceArea");
            }}
          />
          <CusSwitchBtn
            label='Products'
            selected={Boolean(Comp === 3)}
            handleClick={() => {
              setKeyComp(3);
              hist.push("?section=products");
            }}
          />
        </div>

        {Comp === 1 ? (
          <ShopBasic Shop={Shop} flagSlice={flagSlice} api={api} />
        ) : Comp === 2 ? (
          <ShopAreas Shop={Shop} flagSlice={flagSlice} api={api} />
        ) : (
          <ShopProds shopId={Shop._id} flagSlice={flagSlice} api={api} />
        )}
      </div>
    </>
  );
}
