import { useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects } from '../../../features/objectsSlice'

import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import PdCard from "../../../components/ui/pd/PdCard";
import PdRow from "../../../components/ui/pd/PdRow";

export default function Pds(props) {
  const dispatch = useDispatch()
  const flagSlice = 'pds';
  const api = '/Pds';
  const rolePath = getRolePath();
  const hist = useHistory();
  
  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`)
  }

  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <NavBread  activePage={<FormattedMessage id='navLabel-pds' defaultMessage='Products'/>}></NavBread>

      <div className="mt-4">
        <UiVariety propsCard={PdCard} UiRow={PdRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
