import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { getObj_Prom } from "../../../js/api";

import PdBasic from "./PdBasic";
import PdProds from "./PdProds";
export default function Pd(props) {
  const { id } = useParams();
  const apiPd = `/Pd/${id}`;
  const [Pd, setPd] = useState({});

  const pdCallback = useCallback(() => {
    getObj_Prom(apiPd, setPd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    pdCallback();
    return () => setPd({});
  }, [pdCallback]);
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
