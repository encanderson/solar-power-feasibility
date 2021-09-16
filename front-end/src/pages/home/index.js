import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "@src/pages/home/Header";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: "30px",
    overflowX: "hidden",
    overflowY: "clip",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0px",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="home" className={classes.header}>
        <Header />
      </div>
    </React.Fragment>
  );
};

export default Home;
