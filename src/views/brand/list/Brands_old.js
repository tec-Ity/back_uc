import { useEffect } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from 'react-intl'; 
import { useSelector, useDispatch } from 'react-redux';

import {selectObjects, getObjects } from '../../../features/objectsSlice'

import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import BrandCard from "../ui/BrandCard";
import BrandRow from "../ui/BrandRow";

export default function Brands(props) {
  const dispatch = useDispatch()
  const flagSlice = 'brands';
  const api = '/Brands';
  const rolePath = getRolePath();
  const hist = useHistory();
  
  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/brand/${obj._id}`)
  }

  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <>
      <NavBread  activePage={<FormattedMessage id='navLabel-brands' defaultMessage='Products'/>}></NavBread>

      <div className="mt-4">
        <UiVariety propsCard={BrandCard} UiRow={BrandRow} objects={objects} clickEvent={clickEvent} />
      </div>
    </>
  );
}
