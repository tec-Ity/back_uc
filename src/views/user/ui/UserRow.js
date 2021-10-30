import { get_DNS } from "../../../js/api";
import { FormattedMessage } from "react-intl";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  imgStyle: {
    height: "64px",
    width: "64px",
    display: "block",
    objectFit: "scale-down",
  },
  cardBox: {
    position: "relative",
    boxSizing: "border-box",
    height: "84px",
    width: "100%",
    marginBottom: "25px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  },
  innerbox: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    overflowWrap: "break-word",
  },
  desc: {
    fontSize: "20px",
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
  card: {
    padding: "10px",
    display: "flex",
  },
});

export default function UserRow(props) {
  const { object, clickEvent } = props;
  const classes = useStyle();

  let img_url = `${process.env.PUBLIC_URL}/favicon.ico`;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  return (
    <>
      {object ? (
        <Box className={classes.cardBox}>
          <Card className={classes.cardBox} elevation={0}>
            <CardActionArea
              className={classes.innerbox}
              onClick={clickEvent && clickEvent(object)}
            >
              <Box disableGutters className={classes.card}>
                <CardMedia
                  component="img"
                  sx={{ width: "64px" }}
                  image={img_url}
                  alt={object.code}
                />
                <Box sx={{ ml: "32px" }}>
                  <Typography variant="h" className={classes.title}>
                    {object.code + (object.nome && `[${object.nome}]`)}
                  </Typography>
                  <Typography variant="body2" className={classes.desc}>
                    <FormattedMessage
                      id={`role-${object.role}`}
                      defaultMessage={object.role}
                    />
                  </Typography>
                </Box>
              </Box>
            </CardActionArea>
          </Card>
        </Box>
      ) : (
        // <div className="row mt-5 align-middle" key={object._id}>
        //   <div
        //     className="col-2 col-md-1"
        //     onClick={clickEvent && clickEvent(object)}
        //   >
        //     <img
        //       alt={object.code}
        //       src={img_url}
        //       className="img-neat"
        //       style={{ width: "100%", height: "70px" }}
        //     />
        //   </div>
        //   <div className="col-10 col-md-11 border rounded">
        //     <div className="row">
        //       <div
        //         className="mt-3 col-4 col-md-2 text-primary"
        //         onClick={clickEvent && clickEvent(object)}
        //       >
        //         {object.code}
        //       </div>
        //       <div className="mt-3 col-4 col-md-2">{object.nome}</div>
        //       <div className="mt-3 col-4 col-md-2">
        //         <FormattedMessage
        //           id={`role-${object.role}`}
        //           defaultMessage={object.role}
        //         />
        //       </div>
        //       <div className="mt-3 col-4 col-md-2">{object.Shop?.code}</div>
        //       <div className="mt-3 col-8 col-md-4">
        //         {object.phone && object.phonePre + " " + object.phone}
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <h3 className="text-danger"> UserRow parameter Error! </h3>
      )}
    </>
  );
}
