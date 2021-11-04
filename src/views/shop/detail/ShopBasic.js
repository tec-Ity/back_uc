import React, { useState, useRef } from "react";
import { get_DNS } from "../../../js/api";
import makeStyles from "@mui/styles/makeStyles";
import { Container } from "@mui/material";
import CusInput from "../../../components/basic/CusInput";
import CusSelectSearch from "../../../components/basic/CusSelectSearch";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  // deleteObject,
  putObject,
} from "../../../features/objectsSlice";
import { ReactComponent as Delete } from "../../../components/icon/delete.svg";
import shopDefaul from "../../../components/icon/Shop.jpg";
import { getRolePath } from "../../../js/conf/confUser";

const useStyle = makeStyles({
  root: {},
  mainImg: {
    height: "300px",
    width: "300px",
    background: "transparent",
  },
  formItem: { width: "50%", marginTop: "10px" },
  flexStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  btnStyle: { width: "80px" },
  deleteStyle: {
    "& rect": {
      fill: "#D83535",
    },
    position: "absolute",
    top: "3px",
    right: "3px",
  },
});

export default function ShopBasic(props) {
  const { Shop, flagSlice, api } = props;
  const classes = useStyle();
  const rolePath = getRolePath();
  const dispatch = useDispatch(); 
  const ref = useRef();
  const status = useSelector((state) => state.objects.status);
  const [justSubmitted, setJustSubmitted] = useState(null);

  //local img path for display on change
  const [imgLocal, setImgLocal] = useState(null);
  const [infoUpdate, setInfoUpdate] = useState({
    code: "",
    name: "",
    city: "",
    addr: "",
    zip: "",
    img: "",
  });
  const [modifying, setModifying] = useState(false);
  React.useEffect(() => {
    setInfoUpdate({
      code: Shop?.code || "",
      name: Shop?.nome || "",
      city: Shop?.Cita || "",
      addr: Shop?.addr || "",
      zip: Shop?.zip || "",
      img: Shop?.img_url || "",
    });
  }, [
    Shop?.Cita,
    Shop?.addr,
    Shop?.code,
    Shop?.img_url,
    Shop?.nome,
    Shop?.zip,
  ]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append(
      "obj",
      JSON.stringify({
        code: infoUpdate.code,
        nome: infoUpdate.name,
        zip: infoUpdate.zip,
        Cita: infoUpdate.city?._id,
        addr: infoUpdate.addr,
      })
    );
    formData.append("img", infoUpdate.img);
    dispatch(
      putObject({
        flagSlice,
        api,
        data: formData,
      })
    );
    setJustSubmitted("UPDATE");
  };

  const handleDelete = () => {
    dispatch(deleteObject({ flagSlice, api }));
    setJustSubmitted("DELETE");
  };

  React.useEffect(() => {
    if (justSubmitted === "DELETE" && status === "succeed") {
      window.location.replace(`/${rolePath}/shops`);
    }
  });

  return (
    <Container className={classes.root}>
      <div className={clsx(classes.formItem, classes.flexStyle)}>
        {/* img component */}
        <div
          onClick={() => modifying === true && ref.current.click()}
          style={{
            padding: "5px",
            position: "relative",
            border: modifying === true ? "2px solid #1d1d384d" : "none",
          }}>
          <img
            alt={infoUpdate.code}
            src={
              imgLocal
                ? imgLocal
                : Shop?.img_url
                ? get_DNS() + Shop?.img_url
                : shopDefaul
            }
            className={classes.mainImg}
            style={{
              cursor: modifying === true ? "pointer" : "default",
            }}
            title='更换图片'
          />
          {modifying === true && <Delete className={classes.deleteStyle} />}
          <input
            ref={ref}
            type='file'
            multiple={false} //ctrl on need
            style={{ display: "none" }}
            onChange={(e) => {
              setImgLocal(URL.createObjectURL(e.target.files[0]));
              setInfoUpdate((prev) => ({ ...prev, img: e.target.files[0] }));
            }}
          />
        </div>
        <div>
          {modifying === false ? (
            <>
              <button
                className={clsx("btn mx-3 btn-warning", classes.btnStyle)}
                onClick={() => setModifying(true)}>
                Edit
              </button>
              <button
                className={clsx("btn mx-3 btn-danger", classes.btnStyle)}
                onClick={handleDelete}>
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className={clsx("btn mx-3 btn-success", classes.btnStyle)}
                onClick={handleSubmit}>
                Done
              </button>
              <button
                className={clsx("btn mx-3 btn-warning", classes.btnStyle)}
                onClick={() => setModifying(false)}>
                Cancle
              </button>
              <button className={clsx("btn mx-3 btn-danger", classes.btnStyle)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Code'
          disabled={!modifying}
          value={infoUpdate.code}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, code: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Name'
          disabled={!modifying}
          value={infoUpdate.name}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        {/* <CusInput
          label='City'
          disabled
          value={infoUpdate.city?.code + " (" + infoUpdate.city?.nome + ")"}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, city: e.target.value }))
          }
        /> */}

        <CusSelectSearch
          disabled={!modifying}
          label='City'
          flagSlice='Citas'
          api='/Citas'
          defaultSel={infoUpdate.city?.code}
          handleSelect={(val) => {
            console.log(val);
            val &&
              setInfoUpdate((prev) => ({
                ...prev,
                city: { ...prev.city, code: val.label, _id: val.id },
              }));
          }}
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Address'
          disabled={!modifying}
          value={infoUpdate.addr}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, addr: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Zip'
          disabled={!modifying}
          value={infoUpdate.zip}
          handleChange={(e) =>
            !isNaN(e.target.value) &&
            setInfoUpdate((prev) => ({ ...prev, zip: e.target.value }))
          }
        />
      </div>
    </Container>
  );
}
