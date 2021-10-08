import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  getObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

import PdBasic from "./PdBasic";
import PdProds from "./PdProds";
export default function Pd(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const flagSlice = "pd";
  const flagField = "object";
  const api = `/pd/${id}`;
  
  const Pd = useSelector(selectObject(flagSlice));

  const [Key, setKey] = useState(1);
  const routeFunc = () => {
    switch (Key) {
      case 1:
        return <PdBasic Pd={Pd} />;
      default:
        return <PdProds />;
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
        <button
          className='btn btn-outline-success mx-3'
          onClick={() => setComponentKey(1)}>
          Basic
        </button>
        <button
          className='btn btn-outline-success mx-3'
          onClick={() => setComponentKey(2)}>
          Products
        </button>
      </div>
      {routeFunc()}
    </div>
  );
}
