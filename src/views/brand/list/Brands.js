import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
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
import { WindowRounded } from "@mui/icons-material";

const useStyle = makeStyles({
  root: {},
  listGridContainer: {
    // border: "1px solid",
    display: "flex",
    justifyContent: "space-between",
  },
  listGridItem: {
    position: "relative",
    // border: "1px solid",
    boxSizing: "border-box",
    height: "350px",
    width: "255px",
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
    objectFit: "cover",
    paddingBottom: "",
    // borderBottom: "2px solid #000",
    // position: "absolute",
    zIndex: "-1",
    cursor: "pointer",
  },
  infoContainer: {
    borderTop: "2px solid",
    width: "100%",
    marginTop: "10px",
    "& > div": {
      marginTop: "5px",
      height: "28px",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      "& > :first-child": {
        color: "#00000080",
      },
      "& > :nth-child(2)": {
        fontWeight: 700,
        //   fontSize:'14px'
      },
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

const links = [{ label: "主页", to: "/home" }, { label: "品牌列表" }];
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
    <Container>
      <ListPageHeader
        links={links}
        flagSlice={flagSlice}
        api={api}
        showAddNew={() => setAddNew(true)}
        addLabel='添加品牌'
        showSearch={Boolean(queryFixed)}
      />
      <BrandList addNew={addNew} closeAddNew={() => setAddNew(false)} />
      <PageNav flagSlice={flagSlice} api={api} />
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
        <BrandListItem key='new' addNew closeAddNew={closeAddNew} brand={{}} />
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
    isUsable: brand?.is_usable,
    nation: { id: brand?.Nation?._id || "", code: brand?.Nation?.code || "" },
    imgs: [],
  });

  const [imgLocal, setImgLocal] = useState([]);

  useEffect(() => {
    setBrandUpdateData({
      sort: brand?.sort || 0,
      name: brand?.code || "",
      isUsable: brand?.is_usable,
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
        is_usable: brandUpdateData.isUsable,
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
        isUsable: brand?.is_usable,
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
    <div>
      <Grid
        container
        item
        xs={12}
        className={classes.listGridItem}
        style={{ marginBottom: "20px" }}
        alignContent='flex-start'>
        {modifying === false ? (
          <>
            {/* bg img */}
            <img
              src={api_DNS + brand.img_url}
              alt={brandUpdateData.name}
              className={classes.brandBg}
            />
            <div className={classes.infoContainer}>
              <div>
                <div>品牌名称</div>
                <div>{brandUpdateData.name}</div>
              </div>
              <div>
                <div>排序</div>
                <div>{brandUpdateData.sort}</div>
              </div>
              <div>
                <div>国家</div>
                <div>{brandUpdateData.nation?.code}</div>
              </div>
              <div>
                <div>可用</div>
                <div>{brandUpdateData.isUsable === true ? "YES" : "NO"}</div>
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
              }}>
              {imgLocal.length > 0 ? (
                // show selected img
                <img src={imgLocal[0]} alt='logo' className={classes.brandBg} />
              ) : (
                // when no selected img
                <div
                  className={classes.brandBg}
                  style={{
                    border: "1px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Upload image{" (16:9)"}
                </div>
              )}
            </div>
            {/* hidden input file */}
            <input
              ref={ref}
              style={{ display: "none" }}
              type='file'
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
                <div>品牌名称</div>
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
              </div>
              <div>
                <div>排序</div>
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
                <div>国家</div>
                <div style={{ width: "50%" }}>
                  <CusSelectSearch
                    useDefault
                    flagSlice='Nations'
                    api='/Nations'
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
                <div>可用</div>
                <div>
                  <CusSwitch
                    checked={brandUpdateData.isUsable}
                    handleSwitch={(checked) =>
                      setBrandUpdateData((prev) => ({
                        ...prev,
                        isUsable: checked,
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
    </div>
  );
}
