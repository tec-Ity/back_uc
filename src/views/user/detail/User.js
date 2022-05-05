import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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

import { Box, Grid, Typography } from "@mui/material";
import { ReactComponent as UserProfileLightGrey } from "../../../components/icon/userProfileLightGrey.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import CusSwitch from "../../../components/basic/CusSwitch";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import FormBox from "./FormBox";
import { FormattedMessage } from "react-intl";
import { ReactComponent as Edit } from "../../../components/icon/edit.svg";
import { makeStyles } from "@mui/styles";

const populateObjs = [{ path: "Shop", select: "code nome" }];

const roleList = [
  { nome: "拥有者", code: 1 },
  { nome: "管理者", code: 3 },
  { nome: "超级员工", code: 5 },
  { nome: "店铺老板", code: 101 },
  { nome: "店铺员工", code: 105 },
];

const useStyle = makeStyles({
  passButton: { "& rect": { fill: "#00ff00" } },
  putButton: { "& rect": { fill: "#0000ff" } },
});

export default function User() {
  const classes = useStyle();
  const hist = useHistory();
  const dispatch = useDispatch();

  const curUser = useSelector(selectUser);
  const curRole = parseInt(localStorage.getItem("role"));
  const rolePath = getRolePath();

  const flagSlice = "user";
  const flagField = "object";
  const { id } = useParams();
  const api = `/user/${id}`;
  const api_delete = "/User/" + id;
  const flagSlice_Shops = "user_Shops";
  const api_Shops = "/Shops";

  const object = useSelector(selectObject(flagSlice));
  const objShops = useSelector(selectObjects(flagSlice_Shops));

  const checksRef = useRef();

  useEffect(() => {
    dispatch(
      getObject({
        flagSlice,
        api: api + "?populateObjs=" + JSON.stringify(populateObjs),
      })
    );
    dispatch(getObjects({ flagSlice: flagSlice_Shops, api: api_Shops }));

    //GET error checks
    axios
      .get("http://dev.unioncityitaly.com/api/b1/Stint")
      .then(({ data: { data: checksData } }) => {
        // console.log("axios", res.data.data);
        checksRef.current = checksData;
      })
      .catch((err) => console.error(err));
    return () => {
      dispatch(cleanField({ flagSlice, flagField }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, dispatch]);

  const [modalPut, setModalPut] = useState(false);
  const [modalPwd, setModalPwd] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});

  function initForm(obj, setter) {
    const { nome, code, phonePre, phone, role } = obj;
    setter({ nome, code, phonePre, phone, role, Shop: object.Shop?._id });
  }
  useEffect(() => {
    if (object._id) {
      initForm(object, setForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [object]);

  // const status = useSelector((state) => state.objects.status);
  // useEffect(() => {
  //   if (justSubmitted === "UPDATE" && status === "succeed") {
  //   }
  // }, [status, rolePath, justSubmitted, object._id]);

  function deleteDB() {
    dispatch(deleteObject({ flagSlice, api: api_delete, id }));
    hist.replace(`/${rolePath}/users`);
    // setJustSubmitted("DELETE");
  }

  function handleEdit() {
    //load object to form
    initForm(object, setForm);
    setIsEditing(true);
  }
  function handleSave() {
    const filter = {};
    if (form["role"] < 100) {
      filter.Shop = null;
    }

    console.log("[SAVE]", { ...form, ...filter });
    dispatch(
      putObject({
        flagSlice,
        api: api + "?populateObjs=" + JSON.stringify(populateObjs),
        data: { general: { ...form, ...filter } },
      })
    );
    setIsEditing(!isEditing);
    // setJustSubmitted("UPDATE");
  }
  //add buttons
  const otherButtons = [
    {
      label: "btnLabel-editPass",
      style: { backgroundColor: "#00ff00", order: "-1" },
      icon: <Edit className={classes.passButton} />,
      handler: () => setModalPwd(true),
    },
    {
      label: "put modal",
      style: { backgroundColor: "#0000ff", order: "-2" },
      icon: <Edit className={classes.putButton} />,
      handler: () => setModalPut(true),
    },
  ];

  function populateShops(Shops) {
    let arr = Shops.map((shop) => {
      return { label: shop.nome, id: shop._id };
    });
    return arr;
  }
  function populateRoles(roles) {
    let arr = roles
      .filter(
        (role) =>
          curRole < role.code ||
          (curRole === role.code && curUser.code === object.code)
      )
      .map((role) => {
        return {
          // label: <FormattedMessage id={`role-${role.code}`} />,
          // label: role.nome,
          id: role.code,
        };
      });
    return arr;
  }

  const links = [{ label: "users", to: `/users` }, { label: "user" }];

  const fields = [
    {
      label: <FormattedMessage id="inputLabel-name" />,
      content: object.nome,
      type: "nome",
      permissions: ["hierachy", "self"],
    },
    {
      label: <FormattedMessage id="inputLabel-code" />,
      content: object.code,
      type: "code",
      permissions: ["hierachy"],
    },
    {
      label: <FormattedMessage id="inputLabel-phone" />,
      content: object.phonePre,
      type: "phonePre",
      permissions: ["hierachy", "self"],
      ratio: 1 / 3,
    },
    {
      content: object.phoneNum,
      type: "phoneNum",
      permissions: ["hierachy", "self"],
      ratio: 2 / 3,
    },
    {
      label: <FormattedMessage id="inputLabel-role" />,
      content: <FormattedMessage id={`role-${object.role}`} />,
      type: "role",
      permissions: ["hierachy"],
      inputType: {
        type: "select",
        options: populateRoles(roleList),
      },
    },
  ];

  //add shop field
  if (form["role"] > 100) {
    fields.push({
      label: <FormattedMessage id="inputLabel-shop" />,
      content: object.Shop?.nome,
      type: "Shop",
      ...(curRole > 100
        ? {
            inputType: { type: "static" },
            editable: false,
          }
        : {
            inputType: {
              type: "autocomplete",
              options: populateShops(objShops),
            },
            permissions: ["hierachy", "shop"],
          }),
    });
  }

  //add permissions function
  function checkEditable(field) {
    if (field.inputType?.[0] === "static") return (field.editable = false);
    // if (curRole === 1) return (field.editable = true);

    if (field.permissions) {
      let isPermitted = false;

      field.permissions.forEach((permission) => {
        let tmp_flag;
        switch (permission) {
          // case "hierachy":
          //   isPermitted = isPermitted || curRole < object.role;
          //   break;
          case "self":
            isPermitted = isPermitted || curUser.code === object.code;
            break;
          case "shop":
            isPermitted = curRole < object.role;
            if (curRole > 100) tmp_flag = false;
            break;
          default:
            // console.log("[PERMISSION]default");
            break;
        }
        isPermitted = isPermitted || tmp_flag;
      });
      return (field.editable = isPermitted);
    } else {
      return null;
    }
  }
  for (const field of fields) {
    //add perms
    checkEditable(field);

    //add checks
    if (checksRef.current) {
      switch (field.type) {
        case "code":
          field.check = checksRef.current.User.code;
          break;
        case "phonePre":
          field.check = checksRef.current.User.phonePre;
          break;
        case "phoneNum":
          field.check = checksRef.current.User.phoneNum;
          break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <ListPageHeader links={links} showSearch={false} showAddIcon={false} />
      {
        // 数据正确
        object._id && String(object._id) === String(id) && (
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "46px",
              }}
            >
              <UserProfileLightGrey />
              <UserPutModal
                show={modalPut}
                onHide={() => setModalPut(false)}
                object={object}
                flagSlice={flagSlice}
              />
              <UserPwdModal
                show={modalPwd}
                onHide={() => setModalPwd(false)}
                object={object}
                flagSlice={flagSlice}
              />
              <CusBtnGroup
                modifying={isEditing}
                disableDelete={!(object.role > curRole)}
                handleEdit={handleEdit}
                handleCancel={() => {
                  initForm(object, setForm);
                  setIsEditing(false);
                }}
                handleDelete={deleteDB}
                handleSubmit={handleSave}
                other_buttons={otherButtons}
              />
            </div>
            {/* main details */}
            <FormBox
              fields={fields}
              stateHandler={[form, setForm]}
              editing={isEditing}
            />
            <Box ml={3} mt={2}>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#0000004D",
                  fontWeight: "700",
                  bgcolor: "white",
                }}
              >
                <FormattedMessage id="inputLabel-is_usable" />
              </Typography>
              {isEditing ? (
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
            {/* footer details */}
            <Grid container mt="25px" ml={3}>
              <FooterBox
                label={<FormattedMessage id="inputLabel-lastLogin" />}
                content={object.at_last_login}
              />
            </Grid>
          </Box>
        )
      }
    </>
  );
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
