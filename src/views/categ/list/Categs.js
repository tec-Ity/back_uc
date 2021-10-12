import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import clsx from "clsx";
import { Breadcrumbs, Grid, Link, Typography, Switch } from "@mui/material";
// import { OutlinedInput, FormControl, InputLabel } from "@material-ui/core";
// import Modal from "@mui/material/Modal";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getObjects,
  postObject,
  putObject,
} from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
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
  btnGroupChild: {
    display: "flex",
    paddingRight: "5px",
    "& > div": {
      "&:hover": {
        cursor: "pointer",
      },
      height: "30px",
      width: "30px",
      margin: "5px",
    },
  },
  childGroup: {
    padding: "0 5%",
    paddingBottom: "50px",
  },
  categBg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    zIndex: "-1",
  },
  categCode: {
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
    fontWeight: "600",
    fontSize: "18px",
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
const flagSlice = "categs";
const api = "/Categs";

export default function Categs() {
  const dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api }));
  }, [dispatch]);

  return (
    <Container>
      <ListPageHeader
        showAddNew={() => setAddNew(true)}
        api={api}
        links={links}
        addLabel='添加分类'
        flagSlice={flagSlice}
      />
      <CategList addNew={addNew} closeAddNew={() => setAddNew(false)} />
    </Container>
  );
}

function CategList(props) {
  const { addNew, closeAddNew } = props;
  const classes = useStyle();
  const categs = useSelector((state) => state.objects[flagSlice]?.objects);

  return (
    <Grid container className={classes.listGridContainer}>
      {addNew === true && (
        <CategListItem
          key='new'
          addNew={addNew}
          closeAddNew={closeAddNew}
          categ={{}}
        />
      )}
      {categs?.map((categ, index) => (
        <CategListItem categ={categ} index={index} key={categ._id} />
      ))}
    </Grid>
  );
}

function CategListItem({
  categ,
  index,
  addNew = false,
  closeAddNew,
  categLevel = 1,
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(addNew);
  const [showChild, setShowChild] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [initCategInfo] = useState({
    sort: categ?.sort || 0,
    name: categ?.code || "",
    isUsable: categ?.is_usable || true,
    imgs: [],
  });
  const [categUpdateData, setCategUpdateData] = useState(initCategInfo);
  const [imgLocal, setImgLocal] = useState([]);

  const handleSubmitUpdate = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        code: categUpdateData.name,
        sort: categUpdateData.sort,
        is_usable: categUpdateData.isUsable,
        level: categLevel,
      })
    );
    for (let i = 0; i < categUpdateData.imgs.length; i++) {
      formData.append("image" + i, categUpdateData.imgs[i]);
    }
    if (addNew === false) {
      dispatch(
        putObject({
          flagSlice,
          api: "/Categ/" + categ._id,
          data: formData,
          isList: true,
        })
      );
      setJustSubmitted(true);
    } else if (addNew === true) {
      if (categUpdateData.name.length > 0) {
        dispatch(
          postObject({
            flagSlice,
            api: "/Categ",
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
      setCategUpdateData(initCategInfo);
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
          api: "/Categ/" + categ._id,
          id: categ._id,
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
              src={api_DNS + categ.img_url}
              alt={categUpdateData.name}
              className={classes.categBg}
            />
            {/* gateg code */}
            <div className={classes.categCode}>
              {(index + 1).toFixed(1) + " " + categUpdateData.name}
            </div>
          </>
        ) : (
          // img upload  section
          <>
            {imgLocal.length > 0 ? (
              // show selected img
              <img src={imgLocal[0]} alt='logo' className={classes.categBg} />
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
                setCategUpdateData((prev) => ({
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
            handleSubmitUpdate={handleSubmitUpdate}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </Grid>
      {/* --- children form --- */}
      {showChild === true && (
        <Grid container item xs={12} className={classes.childGroup}>
          <AddNewChildRow farId={categ._id} />
          {categ?.Categ_sons?.map((son) => (
            <CategListItemChild categ={son} key={son._id} />
          ))}
        </Grid>
      )}
      {/* ---modify form--- */}
      {modifying === true && (
        <Grid container item xs={12} style={{ marginBottom: "50px" }}>
          <Grid item xs={1}>
            <div className={classes.inputBox}>
              <input
                value={categUpdateData.sort}
                className={classes.inputStyle}
                onChange={(e) =>
                  setCategUpdateData((prev) => ({
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
                value={categUpdateData.name}
                className={classes.inputStyle}
                onChange={(e) =>
                  setCategUpdateData((prev) => ({
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
              checked={categUpdateData.isUsable}
              size='small'
              color='default'
              style={{ color: "#000" }}
              onChange={(e) =>
                setCategUpdateData((prev) => ({
                  ...prev,
                  isUsable: e.target.checked,
                }))
              }
            />
            {console.log(categUpdateData)}
          </Grid>
        </Grid>
      )}
    </>
  );
}
function CategListItemChild({
  categ,
  index,
  farId,
  addNewChild = false,
  closeAddNewChild,
  categLevel = 2,
}) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(addNewChild);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [initCategInfo] = useState({
    sort: categ?.sort || 0,
    name: categ?.code || "",
    isUsable: categ?.is_usable || true,
    imgs: [],
  });
  const [categUpdateData, setCategUpdateData] = useState(initCategInfo);

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
        code: categUpdateData.name,
        sort: categUpdateData.sort,
        is_usable: categUpdateData.isUsable,
        level: categLevel,
        Categ_far: farId,
      })
    );
    for (let i = 0; i < categUpdateData.imgs.length; i++) {
      formData.append("image" + i, categUpdateData.imgs[i]);
    }
    if (addNewChild === false) {
      dispatch(
        putObject({
          flagSlice,
          api: "/Categ/" + categ._id,
          data: formData,
          isList: true,
        })
      );
      setJustSubmitted(true);
    } else if (addNewChild === true) {
      if (categUpdateData.name.length > 0) {
        dispatch(
          postObject({
            flagSlice,
            api: "/Categ",
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
      setCategUpdateData(initCategInfo);
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
          api: "/Categ/" + categ._id,
          id: categ._id,
          isList: true,
        })
      );
    } else if (addNewChild === true) {
      closeAddNewChild();
    }
  };

  const handleEdit = (e) => {
    setModifying(true);
    setImgLocal([]);
    e.stopPropagation();
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
              setCategUpdateData((prev) => ({
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
              value={categUpdateData.sort}
              className={classes.inputStyle}
              onChange={(e) =>
                setCategUpdateData((prev) => ({
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
              value={categUpdateData.name}
              className={classes.inputStyle}
              onChange={(e) =>
                setCategUpdateData((prev) => ({
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
            checked={categUpdateData.isUsable}
            size='small'
            color='default'
            style={{ color: "#000" }}
            onChange={(e) =>
              setCategUpdateData((prev) => ({
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
          <CusBtnGroup
            secondary
            modifying={modifying}
            handleSubmitUpdate={handleSubmitUpdate}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          {/* {modifying === true ? (
            <>
              <div onClick={handleSubmitUpdate}>Done</div>
              <div onClick={handleCancel}>Cancle</div>
              <div onClick={handleDelete}>Del</div>
            </>
          ) : (
            <>
              <div onClick={handleEdit}>edit</div>
              <div onClick={handleDelete}>del</div>
            </>
          )} */}
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
    <CategListItemChild
      farId={farId}
      addNewChild={addNewChild}
      closeAddNewChild={() => setAddNewChild(false)}
    />
  );
}
