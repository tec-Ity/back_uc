import { useState, useEffect } from "react";
import { useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";
import UserPostModal from "../modal/UserPostModal";
// import SearchInput from "../../../components/universal/query/SearchInput";
// import NavBread from "../../../components/universal/navBread/NavBread";
import UiVariety from "../../../components/ui/UiVariety";
import UserRow from "../ui/UserRow";
import UserCard from "../ui/UserCard";
// import { makeStyles } from "@mui/styles";
import { selectObjects, getObjects } from "../../../features/objectsSlice";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import PageNav from "../../../components/universal/query/PageNav";
// import { FormattedMessage } from "react-intl";

// const UserPostModal = lazy(() => import("../modal/UserPostModal"));
const populateObjs = [{ path: "Shop", select: "code" }];
export default function Users(props) {
  const dispatch = useDispatch();
  const flagSlice = "user";
  const api = "/Users";
  const hist = useHistory();
  const rolePath = getRolePath();
  const links = [{ label: "users" }];

  const selectAs = [
    { select: "code", as: "title" },
    { select: "nome", as: "desp" },
    { select: "role", as: "note" },
  ];
  const objects = useSelector(selectObjects(flagSlice, selectAs));
  // console.log(objects)
  const [modalShow, setModalShow] = useState(false);

  const clickCardEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/user/${obj._id}`);
  };

  useEffect(() => {
    dispatch(
      getObjects({
        flagSlice,
        api: api + "?populateObjs=" + JSON.stringify(populateObjs),
        isReload: true,
      })
    );
  }, [dispatch]);

  return (
    <>
      <ListPageHeader
        flagSlice={flagSlice}
        api={api}
        links={links}
        showAddNew={() => setModalShow(true)}
        addLabel='user'
      />
      <UserPostModal
        flagSlice={flagSlice}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <UiVariety
        cols='col-6 col-md-4 col-lg-3 col-xl-2'
        propsCard={UserCard}
        UiRow={UserRow}
        objects={objects}
        clickEvent={clickCardEvent}
      />

      <PageNav flagSlice={flagSlice} api={api} />
    </>
  );
}

// const useStyle = makeStyles({
//   root: {},
// });
