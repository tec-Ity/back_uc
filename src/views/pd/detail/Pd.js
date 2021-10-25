import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CusSwitchBtn from "../../../components/basic/CusSwitchBtn";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ListPageHeader from '../../../components/basic/ListPageHeader'
import PdBasic from "./PdBasic";
import PdProds from "./PdProds";
import { getRolePath } from "../../../js/conf/confUser";

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
export default function Pd(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rolePath = getRolePath();
  const api = `/pd/${id}`;
  const hist = useHistory();
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

  const setComponentKey = (value) => {
    setKey(value);
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
  
  return (<>
        <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={[
          { label: "主页", to: "/home" },
          { label: "产品列表", to: `/${rolePath}/pds` },
          { label: "产品详情" },
        ]}
        showAddIcon={false}
        showSearch={false}
      />
    <div>
      <div className='form-inline my-3'>
        <CusSwitchBtn
          label='Basic'
          selected={Key === 1}
          handleClick={() => {
            setComponentKey(1);
            hist.push("?section=basic");
          }}
        />
        <CusSwitchBtn
          label='Products'
          selected={Key === 2}
          handleClick={() => {
            setComponentKey(2);
            hist.push("?section=products");
          }}
        />
      </div>
      {routeFunc()}
    </div></>
  );
}
