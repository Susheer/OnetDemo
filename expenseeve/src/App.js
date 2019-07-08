import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import Header from "./components/common/header";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import {
  defaultRoute,
  settingsRoute,
  profiledRoute,
  dashboardRoute,
  loginRoute
} from "./config/route";
import Dashboard from "./components/dashboard";
import Settings from "./components/settings";
import "./App.css";
import Body from "./components/common/parent";
import Login from "./components/login";

class App extends Component {
  render() {
    let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Body>
              <Route path={defaultRoute} exact={true} component={Login} />
              <Route path={settingsRoute} exact={true} component={Settings} />
              {/*  <Settings /> */}
              <Route path={dashboardRoute} exact={true} component={Dashboard} />
              <Route path={loginRoute} exact={true} component={Login} />
            </Body>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }

  componentDidMount() {
    console.log("[Ap444444444444444444444444444444444]", this.props);
  }
}

export default App;
