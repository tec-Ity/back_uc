import React from "react";
import { get_DNS } from "../../../js/api";
// import { FormattedMessage } from "react-intl";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { default as shopDefault } from "../../../components/icon/shopDefaultImg.svg";
const propreties = {
  height: "220px",
  width: "180px",
};

const useStyle = makeStyles({
  imgStyle: {
    height: "160px",
    width: "160px",
    display: "block",
    objectFit: "scale-down",
  },
  cardBox: {
    position: "relative",
    boxSizing: "border-box",
    height: propreties.height,
    width: propreties.width,
    backgroundColor: "#fff",
    margin: "16px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  },
  innerbox: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: "12px",
    fontWeight: "700",
    overflowWrap: "break-word",
  },
  desc: {
    fontSize: "12px",
    fontWeight: "400",
    color: "#0000004D",
    height: "1.5em",
  },
  infoStyle: {
    marginTop: "5px",
    "& > :nth-child(1)": {
      fontSize: "14px",
      fontWeight: "600",
      overflowWrap: "break-word",
    },
    "& > :nth-child(2)": {
      fontSize: "12px",
      color: "#00000080",
      height: "1.5em",
    },
  },
});

export default function UserCard(props) {
  const { object, clickEvent } = props;
  const classes = useStyle();

  let img_url = shopDefault;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }
  // console.log(object);
  return (
    <>
      {object ? (
        <Box className={classes.cardBox}>
          <Card elevation={0}>
            <CardActionArea
              className={classes.innerbox}
              onClick={clickEvent && clickEvent(object)}>
              <Container
                disableGutters
                sx={{
                  padding: "10px",
                }}>
                <CardMedia
                  component='img'
                  height='160px'
                  image={img_url}
                  alt={object.code}
                />
                <Typography variant='h' className={classes.title}>
                  {object.code + (object.nome ? ` [${object.nome}]` : "")}
                </Typography>
                <Typography variant='body2' className={classes.desc}>
                  {/* <FormattedMessage
                    id={`role-${object.addr}`}
                    defaultMessage={object.addr}
                  /> */}
                  <Typography variant='string' className={classes.desc}>
                    {object.addr}
                  </Typography>
                </Typography>
              </Container>
            </CardActionArea>
          </Card>
        </Box>
      ) : (
        <h3 className='text-danger'> UserCard parameter Error! </h3>
      )}
    </>
  );
}
