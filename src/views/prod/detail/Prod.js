import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CusSwitchBtn from "../../../components/basic/CusSwitchBtn";
import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";
import ProdAttr from "./ProdAttr";
import ProdBasic from "./ProdBasic";
import ProdSku from "./ProdSku";
const populateObjs = [
  {
    path: "Categ",
    select: "Categ_far code",
    populate: { path: "Categ_far", select: "code" },
  },
  { path: "Brand", select: "code nome" },
  { path: "Attrs", select: "nome options Prod" },
  { path: "Skus", select: "Prod attrs " },
];
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
          label='Skus'
          selected={Key === 2}
          handleClick={() => setComponentKey(2)}
        />
      </div>
      {routeFunc()}
    </div>
  );
}
