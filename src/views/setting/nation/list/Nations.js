import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import {
  // Breadcrumbs,
  Grid,
  // Link, Typography,
  Switch,
} from "@mui/material";
// import { OutlinedInput, FormControl, InputLabel } from "@material-ui/core";
// import Modal from "@mui/material/Modal";
// import SearchInput from "../../../../components/universal/query/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  getObjects,
  postObject,
  putObject,
} from "../../../../features/objectsSlice";
// import CusInput from "../../../../components/basic/CusInput";
import api_DNS from "../../../../js/_dns";
import CusBtnGroup from "../../../../components/basic/CusBtnGroup";
// import { getRolePath } from "../../../../js/conf/confUser";
import ListPageHeader from "../../../../components/basic/ListPageHeader";
import PageNav from "../../../../components/universal/query/PageNav";
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
// const rolePath = getRolePath();
const links = [{ label: "setting", to: `/setting` }, { label: "nations" }];
const flagSlice = "nations";
const api = "/Nations";
export default function Nations() {
  const dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);
  useEffect(() => {
    //   console.log(api)
    dispatch(getObjects({ flagSlice, api }));
  }, [dispatch]);

  return (
    <Container>
      <ListPageHeader links={links} flagSlice={flagSlice} api={api} />
      <CityList addNew={addNew} closeAddNew={() => setAddNew(false)} />
      <PageNav flagSlice={flagSlice} api={api} />
    </Container>
  );
}

function CityList(props) {
  const { addNew, closeAddNew } = props;
  const classes = useStyle();
  const nations = useSelector((state) => state.objects[flagSlice]?.objects);
  return (
    <Grid container className={classes.listGridContainer}>
      {addNew === true && (
        <CityListItem
          key="new"
          addNew={addNew}
          closeAddNew={closeAddNew}
          area={{}}
        />
      )}
      {nations?.map((area, index) => (
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
    is_usable: area?.is_usable || true,
    imgs: [],
  });
  const [areaUpdateData, setCityUpdateData] = useState(initCityInfo);
  const [imgLocal, setImgLocal] = useState([]);

  const handleSubmit = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        // code: areaUpdateData.name,
        // nome: areaUpdateData.name,
        sort: areaUpdateData.sort,
        is_usable: areaUpdateData.is_usable,
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
        justifyContent="center"
        alignItems="center"
        onClick={() => {
          modifying === true
            ? ref.current.click()
            : showChild === true
            ? setShowChild(false)
            : setShowChild(true);
        }}
      >
        {modifying === false ? (
          <>
            {/* bg img */}
            {area.img_url && (
              <img
                src={api_DNS + area.img_url}
                alt={areaUpdateData.name}
                className={classes.areaBg}
              />
            )}
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
              <img src={imgLocal[0]} alt="logo" className={classes.areaBg} />
            ) : (
              // when no selected img
              <div>Upload image{" (16:9)"}</div>
            )}
            {/* hidden input file */}
            <input
              ref={ref}
              style={{ display: "none" }}
              type="file"
              onChange={(e) => {
                // console.log(e.target.files);
                setCityUpdateData((prev) => ({
                  ...prev,
                  imgs: e.target.files,
                }));
                const imgs = e.target.files;
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

          <Grid item xs={4}></Grid>
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
            alignItems="center"
            justifyContent="flex-end"
          >
            usable
            <Switch
              disabled
              checked={areaUpdateData.is_usable}
              size="small"
              color="default"
              style={{ color: "#000" }}
              onChange={(e) =>
                setCityUpdateData((prev) => ({
                  ...prev,
                  is_usable: e.target.checked,
                }))
              }
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
