import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//components
import HomeComponent from "../components/home/index";
import TestComponent from "../components/test/index";
import LoginComponent from "../components/login/index";
import RegisterComponent from "../components/register/index";

export default class MyRoutes extends Component {
  render() {
    return (
      <Routes location={this.props.location}>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
      </Routes>
    );
  }
}
