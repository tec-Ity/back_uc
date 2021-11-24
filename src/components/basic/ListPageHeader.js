import React from "react";
import {
  Breadcrumbs,
  Grid,
  // Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import SearchInput from "../universal/query/SearchInput";
import { ReactComponent as AddIcon } from "../icon/addIconWhite.svg";
import { getRolePath } from "../../js/conf/confUser";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
// import { setPrevView } from "../../features/objectsSlice";

const useStyle = makeStyles({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    // height: "100px",
  },
  searchSection: {
    display: "flex",
  },
  addButton: {
    height: "40px",
    width: "74px",
    marginLeft: "30px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5px",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#000000cc",
    },
  },
  AddIconStyle: {
    height: "12px",
    width: "12px",
  },
  linkStyle: {
    color: "#1d1d38",
    textDecoration: "none",
    "&visited": {
      color: "#1d1d38",
    },
    "&:hover": {
      color: "#1d1d38",
      textDecoration: "underline",
    },
  },
});
export default function ListPageHeader({
  showAddNew,
  showAddIcon = true,
  showSearch = true,
  flagSlice,
  addLabel,
  links,
  api,
}) {
  const rolePath = getRolePath();
  const classes = useStyle();
  const prevView = useSelector((state) => state.objects.prevView);
  //   const dispatch = useDispatch();
  //   console.log(prevView);
  return (
    <Grid container className={classes.headerContainer}>
      <Grid item xs={12} sm={3}>
        <Breadcrumbs className={classes.bread}>
          <Link className={classes.linkStyle} to={`/${rolePath}/home`}>
            <FormattedMessage id='homepage' />
          </Link>
          {links?.map((link, index) =>
            index === links.length - 1 ? (
              <Typography key={index} color='text.primary'>
                <FormattedMessage id={`navLabel-${link.label}`} />
              </Typography>
            ) : (
              <Link
                key={index}
                to={
                  "/" +
                  rolePath +
                  (link.prevView === true
                    ? link.to + `?view=${prevView}`
                    : link.to)
                }
                className={classes.linkStyle}>
                <FormattedMessage id={`navLabel-${link.label}`} />
              </Link>
            )
          )}
        </Breadcrumbs>
      </Grid>
      <Grid container item xs={12} sm={9} className={classes.searchSection} justifyContent='flex-end'>
        {showSearch === true && <SearchInput flagSlice={flagSlice} api={api} />}
        {showAddIcon === true && addLabel && (
          <div onClick={showAddNew} className={classes.addButton}>
            <AddIcon className={classes.AddIconStyle} />
            <FormattedMessage id={`navLabelAdd-${addLabel}`}/>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
