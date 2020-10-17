import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import NewCompany from "./Pages/Company/New";
import ListCompany from "./Pages/Company/List";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/company/new">
          <NewCompany />
        </Route>

        <Route exact path="/company/list">
          <ListCompany />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
