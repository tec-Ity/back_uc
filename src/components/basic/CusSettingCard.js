import React from "react";
import { Grid } from "@mui/material";

export default function CusSettingCart(props) {
  const { handleClick, img, title } = props;
  return (
    <div
      style={{
        width: "180px",
        height: "220px",
        cursor: "pointer",
        boxShadow: " 0px 0px 20px rgba(0, 0, 0, 0.1)",
      }}
      onClick={handleClick}>
      <Grid container sx={{ height: "100%" }} alignContent='space-evenly'>
        <Grid container item xs={12} justifyContent='center'>
          <img
            src={img}
            alt='country'
            style={{ display: "block", width: "110px", height: "130px" }}
          />
        </Grid>
        <Grid container item xs={12} justifyContent='center'>
          <div
            style={{
              height: "1px",
              width: "80%",
              backgroundColor: "#000",
            }}></div>
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent='center'
          sx={{ fontWeight: "bold", padding: "0 20px" }}>
          {title}
        </Grid>
      </Grid>
    </div>
  );
}
