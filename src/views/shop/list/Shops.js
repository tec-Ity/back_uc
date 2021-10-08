import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects } from '../../../features/objectsSlice'
import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiCards from "../../../components/ui/UiCards";
import ShopCard from "../ui/ShopCard";
import ShopRow from "../ui/ShopRow";

export default function Shops(props) {
  const rolePath = getRolePath();
  const dispatch = useDispatch()
  const hist = useHistory();
  const flagSlice = "shops";
  const api = "/Shops";
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/shop/${obj._id}`)
  }

  const objects = useSelector(selectObjects(flagSlice));
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavBread  activePage="Shops"></NavBread>
      <div>
        <UiCards propsCard={ShopCard} UiRow={ShopRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
