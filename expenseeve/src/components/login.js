import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { dashboardRoute } from "../config/route";
import {
  login,
  userIdOnChnage,
  passwordOnChnage,
  initializeApp,
  createAccountAction
} from "../actions";
class Login extends Component {
  state = {};

  redirectToDasboard() {
    if (this.props.isSessionActive) {
      return <Redirect to={dashboardRoute} />;
    }
  }

  renderLoginButton() {
    if (this.props.loginBtnLoader) {
      //------------
      return (
        <p className="buttonStyle" style={{ padding: "8px" }}>
          Authenicating...
        </p>
      );
      //-------------
    } else {
      return (
        <button
          value="login"
          className="buttonStyle"
          onClick={e => {
            this.props.login(this.props.userId, this.props.password);
          }}
        >
          Login
        </button>
      );
    }
  }

  renderCreateAccountButton() {
    //------------
    return (
      <button
        value="createAccount"
        onClick={e => {
          this.props.createAccountAction(
            this.props.userId,
            this.props.password
          );
        }}
        className="buttonStyle"
      >
        Areate Account
      </button>
    );
    //-------------
  }

  render() {
    return (
      <div className="row mt-5 text-center">
        <div className="col-xm-12 col-sm-4 col-md-4 col-lg-4" />
        <div className="col-xm-12 col-sm-4 col-md-4 col-lg-4 card p-5 m-2">
          {this.redirectToDasboard()}
          <input
            type="text"
            name="userId"
            value={this.props.userId}
            placeholder="user@gmail.com"
            onChange={e => {
              this.props.userIdOnChnage(e.target.value);
            }}
            className="textBoxStyle"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={this.props.password}
            onChange={e => {
              this.props.passwordOnChnage(e.target.value);
            }}
            className="textBoxStyle"
          />

          <br />
          <p className="text-center" style={{ color: "red" }}>
            {" "}
            {this.props.error}
          </p>
          <p className="text-center" style={{ color: "green" }}>
            {" "}
            {this.props.message}{" "}
          </p>
          {this.renderLoginButton()}
          {/*---*/}

          {this.renderCreateAccountButton()}

          <br />
        </div>
        <div className="col-xm-12 col-sm-4 col-md-4 col-lg-4" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  //  console.log("[State Login component]", state.authentication);
  return state.authentication;
};
export default connect(
  mapStateToProps,
  {
    login,
    userIdOnChnage,
    passwordOnChnage,
    initializeApp,
    createAccountAction
  }
)(Login);
