import React from "react";
import { Link } from "react-router-dom";
import { get_DNS } from "../../../js/api";
import { default as userProfile } from "../../../components/icon/userProfileLightGrey.svg";
import CustCard from "../../../components/ui/CustCard";

export default function UserRow({ object }) {
  //compile image url
  let img_url = userProfile;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  return (
    <>
      {object ? (
        <Link
          to={`user/${object._id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <CustCard
            row
            img={{ url: img_url, alt: object.code }}
            content={
              <>
                <div className="duo">
                  <p className="title">{object.code}</p>
                  {object.Shop && <p className="normal">{object.Shop?.code}</p>}
                </div>
                <p className="desc">{object.nome}</p>
              </>
            }
          />
        </Link>
      ) : (
        <h3 className="text-danger"> UserRow parameter Error! </h3>
      )}
    </>
  );
}
