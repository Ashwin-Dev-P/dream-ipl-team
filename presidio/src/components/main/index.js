import React, { Component } from "react";
import MyRoutes from "../../routes/MyRoutes";

import Header from "../header/index";

export default class index extends Component {
  render() {
    return (
      <div>
        <Header />
        <main className="">
          <MyRoutes />
        </main>
      </div>
    );
  }
}
