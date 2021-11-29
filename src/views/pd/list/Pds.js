import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import {
  selectObjects,
  getObjects,
  setQueryFixed,
  selectQueryFixed,
} from "../../../features/objectsSlice";

import { getRolePath } from "../../../js/conf/confUser";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import UiVariety from "../../../components/ui/UiVariety";
import PdCard from "../ui/PdCard";
import PdRow from "../ui/PdRow";
import PageNav from "../../../components/universal/query/PageNav";
import PdPostModal from "../modal/PdPostModal";

const populateObjs = [
  { path: "Prods", select: "code Shop" },
  { path: "Brand", select: "nome" },
  { path: "Nation", select: "code" },
  {
    path: "Categ",
    select: "code Categ_far",
    populate: {
      path: "Categ_far",
      select: "code",
    },
  },
];

export default function Pds(props) {
  // const {isShop} = props
  const dispatch = useDispatch();
  const flagSlice = "pds";
  const api = "/Pds";
  const rolePath = getRolePath();
  const curRole = localStorage.getItem("role");
  const hist = useHistory();
  const [addNew, setAddNew] = useState(false);
  const objects = useSelector(selectObjects(flagSlice));
  const queryFixed = useSelector(selectQueryFixed(flagSlice));
  const links = [{ label: "pds" }];
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`);
  };

  useEffect(() => {
    //shop user has at_crt sort attr for sync pords bug
    let queryFixed = "&populateObjs=" + JSON.stringify(populateObjs);
    localStorage.getItem("role") > 100 &&
      (queryFixed += "&sortKey=at_crt&sortVal=-1");
    dispatch(
      setQueryFixed({
        flagSlice,
        queryFixed,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    queryFixed &&
      dispatch(
        getObjects({
          flagSlice,
          api,
          isReload: true,
        })
      );
  }, [dispatch, queryFixed]);

  return (
    <>
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={links}
        addLabel='pd'
        showAddNew={() => setAddNew(true)}
        showAddIcon={Boolean(curRole < 100)}
      />

      <div className='mt-4'>
        <UiVariety
          propsCard={PdCard}
          UiRow={PdRow}
          objects={objects}
          clickEvent={clickEvent}
        />
      </div>

      <PageNav flagSlice={flagSlice} api={api} />

      <PdPostModal show={addNew} handleClose={() => setAddNew(false)} />
    </>
  );
}
