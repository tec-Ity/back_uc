import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
// import clsx from "clsx";
import { Breadcrumbs, Grid, Link, Typography, Switch } from "@mui/material";
// import { OutlinedInput, FormControl, InputLabel } from "@material-ui/core";
// import Modal from "@mui/material/Modal";
import SearchInput from "../../../components/universal/query/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getObjects,
  postObject,
  putObject,
} from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import ListPageHeader from "../../../components/basic/ListPageHeader";
const useStyle = makeStyles({
  root: {},
  //header
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  listGridContainer: {
    // border: "1px solid",
  },
  listGridItem: {
    position: "relative",
    "&:hover": { cursor: "pointer" },
    // border: "1px solid",
    boxSizing: "border-box",
    height: "160px",
    // marginBottom: "20px",
    padding: "2px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
  },
  btnGroup: {
    position: "absolute",
    right: "0",
    top: 0,
  },
  childGroup: {
    padding: "0 5%",
  },
  brandBg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    zIndex: "-1",
  },
  brandCode: {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#fff",
    fontSize: "30px",
    fontWeight: "700",
    borderRadius: "10px",
  },
  inputBox: {
    position: "relative",
    // border: "1px solid",
    height: "50px",
  },
  inputlabel: {
    // border:'1px solid',
    fontFamily: "Montserrat",
    padding: "0 2px",
    lineHeight: "1em",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: "10px",
    fontWeight: "700",
    color: "#1d1d384d",
  },
  inputStyle: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
    paddingLeft: "20px",
    paddingTop: "0",
    fontWeight: "700",
    fontSize: "20px",
    border: "2px solid #1d1d384d",
  },
  //children:
  children: {},
  childImgBox: {
    heihgt: "74px",
    width: "74px",
    backgroundColor: "#0000004d",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "default",
  },
  hoverPointer: {
    "&:hover": { cursor: "pointer" },
  },
  addNewChildImgBox: {
    height: "37px",
    width: "74px",
    backgroundColor: "#0000004d",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
});

const links = [{ label: "主页", to: "/home" }, { label: "品牌列表" }];
const flagSlice = "brands";
const api = "/Brands";

export default function Brands() {
  const dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api }));
  }, [dispatch]);

  return (
    <Container>
      <ListPageHeader
        links={links}
        flgs={flagSlice}
        api={api}
        showAddNew={() => setAddNew(true)}
        addLabel='添加品牌'
      />
      <BrandList addNew={addNew} closeAddNew={() => setAddNew(false)} />
    </Container>
  );
}

function BrandList(props) {
  const { addNew, closeAddNew } = props;
  const classes = useStyle();
  const brands = useSelector((state) => state.objects[flagSlice]?.objects);
  return (
    <Grid container className={classes.listGridContainer}>
      {addNew === true && (
        <BrandListItem
          key='new'
          addNew={addNew}
          closeAddNew={closeAddNew}
          brand={{}}
        />
      )}
      {brands?.map((brand, index) => (
        <BrandListItem brand={brand} index={index} key={brand._id} />
      ))}
    </Grid>
  );
}

