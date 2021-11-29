import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CusInput from "../../../components/basic/CusInput";
import {
  // useSelector,
  useDispatch,
  useSelector,
} from "react-redux";
import { deleteObject, putObject } from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
import { getRolePath } from "../../../js/conf/confUser";
// import CusTextArea from "../../../components/basic/CusTextArea";
import { ReactComponent as Delete } from "../../../components/icon/delete.svg";
import CusSwitch from "../../../components/basic/CusSwitch";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";

const useStyle = makeStyles({
  root: {
    "& > div": { padding: "10px 5px" },
  },
  delBtn: {
    height: "30px",
    paddingRight: "5px",
    display: "flex",
    fontSize: "16px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    backgroundColor: "#d83535",
    cursor: "pointer",
    color: "#fff",
    "& rect": { fill: "#d83535" },
  },
});

export default function ProdBasic({ Prod, flagSlice, api }) {
  const classes = useStyle();
  const rolePath = getRolePath();
  const dispatch = useDispatch();
  const [justSubmitted, setjustSubmitted] = useState(false);
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(false);


  const initProd = {
    isUsable: Prod.is_usable || false,
    desp: Prod.desp || "",
  };

  const [prodUpdate, setProdUpdate] = useState(initProd);

  useEffect(() => {
    setProdUpdate(initProd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Prod]);

  const handleDelete = () => {
    dispatch(deleteObject({ flagSlice, api, id: Prod._id }));
    setjustSubmitted(true);
  };

  const handleSubmit = () => {
    dispatch(
      putObject({
        flagSlice,
        api,
        data: {
          general: {
            is_usable: prodUpdate.isUsable,
            desp: prodUpdate.desp,
          },
        },
      })
    );
  };

  useEffect(() => {
    justSubmitted === true &&
      status === "succeed" &&
      window.location.replace(`/${rolePath}/prods`);
  });

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        xs={12}
        justifyContent='flex-end'
        alignItems='center'>
        {modifying && (
          <div className={classes.delBtn} onClick={handleDelete}>
            <Delete />
            取消同步此产品
          </div>
        )}
        <CusBtnGroup
          modifying={modifying}
          handleEdit={() => setModifying(true)}
          handleSubmit={handleSubmit}
          disableDelete
        />
      </Grid>

      {/* imgs */}
      <Grid item container xs={12}>
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
        <CusInput disabled label='Code' value={Prod.code || " "} />
      </Grid>
      {/* name */}
      <Grid item xs={6}>
        <CusInput disabled label='Name' value={Prod.nome} />
      </Grid>
      {/* brand */}
      <Grid item xs={6}>
        <CusInput disabled label='Brand' value={Prod.Brand?.code} />
      </Grid>
      {/* country */}
      <Grid item xs={6}>
        <CusInput disabled label='Nation' value={Prod.Nation?.code} />
      </Grid>
      {/* categ 1 */}
      <Grid item xs={6}>
        <CusInput
          disabled
          label='First Categ'
          value={Prod.Categ?.Categ_far?.code}
        />
      </Grid>
      {/* categ 2 */}
      <Grid item xs={6}>
        <CusInput disabled label='First Categ' value={Prod.Categ?.code} />
      </Grid>
      {/* sort */}
      <Grid item xs={6}>
        <CusInput disabled label='Sort' value={Prod.sort} />
      </Grid>
      {/* offSet */}
      <Grid item xs={6}>
        <div style={{ fontSize: "14px", color: "#1d1d384d", fontWeight: 700 }}>
          Usable
        </div>
        <CusSwitch
          disabled={!modifying}
          handleSwitch={(val) =>
            setProdUpdate((prev) => ({ ...prev, isUsable: val }))
          }
        />
      </Grid>
      {/* price regular */}
      <Grid item xs={6}>
        <CusInput
          disabled
          label='Price'
          value={
            Prod?.price_max === Prod?.price_min
              ? String(Prod?.price_unit?.toFixed(2))?.replace(".", ",")
              : String(Prod?.price_min?.toFixed(2))?.replace(".", ",") +
                "~" +
                String(Prod?.price_max?.toFixed(2))?.replace(".", ",")
          }
        />
      </Grid>
      {/* unit */}
      <Grid item xs={6}>
        <CusInput disabled label='Unit' value={prodUpdate.unit} />
      </Grid>
      {/* desp */}
      <Grid item xs={12}>
        <CusInput
          disabled={!modifying}
          label='Description'
          value={prodUpdate.desp}
          handleChange={(e) =>
            setProdUpdate((prev) => ({ ...prev, desp: e.target.value }))
          }
        />
      </Grid>
    </Grid>
  );
}
