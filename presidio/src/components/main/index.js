import React, { Component } from "react";
import MyRoutes from "../../routes/MyRoutes";

export default class index extends Component {
  render() {
    return (
      <div>
        <main className="container">
          <MyRoutes />
        </main>
      </div>
    );
  }
}
