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
// import { ReactComponent as Delete } from "../../../components/icon/delete.svg";
import shopDefaul from "../../../components/icon/Shop.jpg";
import { getRolePath } from "../../../js/conf/confUser";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import { useHistory } from "react-router";

const useStyle = makeStyles({
  root: {},
  mainImg: {
    height: "300px",
    width: "300px",
    position: "relative",
  },
  formItem: { width: "50%", marginTop: "10px" },
  flexStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  withBg: {
    border: "2px solid #1d1d384d",
    backgroundColor: "#fff",
    position: "relative",
    cursor: "pointer",
  },
  bgText: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
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
  const [reset, setReset] = useState(0);
  const hist = useHistory();
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
  const [modifyingImg, setModifyingImg] = useState(false);
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
    reset,
  ]);

  React.useEffect(() => {
    if (justSubmitted === "DELETE" && status === "succeed") {
      window.location.replace(`/${rolePath}/shops`);
    }
    if (justSubmitted === "UPDATE" && status === "succeed") {
      hist.push(`/${rolePath}/reload`);
    }
  });

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

    dispatch(
      putObject({
        flagSlice,
        api,
        data: formData,
      })
    );
    setJustSubmitted("UPDATE");
  };

  const handleSubmitImg = () => {
    const formData = new FormData();
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

  return (
    <Container className={classes.root}>
      <div className={clsx(classes.formItem, classes.flexStyle)}>
        {/* img component */}
        <div
          onClick={() => modifyingImg === true && ref.current.click()}
          className={modifyingImg === true ? classes.withBg : ""}>
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
              cursor: modifyingImg === true ? "pointer" : "default",
              opacity: modifyingImg === true ? "0.6" : "1",
            }}
            title='更换图片'
          />
          {modifyingImg === true && (
            <div className={classes.bgText}>点击更换</div>
          )}
          {/* hidden img input */}
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
          <CusBtnGroup
            disableDelete
            modifying={modifyingImg}
            handleEdit={() => {
              if (modifying === true) {
                alert("Please save last change");
                return;
              }
              setModifyingImg(true);
            }}
            handleCancel={() => {
              setModifyingImg(false);
              setReset((prev) => prev + 1);
            }}
            handleSubmit={handleSubmitImg}
          />
        </div>
      </div>
      {/* ------------------ hr ------------------------- */}
      <div
        style={{
          width: "100%",
          borderTop: "2px solid #0000004d",
          marginTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <CusBtnGroup
          modifying={modifying}
          handleEdit={() => {
            if (modifyingImg === true) {
              alert("Please save last change");
              return;
            }
            setModifying(true);
          }}
          handleCancel={() => {
            setModifying(false);
            setReset((prev) => prev + 1);
          }}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
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
        <CusSelectSearch
          disabled={!modifying}
          label='City'
          flagSlice='Citas'
          api='/Citas'
          defaultSel={infoUpdate.city?.code}
          handleSelect={(val) => {
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
