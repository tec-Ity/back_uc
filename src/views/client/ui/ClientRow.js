import React from "react";
import { Link } from "react-router-dom";
import { get_DNS } from "../../../js/api";
import { default as customerProfile } from "../../../components/icon/customerProfileLightGrey.svg";
import CustCard from "../../../components/ui/CustCard.js";

export default function ClientRow({ object, clickEvent }) {
  //compile image url
  //   let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  let img_url = customerProfile;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  return (
    <>
      {object ? (
        <Link
          to={`client/${object._id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <CustCard
            row
            img={{ url: img_url, alt: object.code }}
            content={
              <>
                <div className="duo">
                  <p className="title">{object.code}</p>
                  <p className="normal">{object.nome}</p>
                </div>
                <p className="desc">{object.addr}</p>
              </>
            }
          />
        </Link>
      ) : (
        <h3 className="text-danger"> ClientRow parameter Error! </h3>
      )}
    </>
  );
}
