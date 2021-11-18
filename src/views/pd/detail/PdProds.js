import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { ReactComponent as ShopIcon } from "../../../components/icon/shopIcon.svg";
const useStyle = makeStyles({
  root: {},
  shopBox: {
    width: "100%",
    height: "100%",
    maxHeight: "250px",
    borderRadius: "5px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
  },
  ///////title style
  tableTitleStyle: {
    height: "50px",
    backgroundColor: "#0000001a",
    display: "flex",
    borderRadius: "5px 5px 0 0",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  shopIconStyle: { width: "32px", height: "29px", marginRight: "5px" },
  tableContentStyle: {
    height: "50px",
    display: "flex",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  tableEndStyle: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > div": {
      cursor: "pointer",
    },
  },
});

export default function PdProds({ prods }) {
  const classes = useStyle();
  const tableContent = [
    {
      title: "商品属性",
      size: 2,
      field: "attrs",
      content: (attrs) => {
        const attrDesp = attrs?.map(
          (attr) => attr.nome + ":" + attr.option + " "
        );
        return <div title={attrDesp}>{attrDesp?.slice(0, 15)}</div>;
      },
    },
    {
      title: "标价",
      size: 1,
      field: "price_regular",
      content: (pr) => "€" + pr,
    },
    {
      title: "卖价",
      size: 1,
      field: "price_sale",
      content: (ps) => "€" + ps,
    },
    {
      title: "是否打折",
      size: 2,
      field: "is_discount",
      content: (isD) => (isD === true ? "YES" : "NO"),
    },
    { title: "库存", size: 2, field: "quantity", content: (qty) => qty },
    {
      title: "是否可用",
      size: 2,
      field: "is_usable",
      content: (isU) => (isU === true ? "YES" : "NO"),
    },
  ];
  const defaultSkusRowNumber = 1;
  return (
    <Grid container className={classes.root} rowSpacing={4}>
      {prods?.map((prod) => (
        <ItemTable
          prod={prod}
          tableContent={tableContent}
          defaultSkusRowNumber={defaultSkusRowNumber}
        />
      ))}
    </Grid>
  );
}

function ItemTable({ prod, tableContent, defaultSkusRowNumber }) {
  const classes = useStyle();
  const [expand, setExpand] = React.useState(false);
  return (
    //   shop card table outter box for padding space
    <Grid item xs={12}>
      {/* shop card table */}
      <Grid xs={12} key={prod._id} className={classes.shopBox}>
        {/*------------------- table title ------------------------*/}
        <Grid xs={12} className={classes.tableTitleStyle}>
          {/* shop icon & title */}
          <Grid xs={2}>
            <ShopIcon className={classes.shopIconStyle} />
            <div>{prod.Shop?.nome}</div>
          </Grid>
          {/* title fields */}
          {tableContent.map((tc) => (
            <Grid key={tc.title} item xs={tc.size}>
              {tc.title}
            </Grid>
          ))}
        </Grid>
        {/*------------------- table rows ------------------------*/}
        {prod.Skus?.map(
          (sku, index) =>
            (index < defaultSkusRowNumber || expand === true) && (
              <Grid key={sku._id} xs={12} className={classes.tableContentStyle}>
                {/* default sku row */}
                <Grid xs={2}>sku{index}</Grid>
                {/* skus rows */}
                {tableContent.map((tc) => (
                  <Grid xs={tc.size} style={tc.style}>
                    {tc.content(sku[tc.field])}
                  </Grid>
                ))}
              </Grid>
            )
        )}
        {/*------------------- table ends ------------------------*/}
        {prod.Skus?.length > defaultSkusRowNumber && (
          <Grid
            xs={12}
            className={classes.tableEndStyle}
            onClick={() => setExpand((prev) => !prev)}>
            <div>{expand === true ? "收起" : "展开更多"}</div>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
