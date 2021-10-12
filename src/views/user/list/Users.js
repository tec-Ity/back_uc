import { useState, useEffect, lazy } from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";

import SearchInput from "../../../components/universal/query/SearchInput";
import NavBread from "../../../components/universal/navBread/NavBread";
import UiVariety from "../../../components/ui/UiVariety";
import UserRow from "../ui/UserRow";
import UserCard from "../ui/UserCard";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { selectObjects, getObjects } from "../../../features/objectsSlice";

const UserPostModal = lazy(() => import("../modal/UserPostModal"));
export default function Users(props) {
  const dispatch = useDispatch();
  const flagSlice = "user";
  const api = "/Users";
  const hist = useHistory();
  const rolePath = getRolePath();

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
    dispatch(getObjects({ flagSlice, api, isReload: true }));
  }, [dispatch]);
  return (
    <>
      <NavBread
        activePage={
          <FormattedMessage id='navLabel-users' defaultMessage='users' />
        }></NavBread>
      <SearchInput flagSlice={flagSlice} api={api} />
      <div className='text-right mb-3'>
        <button className='btn btn-info' onClick={() => setModalShow(true)}>
          {" "}
          +{" "}
        </button>
        <UserPostModal
          flagSlice={flagSlice}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
      <ListPageHeader flagSlice={flagSlice} api={api}>
        <UserPostModal
          flagSlice={flagSlice}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ListPageHeader>
      <hr />
      <UiVariety
        propsCard={UserCard}
        UiRow={UserRow}
        objects={objects}
        clickEvent={clickCardEvent}
      />
    </>
  );
}

const useStyle = makeStyles({
  root: {},
});

function ListPageHeader(props) {
  const { flagSlice, api, children } = props;
  const classes = useStyle();

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBread
          activePage={
            <FormattedMessage id='navLabel-users' defaultMessage='users' />
          }></NavBread>
      </Grid>
      <Grid item xs={8} />
      <Grid item xs={4}>
        <SearchInput flagSlice={flagSlice} api={api} />
      </Grid>

      {children}
    </Grid>
  );
}
