import { Grid } from "@mui/material";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import OrderStatusBtnGroup from "../../../../views/order/list/OrderStatusBtnGroup";
import DateFilter from "./DateFilter";
import ShopFilter from "./ShopFilter";
import makeStyles from "@mui/styles/makeStyles";
const useStyle = makeStyles({
  root: {},
  headerStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    padding: "0 20px",
    color: "rgba(0, 0, 0, 0.5)",
    "& > div": {
      //   border: "1px solid",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
    },
    "& > :last-child": {
      justifyContent: "flex-start",
    },
  },
});
export default function FilterGeneral(props) {
  const { flagSlice, objects } = props;
  // const dispatch = useDispatch();
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("");
  const handleClick = (type) => (e) => {
    setType(type);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleChangeFilter = () => {};
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Grid container className={classes.headerStyle}>
        <Grid container item xs={1} onClick={handleClick("shop")}>
          shop
          <div style={{ transform: "rotate(90deg)", marginLeft: "5px" }}>
            &gt;
          </div>
        </Grid>
        <Grid container item xs={2} onClick={handleClick("code")}>
          code
        </Grid>
        <Grid container item xs={2} onClick={handleClick("date")}>
          date
          <div style={{ transform: "rotate(90deg)", marginLeft: "5px" }}>
            &gt;
          </div>
        </Grid>
        <Grid container item xs={2} onClick={handleClick("client")}>
          client
        </Grid>
        <Grid container item xs={1} onClick={handleClick("price")}>
          price
        </Grid>
        <Grid container item xs={3} onClick={handleClick("status")}>
          status
          <div style={{ transform: "rotate(90deg)", marginLeft: "5px" }}>
            &gt;
          </div>
        </Grid>
      </Grid>
      {type === "status" && (
        <OrderStatusBtnGroup
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      )}
      {type === "date" && (
        <DateFilter
          flagSlice={flagSlice}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      )}
      {type === "shop" && (
        <ShopFilter
          flagSlice={flagSlice}
          objects={objects}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        />
      )}
    </>
  );
}
