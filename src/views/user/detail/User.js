import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";

import UserPutModal from "../modal/UserPutModal";
import UserPwdModal from "../modal/UserPwdModal";
import NavBread from "../../../components/universal/navBread/NavBread";

// import { selectUser } from "../../../features/authSlice";
import {
  getObject,
  deleteObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactComponent as EditIcon } from "../../../components/icon/editBlack.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import VarietyInput from "./VarietyInput";

const useStyle = makeStyles({
  infobox: {
    height: "50px",
    width: "286px",
  },
  label: {
    marginRight: "10px",
  },
});

export default function User() {
  const hist = useHistory();
  const dispatch = useDispatch();

  const flagSlice = "user";
  const flagField = "object";
  const { id } = useParams();
  const api = `/user/${id}`;
  const api_delete = "/User/" + id;

  // const curUser = useSelector(selectUser);
  const curRole = parseInt(localStorage.getItem("role"));
  const object = useSelector(selectObject(flagSlice));

  const rolePath = getRolePath();

  const [modalPut, setModalPut] = useState(false);
  const [modalPwd, setModalPwd] = useState(false);

  const deleteDB = () => {
    dispatch(deleteObject({ flagSlice, api: api_delete, id }));
    hist.replace(`/${rolePath}/users`);
  };

  useEffect(() => {
    dispatch(getObject({ flagSlice, api }));
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);

  const classes = useStyle();
  const [editing, setEditing] = useState(false);
  const [formdata, setFormdata] = useState();

  function handleChange(props) {
    setFormdata(props.target.value);
    console.log(props.target.value);
  }

  function InfoBox({ label, content, type, variant, noBox }) {
    const { 1: userPerms } = permMap;
    return (
      <Grid item xs={1}>
        <Box
          sx={{
            border: noBox || !(editing && userPerms.includes(type)) ? 0 : 1,
            p: "10px",
            mt: "10px",
            position: "relative",
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#0000004D",
              fontWeight: "700",
              position: "absolute",
              top: "-10px",
              bgcolor: "white",
            }}
          >
            {label}
          </Typography>
          {
            editing && userPerms.includes(type) ? (
              <VarietyInput
                content={content}
                variant={variant}
                handleChange={handleChange}
              />
            ) : (
              <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
                {content}
              </Typography>
            )
            // (!variant && (
            //   <TextField
            //     id="standard-basic"
            //     defaultValue={content}
            //     variant="standard"
            //     InputProps={{ disableUnderline: true }}
            //   />
            // )
            // variant == "shop" && (
            //   <TextField
            //     id="standard-basic"
            //     defaultValue={content}
            //     variant="standard"
            //     select
            //     InputProps={{ disableUnderline: true }}
            //   />
            // ))
          }
        </Box>
      </Grid>
    );
  }

  function FooterBox({ label = "label", content = "content", variant, noBox }) {
    return (
      <Box className={classes.infobox} mt="5px">
        <Typography
          sx={{ fontSize: "16px", color: "#0000004D", fontWeight: "700" }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
          {content}
        </Typography>
      </Box>
    );
  }

  const links = [
    { label: "主页", to: "/ower/home" },
    { label: "用户列表", to: "/ower/users" },
    { label: "详情" },
  ];

  const permMap = {
    1: ["uid", "name", "role", "shop", "phone", "usable"],
    3: ["name", "role"],
  };

  return (
    <>
      <ListPageHeader links={links} showSearch={false} showAddIcon={false} />
      {/* <NavBread
        activePage={
          <FormattedMessage id="navLabel-user" defaultMessage="user" />
        }
      >
        <Link to={`/${rolePath}/users`}>
          <FormattedMessage id="navLabel-users" defaultMessage="users" />
        </Link>
      </NavBread> */}
      {
        // 数据正确
        object._id && String(object._id) === String(id) && (
          <div className="text-right">
            {
              // 如果比自己等级低 可删除
              curRole < object.role && (
                <>
                  <button className="btn btn-danger mx-4" onClick={deleteDB}>
                    <i className="bx bx-trash"></i>
                  </button>
                </>
              )
            }

            <button
              className="btn btn-warning mx-3"
              onClick={() => setModalPwd(true)}
            >
              {" "}
              <i className="bx bx-lock-open"></i>{" "}
            </button>
            <UserPwdModal
              show={modalPwd}
              onHide={() => setModalPwd(false)}
              object={object}
              flagSlice={flagSlice}
            />

            <button className="btn btn-info" onClick={() => setModalPut(true)}>
              {" "}
              <i className="bx bx-edit-alt"></i>{" "}
            </button>
            <UserPutModal
              show={modalPut}
              onHide={() => setModalPut(false)}
              object={object}
              flagSlice={flagSlice}
            />
            <IconButton onClick={() => setEditing(!editing)}>
              <EditIcon />
            </IconButton>
          </div>
        )
      }

      <Box sx={{ width: "50%" }}>
        <Grid
          container
          columns={2}
          spacing="17px"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <InfoBox label="登录账号" type="uid" content={object.code} />
          <InfoBox label="用户角色" type="role" content={object.role} />
          <InfoBox label="用户姓名" type="name" content={object.nome} />
          <InfoBox
            label="Shop"
            type="shop"
            content={object.Shop?.code}
            variant="shop"
          />
          <Grid container columns={2} spacing={1} item xs={1}>
            <InfoBox
              label="电话"
              type="phone"
              content={object.phonePre}
              variant="prefix"
            />
            <InfoBox type="phone" content={object.phone} />
          </Grid>
          <InfoBox
            label="是否可用"
            type="usable"
            content={object.is_usable}
            noBox
          />
        </Grid>
        <Box mt="44px">
          <FooterBox
            label="最近登录"
            content={object.at_last_login}
            variant="footer"
          />
        </Box>
        <Grid container columns={2} spacing="17px">
          <Grid item xs={1}>
            <Button variant="contained" fullWidth>
              SAVE
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="secondary" fullWidth>
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="error" fullWidth>
              DELETE
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <div className="row mt-3">
        <div className="col-4 col-md-2"> 登录账号: </div>
        <div className="col-8 col-md-10"> {object.code} </div>
      </div>
      <div className="row mt-3">
        <div className="col-4 col-md-2"> 用户姓名: </div>
        <div className="col-8 col-md-10"> {object.nome} </div>
      </div>
      <div className="row mt-3">
        <div className="col-4 col-md-2"> 电话: </div>
        {object.phone && (
          <div className="col-8 col-md-10">
            {" "}
            {object.phonePre} {object.phone}
          </div>
        )}
      </div>
      <div className="row mt-3">
        <div className="col-4 col-md-2"> 用户角色: </div>
        <div className="col-8 col-md-10"> {object.role} </div>
      </div>
      <div className="row mt-3">
        <div className="col-4 col-md-2"> 是否可用: </div>
        <div className="col-8 col-md-10"> {object.is_usable} </div>
      </div>
      <div className="row mt-3">
        <div className="col-4 col-md-2"> 最近登录: </div>
        <div className="col-8 col-md-10"> {object.at_last_login} </div>
      </div>
      {object.Shop && (
        <div className="row mt-3">
          <div className="col-4 col-md-2"> 所属店铺: </div>
          <div className="col-8 col-md-10"> {object.Shop.code} </div>
        </div>
      )} */}
    </>
  );
}
