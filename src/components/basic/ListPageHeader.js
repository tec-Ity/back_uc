import React from "react";
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import SearchInput from "../universal/query/SearchInput";
import { ReactComponent as AddIcon } from "../icon/addIconWhite.svg";

const useStyle = makeStyles({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    height: "100px",
  },
  //   bread: {
  //     fontSize: "20px",
  //   },
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
  const classes = useStyle();
  return (
    <div className={classes.headerContainer}>
      <Breadcrumbs className={classes.bread}>
        {links?.map((link, index) =>
          index === links.length - 1 ? (
            <Typography key={index} color='text.primary'>
              {link.label}
            </Typography>
          ) : (
            <Link to={link.to} className={classes.linkStyle}>
              {link.label}
            </Link>
          )
        )}
      </Breadcrumbs>
      <div className={classes.searchSection}>
        {showSearch === true && <SearchInput flagSlice={flagSlice} api={api} />}
        {showAddIcon === true && addLabel && (
          <div onClick={showAddNew} className={classes.addButton}>
            <AddIcon className={classes.AddIconStyle} />
            {addLabel}
          </div>
        )}
      </div>
    </div>
  );
}
