import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "@src/pages/results/Header";
import CardResults from "./Results";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: "0px",
    overflowX: "hidden",
    overflowY: "clip",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0px",
    },
  },
}));

const Results = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="results" className={classes.header}>
        <Header />
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={12} style={{ cursor: "pointer", margin: 20 }}>
            <CardResults />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Results;
