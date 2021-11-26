import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectObjects, getObjects } from "../../../features/objectsSlice";

import { getRolePath } from "../../../js/conf/confUser";
import ShopPostModal from "../modal/ShopPostModal";
// import NavBread from "../../../components/universal/navBread/NavBread";

import UiCards from "../../../components/ui/UiCards";
import ShopCard from "../ui/ShopCard";
import ShopRow from "../ui/ShopRow";
import ListPageHeader from "../../../components/basic/ListPageHeader";
// const ShopPostModal = lazy(() => import("../modal/ShopPostModal"));
import PageNav from "../../../components/universal/query/PageNav";
// import { FormattedMessage } from "react-intl";

const flagSlice = "shops";
const api = "/Shops";
export default function Shops(props) {
  const rolePath = getRolePath();
  const dispatch = useDispatch();
  const hist = useHistory();
  const links = [{ label: "shops" }];

  const [modalShow, setModalShow] = useState(false);

  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/shop/${obj._id}`);
  };

  const objects = useSelector(selectObjects(flagSlice));
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
        showAddNew={() => setModalShow(true)}
        addLabel='shop'
      />
      <ShopPostModal
        flagSlice={flagSlice}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div>
        <UiCards
          propsCard={ShopCard}
          UiRow={ShopRow}
          objects={objects}
          clickEvent={clickEvent}
        />
      </div>

      <PageNav flagSlice={flagSlice} api={api} />
    </>
  );
}
