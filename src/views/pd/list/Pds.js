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

const populateObjs = [{ path: "Prods", select: "code Shop" }];

export default function Pds(props) {
  // const {isShop} = props
  const dispatch = useDispatch();
  const flagSlice = "pds";
  const api = "/Pds";
  const rolePath = getRolePath();
  const hist = useHistory();
  const [addNew, setAddNew] = useState(false);
  const objects = useSelector(selectObjects(flagSlice));
  const queryFixed = useSelector(selectQueryFixed(flagSlice));
  const links = [{ label: "主页", to: `/home` }, { label: "产品列表" }];
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`);
  };

  useEffect(() => {
    dispatch(
      setQueryFixed({
        flagSlice,
        queryFixed: "&populateObjs=" + JSON.stringify(populateObjs),
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
        addLabel='添加产品'
        showAddNew={() => setAddNew(true)}
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
