import React from "react";
import { useLocation } from "react-router-dom";

// material-ui
import { Grid, Typography } from "@material-ui/core";

// project imports
import MainCard from "@src/components/cards/MainCard";
import { gridSpacing } from "@src/store/constant";

// ===========================|| ||=========================== //

const CardResults = () => {
  const location = useLocation();

  console.log(location.state);

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
