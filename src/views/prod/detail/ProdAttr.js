import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import CusInput from "../../../components/basic/CusInput";
import CusBtnGroup from "../../../components/basic/CusBtnGroup";
import { useDispatch } from "react-redux";
import { postObject, putObject } from "../../../features/objectsSlice";
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
            ? Attrs?.map((attr, i) => (
                <AttrRow attr={attr} flagSlice={flagSlice} prodId={prodId} />
              ))
            : showAddNew === false && <div>暂无属性</div>}
        </Grid>
      </Grid>
    </Container>
  );
}

function AttrRow({ attr, isNew = false, flagSlice, prodId, closeAddNew }) {
  const dispatch = useDispatch();
  const [modifying, setModifying] = useState(isNew);
  const [addNew, setAddNew] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [attrUpdate, setAttrUpdate] = useState({
    nome: attr?.nome || "",
    options: attr?.options || [],
  });
  useEffect(() => {
    isNew === false &&
      setAttrUpdate({ nome: attr?.nome || "", options: attr?.options || [] });
  }, [attr?.nome, attr?.options, isNew]);

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
      // dispatch(putObject({ flagSlice: "prodAttr", api: "/Attr/"+attr?._id, data:{general:{nome: attrUpdate.nome,options}}}))
    }
    setModifying(false);
  };
  const handleDelete = () => {};
  const handleCancel = () => {
    setModifying(false);
    isNew === true && closeAddNew();
  };
  const handleEdit = () => {
    setModifying(true);
  };

  ///attr options functions
  const handleOptionSubmit = (index) => () => {
    const prevOption = attr?.options[index];
    const curOption = attrUpdate?.options[index];
    if (prevOption !== curOption && prevOption && curOption) {
      dispatch(
        putObject({
          flagSlice: "prodAttr",
          api: "/Attr/" + attr?._id,
          data: {
            optionPut: {
              option: prevOption,
              optionPut: curOption,
            },
          },
        })
      );
    }
  };
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
  };
  const handleOptionPost = () => {
    dispatch(
      putObject({
        flagSlice: "prodAttr",
        api: "/Attr/" + attr?._id,
        data: {
          optionPost: {
            option: newOption,
          },
        },
      })
    );
  };
  return (
    <Grid container item xs={12} justifyContent='space-evenly'>
      <Grid container item xs={12}>
        {/* <Grid item xs={1} /> */}
        <Grid item xs={isNew === true || modifying === false ? 3 : 7}>
          <CusInput
            label='属性名称'
            value={attr?.nome}
            handleChange={(e) =>
              setAttrUpdate((prev) => ({ ...prev, nome: e.target.value }))
            }
          />
        </Grid>
        {(isNew === true || modifying === false) && (
          <>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <CusInput
                label={
                  isNew === false && modifying === true
                    ? `属性值${1}`
                    : "属性值"
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
                  console.log(isNew);
                  if (isNew === true) {
                    setAttrUpdate((prev) => ({
                      ...prev,
                      options: e.target.value,
                    }));
                  }
                }}
              />
            </Grid>
          </>
        )}
        <Grid item xs={1} />

        <Grid container item xs={3} alignItems='center'>
          <CusBtnGroup
            modifying={modifying}
            handleSubmit={handleSubmit}
            //   handleDelete
            handleCancel={handleCancel}
            handleEdit={handleEdit}
          />
        </Grid>
      </Grid>

      {/* attr options displayed */}
      {modifying === true && isNew === false && (
        <>
          <Grid container item xs={12}>
            <Grid item xs={4} />
            <Grid item xs={3}>
              {addNew === false ? (
                <div
                  style={{ background: "#0000004d", height: "50px" }}
                  onClick={() => setAddNew(true)}>
                  添加新属性值
                </div>
              ) : (
                <CusInput
                  label='新属性值'
                  value={newOption}
                  handleChange={(e) => setNewOption(e.target.value)}
                />
              )}
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={3}>
              <CusBtnGroup handleSubmit={handleOptionPost} modifying />
            </Grid>
          </Grid>
          {attrUpdate?.options?.map((option, index) => (
            <Grid container item xs={12}>
              <Grid item xs={4} />
              <Grid item xs={3}>
                <CusInput
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
                />
              </Grid>
              <Grid item xs={1} />
              <Grid container item xs={3} alignItems='center'>
                <CusBtnGroup
                  modifying
                  handleSubmit={handleOptionSubmit(index)}
                  handleDelete={handleOptionDelete(index)}
                  // handleCancel={handleCancel}
                  // handleEdit={handleEdit}
                />
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
