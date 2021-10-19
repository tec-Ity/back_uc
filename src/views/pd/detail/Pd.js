import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CusSwitchBtn from "../../../components/basic/CusSwitchBtn";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

import PdBasic from "./PdBasic";
import PdProds from "./PdProds";
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
  const api = `/pd/${id}`;

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
  return (
    <div>
      <div className='form-inline my-3'>
        <CusSwitchBtn
          label='Basic'
          selected={Key === 1}
          handleClick={() => setComponentKey(1)}
        />
        <CusSwitchBtn
          label='Products'
          selected={Key === 2}
          handleClick={() => setComponentKey(2)}
        />
      </div>
      {routeFunc()}
    </div>
  );
}
