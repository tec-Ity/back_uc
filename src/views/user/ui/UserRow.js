import { get_DNS } from "../../../js/api";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@mui/styles";
import { default as userProfile } from "../../../components/icon/userProfileLightGrey.svg";

const useStyle = makeStyles({
  cardBox: {
    height: "84px",
    width: "100%",
    margin: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    display: "flex",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
  },
  imgStyle: {
    height: "64px",
    width: "64px",
    margin: "10px",
    objectFit: "scale-down",
  },
  textBox: {
    height: "100%",
    width: "100%",
    display: "inline",
    margin: "10px",
    marginRight: "20px",
  },
  title: {
    float: "left",
    fontSize: "20px",
    fontWeight: "700",
    overflowWrap: "break-word",
  },
  desc: {
    clear: "left",
    fontSize: "20px",
    fontWeight: "400",
    color: "#0000004D",
  },
  code: {
    float: "right",
    fontSize: "20px",
    fontWeight: "400",
    color: "#000000",
  },
});

export default function UserRow(props) {
  const { object, clickEvent } = props;
  const classes = useStyle();

  let img_url = userProfile;
  if (object?.img_url) {
    img_url = get_DNS() + object.img_url;
  } else if (object?.img_urls?.length > 0) {
    img_url = get_DNS() + object.img_urls[0];
  }

  return (
    <>
      {object ? (
        <div
          className={classes.cardBox}
          onClick={clickEvent && clickEvent(object)}
        >
          <img src={img_url} className={classes.imgStyle} alt={object.code} />
          <div className={classes.textBox}>
            <h1 className={classes.title}>{object.code}</h1>
            {object.Shop && (
              <h2 className={classes.code}>{object.Shop?.code}</h2>
            )}
            <h2 className={classes.desc}>{object.nome}</h2>
          </div>
        </div>
      ) : (
        <h3 className="text-danger"> UserRow parameter Error! </h3>
      )}
    </>
  );
}
