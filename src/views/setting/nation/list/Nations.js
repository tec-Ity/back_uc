import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import { Breadcrumbs, Grid, Link, Typography, Switch } from "@mui/material";
// import { OutlinedInput, FormControl, InputLabel } from "@material-ui/core";
// import Modal from "@mui/material/Modal";
import SearchInput from "../../../../components/universal/query/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getObjects,
  postObject,
  putObject,
} from "../../../../features/objectsSlice";
// import CusInput from "../../../../components/basic/CusInput";
import api_DNS from "../../../../js/_dns";
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
  areaBg: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    zIndex: "-1",
  },
  areaCode: {
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

const links = [{ label: "主页", to: "/home" }, { label: "国家列表" }];
const flagSlice = "areas";
const api = "/Nations";
export default function Nations() {
  const dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);
  useEffect(() => {
    dispatch(getObjects({ flagSlice, api }));
  }, [dispatch]);

  return (
    <Container>
      <ListPageHeader showAddNew={() => setAddNew(true)} />
      <CityList addNew={addNew} closeAddNew={() => setAddNew(false)} />
    </Container>
  );
}

function CityList(props) {
  const { addNew, closeAddNew } = props;
  const classes = useStyle();
  const areas = useSelector((state) => state.objects[flagSlice]?.objects);
  return (
    <Grid container className={classes.listGridContainer}>
      {addNew === true && (
        <CityListItem
          key='new'
          addNew={addNew}
          closeAddNew={closeAddNew}
          area={{}}
        />
      )}
      {areas?.map((area, index) => (
        <CityListItem area={area} index={index} key={area._id} />
      ))}
    </Grid>
  );
}

function CityListItem({ area, index, addNew = false, closeAddNew }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(addNew);
  const [showChild, setShowChild] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [initCityInfo] = useState({
    sort: area?.sort || 0,
    name: area?.code || "",
    isUsable: area?.is_usable || true,
    imgs: [],
  });
  const [areaUpdateData, setCityUpdateData] = useState(initCityInfo);
  const [imgLocal, setImgLocal] = useState([]);

  const handleSubmitUpdate = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        // code: areaUpdateData.name,
        // nome: areaUpdateData.name,
        sort: areaUpdateData.sort,
        is_usable: areaUpdateData.isUsable,
      })
    );
    for (let i = 0; i < areaUpdateData.imgs.length; i++) {
      formData.append("image" + i, areaUpdateData.imgs[i]);
    }
    if (addNew === false) {
      dispatch(
        putObject({
          flagSlice,
          api: "/Nation/" + area._id,
          data: formData,
          isList: true,
        })
      );
      setJustSubmitted(true);
    } else if (addNew === true) {
      if (areaUpdateData.name.length > 0) {
        dispatch(
          postObject({
            flagSlice,
            api: "/Nation",
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
      setCityUpdateData(initCityInfo);
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
          api: "/City/" + area._id,
          id: area._id,
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
              src={api_DNS + area.img_url}
              alt={areaUpdateData.name}
              className={classes.areaBg}
            />
            {/* gateg code */}
            <div className={classes.areaCode}>
              {(index + 1).toFixed(1) + " " + areaUpdateData.name}
            </div>
          </>
        ) : (
          // img upload  section
          <>
            {imgLocal.length > 0 ? (
              // show selected img
              <img src={imgLocal[0]} alt='logo' className={classes.areaBg} />
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
                setCityUpdateData((prev) => ({
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

      {/* ---modify form--- */}
      {modifying === true && (
        <Grid container item xs={12} style={{ marginBottom: "10px" }}>
          <Grid item xs={1}>
            <div className={classes.inputBox}>
              <input
                value={areaUpdateData.sort}
                className={classes.inputStyle}
                onChange={(e) =>
                  setCityUpdateData((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }))
                }
              />
              <label className={classes.inputlabel}>Sort</label>
            </div>
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={4}>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <div className={classes.inputBox}>
              <input
                disabled
                value={areaUpdateData.name}
                className={classes.inputStyle}
                onChange={(e) =>
                  setCityUpdateData((prev) => ({
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
              disabled
              checked={areaUpdateData.isUsable}
              size='small'
              color='default'
              style={{ color: "#000" }}
              onChange={(e) =>
                setCityUpdateData((prev) => ({
                  ...prev,
                  isUsable: e.target.checked,
                }))
              }
            />
            {console.log(areaUpdateData)}
          </Grid>
        </Grid>
      )}
    </>
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

      {/* <div onClick={showAddNew}>添加分类</div> */}
    </div>
  );
}
