import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/singIn-box/index.js";
import SingupBox from 'views/signup-box/IndexHeader.js'

import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import MainLayout from 'views/mainLayout/index.js'
import MigrationMainLayout from 'views/migrationMainLayout/index.js'
import OrderList from 'views/orderlist/index.js'
import Stockinfor from 'views/stockinfor/index.js'
import Addnewsite from 'views/stockinfor/addnewsite'
import AddnewGoods from 'views/stockinfor/addnewGoods'


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <LoginPage {...props} />} />
        {/* <Route path="/index" render={(props) => <Index {...props} />} /> */}
        <Route
          path="/nucleo-icons"
          render={(props) => <NucleoIcons {...props} />}
        />
        <Route
          path="/sing-up"
          render={(props) => <SingupBox {...props} />}
        />
        <Route
          path="/landing-page"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/mainLayout"
          render={(props) => <MainLayout {...props} />}
        />
        <Route
          path="/bpmigration"
          render={(props) => <MigrationMainLayout {...props} />}
        />
        <Route
          path="/createdaily-report"
          render={(props) => <MigrationMainLayout {...props} />}
        />
        <Route
          path="/profile-page"
          render={(props) => <ProfilePage {...props} />}
        />
        <Route
          path="/submitReport"
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          path="/orderlist"
          render={(props) => <OrderList {...props} />}
        />
        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />
        <Route
          path="/stocklist"
          render={(props) => <Stockinfor {...props} />}
        />
        <Route
          path="/addnewstocksite"
          render={(props) => <Addnewsite {...props} />}
        />
        <Route
          path="/addnewgoods"
          render={(props) => <AddnewGoods {...props} />}
        />
        
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
