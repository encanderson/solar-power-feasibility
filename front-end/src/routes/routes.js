import React, { lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Loadable from "@src/components/Loadable";
import MinimalLayout from "@src/layout/MinimalLayout";

const Results = Loadable(lazy(() => import("@src/pages/results")));

const Routes = () => {
  const location = useLocation();
  return (
    <Route path={["/resultados"]}>
      <MinimalLayout>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/resultados" component={Results} />
        </Switch>
      </MinimalLayout>
    </Route>
  );
};

export default Routes;
