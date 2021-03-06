import React from "react";
import { get_DNS } from "../../../js/api";

export default function PdRow(props) {
  const { object, clickEvent } = props;
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
          className='row mt-3 align-middle'
          key={object._id}
          onClick={clickEvent && clickEvent(object)}
          style={{
            boxShadow: " 0px 0px 20px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}>
          <div className='col-3'>
            <img
              alt={object.code}
              src={img_url}
              className='img-neat'
              style={{ width: "70px", height: "70px" }}
            />
          </div>
          <div className='col-3 text-primary'>{object.code}</div>
          <div className='col-3'>{object.nome}</div>
          <div className='col-3'>{object.addr}</div>
        </div>
      ) : (
        <h3 className='text-danger'> PdRow parameter Error! </h3>
      )}
    </>
  );
}
