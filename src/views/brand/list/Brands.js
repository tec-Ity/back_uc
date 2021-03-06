import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
// import clsx from "clsx";
import { getRolePath } from "../../../js/conf/confUser";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PageNav from "../../../components/universal/query/PageNav";
import {
  deleteObject,
  getObjects,
  postObject,
  putObject,
  selectQueryFixed,
  setQueryFixed,
} from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import ListPageHeader from "../../../components/basic/ListPageHeader";
import CusSelectSearch from "../../../components/basic/CusSelectSearch";
import CusSwitch from "../../../components/basic/CusSwitch";
import { useHistory } from "react-router";
import { default as defaultBrand } from "../../../components/icon/brandDefaultImg.svg";
const useStyle = makeStyles({
  root: {},
  listGridContainer: { width: "100%" },
  listGridItem: {
    position: "relative",
    boxSizing: "border-box",
    // marginBottom: "20px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: "10px",
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
    height: "184px",
    width: "100%",
    objectFit: "scale-down",
    cursor: "pointer",
  },
  updateText: {
    position: "absolute",
    top: "10px",
    right: "10px",
    left: "10px",
    height: "184px",
    border: "1px solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    borderTop: "1px solid",
    width: "100%",
    marginTop: "10px",
    // other row
    "& > div": {
      marginTop: "5px",
      height: "28px",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      //key
      "& > :first-child": {
        color: "#00000080",
        fontSize: "14px",
      },
      //value
      "& > :nth-child(2)": {
        fontWeight: 600,
        fontSize: "14px",
        width: "70%",
        display: "flex",
        justifyContent: "flex-end",
      },
    },
    //name row
    "& > :nth-child(1)": {
      marginTop: "5px",
      height: "45px",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      //name value
      //   "& > :nth-child(2)": {
      //     fontWeight: 600,
      //     fontSize: "14px",
      //     display: "flex",
      //     justifyContent: "flex-end",
      //   },
    },
  },
  inputStyle: {
    // height: "100%",
    width: "50%",
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

const links = [{ label: "brands" }];
const flagSlice = "brands";
const api = "/Brands";
const populateObjs = [
  {
    path: "Nation",
    select: "code nome",
  },
];
export default function Brands() {
  const dispatch = useDispatch();
  const [addNew, setAddNew] = useState(false);
  const queryFixed = useSelector(selectQueryFixed(flagSlice));
  useEffect(() => {
    dispatch(
      setQueryFixed({
        flagSlice,
        queryFixed: "&populateObjs=" + JSON.stringify(populateObjs),
      })
    );
  }, [dispatch]);

  useEffect(() => {
    queryFixed && dispatch(getObjects({ flagSlice, api }));
  }, [dispatch, queryFixed]);

  return (
    <>
      <ListPageHeader
        links={links}
        flagSlice={flagSlice}
        api={api}
        showAddNew={() => setAddNew(true)}
        addLabel="brand"
        showSearch={Boolean(queryFixed)}
      />
      <BrandList addNew={addNew} closeAddNew={() => setAddNew(false)} />
      <PageNav flagSlice={flagSlice} api={api} />
    </>
  );
}

function BrandList(props) {
  const { addNew, closeAddNew } = props;
  const classes = useStyle();
  const brands = useSelector((state) => state.objects[flagSlice]?.objects);
  return (
    <Grid container className={classes.listGridContainer}>
      {addNew === true && (
        <BrandListItem key="new" addNew closeAddNew={closeAddNew} brand={{}} />
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
  const rolePath = getRolePath();
  const hist = useHistory();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(addNew);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [brandUpdateData, setBrandUpdateData] = useState({
    sort: brand?.sort || 0,
    name: brand?.code || "",
    is_usable: brand?.is_usable,
    nation: { id: brand?.Nation?._id || "", code: brand?.Nation?.code || "" },
    imgs: [],
  });

  const [imgLocal, setImgLocal] = useState([]);

  useEffect(() => {
    setBrandUpdateData({
      sort: brand?.sort || 0,
      name: brand?.code || "",
      is_usable: brand?.is_usable,
      nation: { id: brand?.Nation?._id || "", code: brand?.Nation?.code || "" },
      imgs: [],
    });
  }, [brand]);

  const handleSubmit = (e) => {
    e.stopPropagation();
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        code: brandUpdateData.name,
        nome: brandUpdateData.name,
        sort: brandUpdateData.sort,
        is_usable: brandUpdateData.is_usable,
        Nation: brandUpdateData?.nation?.id,
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
      setJustSubmitted("UPDATE");
    } else if (addNew === true) {
      if (brandUpdateData.name.length > 0) {
        dispatch(
          postObject({
            flagSlice,
            api: "/Brand",
            data: formData,
          })
        );
        setJustSubmitted("POST");
        // closeAddNew();
      } else {
        alert("name is empty");
      }
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    if (addNew === false) {
      setModifying(false);
      setBrandUpdateData({
        sort: brand?.sort || 0,
        name: brand?.code || "",
        is_usable: brand?.is_usable,
        nation: {
          id: brand?.Nation?._id || "",
          code: brand?.Nation?.code || "",
        },
        imgs: [],
      });
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
    setImgLocal([]);
    e.stopPropagation();
  };

  //refresh after submit
  useEffect(() => {
    if (justSubmitted === "UPDATE" && status === "succeed") {
      setModifying(false);
      setJustSubmitted(false);
      hist.push(`/${rolePath}/reload`);
    } else if (justSubmitted === "POST" && status === "succeed") {
      window.location.reload();
    }
  }, [hist, justSubmitted, rolePath, status]);

  return (
    <Grid
      container
      item
      //   xs={3}
      className={classes.listGridItem}
      style={{
        marginBottom: "20px",
        marginRight: "20px",
        height: "360px",
        maxWidth: "255px",
      }}
      alignContent="flex-start"
    >
      {modifying === false ? (
        <>
          {/* bg img */}
          <img
            src={brand.img_url ? api_DNS + brand.img_url : defaultBrand}
            alt={brandUpdateData.name}
            className={classes.brandBg}
            style={{
              filter: brandUpdateData.is_usable === false && "grayscale(100%)",
            }}
          />
          <div className={classes.infoContainer}>
            <div>
              <div>????????????</div>
              <div>{brandUpdateData.name}</div>
            </div>
            <div>
              <div>??????</div>
              <div>{brandUpdateData.sort}</div>
            </div>
            <div>
              <div>??????</div>
              <div>{brandUpdateData.nation?.code}</div>
            </div>
            <div>
              <div>??????</div>
              <div>{brandUpdateData.is_usable === true ? "YES" : "NO"}</div>
            </div>
          </div>
        </>
      ) : (
        // img upload  section
        <>
          <div
            style={{ width: "100%" }}
            onClick={() => {
              modifying === true && ref.current.click();
            }}
          >
            {imgLocal.length > 0 ? (
              // show selected img
              <img src={imgLocal[0]} alt="logo" className={classes.brandBg} />
            ) : (
              // when no selected img
              <div className={classes.brandBg}>
                {addNew === true || !brand.img_url ? (
                  <img src={defaultBrand} alt="" style={{ opacity: "0.1" }} />
                ) : (
                  <img
                    src={api_DNS + brand.img_url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      opacity: "0.3",
                      objectFit: "scale-down",
                    }}
                  />
                )}
                <div className={classes.updateText}>Upload image</div>
              </div>
            )}
          </div>
          {/* hidden input file */}
          <input
            ref={ref}
            style={{ display: "none" }}
            type="file"
            onChange={(e) => {
              setBrandUpdateData((prev) => ({
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
          {/* ---modify form--- */}
          <div className={classes.infoContainer}>
            <div>
              <div>????????????</div>
              <textarea
                value={brandUpdateData.name}
                className={classes.inputStyle}
                style={{ maxHeight: "45px", minHeight: "45px" }}
                onChange={(e) =>
                  setBrandUpdateData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <div>??????</div>
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
            </div>
            <div>
              <div>??????</div>
              <div style={{ width: "70%" }}>
                <CusSelectSearch
                  useDefault
                  flagSlice="Nations"
                  api="/Nations"
                  defaultSel={brandUpdateData.nation?.code}
                  handleSelect={(val) =>
                    setBrandUpdateData((prev) => ({
                      ...prev,
                      nation: { ...prev.nation, id: val.id, code: val.label },
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <div>??????</div>
              <div>
                <CusSwitch
                  checked={brandUpdateData.is_usable}
                  handleSwitch={(checked) =>
                    setBrandUpdateData((prev) => ({
                      ...prev,
                      is_usable: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
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
  );
}
