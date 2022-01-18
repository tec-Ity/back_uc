import React from "react";
import { get_DNS } from "../../../js/api";
import { Link } from "react-router-dom";
import { default as customerProfile } from "../../../components/icon/customerProfileLightGrey.svg";
import CustCard from "../../../components/ui/CustCard.js";

export default function UserCard({ object }) {
  //compile image url
  let img_url = customerProfile;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }
  // console.log(object);
  return (
    <>
      {object ? (
        <Link
          to={`client/${object._id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <CustCard
            img={{ url: img_url, alt: object.code }}
            content={
              <>
                <p className="title">{object.code}</p>
                <p className="normal">
                  {object.Shop?.code ? object.Shop?.code : "Shop"}
                </p>
              </>
            }
          />
        </Link>
      ) : (
        <h3 className="text-danger"> UserCard parameter Error! </h3>
      )}
    </>
  );
}
