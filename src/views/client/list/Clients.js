import { useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects } from '../../../features/objectsSlice'

import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import ClientCard from "../ui/ClientCard";
import ClientRow from "../ui/ClientRow";

export default function Clients(props) {
  const dispatch = useDispatch()
  const flagSlice = 'clients';
  const api = '/Clients';
  const rolePath = getRolePath();
  const hist = useHistory();
  
  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/client/${obj._id}`)
  }

  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <NavBread  activePage={<FormattedMessage id='navLabel-clients' defaultMessage='Products'/>}></NavBread>

      <div className="mt-4">
        <UiVariety propsCard={ClientCard} UiRow={ClientRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
