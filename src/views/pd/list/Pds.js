import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import {
  selectObjects,
  getObjects,
  setQueryFixed,
  selectQueryFixed,
  postObject,
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
  const status = useSelector((state) => state.objects.status);
  const links = [{ label: "pds" }];
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`);
  };
  const [justSubmitted, setJustSubmitted] = useState(false);
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

  useEffect(() => {
    if (justSubmitted === true ) {
      setJustSubmitted(false);
      hist.push(`/${rolePath}/reload`);
    }
  }, [justSubmitted]);

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
      {localStorage.getItem("role") > 100 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <div
            style={{
              height: "60px",
              width: "200px",
              backgroundColor: "#000000",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              fontWeight: 700,
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => {
              const pdIds = objects.map((object) => object._id);

              dispatch(
                postObject({
                  flagSlice: "prods",
                  api: "/Prod",
                  data: { Pds: pdIds },
                })
              );
              setJustSubmitted(true);
            }}>
            一键同步本页产品
          </div>
        </div>
      )}
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