function BrandListItem({ brand, index, addNew = false, closeAddNew }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(addNew);
  const [showChild, setShowChild] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [initBrandInfo] = useState({
    sort: brand?.sort || 0,
    name: brand?.code || "",
    isUsable: brand?.is_usable || true,
    imgs: [],
  });
  const [brandUpdateData, setBrandUpdateData] = useState(initBrandInfo);
  const [imgLocal, setImgLocal] = useState([]);

  const handleSubmit = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        code: brandUpdateData.name,
        nome: brandUpdateData.name,
        sort: brandUpdateData.sort,
        is_usable: brandUpdateData.isUsable,
      })
    );
    for (let i = 0; i < brandUpdateData.imgs.length; i++) {
      formData.append("image" + i, brandUpdateData.imgs[i]);
    }
    if (addNew === false) {
      dispatch(
        putObject({
          flagSlice,
          api: "/Brand/" + brand._id,
          data: formData,
          isList: true,
        })
      );
      setJustSubmitted(true);
    } else if (addNew === true) {
      if (brandUpdateData.name.length > 0) {
        dispatch(
          postObject({
            flagSlice,
            api: "/Brand",
            data: formData,
          })
        );
        closeAddNew();
        setJustSubmitted(true);
      } else {
        alert("name is empty");
      }
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    if (addNew === false) {
      setModifying(false);
      setBrandUpdateData(initBrandInfo);
    } else if (addNew === true) {
      closeAddNew();
    }
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    if (addNew === false) {
      dispatch(
        deleteObject({
          flagSlice,
          api: "/Brand/" + brand._id,
          id: brand._id,
          isList: true,
        })
      );
    } else if (addNew === true) {
      closeAddNew();
    }
  };

  const handleEdit = (e) => {
    setModifying(true);
    setShowChild(false);
    setImgLocal([]);
    e.stopPropagation();
  };

  useEffect(() => {
    if (justSubmitted === true && status === "succeed") {
      setModifying(false);
      setJustSubmitted(false);
    }
  }, [justSubmitted, status]);

  return (
    <>
      <Grid
        container
        item
        xs={12}
        className={classes.listGridItem}
        style={{ marginBottom: "20px" }}
        justifyContent='center'
        alignItems='center'
        onClick={() => {
          modifying === true
            ? ref.current.click()
            : showChild === true
            ? setShowChild(false)
            : setShowChild(true);
        }}>
        {modifying === false ? (
          <>
            {/* bg img */}
            <img
              src={api_DNS + brand.img_url}
              alt={brandUpdateData.name}
              className={classes.brandBg}
            />
            {/* gateg code */}
            <div className={classes.brandCode}>
              {(index + 1).toFixed(1) + " " + brandUpdateData.name}
            </div>
          </>
        ) : (
          // img upload  section
          <>
            {imgLocal.length > 0 ? (
              // show selected img
              <img src={imgLocal[0]} alt='logo' className={classes.brandBg} />
            ) : (
              // when no selected img
              <div>Upload image{" (16:9)"}</div>
            )}
            {/* hidden input file */}
            <input
              ref={ref}
              style={{ display: "none" }}
              type='file'
              onChange={(e) => {
                // console.log(e.target.files);
                setBrandUpdateData((prev) => ({
                  ...prev,
                  imgs: e.target.files,
                }));
                const imgs = e.target.files;
                console.log(e.target.files);
                const imgLocalPath = [];
                for (let i = 0; i < imgs.length; i++) {
                  const img = URL.createObjectURL(imgs[i]);
                  imgLocalPath.push(img);
                }
                setImgLocal(imgLocalPath);
              }}
            />
          </>
        )}
        {/* icon groups */}
        <div className={classes.btnGroup}>
          <CusBtnGroup
            modifying={modifying}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          {/* {modifying === true ? (
            <>
              <div onClick={handleSubmit}>Done</div>
              <div onClick={handleCancel}>Cancle</div>
              <div onClick={handleDelete}>Del</div>
            </>
          ) : (
            <>
              <div
                onClick={(e) => {
                  setModifying(true);
                  setShowChild(false);
                  setImgLocal([]);
                  e.stopPropagation();
                }}>
                edit
              </div>
              <div onClick={handleDelete}>del</div>
            </>
          )} */}
        </div>
      </Grid>

      {/* ---modify form--- */}
      {modifying === true && (
        <Grid container item xs={12} style={{ marginBottom: "10px" }}>
          <Grid item xs={1}>
            <div className={classes.inputBox}>
              <input
                value={brandUpdateData.sort}
                className={classes.inputStyle}
                onChange={(e) =>
                  setBrandUpdateData((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }))
                }
              />
              <label className={classes.inputlabel}>Sort</label>
            </div>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={8}>
            <div className={classes.inputBox}>
              <input
                value={brandUpdateData.name}
                className={classes.inputStyle}
                onChange={(e) =>
                  setBrandUpdateData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <label className={classes.inputlabel}>Name</label>
            </div>
          </Grid>
          {/* <Grid item xs={1} /> */}
          <Grid
            container
            item
            xs={2}
            alignItems='center'
            justifyContent='flex-end'>
            usable
            <Switch
              checked={brandUpdateData.isUsable}
              size='small'
              color='default'
              style={{ color: "#000" }}
              onChange={(e) =>
                setBrandUpdateData((prev) => ({
                  ...prev,
                  isUsable: e.target.checked,
                }))
              }
            />
            {console.log(brandUpdateData)}
          </Grid>
        </Grid>
      )}
    </>
  );
}
