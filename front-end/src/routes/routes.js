// import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import MinimalLayout from "@src/layout/MinimalLayout";

const Routes = () => {
  const location = useLocation();
  return (
    <Route path={["/calculo-de-viabilidade"]}>
      <MinimalLayout>
        <Switch location={location} key={location.pathname}></Switch>
      </MinimalLayout>
    </Route>
  );
};

export default Routes;
