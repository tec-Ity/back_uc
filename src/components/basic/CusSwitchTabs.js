import React from 'react'
import { makeStyles } from '@mui/styles'
const useStyle = makeStyles({
    tabBox: {
      // border: "1px solid",
      boxSizing: "border-box",
      width: "100%",
      height: "30px",
      borderBottom: "2px solid",
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
export default function CusSwitchTabs() {
    const  classes = useStyle();
    return (
        <div>
            
        </div>
    )
}
