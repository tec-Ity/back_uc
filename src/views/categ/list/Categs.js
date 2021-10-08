import React, { useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import SearchInput from "../../../components/universal/query/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { getObjects } from "../../../features/objectsSlice";

const useStyle = makeStyles({
  root: {},
  //header
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  listGridContainer: {
    // border: "1px solid",
  },
  listGridItem: {
    position: "relative",
    // border: "1px solid",
    boxSizing: "border-box",
    height: "160px",
    marginBottom: "20px",
    padding: "2px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "&::before": {
      content: '""',
      width: "110px",
      height: "40px",
      border: "1px solid",
      position: "absolute",
      top: 0,
      right: 0,
    },
    // backgroundColor: "black",
    // clipPath:
    //   "polygon(0% 15%, 0 0, 15% 0%, 85% 0%, 85% 20%, 100% 20%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%)",
  },
  // innerBox: {
  //   boxSizing: "border-box",
  //   height: "100%",
  //   width: "100%",
  //   backgroundColor: "#fff",
  //   clipPath:
  //     "polygon(0% 15%, 0 0, 15% 0%, 85% 0%, 85% 20%, 100% 20%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%)",
  // },
  iconGroup: {
    display: "flex",
    position: "absolute",
    right: "0",
    "& > div": {
      height: "30px",
      width: "30px",
      backgroundColor: "#1d1d3840",
      margin: "5px",
    },
  },
});

const links = [{ label: "主页", to: "/home" }, { label: "分类列表" }];
const flagSlice = "categs";
const api = "/Categs";
export default function Categs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api }));
  }, [dispatch]);

  return (
    <Container>
      <ListPageHeader links={links} flagSlice={flagSlice} />
      <CategList flagSlice={flagSlice} />
    </Container>
  );
}

function CategList({ flagSlice }) {
  const classes = useStyle();
  const categs = useSelector((state) => state.objects[flagSlice]?.objects);
  console.log(categs);
  return (
    <Grid container className={classes.listGridContainer}>
      {categs?.map((categ, index) => (
        <CategListItem
          categ={categ}
          flagSlice={flagSlice}
          index={index}
          key={categ._id}
        />
      ))}
    </Grid>
  );
}

function CategListItem({ flagSlice, categ, index }) {
  const classes = useStyle();
  const [modifying, setModifying] = React.useState(false);
  return (
    <Grid container item xs={12} className={classes.listGridItem}>
      {/* <div className={classes.innerBox}> */}
      {(index + 1).toFixed(1) + categ.code}
      {/* icon groups */}
      <div className={classes.iconGroup}>
        {modifying === true ? (
          <>
            <div onClick={() => setModifying(false)}>Done</div>
            <div onClick={() => setModifying(false)}>Cancle</div>
            <div>Del</div>
          </>
        ) : (
          <>
            <div onClick={() => setModifying(true)}>edit</div>
            <div>del</div>
          </>
        )}
      </div>
      {/* </div> */}
    </Grid>
  );
}

function ListPageHeader({ links, flagSlice }) {
  const classes = useStyle();
  return (
    <div className={classes.headerContainer}>
      <Breadcrumbs>
        {links?.map((link, index) =>
          index === links.length - 1 ? (
            <Typography key={index} color='text.primary'>
              {link.label}
            </Typography>
          ) : (
            <Link
              key={index}
              underline='hover'
              color={"inherit"}
              href={link.to}>
              {link.label}
            </Link>
          )
        )}
      </Breadcrumbs>

      <SearchInput flagSlice={flagSlice} />
    </div>
  );
}
