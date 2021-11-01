import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";
import makeStyles from "@mui/styles/makeStyles";
import CusInput from "../../../components/basic/CusInput";
import CusSelectSearch from "../../../components/basic/CusSelectSearch";
import { useSelector, useDispatch } from "react-redux";
import { postObject } from "../../../features/objectsSlice";
import api_DNS from "../../../js/_dns";
// import CusTextArea from "../../../components/basic/CusTextArea";

const useStyle = makeStyles({
  root: {
    "& > div": { padding: "10px 5px" },
  },
});

const brandSlice = "brands";
const brandApi = "/Brands";
const nationSlice = "nations";
const nationApi = "/Nations";
const categSlice = "categs";
const categApi = "/Categs";
const flagSlice = "/pd";
const api = "/pd";
export default function PdPostModal({ show, handleClose, timeout = 500 }) {
  const dispatch = useDispatch();
  const classes = useStyle();
  const ref = useRef();
  const status = useSelector((state) => state.objects.status);
  const [pdInfo, setPdInfo] = useState({
    code: "",
    name: "",
    brand: { code: "", _id: "" }, //code id
    nation: { code: "", _id: "" }, //code nome
    categ2: { code: "", _id: "" }, //code nome
    categ1: { code: "", _id: "" }, //code nome
    sort: 0,
    price_regular: 0,
    unit: "",
    desp: "",
  });
  const [imgLocal, setImgLocal] = useState([]);
  const [showImgDeleteBtn, setShowImgDeleteBtn] = useState(false);
  const [imgsUpdate, setImgsUpdate] = useState();
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    if (justSubmitted === true && status === "succeed") {
      handleClose();
      setJustSubmitted(false);
    }
  }, [justSubmitted, status]);

  const handleSubmit = () => {
    console.log(111);
    const formData = new FormData();
    for (let i = 0; i < imgsUpdate?.length; i++) {
      formData.append("img" + i, imgsUpdate[i]);
    }
    const obj = {
      nome: pdInfo.name,
      Nation: pdInfo.nation._id,
      code: pdInfo.code,
      Brand: pdInfo.brand._id,
      Categ: pdInfo.categ2._id,
      sort: pdInfo.sort,
      unit: pdInfo.unit,
      desp: pdInfo.desp,
      price_regular: pdInfo.price_regular,
    };

    formData.append("obj", JSON.stringify(obj));

    dispatch(postObject({ flagSlice, api, data: formData }));
    setJustSubmitted(true);
  };

  return (
    <Modal
      onHide={handleClose}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <FormattedMessage id="create" defaultMessage="Create" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid container className={classes.root}>
          {/* imgs */}
          <button
            className="btn btn-success mx-3"
            onClick={() => ref.current.click()}
          >
            添加/修改图片
          </button>
          <Grid item container xs={12} style={{ cursor: "pointer" }}>
            {imgLocal.length > 0 &&
              imgLocal.map((img, index) => (
                <div
                  key={img}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingRight: "20px",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "scale-down",
                    }}
                  />
                  {showImgDeleteBtn === true && (
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        //remove from local url
                        const tempImgsLocal = [...imgLocal];
                        tempImgsLocal.splice(index, 1);
                        setImgLocal(tempImgsLocal);
                        //remove from update imgs list
                        const tempImgsUpdate = [...imgsUpdate];
                        // console.log(imgsUpdate);
                        // console.log(tempImgsUpdate);
                        //   delete tempImgsUpdate[index];
                        tempImgsUpdate.splice(index, 1);
                        // console.log(index);
                        // console.log(tempImgsUpdate);
                        setImgsUpdate(tempImgsUpdate);
                      }}
                    >
                      删除
                    </button>
                  )}
                </div>
              ))}

            {/* hidden img input */}
            <input
              ref={ref}
              style={{ display: "none" }}
              type="file"
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
          {/* code */}
          <Grid item xs={6}>
            <CusInput label="Code" disabled value={pdInfo.code} />
          </Grid>
          {/* name */}
          <Grid item xs={6}>
            <CusInput
              label="Name"
              value={pdInfo.name}
              handleChange={(e) =>
                setPdInfo((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Grid>
          {/* brand */}
          <Grid item xs={6}>
            <CusSelectSearch
              label="Brand"
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
              label="Nation"
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
              label="First Categ"
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
              label="Second Categ"
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
              label="Sort"
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
              label="Price"
              value={pdInfo.price_regular}
              handleChange={(e) =>
                setPdInfo((prev) => ({
                  ...prev,
                  price_regular: e.target.value,
                }))
              }
            />
          </Grid>
          {/* unit */}
          <Grid item xs={6}>
            <CusInput
              label="Unit"
              value={pdInfo.unit}
              handleChange={(e) =>
                setPdInfo((prev) => ({ ...prev, unit: e.target.value }))
              }
            />
          </Grid>
          {/* desp */}
          <Grid item xs={12}>
            <CusInput
              label="Description"
              value={pdInfo.desp}
              handleChange={(e) =>
                setPdInfo((prev) => ({ ...prev, desp: e.target.value }))
              }
            />
          </Grid>
        </Grid>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          <FormattedMessage id="confirm" defaultMessage="Confirm" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
