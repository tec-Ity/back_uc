import React from "react";
import { get_DNS } from "../../../js/api";
import { Link } from "react-router-dom";
// import { FormattedMessage } from "react-intl";
import { makeStyles } from "@mui/styles";
import { default as customerProfile } from "../../../components/icon/customerProfileLightGrey.svg";
const propreties = {
  height: "220px",
  // height: "320px",
  width: "180px",
};

const useStyle = makeStyles({
  cardBox: {
    "&>div": {
      position: "relative",
      boxSizing: "border-box",
      height: propreties.height,
      width: propreties.width,
      margin: "16px",
      padding: "10px",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "5px",
    },
    textDecoration: "none",
    color: "#000",
  },
  imgStyle: {
    height: "160px",
    width: "160px",
    marginBottom: "7px",
    display: "block",
    objectFit: "scale-down",
  },
  innerbox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#000000",
  },
  desc: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#0000004D",
  },
  tag: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#000000",
  },
});

export default function UserCard(props) {
  const {
    object,
    // clickEvent
  } = props;
  const classes = useStyle();

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
        <Link to={`client/${object._id}`} className={classes.cardBox}>
          <div>
            <img alt={object.code} src={img_url} className={classes.imgStyle} />
            <div className={classes.innerbox}>
              <div className={classes.title}>{object.code}</div>
              <div className={classes.tag}>
                {object.Shop?.code ? object.Shop?.code : "Shop"}
              </div>
            </div>
            <div className={classes.desc}>{object.nome}</div>
          </div>

          {/* <Card elevation={0}>
            <CardActionArea
              className={classes.innerbox}
              onClick={clickEvent && clickEvent(object)}
            >
              <Container
                disableGutters
                sx={{
                  padding: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  height="160px"
                  image={img_url}
                  alt={object.code}
                />
                <Typography variant="h" className={classes.title}>
                  {object.code + (object.nome ? `[${object.nome}]` : "")}
                </Typography>
                <Typography variant="body2" className={classes.desc}>
                    <FormattedMessage
                      id={`role-${object.role}`}
                      defaultMessage={object.role}
                    />
                    {object.role > 100 && (
                      <Typography variant="string" className={classes.desc}>
                        &nbsp;&nbsp; {object.Shop?.code}
                      </Typography>
                    )}
                  </Typography>
              </Container>
            </CardActionArea>
          </Card> */}
        </Link>
      ) : (
        <h3 className='text-danger'> UserCard parameter Error! </h3>
      )}
    </>
  );
}
