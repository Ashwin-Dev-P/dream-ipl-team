import React, { Component } from "react";
import MyButton from "../shared/MyButton";

export default class index extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-md-6 col-lg-4 my-border">
            <form>
              <h2 className="my-heading">Register</h2>
              <div className="form-group">
                <input
                  type="text"
                  id="first_name"
                  placeholder="First name"
                  aria-label="name"
                  inputMode="text"
                  className="form-control"
                  autoFocus
                  autoCapitalize="words"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="last_name"
                  placeholder="Last name"
                  aria-label="name"
                  inputMode="text"
                  className="form-control"
                  autoFocus
                  autoCapitalize="words"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="name"
                  placeholder="Email"
                  aria-label="email"
                  inputMode="email"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  aria-label="password"
                  inputMode="text"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  id="password_confirmation"
                  placeholder="Confirm password"
                  aria-label="password"
                  inputMode="text"
                  className="form-control"
                  required
                />
              </div>

              <div>
                <MyButton
                  text="register"
                  type="submit"
                  className="btn btn-primary my-full-width mt-3 mb-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
