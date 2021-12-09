import React from "react";

// material-ui
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const CheckComponent = ({ check, setCheck, title }) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={(event) => setCheck(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label={<Typography variant="subtitle1">{title}</Typography>}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckComponent;
