import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CusSelectList from "../../../components/basic/CusSelectList";
import CusInput from "../../../components/basic/CusInput";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import { useDispatch } from "react-redux";
import { postObject, putObject } from "../../../features/objectsSlice";

const useStyle = makeStyles({
  root: {},
});
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
          sku={sku}
          index={index}
          key={index}
          expanded={expanded}
          attrs={Attrs}
          handleChangeExpand={handleChangeExpand}
        />
      ))}
    </Container>
  );
}

const SkuRow = ({
  sku,
  index,
  attrs,
  expanded,
  handleChangeExpand,
  isNew = false,
}) => {
  const flagSlice = "prodSku";

  const dispatch = useDispatch();
  const [modifying, setModifying] = useState(false);
  const [skuUpdate, setSkuUpdate] = useState({});
  const [attrsUpdate, setAttrsUpdate] = useState([]);
  console.log(attrsUpdate);
  console.log(sku);
  console.log(attrs);
  const handleSubmit = () => {
    const obj = {};
    obj.Prod = attrs[0].Prod;
    obj.attrs = attrsUpdate;

    if (isNew === true) {
      dispatch(postObject({ flagSlice, api: "/Sku", data: { obj } }));
    }

    // dispatch(putObject({flagSlice:'prodSku',api:`/Sku/${}`}))
  };

  //init attrsUpdate to sku's attrs
  useEffect(() => {
    if (isNew === false) {
      const attrsTemp = [];
      for (let i = 0; i < sku?.attrs?.length; i++) {
        const sAttr = sku?.attrs[i];
        attrsTemp.push({ nome: sAttr.nome, option: sAttr.option });
      }
      setAttrsUpdate(attrsTemp);
    }
  }, [isNew, sku?.attrs]);

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

  return (
    <Accordion
      expanded={isNew === true ? true : expanded === sku?._id}
      onChange={handleChangeExpand(isNew === true ? "new" : sku?._id)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={sku?._id}
        id={sku?._id}>
        <span>{isNew === true ? "新增商品属性" : "SKU" + (index + 1)}</span>
        <span>{isNew === false && "nome:option"}</span>
        <CusBtnGroup
          modifying={modifying || isNew}
          handleSubmit={handleSubmit}
        />
      </AccordionSummary>
      <hr style={{ width: "90%", margin: "auto", backgroundColor: "#000" }} />
      <AccordionDetails>
        <Grid container>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <h4>商品属性</h4>
            </Grid>
            {attrs?.map((attr) => {
              if (
                //
                sku?.attrs?.length > 0 &&
                sku.attrs.find((sAttr) => sAttr.nome === attr.nome)
              ) {
                //
              }
              return (
                <Grid item xs={2} key={attr.nome}>
                  <CusSelectList
                    label={attr.nome}
                    options={attr.options?.map((op) => ({
                      label: op,
                      id: op,
                    }))}
                    handleSelect={handleSelectAttr(attr.nome)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
