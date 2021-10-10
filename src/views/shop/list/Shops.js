import { useState, useEffect, lazy } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import {selectObjects, getObjects } from '../../../features/objectsSlice'

import { getRolePath } from "../../../js/conf/confUser";

import NavBread from "../../../components/universal/navBread/NavBread";

import UiCards from "../../../components/ui/UiCards";
import ShopCard from "../ui/ShopCard";
import ShopRow from "../ui/ShopRow";
import SearchInput from "../../../components/universal/query/SearchInput";

const ShopPostModal = lazy(() => import( "../modal/ShopPostModal"));

export default function Shops(props) {
  const rolePath = getRolePath();
  const dispatch = useDispatch()
  const hist = useHistory();
  const flagSlice = "shops";
  const api = "/Shops";
  
  const [modalShow, setModalShow] = useState(false);

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
      <SearchInput
        flagSlice={flagSlice}
        api={api}
      />
      <div className="text-right mb-3">
        <button className="btn btn-info" onClick={() => setModalShow(true)}> + </button>
        <ShopPostModal 
          flagSlice={flagSlice}
          show={modalShow}
          onHide={() => setModalShow(false)}
          />
      </div>
    
      <div>
        <UiCards propsCard={ShopCard} UiRow={ShopRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
