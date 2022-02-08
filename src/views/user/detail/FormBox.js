import React from "react";
import { Grid, Box } from "@mui/material";
import VarietyInput from "./VarietyInput";

export default function FormBox({ fields, stateHandler, editing }) {
  return (
    <div>
      {fields && (
        <Grid container columns={{ xs: 1, sm: 3 }} spacing="0">
          {fields.map((field) => {
            let cellTag;
            switch (field.layout?.[0]) {
              case "duo":
                cellTag = (
                  <Grid
                    container
                    columns={{ xs: 1, sm: 3 }}
                    spacing={0}
                    item
                    borderTop={1}
                    xs={1}
                    sm={1}
                  >
                    {field.layout[1].map((_field, index) => (
                      <Grid item xs={1} sm={index ? 2 : 1}>
                        <VarietyInput
                          field={_field}
                          stateHandler={stateHandler}
                          editing={editing && _field.editable}
                        />
                      </Grid>
                    ))}
                  </Grid>
                );

                break;
              default:
                cellTag = (
                  <Grid item xs={1} sm={1} width="100%" borderTop={1}>
                    <VarietyInput
                      field={field}
                      stateHandler={stateHandler}
                      editing={editing && field.editable}
                    />
                  </Grid>
                );
                break;
            }
            return <>{cellTag}</>;
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
