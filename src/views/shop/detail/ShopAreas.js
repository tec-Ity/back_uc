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
  console.log(serveCita);
  const dispatch = useDispatch();
  const [serveCitaUpdate, setServeCitasUpdate] = useState(serveCita);
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
          label='City Code'
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
          label='City Name'
          value={serveCitaUpdate?.Cita?.nome || ""}
        />
      </Grid>
      <Grid item xs={4}>
        <CusInput
          disabled={!modifying}
          label='Price Ship'
          value={serveCitaUpdate?.price_ship}
          onChange={(e) => setServeCitasUpdate(1)}
        />
      </Grid>
      <Grid container item xs={3} alignItems='flex-end' justifyContent='center'>
        <CusBtnGroup
          modifying={modifying}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
}

const useStyle = makeStyles({
  addNewBox: {
    width: "100%",
    height: "40px",
    backgroundColor: "#0000004d",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  addNewLabel: {
    display: "flex",
    alignItems: "center",
    color: "#0000004d",
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
  console.log(selected);

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
        添加新服务城市
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
        {/* <CusSelect
          label='City Code'
          handleSelect={(e, val) => {
            setSelectedId(val?.id);
          }}
          value={
            selectedId && {
              label: Citas.find((cita) => cita._id === selectedId)?.code,
              id: selectedId,
            }
          }
          options={Citas.map((cita) => ({ label: cita.code, id: cita._id }))}
        /> */}
        <CusSelectSearch
          api='/Citas'
          label='City Code'
          flagSlice={citaFlag}
          placeholder='输入城市代码'
          extraValueType='nome'
          defaultSel={selected?.code || ""}
          handleSelect={(val) => val && setSelected(val)}
        />
      </Grid>
      <Grid item xs={2}>
        {/* <CusSelect
          label='City Name'
          handleSelect={(e, val) => {
            setSelectedId(val?.id);
          }}
          value={
            selectedId && {
              label: Citas.find((cita) => cita._id === selectedId)?.nome,
              id: selectedId,
            }
          }
          options={Citas.map((cita) => ({ label: cita.nome, id: cita._id }))}
        /> */}
        <CusSelectSearch
          api='/Citas'
          label='City Name'
          flagSlice={citaFlag}
          optionLabelType='nome'
          extraValueType='code'
          placeholder='输入城市名称'
          defaultSel={selected?.nome || ""}
          handleSelect={(val) => val && setSelected(val)}
        />
      </Grid>
      <Grid item xs={4}>
        <CusInput
          label='Price Ship'
          value={priceShip}
          placeholder='输入运费'
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
