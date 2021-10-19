import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CusInput from "../../../components/basic/CusInput";
import {
  // useSelector,
  useDispatch,
} from "react-redux";
import {  putObject } from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
// import CusTextArea from "../../../components/basic/CusTextArea";

const useStyle = makeStyles({
  root: {
    "& > div": { padding: "10px 5px" },
  },
});

export default function ProdBasic({ Prod, flagSlice, api }) {
  console.log(Prod);
  const classes = useStyle();
  const dispatch = useDispatch();
  const [prodInfo, setProdInfo] = useState({
    code: Prod.code || "",
    name: Prod.nome || "",
    brand: Prod.Brand || { code: "", _id: "" }, //code id
    nation: Prod.Nation || { code: "", _id: "" }, //code nome
    categ2: Prod.Categ || { code: "", _id: "" }, //code nome
    categ1: Prod.Categ?.Categ_far || { code: "", _id: "" }, //code nome
    sort: Prod.sort || 0,
    price: Prod.price || 0,
    unit: Prod.unit || "",
    desp: Prod.desp || "",
  });
  useEffect(() => {
    setProdInfo({
      code: Prod.code || "",
      name: Prod.nome || "",
      brand: Prod.Brand || { code: "", _id: "" }, //code id
      nation: Prod.Nation || { code: "", _id: "" }, //code nome
      categ2: Prod.Categ || { code: "", _id: "" }, //code nome
      categ1: Prod.Categ?.Categ_far || { code: "", _id: "" }, //code nome
      sort: Prod.sort || 0,
      price: Prod.price || 0,
      unit: Prod.unit || "",
      desp: Prod.desp || "",
    });
  }, [Prod]);

  const handleSubmit = () => {
    const general = {
      nome: prodInfo.name,
      Nation: prodInfo.nation._id,
      code: prodInfo.code,
      Brand: prodInfo.brand._id,
      Categ: prodInfo.categ2._id,
      sort: prodInfo.sort,
      unit: prodInfo.unit,
      desp: prodInfo.desp,
    };
    console.log(general);
    dispatch(putObject({ flagSlice, api, data: { general } }));
  };

  return (
    <Grid container className={classes.root}>
      <button className='btn btn-success mx-3' onClick={handleSubmit}>
        修改
      </button>

      {/* imgs */}
      <Grid item container xs={12} style={{ cursor: "pointer" }}>
        {Prod.img_urls?.map((img) => (
          <div
            key={img}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingRight: "20px",
            }}>
            <img
              src={api_DNS + img}
              alt={Prod?.nome}
              style={{
                height: "100px",
                width: "100px",
                objectFit: "scale-down",
              }}
            />
          </div>
        ))}
      </Grid>
      {/* code */}
      <Grid item xs={6}>
        <CusInput label='Code' disabled value={prodInfo.code} />
      </Grid>
      {/* name */}
      <Grid item xs={6}>
        <CusInput label='Name' value={prodInfo.name} disabled />
      </Grid>
      {/* brand */}
      <Grid item xs={6}>
        <CusInput label='Brand' disabled value={prodInfo.brand?.code} />
      </Grid>
      {/* country */}
      <Grid item xs={6}>
        <CusInput label='Code' disabled value={prodInfo.nation?.code} />
      </Grid>
      {/* categ 1 */}
      <Grid item xs={6}>
        <CusInput label='First Categ' disabled value={prodInfo.categ1?.code} />
      </Grid>
      {/* categ 2 */}
      <Grid item xs={6}>
        <CusInput label='First Categ' disabled value={prodInfo.categ2?.code} />
      </Grid>
      {/* sort */}
      <Grid item xs={6}>
        <CusInput
          label='Sort'
          value={prodInfo.sort}
          handleChange={(e) =>
            setProdInfo((prev) => ({ ...prev, sort: e.target.value }))
          }
        />
      </Grid>
      {/* offSet */}
      <Grid item xs={6}></Grid>
      {/* price regular */}
      <Grid item xs={6}>
        <CusInput
          label='Price'
          value={
            Prod?.price_max === Prod?.price_min
              ? prodInfo?.price?.toFixed(2)
              : Prod.price_min?.toFixed(2) + "~" + Prod.price_max?.toFixed(2)
          }
          disabled
        />
      </Grid>
      {/* unit */}
      <Grid item xs={6}>
        <CusInput
          label='Unit'
          value={prodInfo.unit}
          handleChange={(e) =>
            setProdInfo((prev) => ({ ...prev, unit: e.target.value }))
          }
        />
      </Grid>
      {/* desp */}
      <Grid item xs={12}>
        <CusInput
          label='Description'
          value={prodInfo.desp}
          handleChange={(e) =>
            setProdInfo((prev) => ({ ...prev, desp: e.target.value }))
          }
        />
      </Grid>
    </Grid>
  );
}
