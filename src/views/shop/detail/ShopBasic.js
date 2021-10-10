import React, { useState, useRef } from "react";
import { get_DNS } from "../../../js/api";
import makeStyles from "@mui/styles/makeStyles";
import { Container } from "@mui/material";
import CusInput from "../../../components/basic/CusInput";

const useStyle = makeStyles({
  root: {},
  mainImg: { height: "300px", width: "300px", cursor: "pointer" },
  formItem: { width: "50%", marginTop: "10px" },
});

export default function ShopBasic(props) {
  const { Shop } = props;
  const classes = useStyle();
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

  return (
    <Container className={classes.root}>
      ShopBasic...
      <div className={classes.formItem}>
        {/* img component */}
        <>
          <img
            alt={props.Shop.code}
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
              setImgLocal(URL.createObjectURL(e.target.files[0]))
            }
          />
        </>
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Code'
          value={infoUpdate.code}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, code: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Name'
          value={infoUpdate.name}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='City'
          value={infoUpdate.city?.code + "(" + infoUpdate.city?.nome + ")"}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, city: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Address'
          value={infoUpdate.addr}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, addr: e.target.value }))
          }
        />
      </div>
      <div className={classes.formItem}>
        <CusInput
          label='Zip'
          value={infoUpdate.zip}
          handleChange={(e) =>
            setInfoUpdate((prev) => ({ ...prev, zip: e.target.value }))
          }
        />
      </div>
    </Container>
  );
}
