import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import NewCompany from "./Pages/Company/New";
import ListCompany from "./Pages/Company/List";
import NewCategory from "./Pages/Category/New";
import ListCategory from "./Pages/Category/List";
import NewUnit from "./Pages/Unit/New";
import ListUnit from "./Pages/Unit/List";
import NewUser from "./Pages/Users/New";
import ListUser from "./Pages/Users/List";
import NewAsset from "./Pages/Assets/New";
import ListAsset from "./Pages/Assets/List";
import EditAsset from "./Pages/Assets/Edit";

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

        <Route exact path="/category/new">
          <NewCategory />
        </Route>

        <Route exact path="/category/list">
          <ListCategory />
        </Route>

        <Route exact path="/unit/new">
          <NewUnit />
        </Route>

        <Route exact path="/unit/list">
          <ListUnit />
        </Route>

        <Route exact path="/user/new">
          <NewUser />
        </Route>

        <Route exact path="/user/list">
          <ListUser />
        </Route>

        <Route exact path="/asset/new">
          <NewAsset />
        </Route>

        <Route exact path="/asset/list">
          <ListAsset />
        </Route>

        <Route exact path="/asset/edit" component={EditAsset} />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
