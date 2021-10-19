import React, { useState } from "react";
import UiCards from "./UiCards";
import UiRows from "./UiRows";
import makeStyles from "@mui/styles/makeStyles";
import { ReactComponent as ListView } from "../icon/listView.svg";
import { ReactComponent as GridView } from "../icon/gridView.svg";
import clsx from "clsx";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btnStyle: {
    corlor: "#000",
    opacity: "0.3",
    "&:hover": {
      opacity: "0.8",
    },
  },
  activeBtnStyle: {
    opacity: 1,
  },
});

export default function UiVariety(props) {
  const { propsCard, UiRow, objects, clickEvent } = props;
  const classes = useStyle();
  const styleUi = {
    init: "card",
    arr: ["card", "row"],
  };
  const [keyUi, setKeyUi] = useState(styleUi.init);
  //   const [activeBtns, setActiveBtns] = useState([
  //     "btn-success",
  //     "btn-outline-success",
  //   ]);
  const [activeBtn, setActiveBtn] = useState(0);
  const changeUi = (iBtn) => {
    // 变化样式组件
    setKeyUi(styleUi.arr[iBtn]);
    // 改变按钮样式
    // const btns = [];
    setActiveBtn(iBtn);
    // activeBtns.forEach((item, i) =>
    //   btns.push(i === iBtn ? "btn-success" : "btn-outline-success")
    // );
    // setActiveBtns(btns);
  };
  const componentUI = () => {
    switch (keyUi) {
      case styleUi.arr[0]:
        return (
          <UiCards
            propsCard={propsCard}
            objects={objects}
            clickEvent={clickEvent}
          />
        );
      case styleUi.arr[1]:
        return (
          <UiRows UiRow={UiRow} objects={objects} clickEvent={clickEvent} />
        );
      default:
        return <div> Not exist this UI </div>;
    }
  };
  //   let icon = `${process.env.PUBLIC_URL}/img/icon/`;
  // gridView.svg`;
  return (
    <>
      <div className={classes.root}>
        <div
          className={clsx(
            classes.btnStyle,
            activeBtn === 0 && classes.activeBtnStyle
          )}
          onClick={() => changeUi(0)}>
          <GridView
            // src={gridView}
            // className='img-neat'
            // alt={"gridView"}
            style={{ width: "30px", height: "30px" }}
          />
        </div>
        <div
          className={clsx(
            classes.btnStyle,
            activeBtn === 1 && classes.activeBtnStyle
          )}
          style={{ marginLeft: "30px" }}
          onClick={() => changeUi(1)}>
          <ListView
            // src={listView}
            // className='img-neat'
            // alt={"listView"}
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      </div>
      <div className='mt-5'>{componentUI()}</div>
    </>
  );
}
