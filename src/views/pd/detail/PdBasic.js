import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CusInput from "../../../components/basic/CusInput";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import CusSelectSearch from "../../../components/basic/CusSelectSearch";
import {
  // useSelector,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  getObjects,
  putObject,
  deleteObject,
} from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
import { useHistory } from "react-router";
// import CusTextArea from "../../../components/basic/CusTextArea";

const useStyle = makeStyles({
  root: {
    "& > div": { padding: "10px 5px" },
  },
  hrStyle: {
    borderTop: "2px solid #1d1d384d",
    display: "flex",
    justifyContent: "flex-end",
  },
});

const brandSlice = "brands";
const brandApi = "/Brands";
const nationSlice = "nations";
const nationApi = "/Nations";
const categSlice = "categs";
const categApi = "/Categs";
export default function PdBasic({ Pd, flagSlice, api }) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const hist = useHistory();
  const status = useSelector((state) => state.objects.status);
  const [modifying, setModifying] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [pdInfo, setPdInfo] = useState({
    code: Pd.code || "",
    name: Pd.nome || "",
    brand: Pd.Brand || { code: "", _id: "" }, //code id
    nation: Pd.Nation || { code: "", _id: "" }, //code nome
    categ2: Pd.Categ || { code: "", _id: "" }, //code nome
    categ1: Pd.Categ?.Categ_far || { code: "", _id: "" }, //code nome
    sort: Pd.sort || 0,
    price_regular: Pd.price_regular || 0,
    unit: Pd.unit || "",
    desp: Pd.desp || "",
  });
  useEffect(() => {
    setPdInfo({
      code: Pd.code || "",
      name: Pd.nome || "",
      brand: Pd.Brand || { code: "", _id: "" }, //code id
      nation: Pd.Nation || { code: "", _id: "" }, //code nome
      categ2: Pd.Categ || { code: "", _id: "" }, //code nome
      categ1: Pd.Categ?.Categ_far || { code: "", _id: "" }, //code nome
      sort: Pd.sort || 0,
      price_regular: Pd.price_regular || 0,
      unit: Pd.unit || "",
      desp: Pd.desp || "",
    });
  }, [Pd]);
  useEffect(() => {
    dispatch(getObjects({ flagSlice: brandSlice, api: brandApi }));
  }, [dispatch]);

  const handleCancel = () => {
    setPdInfo({
      code: Pd.code || "",
      name: Pd.nome || "",
      brand: Pd.Brand || { code: "", _id: "" }, //code id
      nation: Pd.Nation || { code: "", _id: "" }, //code nome
      categ2: Pd.Categ || { code: "", _id: "" }, //code nome
      categ1: Pd.Categ?.Categ_far || { code: "", _id: "" }, //code nome
      sort: Pd.sort || 0,
      price_regular: Pd.price_regular || 0,
      unit: Pd.unit || "",
      desp: Pd.desp || "",
    });
  };

  useEffect(() => {
    if (justSubmitted === "DELETE" && status === "succeed") {
      hist.goBack();
      setJustSubmitted(false);
    }
    // if(justSubmitted === "UPDATE")
  }, [hist, justSubmitted, status]);

  const handleSubmit = () => {
    const general = {
      nome: pdInfo.name,
      Nation: pdInfo.nation._id,
      code: pdInfo.code,
      Brand: pdInfo.brand._id,
      Categ: pdInfo.categ2._id,
      sort: pdInfo.sort,
      unit: pdInfo.unit,
      desp: pdInfo.desp,
    };
    console.log(general);
    dispatch(putObject({ flagSlice, api, data: { general } }));
    setJustSubmitted("UPDATE");
  };
  const handleSubmitImg = () => {
    const formData = new FormData();
    for (let i = 0; i < imgsUpdate?.length; i++) {
      formData.append("img" + i, imgsUpdate[i]);
    }
    // console.log(formData.getAll());
    dispatch(putObject({ flagSlice, api, data: formData }));
    setImgLocal([]);
  };
  //image funcitonality
  const ref = useRef();
  const [imgsUpdate, setImgsUpdate] = useState();
  const [imgLocal, setImgLocal] = useState([]);
  const [showImgDeleteBtn, setShowImgDeleteBtn] = useState(false);
  const [modifyingImg, setModifyingImg] = useState(false);
  //   console.log(imgsUpdate);
  return (
    <Grid container className={classes.root}>
      {modifyingImg === false && (
        <button
          className='btn btn-success mx-3'
          onClick={() => setModifyingImg(true)}>
          修改图片
        </button>
      )}
      {modifyingImg === true && (
        <>
          {/* <button className='btn btn-success mx-3' onClick={handleSubmit}>
            提交修改信息
          </button> */}
          <button
            className='btn btn-warning mx-3'
            onClick={() => {
              setModifyingImg(false);
              setImgLocal([]);
              setImgsUpdate(null);
            }}>
            取消修改
          </button>
          <button
            className='btn btn-success mx-3'
            onClick={handleSubmitImg}
            disabled={!imgsUpdate}>
            提交图片
          </button>

          {showImgDeleteBtn === false && (
            <button
              className='btn btn-danger mx-3'
              onClick={() => setShowImgDeleteBtn(true)}>
              删除图片
            </button>
          )}
          {showImgDeleteBtn === true && (
            <button
              className='btn btn-warning mx-3'
              onClick={() => setShowImgDeleteBtn(false)}>
              完成删除
            </button>
          )}
        </>
      )}

      {/* imgs */}
      <Grid container item xs={12} justifyContent='space-between'>
        {/* <Grid item xs={2}>
          产品图片
        </Grid>
        <Grid item xs={2}>
          编辑
        </Grid> */}
      </Grid>
      <Grid
        item
        container
        xs={12}
        onClick={() => modifyingImg === true && ref.current.click()}
        style={{ cursor: modifyingImg === true ? "pointer" : "default" }}>
        {Pd.img_urls?.map((img) => (
          <div
            key={img}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingRight: "20px",
            }}>
            <img
              src={api_DNS + img}
              alt={Pd?.nome}
              style={{
                height: "100px",
                width: "100px",
                objectFit: "scale-down",
              }}
            />
            {showImgDeleteBtn === true && (
              <button
                className='btn btn-danger'
                onClick={(e) => {
                  e.stopPropagation();
                  const delete_img_urls = {
                    img_urls: [img],
                  };
                  dispatch(
                    putObject({ flagSlice, api, data: { delete_img_urls } })
                  );
                }}>
                删除
              </button>
            )}
          </div>
        ))}
        {imgLocal.length > 0 &&
          imgLocal.map((img, index) => (
            <div
              key={img}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingRight: "20px",
              }}>
              <img
                src={img}
                alt={Pd?.nome}
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "scale-down",
                }}
              />
              {showImgDeleteBtn === true && (
                <button
                  className='btn btn-danger'
                  onClick={(e) => {
                    e.stopPropagation();
                    //remove from local url
                    const tempImgsLocal = [...imgLocal];
                    tempImgsLocal.splice(index, 1);
                    setImgLocal(tempImgsLocal);
                    //remove from update imgs list
                    const tempImgsUpdate = [...imgsUpdate];
                    console.log(imgsUpdate);
                    console.log(tempImgsUpdate);
                    //   delete tempImgsUpdate[index];
                    tempImgsUpdate.splice(index, 1);
                    console.log(index);
                    console.log(tempImgsUpdate);
                    setImgsUpdate(tempImgsUpdate);
                  }}>
                  删除
                </button>
              )}
            </div>
          ))}

        {/* hidden img input */}
        <input
          ref={ref}
          style={{ display: "none" }}
          type='file'
          multiple
          onChange={(e) => {
            // console.log(e.target.files);
            const imgs = e.target.files;
            const imgLocalPath = [];
            for (let i = 0; i < imgs.length; i++) {
              const img = URL.createObjectURL(imgs[i]);
              imgLocalPath.push(img);
            }
            setImgLocal(imgLocalPath);
            setImgsUpdate(imgs);
          }}
        />
      </Grid>
      <Grid item xs={12} className={classes.hrStyle}>
        <CusBtnGroup
          modifying={modifying}
          handleEdit={() => setModifying(true)}
          handleCancel={() => {
            handleCancel();
            setModifying(false);
          }}
          handleDelete={() => {
            dispatch(deleteObject({ flagSlice, api }));
            setJustSubmitted("DELETE");
          }}
          handleSubmit={handleSubmit}
        />
      </Grid>
      {/* code */}
      <Grid item xs={6}>
        <CusInput label='Code' disabled value={pdInfo.code} />
      </Grid>
      {/* name */}
      <Grid item xs={6}>
        <CusInput
          disabled={!modifying}
          label='Name'
          value={pdInfo.name}
          handleChange={(e) =>
            setPdInfo((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Grid>
      {/* brand */}
      <Grid item xs={6}>
        <CusSelectSearch
          disabled={!modifying}
          label='Brand'
          flagSlice={brandSlice}
          api={brandApi}
          defaultSel={pdInfo.brand?.code}
          handleSelect={(val) =>
            val &&
            setPdInfo((prev) => ({
              ...prev,
              brand: { ...prev.brand, _id: val.id, code: val.label },
            }))
          }
        />
      </Grid>
      {/* country */}
      <Grid item xs={6}>
        <CusSelectSearch
          disabled={!modifying}
          label='Nation'
          flagSlice={nationSlice}
          api={nationApi}
          defaultSel={pdInfo.nation?.code}
          handleSelect={(val) =>
            val &&
            setPdInfo((prev) => ({
              ...prev,
              nation: { ...prev.nation, _id: val.id, code: val.label },
            }))
          }
        />
      </Grid>
      {/* categ 1 */}
      <Grid item xs={6}>
        <CusSelectSearch
          disabled={!modifying}
          label='First Categ'
          flagSlice={categSlice + "1"}
          api={categApi}
          defaultSel={pdInfo.categ1?.code}
          handleSelect={(val) => {
            val &&
              setPdInfo((prev) => ({
                ...prev,
                categ1: { ...prev.categ1, _id: val.id, code: val.label },
              }));
            //after change categ 1, clear categ2 options
            setPdInfo((prev) => ({
              ...prev,
              //set code and id to 'space' since empty str will be filtered by condition check
              categ2: { ...prev.categ2, _id: " ", code: " " },
            }));
          }}
        />
      </Grid>
      {/* categ 2 */}
      <Grid item xs={6}>
        <CusSelectSearch
          disabled={!modifying}
          label='Second Categ'
          flagSlice={pdInfo.categ1?.code && categSlice + "2"}
          api={categApi}
          queryUrl={"&Categ_far=" + pdInfo.categ1?._id + "&level=2"}
          defaultSel={pdInfo.categ2?.code}
          handleSelect={(val) =>
            val &&
            setPdInfo((prev) => ({
              ...prev,
              categ2: { ...prev.categ2, _id: val.id, code: val.label },
            }))
          }
        />
      </Grid>
      {/* sort */}
      <Grid item xs={6}>
        <CusInput
          disabled={!modifying}
          label='Sort'
          value={pdInfo.sort}
          handleChange={(e) =>
            setPdInfo((prev) => ({ ...prev, sort: e.target.value }))
          }
        />
      </Grid>
      {/* offSet */}
      <Grid item xs={6}></Grid>
      {/* price regular */}
      <Grid item xs={6}>
        <CusInput
          disabled={!modifying}
          label='Price'
          value={pdInfo.price_regular}
          handleChange={(e) =>
            setPdInfo((prev) => ({ ...prev, price: e.target.value }))
          }
        />
      </Grid>
      {/* unit */}
      <Grid item xs={6}>
        <CusInput
          disabled={!modifying}
          label='Unit'
          value={pdInfo.unit}
          handleChange={(e) =>
            setPdInfo((prev) => ({ ...prev, unit: e.target.value }))
          }
        />
      </Grid>
      {/* desp */}
      <Grid item xs={12}>
        <CusInput
          disabled={!modifying}
          label='Description'
          value={pdInfo.desp}
          handleChange={(e) =>
            setPdInfo((prev) => ({ ...prev, desp: e.target.value }))
          }
        />
      </Grid>
    </Grid>
  );
}
