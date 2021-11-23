import React from "react";
import { get_DNS } from "../../../js/api";

export default function ProdRow(props) {
  const { 
    object,
    // clickEvent
  } = props;
  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }
  return (
    <>
      {object ? (
        <div
          className='row mt-3 align-middle d-flex justify-content-between'
          key={object._id}>
          <div className='col-1'>
            <img
              alt={object.code}
              src={img_url}
              className='img-neat'
              style={{ width: "70px", height: "70px" }}
            />
          </div>
          {/* <div
            className='col-1 text-primary'
            onClick={clickEvent && clickEvent(object)}>
            {object.code}
          </div> */}
          <div className='col-1'>{object.nome}</div>
          <div className='col-1'>
            {object.price_max === object.price_min
              ? object.price_min
              : object.price_min + "~" + object.price_max}
          </div>
          <div className='col-1'>{object.desp}</div>
          <div className='col-1'>{object.addr}</div>
        </div>
      ) : (
        <h3 className='text-danger'> PdRow parameter Error! </h3>
      )}
    </>
  );
}
