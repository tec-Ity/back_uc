import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CusSwitchBtn from "../../../components/basic/CusSwitchBtn";
import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

import ShopBasic from "./ShopBasic";
import ShopAreas from "./ShopAreas";
import ShopProds from "./ShopProds";
export default function Shop() {
  const rolePath = getRolePath();
  const dispatch = useDispatch();
  const { id } = useParams();
  const flagSlice = "shop";
  const flagField = "object";
  const api = `/Shop/${id}`;
  const [Comp, setComp] = useState(1);

  const Shop = useSelector(selectObject(flagSlice));
  // const Shop = useSelector((state) => state.objects[flagSlice]?.object);
  const setKeyComp = (key) => {
    setComp(Number(key));
  };
  useEffect(() => {
    dispatch(getObject({ flagSlice, api }));
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);
  return (
    <>
      <NavBread activePage='ShopDetail'>
        <Link to={`/${rolePath}/shops`}>Shops</Link>
      </NavBread>
      <div>
        <div className='form-inline my-3'>
          <CusSwitchBtn
            label='Basic'
            selected={Boolean(Comp === 1)}
            handleClick={() => setKeyComp(1)}
          />
          <CusSwitchBtn
            label='Service Areas'
            selected={Boolean(Comp === 2)}
            handleClick={() => setKeyComp(2)}
          />
          <CusSwitchBtn
            label='Products'
            selected={Boolean(Comp === 3)}
            handleClick={() => setKeyComp(3)}
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
