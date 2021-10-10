import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectObjects } from "../../../features/objectsSlice";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import CusInput from "../../../components/basic/CusInput";
import SearchInput from "../../../components/universal/query/SearchInput";

export default function ShopAreas(props) {
  const { Shop, flagSlice, api } = props;
  const [ServeCitasUpdate, setServeCitasUpdate] = useState([]);
  useEffect(() => {
    setServeCitasUpdate(Shop.serve_Citas);
  }, [Shop.serve_Citas]);
  const cita_flagSlice = "citas";
  const Citas = useSelector(selectObjects(cita_flagSlice));
  const [searchValue, setSearchValue] = useState("");
  console.log(Citas);
  return (
    <div>
      {ServeCitasUpdate?.map((serveCita) => (
        <ServeCitaRow
          serveCita={serveCita}
          search={(val) => setSearchValue(val)}
        />
      ))}
      <SearchInput
        farSearch={{ key: "", value: searchValue }}
        flagSlice={cita_flagSlice}
        api={"/Citas"}
        hidden
      />
    </div>
  );
}

function ServeCitaRow({ serveCita }) {
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

  return (
    <Grid
      container
      justifyContent='space-between'
      style={{ marginTop: "10px" }}>
      <Grid item xs={4}>
        <CusInput
          disabled={!modifying}
          label='City'
          value={
            serveCitaUpdate.Cita.code + "(" + serveCitaUpdate.Cita.nome + ")"
          }
          onChange={(e) => {
            // setServeCitasUpdate(prev=>({...prev, Cita:{...Cita,}}));
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <CusInput
          disabled={!modifying}
          label='Price Ship'
          value={serveCitaUpdate.price_ship}
          onChange={(e) => setServeCitasUpdate(1)}
        />
      </Grid>
      <Grid container item xs={3} alignItems='flex-end' justifyContent='center'>
        <CusBtnGroup
          modifying={modifying}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
        />
      </Grid>
    </Grid>
  );
}
