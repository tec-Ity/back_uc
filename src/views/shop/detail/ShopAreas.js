import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  putObject,
  // deleteObject,
} from "../../../features/objectsSlice";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import CusInput from "../../../components/basic/CusInput";
// import SearchInput from "../../../components/universal/query/SearchInput";
import CusSelectSearch from "../../../components/basic/CusSelectSearch";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import { getRolePath } from "../../../js/conf/confUser";
import { FormattedMessage } from "react-intl";
export default function ShopAreas(props) {
  const { Shop, flagSlice, api } = props;
  const [ServeCitasUpdate, setServeCitasUpdate] = useState([]);
  useEffect(() => {
    setServeCitasUpdate(Shop.serve_Citas);
  }, [Shop.serve_Citas]);
  //   const cita_flagSlice = "citas";
  //   const Citas = useSelector(selectObjects(cita_flagSlice));
  //   const [searchValue, setSearchValue] = useState("");
  //   console.log(Citas);
  return (
    <div>
      <ServeCitaNew shopId={Shop._id} api={api} />
      {ServeCitasUpdate?.map((serveCita) => (
        <ServeCitaRow
          key={serveCita._id}
          flagSlice={flagSlice}
          api={api}
          serveCita={serveCita}
          //   search={(val) => {
          //     setSearchValue(val);
          //   }}
        />
      ))}
      {/* hidden input */}
      {/* <SearchInput
        farSearch={searchValue}
        flagSlice={cita_flagSlice}
        api={"/Citas"}
        hidden
      /> */}
    </div>
  );
}

function ServeCitaRow({ flagSlice, serveCita = {}, search, api }) {
  //   console.log(serveCita);
  const dispatch = useDispatch();
  console.log(serveCita);
  const [serveCitaUpdate, setServeCitasUpdate] = useState({
    ...serveCita,
    price_ship: String(serveCita.price_ship?.toFixed(2)).replace(".", ""),
  });
  // console.log(serveCitaUpdate);
  const [modifying, setModifying] = useState(false);
  useEffect(() => {
    setServeCitasUpdate(serveCita);
  }, [serveCita]);

  const handleEdit = () => {
    setModifying(true);
  };
  const handleCancel = () => {
    setModifying(false);
  };
  const handleSubmit = () => {
    console.log(serveCitaUpdate);
    dispatch(
      putObject({
        flagSlice,
        api,
        data: {
          serveCitaPut: {
            _id: serveCita?._id,
            price_ship: serveCitaUpdate?.price_ship,
          },
        },
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      putObject({
        flagSlice,
        api,
        data: { serveCitaDelete: { Cita: serveCita?.Cita?._id } },
      })
    );
  };
  return (
    <Grid
      container
      justifyContent='space-between'
      style={{ marginTop: "10px" }}>
      <Grid item xs={2}>
        <CusInput
          disabled
          label={<FormattedMessage id='inputLabel-code' />}
          value={serveCitaUpdate?.Cita?.code || ""}
          onChange={(e) => {
            // setServeCitasUpdate(prev=>({...prev, Cita:{...Cita,}}));
            search(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <CusInput
          disabled
          label={<FormattedMessage id='inputLabel-name' />}
          value={serveCitaUpdate?.Cita?.nome || ""}
        />
      </Grid>
      <Grid item xs={4}>
        <CusInput
          disabled={!modifying}
          label={<FormattedMessage id='inputLabel-priceShip' />}
          value={serveCitaUpdate?.price_ship}
          handleChange={(e) =>
            setServeCitasUpdate((prev) => ({
              ...prev,
              price_ship: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid container item xs={3} alignItems='flex-end' justifyContent='center'>
        <CusBtnGroup
          modifying={modifying}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
}

const useStyle = makeStyles({
  addNewBox: {
    width: "100%",
    height: "40px",
    backgroundColor: "#000000",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#000000cc",
    },
  },
  addNewLabel: {
    display: "flex",
    alignItems: "center",
    color: "#000000",
    fontWeight: "700",
  },
});

const citaFlag = "Citas";

function ServeCitaNew(props) {
  const { flagSlice, api } = props;
  const status = useSelector((state) => state.objects.status);
  const dispatch = useDispatch();
  const classes = useStyle();
  const hist = useHistory();
  const [showAdd, setShowAdd] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [priceShip, setPriceShip] = useState("");
  //   console.log(selected);

  useEffect(() => {
    if (justSubmitted === true && status === "succeed") {
      const rolePath = getRolePath();
      hist.push(`/${rolePath}/reload`);
    }
  }, [hist, justSubmitted, status]);
  const handleSubmit = () => {
    if (selected && priceShip) {
      dispatch(
        putObject({
          flagSlice,
          api,
          data: {
            serveCitaPost: { Cita: selected?.id, price_ship: priceShip },
          },
        })
      );
      setJustSubmitted(true);
    }
  };
  const handleCancel = () => {
    setShowAdd(false);
    setSelected(null);
    setPriceShip("");
  };
  const handleDelete = () => {
    setShowAdd(false);
    setSelected(null);
    setPriceShip("");
  };
  return showAdd === false ? (
    <Grid
      container
      justifyContent='space-between'
      style={{ marginTop: "10px" }}>
      <Grid item xs={2}>
        <div className={classes.addNewBox} onClick={() => setShowAdd(true)}>
          +
        </div>
      </Grid>
      <Grid item xs={2} className={classes.addNewLabel}>
        <FormattedMessage id='btnLabel-newServCita' />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  ) : (
    <Grid
      container
      justifyContent='space-between'
      style={{ marginTop: "10px" }}>
      <Grid item xs={2}>
        <CusSelectSearch
          api='/Citas'
          label={<FormattedMessage id='inputLabel-code' />}
          flagSlice={citaFlag}
          extraValueType='nome'
          defaultSel={selected?.code || ""}
          handleSelect={(val) => val && setSelected(val)}
        />
      </Grid>
      <Grid item xs={2}>
        <CusSelectSearch
          api='/Citas'
          label={<FormattedMessage id='inputLabel-name' />}
          flagSlice={citaFlag}
          optionLabelType='nome'
          extraValueType='code'
          defaultSel={selected?.nome || ""}
          handleSelect={(val) => val && setSelected(val)}
        />
      </Grid>
      <Grid item xs={4}>
        <CusInput
          label={<FormattedMessage id='inputLabel-priceShip' />}
          value={priceShip}
          handleChange={(e) => {
            !isNaN(e.target.value) && setPriceShip(e.target.value);
          }}
        />
      </Grid>
      <Grid container item xs={3} alignItems='flex-end' justifyContent='center'>
        <CusBtnGroup
          modifying
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
}
