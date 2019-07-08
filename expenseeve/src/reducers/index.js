import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import dashboardReducer from "./dashboardReducer";
import authReducer from "./authReducer";
export default combineReducers({
  settings: settingsReducer,
  dashBoard: dashboardReducer,
  authentication: authReducer
});
