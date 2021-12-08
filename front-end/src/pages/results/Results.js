import React from "react";

// material-ui
import { Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "@src/components/cards/MainCard";
import { gridSpacing } from "@src/store/constant";

// ===========================|| ||=========================== //

const CardResults = () => {
  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs zeroMinWidth>
          <Typography>Hello</Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default CardResults;
