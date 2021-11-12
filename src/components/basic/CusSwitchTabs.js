import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import clsx from "clsx";

const useStyle = makeStyles({
  tabBox: {
    // border: "1px solid",
    boxSizing: "border-box",
    width: "100%",
    height: "30px",
    borderBottom: "2px solid",
    marginBottom: "30px",
  },
  tabStyle: {
    margin: "0",
    display: "inline-block",
    boxSizing: "border-box",
    height: "30px",
    // lineHeight:'30px',
    width: "180px",
    borderRadius: "5px 5px 0 0",
    textAlign: "center",
    marginLeft: "30px",
  },
  notSelectedStyle: {
    backgroundColor: "#0000001a",
    cursor: "pointer",
    height: "28px",
  },
  selectedStyle: {
    border: "2px solid",
    borderBottom: 0,
    backgroundColor: "#fff",
    cursor: "default",
  },
});
export default function CusSwitchTabs({ switchList, setSel, selected }) {
  const classes = useStyle();
  const hist = useHistory();

  //   useEffect(() => {
  //     hist.push(`?section=${switchList[0]?.url}`);
  //   }, [hist, switchList]);

  return (
    <div className={classes.tabBox}>
      {switchList?.map((switchTab,index) => (
        <div
          key={switchTab.label}
          className={clsx(
            classes.tabStyle,
            switchTab.selKey === selected
              ? classes.selectedStyle
              : classes.notSelectedStyle
          )}
          onClick={() => {
            setSel(switchTab?.selKey);
            hist.push(`?section=${switchTab.url}`);
          }}>
          {switchTab.label}
        </div>
      ))}
    </div>
  );
}
