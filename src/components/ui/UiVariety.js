import React, { useState } from "react";
import UiCards from "./UiCards";
import UiRows from "./UiRows";
import makeStyles from "@mui/styles/makeStyles";
import { ReactComponent as ListView } from "../icon/listView.svg";
import { ReactComponent as GridView } from "../icon/gridView.svg";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useHistory } from "react-router";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btnStyle: {
    corlor: "#000",
    opacity: "0.3",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
    },
  },
  activeBtnStyle: {
    opacity: 1,
    cursor: "default",
  },
});

const styleUi = ["card", "list"];
const initUi = "card";
export default function UiVariety(props) {
  const { propsCard, UiRow, objects, clickEvent, cols } = props;
  const classes = useStyle();
  const hist = useHistory();
  const [keyUi, setKeyUi] = useState(styleUi[0]);
  const [activeBtn, setActiveBtn] = useState(0);
  const param = new URLSearchParams(useLocation().search);
  const view = param.get("view");
  const section = param.get("section");


    console.log(hist)

  //on click
  const changeUi = (iBtn) => {
    const view = styleUi[iBtn];
    // 变化样式组件
    setKeyUi(view);
    // 改变按钮样式
    setActiveBtn(iBtn);
    section
      ? hist.push(`?section=${section}&view=${view}`)
      : hist.push(`?view=${view}`);
  };
  //init
  React.useEffect(() => {
    section
      ? hist.push(`?section=${section}&view=${initUi}`)
      : hist.push(`?view=${initUi}`);
  }, [section]);

  //view change trigger
  React.useEffect(() => {
    setKeyUi(view);
    setActiveBtn(styleUi.indexOf(view));
  }, [view]);

  const componentUI = () => {
    switch (keyUi) {
      case styleUi[0]:
        return (
          <UiCards
            cols={cols}
            propsCard={propsCard}
            objects={objects}
            clickEvent={clickEvent}
          />
        );
      case styleUi[1]:
        return (
          <UiRows UiRow={UiRow} objects={objects} clickEvent={clickEvent} />
        );
      default:
        return <div> Not exist this UI </div>;
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div
          className={clsx(
            classes.btnStyle,
            activeBtn === 0 && classes.activeBtnStyle
          )}
          onClick={() => changeUi(0)}>
          <GridView style={{ width: "21px", height: "21px" }} />
        </div>
        <div
          className={clsx(
            classes.btnStyle,
            activeBtn === 1 && classes.activeBtnStyle
          )}
          style={{ marginLeft: "30px" }}
          onClick={() => changeUi(1)}>
          <ListView style={{ width: "21px", height: "21px" }} />
        </div>
      </div>
      <div className='mt-5'>{componentUI()}</div>
    </>
  );
}
