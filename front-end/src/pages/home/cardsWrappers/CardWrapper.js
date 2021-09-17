import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";

// project import
import MainCard from "@src/components/cards/MainCard";

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "475px",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "20px",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "400px",
    },
  },
  content: {
    padding: theme.spacing(4) + " !important",
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(3) + " !important",
    },
  },
}));

//-----------------------|| AUTHENTICATION CARD WRAPPER ||-----------------------//

const CardWrapper = ({ children, ...other }) => {
  const classes = useStyles();

  return (
    <MainCard
      className={classes.card}
      contentClass={classes.content}
      {...other}
    >
      {children}
    </MainCard>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.node,
};

export default CardWrapper;
