import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  selectQuery,
  getObjects,
  unObjectsSlice,
  selectPageNum,
} from "../../../features/objectsSlice";

export default function PageNav(props) {
  const { flagSlice, api, pagesize = 30 } = props;
  const dispatch = useDispatch();
  const page = useSelector(selectQuery(flagSlice))?.page || 1;
  const pageNum = useSelector(selectPageNum(flagSlice));
  const [init, setInit] = useState(true);
  const pageClick = (val) => (event) => {
    dispatch(
      setQuery({ flagSlice, query: { key: "page", val }, isReload: false })
    );
  };
  // 根据本身 filter 的变化, 更新 reducer 中对应查找的数据 (如果加载此组件， 则不用在父组件中加载)
  useEffect(() => {
    if (init === true) {
      page === 1 && setInit(false);
    } else {
      dispatch(getObjects({ flagSlice, api, isReload: true }));
    }

    // page !== 1 && dispatch(getObjects({ flagSlice, api, isReload: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    if (pagesize !== 30) {
      dispatch(
        setQuery({ flagSlice, query: { key: "pagesize", val: pagesize } })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesize]);

  // 卸载
  useEffect(() => {
    return () => {
      flagSlice && dispatch(unObjectsSlice(flagSlice));
    };
  }, [dispatch, flagSlice]);

  const forPage = () => {
    const lis = [];
    for (let i = page - 2; i <= page + 2; i++) {
      if (i < 1 || i > pageNum) continue;
      if (i === page) {
        lis.push(
          <li key={page - i} className='page-item'>
            <button onClick={pageClick(i)} className='page-link bg-info'>
              {i}
            </button>
          </li>
        );
      } else {
        lis.push(
          <li key={page - i} className='page-item'>
            <button onClick={pageClick(i)} className='page-link'>
              {i}
            </button>
          </li>
        );
      }
    }
    return lis;
  };
  const isPageFirst = () => {
    if (page - 2 > 1)
      return (
        <li className='page-item'>
          <button
            className='page-link'
            onClick={pageClick(1)}
            aria-label='First'>
            <span aria-hidden='true'>&laquo;</span>
            <span className='sr-only'>First</span>
          </button>
        </li>
      );
  };
  const isPageLast = () => {
    if (page + 2 < pageNum)
      return (
        <li className='page-item'>
          <button
            className='page-link'
            onClick={pageClick(pageNum)}
            aria-label='Last'>
            <span aria-hidden='true'>&raquo;</span>
            <span className='sr-only'>Last{pageNum}</span>
          </button>
        </li>
      );
  };
  const isPageNav = () => {
    if (pageNum > 1)
      return (
        <nav aria-label='Page navigation example'>
          <ul className='pagination pagination-lg'>
            {isPageFirst()}
            {forPage()}
            {isPageLast()}
          </ul>
        </nav>
      );
  };
  return <>{isPageNav()}</>;
}
