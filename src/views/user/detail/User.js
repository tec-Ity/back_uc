import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import confUser, { getRolePath } from "../../../js/conf/confUser";

import UserPutModal from "../modal/UserPutModal";
import UserPwdModal from "../modal/UserPwdModal";
// import NavBread from "../../../components/universal/navBread/NavBread";

import { selectUser } from "../../../features/authSlice";
import {
  getObject,
  getObjects,
  deleteObject,
  selectObject,
  selectObjects,
  cleanField,
} from "../../../features/objectsSlice";

import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { ReactComponent as EditIcon } from "../../../components/icon/editBlack.svg";
import { ReactComponent as CancelIcon } from "../../../components/icon/cancelBlack.svg";
import { ReactComponent as DoneIcon } from "../../../components/icon/doneBlack.svg";
import { ReactComponent as UserProfileLightGrey } from "../../../components/icon/userProfileLightGrey.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import FormBox from "./FormBox";
import ToggleBox from "./ToggleBox";

const useStyle = makeStyles({
  infobox: {
    height: "50px",
    width: "286px",
  },
  label: {
    marginRight: "10px",
  },
});


const populateObjs = [{ path: "Shop", select: "code nome" }];

export default function User() {
  const hist = useHistory();
  const dispatch = useDispatch();

  const flagSlice = "user";
  const flagField = "object";
  const { id } = useParams();
  const api = `/user/${id}`;
  const api_delete = "/User/" + id;

  const curUser = useSelector(selectUser);
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
    dispatch(
      getObject({
        flagSlice,
        api: api + "?populateObjs=" + JSON.stringify(populateObjs),
      })
    );
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
  }, [api, dispatch]);


  const classes = useStyle();

  const [editing, setEditing] = useState(false);
  const flagSlice_Shops = "user_Shops";
  const api_Shops = "/Shops";
  const classes = useStyle();
  const objShops = useSelector(selectObjects(flagSlice_Shops));

  useEffect(() => {
    dispatch(getObjects({ flagSlice: flagSlice_Shops, api: api_Shops }));
  }, [editing]);

  const [form, setForm] = useState({});
  useEffect(() => {
    const { nome, code, phonePre, phone, role } = object;
    setForm({ nome, code, phonePre, phone, role });
  }, [object]);

  function handleSave() {
    console.log("[SAVE]", form);
    setEditing(!editing);
  }

  function handleLog() {
    console.log("[LOG]", object);
  }

  function populateShops(Shops) {
    let arr = Shops.map((shop) => {
      return { label: shop.nome, id: shop.code };
    });
    return arr;
  }

  function FooterBox({ label, content }) {
    return (
      <>
        <Grid item xs={12} sm={3}>
          <Typography
            sx={{ fontSize: "16px", color: "#0000004D", fontWeight: "700" }}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs="auto" sm="auto">
          <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
            {content}
          </Typography>
        </Grid>
      </>
    );
  }

  const links = [
    { label: "主页", to: `/home` },
    { label: "用户列表", to: `/users`, prevView: true  },
    { label: "详情" },
  ];

  const permMap = {
    1: ["code", "name", "shop", "phone", "usable", "phonePre"],
    3: ["name", "role"],
    5: ["name"],
    101: ["name"],
    105: ["name"],
  };

  const fields = [
    {
      label: "用户姓名",
      type: "nome",
      permissions: ["hierachy", "self"],
    },
    {
      label: "登录账号",
      type: "code",
    },
    {
      variant: {
        name: "phone",
        variantObj: {
          fields: [{ label: "电话", type: "phonePre" }, { type: "phone" }],
        },
      },
    },
    {
      label: "用户角色",
      type: "role",
      variant: {
        name: "role",
        variantObj: {
          options: [
            { label: "拥有者", id: 1 },
            { label: "管理者", id: 3 },
            { label: "超级员工", id: 5 },
            { label: "店铺老板", id: 101 },
            { label: "店铺员工", id: 105 },
          ],
        },
      },
    },
    {
      label: "Shop",
      type: "Shop",
      variant: {
        name: "shop",
        variantObj: {
          options: populateShops(objShops),
        },
      },
    },
  ];

  return (
    <>
      <ListPageHeader links={links} showSearch={false} showAddIcon={false} />
      {
        // 数据正确
        object._id && String(object._id) === String(id) && (
          <Box
            height="180px"
            width="100%"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <UserProfileLightGrey />
            <Box>
              <div className="text-right">
                {/* {
              // 如果比自己等级低 可删除
            } */}
                <button
                  className="btn btn-info"
                  onClick={() => setModalPut(true)}
                >
                  {" "}
                  <i className="bx bx-edit-alt"></i>{" "}
                </button>
                <UserPutModal
                  show={modalPut}
                  onHide={() => setModalPut(false)}
                  object={object}
                  flagSlice={flagSlice}
                />

                <IconButton onClick={handleLog}>
                  <DoneIcon />
                </IconButton>

                {editing && curRole < object.role && (
                  <Button variant="contained" color="error" onClick={deleteDB}>
                    删除此用户
                  </Button>
                )}
                {editing && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setModalPwd(true)}
                  >
                    修改密码
                  </Button>
                )}
                <UserPwdModal
                  show={modalPwd}
                  onHide={() => setModalPwd(false)}
                  object={object}
                  flagSlice={flagSlice}
                />
                {editing && (
                  <IconButton onClick={handleSave}>
                    <DoneIcon />
                  </IconButton>
                )}
                {!editing ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={!editing ? <EditIcon /> : <CancelIcon />}
                    onClick={() => {
                      //load object to form
                      const { code, nome, phonePre, phone, role } = object;
                      const Shop = object.Shop ? object.Shop._id : null;
                      setForm({ code, nome, phonePre, phone, role });

                      setEditing(!editing);
                    }}
                  >
                    编辑
                  </Button>
                ) : (
                  <IconButton
                    onClick={() => {
                      setEditing(!editing);
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                )}
              </div>
            </Box>
          </Box>
        )
      }

      <Box mt="46px" sx={{ maxWidth: "100%" }}>
        {/* main details */}
        <FormBox
          data={{ fields: fields, object: object }}
          agent={curUser}
          stateHandler={[form, setForm]}
          editing={editing}
          permMap={permMap}
        />
        {/* <Grid container columns={{ xs: 1, sm: 4 }} spacing="0">
          {fields.map((field) => {
            if (field.variant?.name === "phone") {
              return (
                <Grid
                  container
                  columns={{ xs: 3, sm: 3 }}
                  spacing={0}
                  item
                  borderTop={1}
                  xs={1}
                  sm={1}
                >
                  {field.variant.variantObj.fields.map((variantField) => {
                    return (
                      <Grid item xs={1} sm={2}>
                        <InfoBox
                          label={variantField.label}
                          type={variantField.type}
                          object={object}
                          editing={editing}
                          form={form}
                          setForm={setForm}
                          noBox={variantField.noBox}
                          variant={field.variant}
                          curUser={curUser}
                          curRole={curRole}
                          permMap={permMap}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              );
            }
            return (
              <Grid item xs={1} sm={1} width="100%" borderTop={1}>
                <InfoBox
                  label={field.label}
                  type={field.type}
                  object={object}
                  editing={editing}
                  form={form}
                  setForm={setForm}
                  noBox={field.noBox}
                  variant={field.variant}
                  curUser={curUser}
                  curRole={curRole}
                  permMap={permMap}
                />
              </Grid>
            );
          })}
          <Grid item xs sm width="100%" borderTop={1}></Grid>
          <Grid item xs sm width="100%" borderTop={1}>
            <Box width="1000px"></Box>
          </Grid>
        </Grid> */}

        {/* footer details */}
        <Box mt="25px" ml="25px">
          <ToggleBox checked={object.is_usable} label="Usable" />
        </Box>
        <Grid container mt="25px">
          <FooterBox label="最近登录" content={object.at_last_login} />
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
