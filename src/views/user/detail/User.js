import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";

import UserPutModal from "../modal/UserPutModal";
import UserPwdModal from "../modal/UserPwdModal";

import { selectUser } from "../../../features/authSlice";
import {
  getObject,
  getObjects,
  deleteObject,
  selectObject,
  selectObjects,
  putObject,
  cleanField,
} from "../../../features/objectsSlice";

import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { ReactComponent as EditIcon } from "../../../components/icon/editBlack.svg";
import { ReactComponent as CancelIcon } from "../../../components/icon/cancelBlack.svg";
import { ReactComponent as DoneIcon } from "../../../components/icon/doneBlack.svg";
import { ReactComponent as UserProfileLightGrey } from "../../../components/icon/userProfileLightGrey.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import CusSwitch from "../../../components/basic/CusSwitch";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import FormBox from "./FormBox";

const populateObjs = [{ path: "Shop", select: "code nome" }];

const roleList = [
  { nome: "拥有者", code: 1 },
  { nome: "管理者", code: 3 },
  { nome: "超级员工", code: 5 },
  { nome: "店铺老板", code: 101 },
  { nome: "店铺员工", code: 105 },
];

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

  const [editing, setEditing] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const flagSlice_Shops = "user_Shops";
  const api_Shops = "/Shops";
  const objShops = useSelector(selectObjects(flagSlice_Shops));

  useEffect(() => {
    dispatch(getObjects({ flagSlice: flagSlice_Shops, api: api_Shops }));
  }, [dispatch]);

  const [form, setForm] = useState({});

  function initObj(obj, setter) {
    const { nome, code, phonePre, phone, role } = obj;
    setter({ nome, code, phonePre, phone, role, Shop: object.Shop?.code });
  }
  useEffect(() => {
    initObj(object, setForm);
  }, [object]);

  function handleEdit() {
    //load object to form
    const { nome, code, phonePre, phone, role } = object;
    setForm({ nome, code, phonePre, phone, role, Shop: object.Shop?.code });

    setEditing(!editing);
  }

  function handleSave() {
    console.log("[SAVE]", form);
    dispatch(putObject({ flagSlice, api, data: { general: form } }));
    setEditing(!editing);
    setJustSubmitted("UPDATE");
  }

  function handleLog() {
    console.log("[LOG]", form, fields);
  }

  function populateShops(Shops) {
    let arr = Shops.map((shop) => {
      return { label: shop.nome, id: shop._id };
    });
    return arr;
  }

  function populateRoles(roles) {
    let arr = roles
      .filter((role) => curRole < role.code)
      .map((role) => {
        return { label: role.nome, id: role.code };
      });
    return arr;
  }

  function roleName(roleId) {
    const roleMap = {
      1: "拥有者",
      3: "管理者",
      5: "超级员工",
      101: "店铺老板",
      105: "店铺员工",
    };

    return roleMap[roleId];
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
    { label: "用户列表", to: `/users` },
    { label: "详情" },
  ];

  let fields = [
    {
      label: "用户姓名",
      content: object.nome,
      type: "nome",
      permissions: ["hierachy", "self"],
    },
    {
      label: "登录账号",
      content: object.code,
      type: "code",
      permissions: ["hierachy"],
      check: {
        regexp: "^[a-zA-Z0-9]*$",
        min: 4,
        max: 20,
        errMsg: {
          nullMsg: "成员账号不能为空",
          regexpMsg: "成员账号只能由数字和字母组成",
          minMsg: "成员账号的位数不能小于: ",
          maxMsg: "成员账号的位数不能大于: ",
        },
      },
    },
    {
      variant: {
        name: "phone",
        variantObj: {
          fields: [
            {
              label: "电话",
              content: object.phonePre,
              type: "phonePre",
              permissions: ["hierachy"],
              check: {
                regexp: "^[0-9]*$",
                trim: 4,
                errMsg: {
                  nullMsg: "电话号码前缀不能为空",
                  regexpMsg: "电话号码前缀只能由数字组成",
                  trimMsg: "电话号码前缀长度只能为: ",
                },
              },
            },
            {
              content: object.phone,
              type: "phone",
              permissions: ["hierachy", "self"],
            },
          ],
        },
      },
    },
    {
      label: "用户角色",
      content: roleName(object.role),
      type: "role",
      permissions: ["hierachy"],
      variant: {
        name: "select",
        variantObj: {
          options: populateRoles(roleList),
        },
      },
    },
  ];

  if (object.role > 100) {
    fields.push({
      label: "Shop",
      content: object.Shop?.nome,
      type: "Shop",
      permissions: ["hierachy", "shop"],
      variant: {
        name: "select",
        variantObj: {
          options: populateShops(objShops),
        },
      },
    });
  }

  function setEditable(field) {
    let flag = null;
    field.permissions?.map((permission) => {
      let tmp_flag = null;
      switch (permission) {
        case "hierachy":
          tmp_flag = curRole < object.role;
          break;
        case "self":
          tmp_flag = curUser.code === object.code;
          break;
        case "shop":
          tmp_flag = curRole < object.role;
          if (curRole > 100) tmp_flag = false;
          break;
        default:
          console.log("[PERMISSION]default");
          break;
      }
      flag = flag || tmp_flag;
    });
    if (flag == null) return;
    field.editable = flag;
  }

  fields.map((field) => {
    if (field.variant?.variantObj.fields != null) {
      field.variant?.variantObj.fields.map((v_field) => {
        setEditable(v_field);
      });
    } else {
      setEditable(field);
    }
  });

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
            <CusBtnGroup
              modifying={editing}
              handleEdit={() => setEditing(true)}
              handleCancel={() => {
                initObj(object, setForm);
                setEditing(false);
              }}
              handleDelete={() => {
                deleteDB();
                setJustSubmitted("DELETE");
              }}
              handleSubmit={handleSave}
            />
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
                    onClick={handleEdit}
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
        />

        {/* footer details */}
        {/* <Box mt="25px" ml="25px">
          <ToggleBox checked={object.is_usable} label="Usable" />
        </Box> */}
        <Box ml={3} mt={2}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#0000004D",
              fontWeight: "700",
              bgcolor: "white",
            }}
          >
            USABLE
          </Typography>
          {editing ? (
            <CusSwitch
              checked={object.is_usable}
              handleSwitch={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  is_usable: checked,
                }))
              }
            />
          ) : (
            <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
              {object.is_usable === true ? "YES" : "NO"}
            </Typography>
          )}
        </Box>
        <Grid container mt="25px" ml={3}>
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
