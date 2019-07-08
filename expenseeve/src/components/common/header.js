import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  defaultRoute,
  settingsRoute,
  dashboardRoute,
  loginRoute
} from "../../config/route";
import { logoutAction } from "../../actions";
const Header = props => {
  const renderLogin = props => {
    if (!props.isLogin) {
      return <NavLink to={loginRoute}>Login</NavLink>;
    } else {
      return (
        <React.Fragment>
          <NavLink to={defaultRoute}>Profile</NavLink>
          <NavLink to={settingsRoute}>Setting</NavLink>
          <NavLink to={dashboardRoute}>Dashboard</NavLink>
          <NavLink
            onClick={e => {
              props.logoutAction();
            }}
          >
            Logout
          </NavLink>
        </React.Fragment>
      );
    }
  };

  return <header className="header">{renderLogin(props)}</header>;
};

const mapStateToProps = state => {
  return { isLogin: state.authentication.isSessionActive };
};

export default connect(
  mapStateToProps,
  { logoutAction }
)(Header);
