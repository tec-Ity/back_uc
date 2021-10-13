import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CusSwitchBtn from "../../../components/basic/CusSwitchBtn";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

import ProdBasic from "./ProdBasic";
import ProdSku from "./ProdSku";

export default function Prod(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const flagSlice = "prod";
  const flagField = "object";
  const api = `/prod/${id}`;

  const Prod = useSelector(selectObject(flagSlice));

  const [Key, setKey] = useState(1);
  const routeFunc = () => {
    switch (Key) {
      case 1:
        return <ProdBasic Prod={Prod} />;
      case 2:
        return <ProdSku Skus={Prod?.Skus} />;
      default:
        // return <ProdProds />;
        return "";
    }
  };

  const setComponentKey = (value) => {
    setKey(value);
  };

  useEffect(() => {
    dispatch(getObject({ flagSlice, api }));
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
