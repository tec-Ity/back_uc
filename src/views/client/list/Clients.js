import { useEffect } from "react";
import { useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { selectObjects, getObjects } from "../../../features/objectsSlice";

import { getRolePath } from "../../../js/conf/confUser";
// import NavBread from "../../../components/universal/navBread/NavBread";

import UiVariety from "../../../components/ui/UiVariety";
import ClientCard from "../ui/ClientCard";
import ClientRow from "../ui/ClientRow";
import ListPageHeader from "../../../components/basic/ListPageHeader";

import PageNav from "../../../components/universal/query/PageNav";


const links = [{ label: "主页", to: "/home" }, { label: "客户列表" }];

export default function Clients(props) {
  const dispatch = useDispatch();
  const flagSlice = "clients";
  const api = "/Clients";
  const rolePath = getRolePath();
  const hist = useHistory();

  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/client/${obj._id}`);
  };

  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={links}
        showAddIcon={false}
      />
      <div className='mt-4'>
        <UiVariety
          propsCard={ClientCard}
          UiRow={ClientRow}
          objects={objects}
          clickEvent={clickEvent}
        />
      </div>

      <PageNav flagSlice={flagSlice} api={api} />
    </>
  );
}
