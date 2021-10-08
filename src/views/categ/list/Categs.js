import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import SearchInput from "../../../components/universal/query/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { getObjects } from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
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
    // "&::after": {
    //   content: '""',
    //   position: "absolute",
    //   top: 0,
    //   right: 0,
    //   height: "25%",
    //   width: "10%",
    //   backgroundColor: "#fff"
    // },
    // "&:hover": {
    //   boxShadow: "none",
    //   borderLeft: "2px solid #0000004d",
    //   borderBottom: "2px solid #0000004d",
    //   //right comp
    //   "&::before": {
    //     content: '""',
    //     width: "10%",
    //     height: "75%",
    //     position: "absolute",
    //     borderRadius: "0 5px 5px 0 ",
    //     bottom: 0,
    //     right: 0,
    //     borderRight: "2px solid #0000004d",
    //     borderTop: "2px solid #0000004d",
    //   },
    //   //top comp
    //   "&:after": {
    //     content: '""',
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     borderRadius: "5px 5px 0 0 ",
    //     borderTop: "2px solid #0000004d",
    //     borderRight: "2px solid #0000004d",
    //     height: "40px",
    //     width: "90%",
    //   },
    // },
  },
  iconGroup: {
    display: "flex",
    position: "absolute",
    right: "0",
    top: 0,
    "& > div": {
      height: "30px",
      width: "30px",
      // backgroundColor: "#1d1d3840",
      backgroundColor: "#fff",
      margin: "5px",
      border: "2px solid #000",
      borderRadius: "5px",
    },
  },
  childGroup: {
    padding: "0 10%",
  },
  categBg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    zIndex: "-1",
  },
  categCode: {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#fff",
    fontSize: "30px",
    fontWeight: "700",
    borderRadius: "10px",
  },
  categUpload: {
    backgroundColor: "#fff",
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
  const [modifying, setModifying] = useState(false);
  const [showChild, setShowChild] = useState(false);
  const ref = React.useRef();
  return (
    <>
      <Grid
        container
        item
        xs={12}
        className={classes.listGridItem}
        justifyContent='center'
        alignItems='center'
        onClick={() => {
          modifying === true
            ? ref.current.click()
            : showChild === true
            ? setShowChild(false)
            : setShowChild(true);
        }}>
        {modifying === false ? (
          <>
            {/* bg img */}
            <img
              src={api_DNS + categ.img_url}
              alt={categ.code}
              className={classes.categBg}
            />
            {/* gateg code */}
            <div className={classes.categCode}>
              {(index + 1).toFixed(1) + categ.code}
            </div>
          </>
        ) : (
          <div className={classes.categUpload}>
            <div>Upload image{" (16:9)"}</div>
            <input
              ref={ref}
              style={{ display: "none" }}
              type='file'
              onChange={(e) => {
                console.log(e.target.files);
                
              }}
            />
          </div>
        )}
        {/* icon groups */}
        <div className={classes.iconGroup}>
          {modifying === true ? (
            <>
              <div
                onClick={(e) => {
                  setModifying(false);
                  e.stopPropagation();
                }}>
                Done
              </div>
              <div
                onClick={(e) => {
                  setModifying(false);
                  e.stopPropagation();
                }}>
                Cancle
              </div>

              <div>Del</div>
            </>
          ) : (
            <>
              <div
                onClick={(e) => {
                  setModifying(true);
                  setShowChild(false);
                  e.stopPropagation();
                }}>
                edit
              </div>
              <div>del</div>
            </>
          )}
        </div>
      </Grid>
      {showChild === true && (
        <Grid container item xs={12} className={classes.childGroup}>
          {categ?.Categ_sons?.map((son) => (
            <Grid container item xs={12}>
              <Grid item xs={1}>
                up
              </Grid>
              <Grid item xs={2}>
                {son.sort}
              </Grid>
              <Grid item xs={6}>
                {son.code}
              </Grid>
              <Grid item xs={2}>
                useable
              </Grid>
              <Grid item xs={1}>
                del
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      {modifying === true && (
        <Grid container item xs={12}>
          <Grid item xs={2}>
            {index + 1}
          </Grid>
          <Grid item xs={8}>
            {categ.code}
          </Grid>
          <Grid item xs={2}>
            useable
          </Grid>
        </Grid>
      )}
    </>
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
