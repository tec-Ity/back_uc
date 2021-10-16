import { useEffect } from "react";
import { useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { selectObjects, getObjects, setQuery, selectQuery } from "../../../features/objectsSlice";

import { getRolePath } from "../../../js/conf/confUser";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import UiVariety from "../../../components/ui/UiVariety";
import PdCard from "../ui/PdCard";
import PdRow from "../ui/PdRow";

const links = [{ label: "主页", to: "/home" }, { label: "产品列表" }];

export default function Pds(props) {
  // const {isShop} = props
  const dispatch = useDispatch();
  const flagSlice = "pds";
  const api = "/Pds";
  const rolePath = getRolePath();
  const hist = useHistory();

  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`);
  };

  useEffect(() => {
    dispatch(getObjects({ flagSlice, api, isReload: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const page = useSelector(selectQuery(flagSlice))?.page || 1;
const pageClick = (val) =>(event) => {
  dispatch(
    setQuery({ flagSlice, query: { key: "page", val }, isReload: false })
  );
}
useEffect(() => {
  dispatch(getObjects({ flagSlice, api, isReload: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [page]);
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
          propsCard={PdCard}
          UiRow={PdRow}
          objects={objects}
          clickEvent={clickEvent}
        />
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-lg">
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          <li className="page-item"><button onClick={pageClick(1)} className="page-link" href="#">1</button></li>
          <li className="page-item"><button onClick={pageClick(2)} className="page-link" href="#">2</button></li>
          <li className="page-item"><button onClick={pageClick(3)} className="page-link" href="#">3</button></li>
          <li className="page-item">
            <button className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
