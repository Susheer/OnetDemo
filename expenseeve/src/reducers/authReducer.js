import {
  USER_LOGINING,
  USER_LOGINING_FAILED,
  USER_LOGINING_SUCCESS,
  USER_ID_ON_CHANGE,
  PASSWORD_ON_CHANGE,
  LOGOUT_ACTION,
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_FAIL
} from "../config/actionType";

const INITIAL_STATE = {
  isSessionActive: false,
  userId: "",
  password: "",
  loginBtnLoader: false,
  error: " ",
  message: ""
};
export default (state = INITIAL_STATE, action) => {
  //------------------------
  switch (action.type) {
    case USER_LOGINING:
      return {
        ...state,
        loginBtnLoader: true,
        message: "Authenticating...",
        isSessionActive: false
      };
    //if failed
    case USER_LOGINING_FAILED:
      return {
        ...state,
        loginBtnLoader: false,
        message: "",
        error: action.payload,
        isSessionActive: false
      };
    //if success
    case USER_LOGINING_SUCCESS:
      return {
        ...state,
        loginBtnLoader: false,
        message: "Redirectiong to dashboard...",
        error: "",
        isSessionActive: true
      };

    case USER_ID_ON_CHANGE:
      return {
        ...state,
        loginBtnLoader: false,
        message: "",
        error: "",
        userId: action.payload
      };
    case PASSWORD_ON_CHANGE:
      return {
        ...state,
        loginBtnLoader: false,
        message: "",
        error: "",
        password: action.payload
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isSessionActive: false,
        userId: "",
        password: "",
        loginBtnLoader: false,
        error: " ",
        message: ""
      };
    case CREATE_NEW_USER_SUCCESS:
      return {
        ...state,
        loginBtnLoader: false,
        message: "User created successfully, Login now",
        isSessionActive: false
      };
    case CREATE_NEW_USER_FAIL:
      return {
        ...state,
        loginBtnLoader: false,
        message: "",
        error: action.payload,
        isSessionActive: false
      };
    default:
      return state;
  }
  //---------------
};
