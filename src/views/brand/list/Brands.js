import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import clsx from "clsx";
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
const useStyle = makeStyles({
  root: {},
  //header
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
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
    display: "flex",
    position: "absolute",
    right: "0",
    top: 0,
    "& > div": {
      "&:hover": {
        cursor: "pointer",
      },
      height: "30px",
      width: "30px",
      // backgroundColor: "#1d1d3840",
      backgroundColor: "#fff",
      margin: "5px",
      border: "2px solid #000",
      borderRadius: "5px",
    },
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

const links = [{ label: "主页", to: "/home" }, { label: "分类列表" }];
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
      <ListPageHeader showAddNew={() => setAddNew(true)} />
      <BrandList addNew={addNew} closeAddNew={() => setAddNew(false)} />
    </Container>
  );
}

function BrandList(props) {
  const { addNew, closeAddNew } = props;
  const classes = useStyle();
  const brands = useSelector((state) => state.objects[flagSlice]?.objects);
  console.log(brands);
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

function BrandListItem({
  brand,
  index,
  addNew = false,
  closeAddNew,
  brandLevel = 1,
}) {
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

  const handleSubmitUpdate = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        code: brandUpdateData.name,
        sort: brandUpdateData.sort,
        is_usable: brandUpdateData.isUsable,
        level: brandLevel,
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
              {(index + 1).toFixed(1) + brandUpdateData.name}
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
          {modifying === true ? (
            <>
              <div onClick={handleSubmitUpdate}>Done</div>
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
          )}
        </div>
      </Grid>
      {/* --- children form --- */}
      {showChild === true && (
        <Grid container item xs={12} className={classes.childGroup}>
          <AddNewChildRow farId={brand._id} />
          {brand?.Brand_sons?.map((son) => (
            <BrandListItemChild brand={son} key={son._id} />
          ))}
        </Grid>
      )}
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
function BrandListItemChild({
  brand,
  index,
  farId,
  addNewChild = false,
  closeAddNewChild,
  brandLevel = 2,
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(addNewChild);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [initBrandInfo] = useState({
    sort: brand?.sort || 0,
    name: brand?.code || "",
    isUsable: brand?.is_usable || true,
    imgs: [],
  });
  const [brandUpdateData, setBrandUpdateData] = useState(initBrandInfo);

  const [, setImgLocal] = useState([]);

  useEffect(() => {
    if (justSubmitted === true && status === "succeed") {
      setModifying(false);
      setJustSubmitted(false);
    }
  }, [justSubmitted, status]);

  const handleSubmitUpdate = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        code: brandUpdateData.name,
        sort: brandUpdateData.sort,
        is_usable: brandUpdateData.isUsable,
        level: brandLevel,
        Brand_far: farId,
      })
    );
    for (let i = 0; i < brandUpdateData.imgs.length; i++) {
      formData.append("image" + i, brandUpdateData.imgs[i]);
    }
    if (addNewChild === false) {
      dispatch(
        putObject({
          flagSlice,
          api: "/Brand/" + brand._id,
          data: formData,
          isList: true,
        })
      );
      setJustSubmitted(true);
    } else if (addNewChild === true) {
      if (brandUpdateData.name.length > 0) {
        dispatch(
          postObject({
            flagSlice,
            api: "/Brand",
            data: formData,
          })
        );
        setJustSubmitted(true);
        closeAddNewChild();
      } else {
        alert("name is empty");
      }
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    if (addNewChild === false) {
      setModifying(false);
      setBrandUpdateData(initBrandInfo);
    } else if (addNewChild === true) {
      closeAddNewChild();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (addNewChild === false) {
      dispatch(
        deleteObject({
          flagSlice,
          api: "/Brand/" + brand._id,
          id: brand._id,
          isList: true,
        })
      );
    } else if (addNewChild === true) {
      closeAddNewChild();
    }
  };

  return (
    <>
      {/* ---modify form--- */}

      <Grid
        container
        item
        xs={12}
        style={{ marginBottom: "10px" }}
        justifyContent='space-between'>
        <Grid container item xs={1}>
          <div
            className={clsx(
              classes.childImgBox,
              modifying === true ? classes.hoverPointer : ""
            )}>
            Up
          </div>
          <input
            disabled={modifying === false}
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
        </Grid>
        <Grid item xs={1}>
          <div className={classes.inputBox}>
            <input
              disabled={modifying === false}
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
        <Grid item xs={5}>
          <div className={classes.inputBox}>
            <input
              disabled={modifying === false}
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
        <Grid container item xs={2} alignItems='center' justifyContent='center'>
          usable
          <Switch
            disabled={modifying === false}
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
        </Grid>
        <Grid
          container
          item
          xs={2}
          alignItems='center'
          justifyContent='center'
          style={{ position: "static" }}
          className={classes.btnGroup}>
          {modifying === true ? (
            <>
              <div onClick={handleSubmitUpdate}>Done</div>
              <div onClick={handleCancel}>Cancle</div>
              <div onClick={handleDelete}>Del</div>
            </>
          ) : (
            <>
              <div
                onClick={(e) => {
                  setModifying(true);
                  setImgLocal([]);
                  e.stopPropagation();
                }}>
                edit
              </div>
              <div onClick={handleDelete}>del</div>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

function AddNewChildRow({ farId }) {
  const classes = useStyle();
  const [addNewChild, setAddNewChild] = useState(false);
  return addNewChild === false ? (
    <Grid
      container
      item
      xs={12}
      style={{ marginBottom: "10px" }}
      justifyContent='space-between'>
      <Grid container item xs={1}>
        <div
          className={classes.addNewChildImgBox}
          onClick={() => setAddNewChild(true)}>
          +
        </div>
      </Grid>
      <Grid item xs={2} container alignItems='center'>
        添加子分类
      </Grid>
      {/* offsets */}
      <Grid item xs={5}></Grid>
      <Grid container item xs={1}></Grid>
      <Grid container item xs={2}></Grid>
    </Grid>
  ) : (
    <BrandListItemChild
      farId={farId}
      addNewChild={addNewChild}
      closeAddNewChild={() => setAddNewChild(false)}
    />
  );
}

function ListPageHeader({ showAddNew }) {
  const classes = useStyle();
  return (
    <div className={classes.headerContainer}>
      <Breadcrumbs>
        {links?.map((link, index) =>
          index === links.length - 1 ? (
            <Typography key={index} color='text.primary'>
              {link.label}
            </Typography>
          ) : (
            <Link
              key={index}
              underline='hover'
              color={"inherit"}
              href={link.to}>
              {link.label}
            </Link>
          )
        )}
      </Breadcrumbs>

      <SearchInput flagSlice={flagSlice} />

      <div onClick={showAddNew}>添加分类</div>
    </div>
  );
}
