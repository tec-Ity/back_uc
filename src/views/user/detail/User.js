import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";
// import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";

import { getRolePath } from "../../../js/conf/confUser";

import UserPutModal from "../modal/UserPutModal";
import UserPwdModal from "../modal/UserPwdModal";
// import NavBread from "../../../components/universal/navBread/NavBread";

// import { selectUser } from "../../../features/authSlice";
import {
  getObject,
  deleteObject,
  selectObject,
  cleanField,
} from "../../../features/objectsSlice";

import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { ReactComponent as EditIcon } from "../../../components/icon/editBlack.svg";
import { ReactComponent as CancelIcon } from "../../../components/icon/cancelBlack.svg";
import { ReactComponent as DoneIcon } from "../../../components/icon/doneBlack.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import InfoBox from "./InfoBox";

// const useStyle = makeStyles({
//   infobox: {
//     height: "50px",
//     width: "286px",
//   },
//   label: {
//     marginRight: "10px",
//   },
// });

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

  // const classes = useStyle();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!editing) return;
    const { code, nome, phonePre, phone, role } = object;
    // const Shop = object.Shop ? object.Shop._id : null;
    setForm({ code, nome, phonePre, phone, role });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [object]);

  function handleSave() {
    console.log(form);
    // setEditing(!editing);
  }

  function FooterBox({ label = "label", content = "content", variant, noBox }) {
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

  const permMap = {
    1: ["code", "name", "shop", "phone", "usable", "phonePre"],
    3: ["name", "role"],
    5: ["name"],
    101: ["name"],
    105: ["name"],
  };

  const fields = [
    {
      label: "登录账号",
      type: "code",
      content: object.code,
    },
    {
      label: "用户角色",
      type: "role",
      content: object.role,
    },
    {
      label: "用户姓名",
      type: "name",
      content: object.nome,
    },
    {
      label: "Shop",
      type: "shop",
      content: object.shop?.code,
      variant: "shop",
      variantObj: {
        testlist: [
          { label: "The Shawshank Redemption", year: 1994 },
          { label: "The Godfather", year: 1972 },
          { label: "The Godfather: Part II", year: 1974 },
          { label: "The Dark Knight", year: 2008 },
          { label: "12 Angry Men", year: 1957 },
          { label: "Schindler's List", year: 1993 },
        ],
      },
    },
    {
      variant: "phone",
      variantObj: {
        fields: [
          { label: "电话", type: "phonePre", content: object.phonePre },
          {
            type: "phone",
            content: object.phone,
          },
        ],
      },
    },
    {
      label: "是否可用",
      type: "usable",
      content: object.is_usable,
      noBox: true,
    },
  ];

  return (
    <>
      <ListPageHeader links={links} showSearch={false} showAddIcon={false} />
      {
        // 数据正确
        object._id && String(object._id) === String(id) && (
          <div className="text-right">
            {/* {
              // 如果比自己等级低 可删除
            } */}
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
                  // const Shop = object.Shop ? object.Shop._id : null;
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
                  // setForm({});
                }}
              >
                <CancelIcon />
              </IconButton>
            )}
          </div>
        )
      }

      <Box sx={{ maxWidth: "70%" }}>
        {/* main details */}
        <Grid
          container
          columns={{ xs: 1, sm: 2 }}
          spacing="17px"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {fields.map((field) => {
            if (field.variant === "phone") {
              return (
                <Grid
                  container
                  columns={{ xs: 2, sm: 2 }}
                  spacing={1}
                  item
                  xs={1}
                  sm={1}
                >
                  {field.variantObj.fields.map((variantField) => {
                    return (
                      <InfoBox
                        label={variantField.label}
                        type={variantField.type}
                        content={variantField.content}
                        editing={editing}
                        form={form}
                        setForm={setForm}
                        noBox={variantField.noBox}
                        variant={field.variant}
                        variantObj={field.variantObj}
                        curRole={curRole}
                        permMap={permMap}
                      />
                    );
                  })}
                </Grid>
              );
            }
            return (
              <InfoBox
                label={field.label}
                type={field.type}
                content={field.content}
                editing={editing}
                form={form}
                setForm={setForm}
                noBox={field.noBox}
                variant={field.variant}
                variantObj={field.variantObj}
                curRole={curRole}
                permMap={permMap}
              />
            );
          })}
        </Grid>

        {/* footer details */}
        <Grid container mt="44px">
          <FooterBox
            label="最近登录"
            content={object.at_last_login}
            variant="footer"
          />
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
