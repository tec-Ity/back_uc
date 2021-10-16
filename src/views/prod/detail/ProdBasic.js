import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CusInput from "../../../components/basic/CusInput";
// import CusSelect from "../../../components/basic/CusSelect";
import api_DNS from "../../../js/_dns";
const useStyle = makeStyles({
  root: {
    "& > div": { padding: "10px 5px" },
  },
});
export default function ProdBasic({ Prod }) {
  const classes = useStyle();
  //   const initProdInfo = Prod
  //     ? {
  //         code: Prod.code || "",
  //         name: Prod.nome || "",
  //         brand: Prod.brand || {}, //code id
  //         nation: Prod.Nation || {}, //code nome
  //         categ2: Prod.Categ || {}, //code nome
  //         categ1: Prod.Categ?.Categ_far || {}, //code nome
  //         sort: Prod.sort || 0,
  //         price_regular: Prod.price_regular || "",
  //         unit: Prod.unit || "",
  //         desp: Prod.desp || "",
  //       }
  //     : null;
  const [pdInfo, setProdInfo] = useState({});
  useEffect(() => {
    setProdInfo({
      code: Prod.code || "",
      name: Prod.nome || "",
      brand: Prod.brand || {}, //code id
      nation: Prod.Nation || {}, //code nome
      categ2: Prod.Categ || {}, //code nome
      categ1: Prod.Categ?.Categ_far || {}, //code nome
      sort: Prod.sort || 0,
      price_regular: Prod.price_regular || "",
      unit: Prod.unit || "",
      desp: Prod.desp || "",
    });
  }, [Prod]);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {Prod.img_urls?.map((img) => (
          <img
            src={api_DNS + img}
            alt={Prod?.nome}
            style={{
              height: "100px",
              width: "100px",
              objectFit: "scale-down",
              marginRight: "20px",
            }}
          />
        ))}
      </Grid>
      {/* <Grid item xs={6}></Grid> */}
      {/* code */}
      <Grid item xs={6}>
        <CusInput label='Code' disabled value={pdInfo.code} />
      </Grid>
      {/* name */}
      <Grid item xs={6}>
        <CusInput label='Name' value={pdInfo.name} />
      </Grid>
      {/* brand */}
      <Grid item xs={6}>
        {/* <CusSelect
          label='Brand'
          value={{ id: pdInfo.brand?._id, label: pdInfo.brand?.code }}
        /> */}
        <CusInput label='Brand' value={pdInfo.brand?.code} />
      </Grid>
      {/* country */}
      <Grid item xs={6}>
        {/* <CusSelect
          label='Nation'
          value={{ id: pdInfo.nation?._id, label: pdInfo.nation?.code }}
        /> */}
        <CusInput label='Nation' value={pdInfo.nation?.code} />
      </Grid>
      {/* categ 1 */}
      <Grid item xs={6}>
        {/* <CusSelect label='Categ First' value={pdInfo.categ1?.code} /> */}
        <CusInput label='Categ First' value={pdInfo.categ1?.code} />
      </Grid>
      {/* categ 2 */}
      <Grid item xs={6}>
        {/* <CusSelect label='Categ Second' value={pdInfo.categ2?.code} /> */}
        <CusInput label='Categ Second' value={pdInfo.categ2?.code} />
      </Grid>
      {/* sort */}
      <Grid item xs={6}>
        <CusInput label='Sort' value={pdInfo.sort} />
      </Grid>
      {/* offSet */}
      <Grid item xs={6}></Grid>
      {/* price regular */}
      <Grid item xs={6}>
        <CusInput label='Price' value={pdInfo.price_regular} />
      </Grid>
      {/* unit */}
      <Grid item xs={6}>
        <CusInput label='Unit' value={pdInfo.unit} />
      </Grid>
      {/* desp */}
      <Grid item xs={12}>
        <CusInput label='Description' value={pdInfo.desp} />
      </Grid>
    </Grid>
  );
}
