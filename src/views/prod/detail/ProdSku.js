import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Switch,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CusSelectList from "../../../components/basic/CusSelectList";
import CusInput from "../../../components/basic/CusInput";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  postObject,
  putObject,
  deleteObject,
} from "../../../features/objectsSlice";
import { useHistory } from "react-router";
import { getRolePath } from "../../../js/conf/confUser";

// const useStyle = makeStyles({
//   root: {},
// });
export default function ProdSku({ Skus, Attrs }) {
  //   const [showAddNew, setShowAddNew] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleChangeExpand = (skuId) => (e, isExpanded) => {
    setExpanded(isExpanded ? skuId : false);
  };
  return (
    <Container>
      <h3>商品SKU</h3>
      <button onClick={() => setExpanded("new")}>添加商品SKU</button>
      {expanded === "new" && (
        <SkuRow
          isNew
          handleChangeExpand={handleChangeExpand}
          expanded={expanded}
          attrs={Attrs}
        />
      )}
      {Skus?.map((sku, index) => (
        <SkuRow
          key={index}
          sku={sku}
          index={index}
          expanded={expanded}
          attrs={Attrs}
          handleChangeExpand={handleChangeExpand}
        />
      ))}
    </Container>
  );
}

const rolePath = getRolePath();

const SkuRow = ({
  sku,
  index,
  attrs,
  expanded,
  handleChangeExpand,
  isNew = false,
}) => {
  const isDefault = index === 0;
  const flagSlice = "prodSku";
  const hist = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.objects.status);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [modifying, setModifying] = useState(isNew);
  const [skuUpdate, setSkuUpdate] = useState({
    allow_backorder: sku?.allow_backorder || false,
    is_controlStock: sku?.is_controlStock || false,
    limit_quantity: sku?.limit_quantity || 0,
    price_regular: sku?.price_regular || 0,
    price_sale: sku?.price_sale || 0,
    quantity: sku?.quantity || 0,
    quantity_alert: sku?.quantity_alert || 0,
    purchase_note: sku?.purchase_note || "",
  });
  const [attrsUpdate, setAttrsUpdate] = useState([]);

  const reloadAfterModified = React.useCallback(() => {
    hist.push(`/${rolePath}/reload`);
  }, [hist]);

  useEffect(() => {
    justSubmitted === true && status === "succeed" && reloadAfterModified();
  }, [justSubmitted, reloadAfterModified, status]);

  const initAttrs = React.useCallback(() => {
    const attrsTemp = [];
    for (let i = 0; i < sku?.attrs?.length; i++) {
      const sAttr = sku?.attrs[i];
      attrsTemp.push({ nome: sAttr.nome, option: sAttr.option });
    }
    setAttrsUpdate(attrsTemp);

    setSkuUpdate({
      allow_backorder: sku?.allow_backorder || false,
      is_controlStock: sku?.is_controlStock || false,
      limit_quantity: sku?.limit_quantity || 0,
      price_regular: sku?.price_regular || 0,
      price_sale: sku?.price_sale || 0,
      quantity: sku?.quantity || 0,
      quantity_alert: sku?.quantity_alert || 0,
      purchase_note: sku?.purchase_note || "",
    });
  }, [sku]);

  //init attrsUpdate to sku's attrs
  useEffect(() => {
    if (isNew === false) {
      initAttrs();
    }
  }, [initAttrs, isNew]);
  //btn group functions
  const handleSubmit = (e) => {
    e.stopPropagation();
    const obj = {};
    obj.Prod = attrs[0].Prod;
    obj.attrs = attrsUpdate;
    obj.price_regular = parseFloat(skuUpdate.price_regular);
    obj.price_sale = parseFloat(skuUpdate.price_sale);
    obj.limit_quantity = parseInt(skuUpdate.limit_quantity);
    obj.purchase_note = skuUpdate.purchase_note;
    obj.is_controlStock = Boolean(skuUpdate.is_controlStock);
    obj.allow_backorder = Boolean(skuUpdate.allow_backorder);
    obj.quantity_alert = parseInt(skuUpdate.quantity_alert);
    obj.quantity = parseInt(skuUpdate.quantity);
    obj.is_usable = Boolean(skuUpdate.is_usable);
    if (isNew === true) {
      dispatch(postObject({ flagSlice, api: "/Sku", data: { general: obj } }));
    } else if (isNew === false) {
      dispatch(
        putObject({
          flagSlice,
          api: `/Sku/${sku?._id}`,
          data: { general: obj },
        })
      );
    }
    setJustSubmitted(true);
  };
  const handleEdit = (e) => {
    // e.stopPropagation();
    setModifying(true);
  };
  const handleCancel = (e) => {
    setModifying(false);
    initAttrs();
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteObject({ flagSlice, api: `/Sku/${sku?._id}` }));
    setJustSubmitted(true);
  };

  //autoComplete select
  const handleSelectAttr = (nome) => (val) => {
    if (val) {
      const attrsTemp = [...attrsUpdate];
      let i = 0;
      for (; i < attrsTemp.length; i++) {
        const tAttr = attrsTemp[i];
        if (tAttr.nome === nome) {
          attrsTemp[i].option = val.label;
          break;
        }
      }
      if (i === attrsTemp.length) {
        attrsTemp.push({ nome, option: val.label });
      }
      setAttrsUpdate(attrsTemp);
    }
  };
  //sku form modified
  const handleSkuUpdate = (type) => (e) => {
    if (type && e) {
      const value =
        type === "allow_backorder" || type === "is_controlStock"
          ? e.target.checked
          : e.target.value;
      setSkuUpdate((prev) => ({ ...prev, [type]: value }));
    }
  };
  return (
    <Accordion
      key={sku?._id}
      expanded={isNew === true ? true : expanded === sku?._id}
      onChange={handleChangeExpand(isNew === true ? "new" : sku?._id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={sku?._id}
        id={sku?._id}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}>
          <div>
            <span style={{ marginRight: "30px" }}>
              {isNew === true
                ? "新增商品属性"
                : isDefault
                ? "默认SKU"
                : "SKU" + (index + 1)}
            </span>
            <span>
              {isNew === false &&
                index !== 0 &&
                (sku?.attrs?.map((attr) => (
                  <Fragment key={attr.name}>
                    {attr.nome + ":" + attr.option} /{" "}
                  </Fragment>
                )) ||
                  "暂无属性")}
            </span>
          </div>
          <CusBtnGroup
            modifying={modifying || isNew}
            handleSubmit={handleSubmit}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
          />
        </div>
      </AccordionSummary>
      {/* hr */}
      <Container>
        <div
          style={{
            width: "100%",
            height: "1px",
            margin: "0 0 20px 0",
            padding: "0 16px",
            backgroundColor: "#0000004d",
          }}></div>
      </Container>
      <AccordionDetails>
        <Container>
          <Grid container>
            {/* 商品属性 尽在非默认sku显示 */}
            {!isDefault && (
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <h4>商品属性</h4>
                </Grid>

                {attrs?.map((attr) => {
                  let value = "";
                  if (attrsUpdate?.length > 0) {
                    value =
                      attrsUpdate.find((sAttr) => sAttr.nome === attr.nome)
                        ?.option || "";
                  }
                  return (
                    <React.Fragment key={attr?.nome}>
                      <Grid item xs={2} key={attr.nome}>
                        <CusSelectList
                          disabled={!modifying && !isNew}
                          label={attr.nome}
                          options={attr.options?.map((op) => ({
                            label: op,
                            id: op,
                          }))}
                          handleSelect={handleSelectAttr(attr.nome)}
                          value={value}
                          placeholder='请选择属性'
                        />
                      </Grid>
                      <Grid item xs={1} />
                    </React.Fragment>
                  );
                })}
              </Grid>
            )}
            {/* 购买设置 */}
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <h4>购买设置</h4>
              </Grid>
              <Grid item xs={2}>
                <CusInput
                  disabled={!modifying && !isNew}
                  label='商品标价'
                  value={skuUpdate.price_regular}
                  handleChange={handleSkuUpdate("price_regular")}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                <CusInput
                  disabled={!modifying && !isNew}
                  label='商品卖价'
                  value={skuUpdate.price_sale}
                  handleChange={handleSkuUpdate("price_sale")}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                <CusInput
                  disabled={!modifying && !isNew}
                  label='限购数量'
                  value={skuUpdate.limit_quantity}
                  handleChange={handleSkuUpdate("limit_quantity")}
                />
              </Grid>
              <Grid item xs={12}>
                <CusInput
                  disabled={!modifying && !isNew}
                  label='采购通知'
                  value={skuUpdate.purchase_note}
                  handleChange={handleSkuUpdate("purchase_note")}
                />
              </Grid>
            </Grid>
            {/* 库存设置 */}
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <h4>库存设置</h4>
              </Grid>
              <Grid item xs={2}>
                <CusInput
                  disabled={!modifying && !isNew}
                  label='库存数量'
                  value={skuUpdate.quantity}
                  handleChange={handleSkuUpdate("quantity")}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                <CusInput
                  disabled={!modifying && !isNew}
                  label='库存警戒值'
                  value={skuUpdate.quantity_alert}
                  handleChange={handleSkuUpdate("quantity_alert")}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid container item xs={2} alignItems='center'>
                库存管理
                <Switch
                  checked={skuUpdate.is_controlStock}
                  size='small'
                  color='default'
                  style={{ color: "#000" }}
                  disabled={!modifying && !isNew}
                  onChange={handleSkuUpdate("is_controlStock")}
                />
              </Grid>
              <Grid container item xs={2} alignItems='center'>
                缺货下单
                <Switch
                  checked={skuUpdate.allow_backorder}
                  size='small'
                  color='default'
                  style={{ color: "#000" }}
                  disabled={!modifying && !isNew}
                  onChange={handleSkuUpdate("allow_backorder")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
};
