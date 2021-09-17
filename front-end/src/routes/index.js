import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Routes
import Loadable from "@src/components/Loadable";
import Pages from "./routes";
import config from "@src/config";

const Home = Loadable(lazy(() => import("@src/pages/home")));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect exact from="/" to={config.defaultPath} />
      <React.Fragment>
        <Pages />
      </React.Fragment>
    </Switch>
  );
};

export default Routes;
