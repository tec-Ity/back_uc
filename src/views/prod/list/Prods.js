import { useEffect } from "react";
import { useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { selectObjects, getObjects } from "../../../features/objectsSlice";
import { getRolePath } from "../../../js/conf/confUser";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import UiVariety from "../../../components/ui/UiVariety";
import ProdCard from "../ui/ProdCard";
import ProdRow from "../ui/ProdRow";
import PageNav from "../../../components/universal/query/PageNav";
const links = [{ label: "prods" }];

export default function Prods(props) {
  const dispatch = useDispatch();
  const flagSlice = "prods";
  const api = "/Prods";
  const rolePath = getRolePath();
  const hist = useHistory();

  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/prod/${obj._id}`);
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
        addLabel='prod'
        showAddNew={() => {
          hist.push(`/${rolePath}/prods`);
        }}
        // showAddIcon={false}
      />
      <div className='mt-4'>
        <UiVariety
          propsCard={ProdCard}
          UiRow={ProdRow}
          objects={objects}
          clickEvent={clickEvent}
        />
      </div>
      <PageNav flagSlice={flagSlice} api={api} />
    </>
  );
}
