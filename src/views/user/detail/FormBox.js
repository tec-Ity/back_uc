import React from "react";
import { Grid, Box } from "@mui/material";
import InfoBox from "./InfoBox";

export default function FormBox({
  data: { fields, object },
  agent: curUser,
  stateHandler: [form, setForm],
  editing,
}) {
  const curRole = curUser.role;

  return (
    <div>
      {object?._id && (
        <Grid container columns={{ xs: 1, sm: 3 }} spacing="0">
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
                      <Grid
                        item
                        xs={1}
                        sm={variantField.type === "phonePre" ? 1 : 2}
                      >
                        <InfoBox
                          field={variantField}
                          check={field.check}
                          object={object}
                          editing={editing}
                          form={form}
                          setForm={setForm}
                          noBox={variantField.noBox}
                          variant={field.variant}
                          curUser={curUser}
                          curRole={curRole}
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
                  field={field}
                  check={field.check}
                  object={object}
                  editing={editing}
                  form={form}
                  setForm={setForm}
                  noBox={field.noBox}
                  variant={field.variant}
                  curUser={curUser}
                  curRole={curRole}
                />
              </Grid>
            );
          })}

          {/* fill rows */}
          <Grid item xs sm width="100%" borderTop={1}></Grid>
          <Grid item xs sm width="100%" borderTop={1}>
            <Box width="1000px"></Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
