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
  const page = parseInt(useSelector(selectQuery(flagSlice))?.page) || 1;
  const pageNum = useSelector(selectPageNum(flagSlice));
  const [init, setInit] = useState(Boolean(page === 1));
  const [pageTemp, setPageTemp] = useState(1);
  const pageClick = (val) => (event) => {
    // console.log(val);
    dispatch(
      setQuery({ flagSlice, query: { key: "page", val }, isReload: false })
    );
  };

  // 根据本身 filter 的变化, 更新 reducer 中对应查找的数据 (如果加载此组件， 则不用在父组件中加载)
  useEffect(() => {
    // console.log("page effect");
    // console.log("init", init);
    if (init === true) {
      setInit(false);
    } else {
      //   console.log("get new objs");
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
    // 最多循环 5次 如果全部没有 continue 最多显示5个page选项
    for (let i = page - 2; i <= page + 2; i++) {
        // 如果 i < 1 没有意义, 如果 i > pageNum 错误
      if (i < 1 || i > pageNum) continue;
      if (i === page) { // 如果 i 是当前页面 则显示方式有不同
        lis.push(
          <li key={page - i} className='page-item'>
            <button onClick={pageClick(i)} className='page-link bg-info'>
              {i}
            </button>
          </li>
        );
      } else {  // 把当前页面的前两个数字 和 后两个数字 的页面显示出来
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
        <div style={{ display: "flex" }}>
          <nav aria-label='Page navigation example'>
            <ul className='pagination pagination-lg'>
              {isPageFirst()}
              {forPage()}
              {isPageLast()}
            </ul>
          </nav>
          <input
            style={{
              height: "60px",
              width: "60px",
              marginLeft: "30px",
              textAlign: "center",
              fontSize: "20px",
            }}
            value={pageTemp}
            onChange={(e) =>
              !isNaN(e.target.value) && setPageTemp(e.target.value)
            }
          />
          <button
            className='btn btn-success'
            style={{ height: "60px", width: "60px" }}
            onClick={pageClick(pageTemp)}>
            Go
          </button>
        </div>
      );
  };
  return <>{isPageNav()}</>;
}
