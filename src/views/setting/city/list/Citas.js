import { useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects } from "../../../../features/objectsSlice";

import { getRolePath } from "../../../../js/conf/confUser";
import NavBread from "../../../../components/universal/navBread/NavBread";

import UiCards from "../../../../components/ui/UiCards";
import CitaCard from "../ui/CitaCard";

export default function Citas(props) {
  const dispatch = useDispatch()
  const flagSlice = 'citas';
  const api = '/Citas';
  const rolePath = getRolePath();
  const hist = useHistory();
  
  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/cita/${obj._id}`)
  }

  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <NavBread  activePage={<FormattedMessage id='navLabel-citas' defaultMessage='Cities'/>}></NavBread>

      <div className="mt-4">
        <UiCards propsCard={CitaCard}  objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
