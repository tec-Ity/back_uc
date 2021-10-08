import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";
import { getObjs_Prom } from "../../../js/api";
import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiCards from "../../../components/ui/UiCards";
import ShopCard from "../../../components/ui/shop/ShopCard";
import ShopRow from "../../../components/ui/shop/ShopRow";

export default function Shops(props) {
  const rolePath = getRolePath();
  const hist = useHistory();
  const api = "/Shops";
  const [objects, setObjects] = useState([]);
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/shop/${obj._id}`)
  }
  const shopsCall = useCallback(() => {
    getObjs_Prom(api, objects, setObjects, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    shopsCall();
    return () => setObjects([]);
  }, [shopsCall]);

  return (
    <>
      <NavBread  activePage="Shops"></NavBread>
      <div>
        <UiCards propsCard={ShopCard} UiRow={ShopRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
