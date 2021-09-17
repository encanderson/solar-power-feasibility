import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "@src/pages/home/Header";
import LocalInformation from "@src/pages/home/location";

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

const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="home" className={classes.header}>
        <Header />
        <LocalInformation />
      </div>
    </React.Fragment>
  );
};

export default Home;
