import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import OrderStatusBtnGroup from "../../../../views/order/list/OrderStatusBtnGroup";
import DateFilter from "./DateFilter";
import ShopFilter from "./ShopFilter";
export default function FilterGeneral(props) {
  const { flagSlice, objects } = props;
  // const dispatch = useDispatch();
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
      <div className='row py-3 my-2 border rounded'>
        <div onClick={handleClick("code")} className=' col-3 col-md-2 mt-2'>
          code
        </div>
        <div onClick={handleClick("date")} className=' col-3 col-md-2 mt-2'>
          date
        </div>
        <div onClick={handleClick("shop")} className=' col-3 col-md-2 mt-2'>
          shop
        </div>
        <div onClick={handleClick("client")} className=' col-3 col-md-2 mt-2'>
          client
        </div>
        <div onClick={handleClick("price")} className=' col-3 col-md-2 mt-2'>
          price
        </div>
        <div onClick={handleClick("status")} className=' col-3 col-md-2 mt-2'>
          status
        </div>
      </div>
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
