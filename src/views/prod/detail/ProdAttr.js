import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteObject,
  postObject,
  putObject,
} from "../../../features/objectsSlice";
import CusInputWithExtLabel from "../../../components/basic/CusInputWithExtLabel";
import cancel from "../../../components/icon/cancelBlack.svg";
import add from "../../../components/icon/addBlack.svg";
import { getRolePath } from "../../../js/conf/confUser";
import { useHistory } from "react-router";
export default function ProdAttr({ Attrs, flagSlice, prodId }) {
  const [showAddNew, setShowAddNew] = useState(false);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <h3>商品属性</h3>
          <button onClick={() => setShowAddNew(true)}>添加商品属性</button>
        </Grid>
        {/* attrs */}
        <Grid container item xs={12}>
          {showAddNew === true && (
            <AttrRow
              isNew
              prodId={prodId}
              flagSlice={flagSlice}
              closeAddNew={() => setShowAddNew(false)}
            />
          )}
          {Attrs && Attrs.length > 0
            ? Attrs?.map((attr, index) => (
                <AttrRow
                  attr={attr}
                  flagSlice={flagSlice}
                  prodId={prodId}
                  index={index}
                />
              ))
            : showAddNew === false && <div>暂无属性</div>}
        </Grid>
      </Grid>
    </Container>
  );
}

const rolePath = getRolePath();

function AttrRow({
  attr,
  isNew = false,
  flagSlice,
  prodId,
  closeAddNew,
  index,
}) {
  const dispatch = useDispatch();
  const hist = useHistory();
  const [modifying, setModifying] = useState(isNew);
  const [addNewOption, setAddNewOption] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [attrUpdate, setAttrUpdate] = useState({
    nome: attr?.nome || "",
    options: attr?.options || [],
  });
  const status = useSelector((state) => state.objects.status);
  const reloadAfterModified = React.useCallback(() => {
    hist.push(`/${rolePath}/reload`);
  }, [hist]);
  useEffect(() => {
    justSubmitted === true && status === "succeed" && reloadAfterModified();
  }, [justSubmitted, reloadAfterModified, status]);

  useEffect(() => {
    isNew === false &&
      setAttrUpdate({ nome: attr?.nome || "", options: attr?.options || [] });
  }, [attr?.nome, attr?.options, isNew]);
  //   console.log(attr.options);
  //   console.log(attrUpdate.options);
  console.log(newOption);
  ///attr functions
  const handleSubmit = () => {
    if (isNew === true) {
      dispatch(
        postObject({
          flagSlice: "prodAttr",
          api: "/Attr",
          data: {
            obj: {
              Prod: prodId,
              nome: attrUpdate.nome,
              options: attrUpdate.options,
            },
          },
        })
      );
    } else {
      //put options
      const optionPairs = [];
      for (let i = 0; i < attr?.options?.length; i++) {
        const op = attr?.options[i];
        const newOp = attrUpdate?.options[i];
        if (op !== newOp) optionPairs.push({ option: op, optionPut: newOp });
      }
      console.log(optionPairs);
      optionPairs.length > 0 &&
        dispatch(
          putObject({
            flagSlice: "prodAttr",
            api: "/Attr/" + attr?._id,
            data: {
              optionPuts: optionPairs,
            },
          })
        );

      setTimeout(() => {
        // add new options
        newOption &&
          dispatch(
            putObject({
              flagSlice: "prodAttr",
              api: "/Attr/" + attr?._id,
              data: {
                optionPost: {
                  options: newOption,
                },
              },
            })
          );
      }, 1000);
    }
    setModifying(false);
    setJustSubmitted(true);
  };
  const handleDelete = () => {
    dispatch(
      deleteObject({ flagSlice: "prodAttr", api: "/Attr/" + attr?._id })
    );
    setJustSubmitted(true);
  };
  const handleCancel = () => {
    setModifying(false);
    isNew === true && closeAddNew();
  };
  const handleEdit = () => {
    setModifying(true);
  };

  ///attr options functions
  const handleOptionDelete = (index) => () => {
    dispatch(
      putObject({
        flagSlice: "prodAttr",
        api: "/Attr/" + attr?._id,
        data: {
          optionDelete: {
            options: [attr?.options[index]],
          },
        },
      })
    );
    setJustSubmitted(true);
  };

  return (
    <Grid container item xs={12} justifyContent='space-evenly'>
      {/* attr row */}
      <Grid container item xs={12}>
        <Grid container item xs={1} alignItems='center'>
          属性值{index + 1}
        </Grid>
        <Grid item xs={3}>
          <CusInputWithExtLabel
            label='商品属性'
            value={attr?.nome}
            handleChange={(e) =>
              setAttrUpdate((prev) => ({ ...prev, nome: e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={4}>
          <CusInputWithExtLabel
            label={
              isNew === false && modifying === true ? `属性值${1}` : "属性值"
            }
            value={
              //when value provided,
              //show all options in this single input when not modifying,
              //show first one when modifying along with subsequent inputs
              isNew === false
                ? modifying === false
                  ? attrUpdate?.options || ""
                  : attrUpdate?.options[0] || ""
                : attrUpdate?.options || ""
            }
            handleChange={(e) => {
              //   console.log(isNew);
              if (isNew === true) {
                setAttrUpdate((prev) => ({
                  ...prev,
                  options: e.target.value,
                }));
              }
            }}
            endIcon={modifying && cancel}
            handleEndIcon={handleOptionDelete(0)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid container item xs={2} alignItems='center'>
          <CusBtnGroup
            modifying={modifying}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            handleEdit={handleEdit}
          />
        </Grid>
      </Grid>

      {/* attr options displayed */}
      {modifying === true && isNew === false && (
        <>
          {attrUpdate?.options?.map(
            (option, index) =>
              index > 0 && (
                //   option row
                <Grid container item xs={12}>
                  <Grid item xs={5} />
                  <Grid item xs={4}>
                    <CusInputWithExtLabel
                      label={"属性值" + (index + 1)}
                      value={option}
                      handleChange={(e) => {
                        const tempOptions = [...attrUpdate.options];
                        tempOptions[index] = e.target.value;
                        setAttrUpdate((prev) => ({
                          ...prev,
                          options: tempOptions,
                        }));
                      }}
                      //   shows cancle icon when modifying
                      endIcon={modifying && cancel}
                      handleEndIcon={handleOptionDelete(index)}
                    />
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
              )
          )}
          {/* add new attr option row */}
          <Grid container item xs={12}>
            <Grid item xs={5} />
            <Grid item xs={4}>
              {addNewOption === true ? (
                <CusInputWithExtLabel
                  label='新属性值'
                  value={newOption}
                  handleChange={(e) => setNewOption(e.target.value)}
                  placeholder='属性值间用逗号隔开'
                  endIcon={cancel}
                  handleEndIcon={() => setAddNewOption(false)}
                />
              ) : (
                <div
                  onClick={() => setAddNewOption(true)}
                  style={{ cursor: "pointer" }}>
                  <CusInputWithExtLabel
                    label=''
                    placeholder='添加属性值'
                    endIcon={add}
                    disabled
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </>
      )}
    </Grid>
  );
}
