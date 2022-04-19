import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//import route types
import PrivateRoute from "./types/PrivateRoute";
import RestrictedRoute from "./types/RestritedRoute";

//components
import HomeComponent from "../components/home/index";
import TestComponent from "../components/test/index";
import LoginComponent from "../components/login/index";
import RegisterComponent from "../components/register/index";
import SelectTeam from "../components/select_team/index";
import MyTeam from "../components/my_team/index";

export default class MyRoutes extends Component {
  render() {
    return (
      <Routes location={this.props.location}>
        {/* Private routes */}
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<HomeComponent />} />
        </Route>

        <Route exact path="/select_team" element={<PrivateRoute />}>
          <Route exact path="/select_team" element={<SelectTeam />} />
        </Route>

        <Route exact path="/my_team" element={<PrivateRoute />}>
          <Route exact path="/my_team" element={<MyTeam />} />
        </Route>

        {/*  Private route ends here */}

        <Route path="/test" element={<TestComponent />} />
        {/*  resticted route*/}
        <Route path="/login" element={<RestrictedRoute />}>
          <Route path="/login" element={<LoginComponent />} />
        </Route>

        <Route path="/register" element={<RestrictedRoute />}>
          <Route path="/register" element={<RegisterComponent />} />
        </Route>
        {/*  resticted route end */}
      </Routes>
    );
  }
}
