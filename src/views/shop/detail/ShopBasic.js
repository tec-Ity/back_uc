import React, { useState, useRef } from "react";
import { get_DNS } from "../../../js/api";
import makeStyles from "@mui/styles/makeStyles";
import { Container } from "@mui/material";
import CusInput from "../../../components/basic/CusInput";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { 
  // deleteObject,
  putObject } from "../../../features/objectsSlice";

const useStyle = makeStyles({
  root: { border: "1px solid" },
  mainImg: { height: "300px", width: "300px", cursor: "pointer" },
  formItem: { width: "50%", marginTop: "10px" },
  flexStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  btnStyle: { width: "80px" },
});

export default function ShopBasic(props) {
  const { Shop, flagSlice, api } = props;
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = useRef();
  //local img path for display on change
  const [imgLocal, setImgLocal] = useState(null);
  // console.log(Shop);
  const [infoUpdate, setInfoUpdate] = useState({
    code: "",
    name: "",
    city: "",
    addr: "",
    zip: "",
    img_url: "",
  });
  const [modifying, setModifying] = useState(false);
  React.useEffect(() => {
    setInfoUpdate({
      code: Shop?.code || "",
      name: Shop?.nome || "",
      city: Shop?.Cita || "",
      addr: Shop?.addr || "",
      zip: Shop?.zip || "",
      img_url: Shop?.img_url || "",
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
  };

  // const handleDelete = React.useCallback(() => {
  //   dispatch(deleteObject({ flagSlice, api }));
  // });
  return (
    <Container className={classes.root}>
      <div className={clsx(classes.formItem, classes.flexStyle)}>
        {/* img component */}
        <div>
          <img
            alt={infoUpdate.code}
            src={imgLocal ? imgLocal : get_DNS() + infoUpdate.img_url}
            className={classes.mainImg}
            onClick={() => ref.current.click()}
            title='更换图片'
          />
          <input
            ref={ref}
            type='file'
            multiple={false} //ctrl on need
            style={{ display: "none" }}
            onChange={(e) =>
              {setImgLocal(URL.createObjectURL(e.target.files[0]))
              setInfoUpdate((prev)=>({...prev, img:e.target.files[0]}))
              }
            }
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
              <button className={clsx("btn mx-3 btn-danger", classes.btnStyle)}>
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
        <CusInput
          label='City'
          disabled
          value={infoUpdate.city?.code + "(" + infoUpdate.city?.nome + ")"}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, city: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Address'
          disabled
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
