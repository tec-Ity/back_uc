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

import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactComponent as EditIcon } from "../../../components/icon/editBlack.svg";
import { ReactComponent as CancelIcon } from "../../../components/icon/cancelBlack.svg";
import { ReactComponent as DoneIcon } from "../../../components/icon/doneBlack.svg";
import ListPageHeader from "../../../components/basic/ListPageHeader.js";
import InfoBox from "./InfoBox";

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
  const [form, setForm] = useState(() => {
    const { code, nome, phonePre, phone, role } = object;
    const Shop = object.Shop ? object.Shop._id : null;
    // if (object.Shop) {
    //   setfarSearch_Shops(object.Shop.code);
    // }
    // roleFilterShops(formdata.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return { code, nome, phonePre, phone, role, Shop };
  });

  function handleSave() {
    console.log(form);
    setEditing(!editing);
  }

  function FooterBox({ label = "label", content = "content", variant, noBox }) {
    return (
      <>
        <Grid item xs={3}>
          <Typography
            sx={{ fontSize: "16px", color: "#0000004D", fontWeight: "700" }}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs="auto">
          <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
            {content}
          </Typography>
        </Grid>
      </>
      // <Box className={classes.infobox} mt="5px">
      //   <Typography
      //     sx={{ fontSize: "16px", color: "#0000004D", fontWeight: "700" }}
      //   >
      //     {label}
      //   </Typography>
      //   <Typography sx={{ fontSize: "16px", fontWeight: "700" }}>
      //     {content}
      //   </Typography>
      // </Box>
    );
  }

  const links = [
    { label: "主页", to: "/ower/home" },
    { label: "用户列表", to: "/ower/users" },
    { label: "详情" },
  ];

  const fields = [
    {
      label: "登录账号",
      type: "uid",
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
            {editing && (
              <IconButton onClick={handleSave}>
                <DoneIcon />
              </IconButton>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={!editing ? <EditIcon /> : <CancelIcon />}
              onClick={() => {
                setEditing(!editing);
                setForm({});
              }}
            >
              编辑
            </Button>
            <IconButton
              onClick={() => {
                setEditing(!editing);
                setForm({});
              }}
            >
              {!editing ? <EditIcon /> : <CancelIcon />}
            </IconButton>
          </div>
        )
      }

      <Box sx={{ maxWidth: "70%" }}>
        <Grid
          container
          columns={{ xs: 1, sm: 2 }}
          spacing="17px"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {fields.map((field) => {
            if (field.variant == "phone") {
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
              />
            );
          })}
        </Grid>

        <Grid container mt="44px">
          <FooterBox
            label="最近登录"
            content={object.at_last_login}
            variant="footer"
          />
        </Grid>

        <Grid container columns={2} spacing="17px">
          {
            // 如果比自己等级低 可删除
            curRole < object.role && (
              <>
                <Grid item xs={1}>
                  <Button variant="contained" color="error" fullWidth>
                    DELETE
                  </Button>
                </Grid>
              </>
            )
          }
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
