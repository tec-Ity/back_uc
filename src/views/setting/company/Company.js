import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CusInput from "../../../components/basic/CusInput";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import { useSelector, useDispatch } from "react-redux";
import {
  getObject,
  getObjects,
  putObject,
} from "../../../features/objectsSlice";
import CusSelectSearch from "../../../components/basic/CusSelectSearch";

const flagSlice = "companyInfo";
const shopFlagSlice = "shops";

const api = "/Firm/" + localStorage.getItem("Firm");
const shopsApi = "/shops";
const shopApi = "/shop";
const mainShopQuery = "?is_main=true";

const companyInfoList = [
  { title: "公司编号", field: "code", disabled: true },
  { title: "公司名称", field: "nome" },
  { title: "公司负责人", field: "resp" },
  { title: "公司地址", field: "addr" },
  { title: "公司电话", field: "tel" },
];

export default function Company() {
  const dispatch = useDispatch();
  const [modifying, setModifying] = useState(false);
  const [modifyingMS, setModifyingMS] = useState(false);
  const [ciUpdate, setCiUpdate] = useState({});
  const [msUpdate, setMsUpdate] = useState({});
  const companyInfo = useSelector((state) => state.objects[flagSlice]?.object);
  const mainShopInfo = useSelector(
    (state) => state.objects[shopFlagSlice]?.objects
  );

  useEffect(() => {
    dispatch(getObject({ flagSlice, api }));
    dispatch(
      getObjects({ flagSlice: shopFlagSlice, api: shopsApi + mainShopQuery })
    );
  }, [dispatch]);

  useEffect(() => {
    companyInfo &&
      setCiUpdate(() => {
        const tempInfo = {};
        companyInfoList.forEach(
          (ci) => (tempInfo[ci.field] = companyInfo[ci.field] || "")
        );
        return tempInfo;
      });
  }, [companyInfo]);

  useEffect(() => {
    mainShopInfo &&
      mainShopInfo[0] &&
      setMsUpdate({ id: mainShopInfo[0]._id, code: mainShopInfo[0].code });
  }, [mainShopInfo]);

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <h1>公司信息</h1>
      </Grid>
      <Grid container item xs={12} justifyContent='space-between'>
        <h3>基础信息</h3>
        <CusBtnGroup
          modifying={modifying}
          handleEdit={() => setModifying(true)}
          handleCancel={() => setModifying(false)}
          handleSubmit={() => {
            const general = {};
            companyInfoList.forEach(
              (ci) => !ci.disabled && (general[ci.field] = ciUpdate[ci.field])
            );
            dispatch(putObject({ flagSlice, api, data:  {general} }));
          }}
        />
      </Grid>

      {companyInfoList.map((ci) => (
        <React.Fragment key={ci.title}>
          <Grid item xs={5}>
            <CusInput
              label={ci.title}
              disabled={!modifying || ci.disabled}
              value={ciUpdate[ci.field] || ""}
              handleChange={(e) =>
                !ci.disabled &&
                setCiUpdate((prev) => ({ ...prev, [ci.field]: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={7} />
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <hr />
      </Grid>
      <Grid container item xs={12} justifyContent='space-between'>
        <h3>主店铺信息</h3>
        <CusBtnGroup
          modifying={modifyingMS}
          handleEdit={() => setModifyingMS(true)}
          handleSubmit={() =>
            dispatch(
              putObject({
                flagSlice: shopFlagSlice,
                api: shopApi + "/" + msUpdate?.id,
                data: { general: { is_main: true } },
              })
            )
          }
          handleCancel={() => setModifyingMS(false)}
        />
      </Grid>
      <Grid item xs={5}>
        <CusSelectSearch
          disabled={!modifyingMS}
          label='公司主店铺'
          flagSlice={shopFlagSlice}
          api={shopsApi}
          defaultSel={msUpdate.code}
          handleSelect={(val) => setMsUpdate(val)}
        />
      </Grid>
    </Grid>
  );
}
