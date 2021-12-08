import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "@src/pages/home/Header";

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
      </div>
    </React.Fragment>
  );
};

export default Results;
