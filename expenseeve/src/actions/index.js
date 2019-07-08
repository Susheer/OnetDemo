import Axious from "axios";

import {
  UpdateBudgetRoute,
  addCategoryRoute,
  listCategoryRoute,
  userLoginRoute,
  getBudgetRoute,
  settingsRoute,
  getSettingsRoute,
  delCategoryRoute,
  listActiveCategoryRoute,
  addNewExpenseRoute,
  listExpenseRoute,
  getExpByIdRoute,
  editExpenseRoute,
  userCreateRoute
} from "../config/route";
import {
  CREATE_NEW_USER_SUCCESS,
  LOGOUT_ACTION,
  EDIT_ITEAM,
  EDIT_ITEAM_SUCCESS,
  EDIT_ITEAM_FAILED,
  LOADING_EXPENSE_FAILED,
  LOADING_EXPENSE_SUCCESS,
  LOADING_EXPENSE,
  ITEM_ON_CHANGE,
  POP_ADD_EXPENSE,
  EXPENSE_ON_CHANGE,
  BUDGET_CHANGE,
  CATEGORY_CHANGE,
  UPDATE_BUDGET_SUCCESS,
  UPDATE_BUDGET_FAILED,
  UPDATING_BUDGET,
  ADDING_CATEGORY,
  ADD_CATEGORY_FAILED,
  FETCHING_CATEGORY_LIST,
  FETCHING_CATEGORY_LIST_FAILED,
  FETCHING_CATEGORY_LIST_SUCCESS,
  USER_LOGINING,
  USER_LOGINING_FAILED,
  USER_LOGINING_SUCCESS,
  USER_ID_ON_CHANGE,
  PASSWORD_ON_CHANGE,
  INITILIZE_DASHBOARD,
  INITILIZE_EXPENSE,
  INITILIZE_SETTINGS,
  DELETING_CATEGORY,
  DELETING_CATEGORY_FAILED,
  FETCHING_ACTIVE_CATEGORY_LIST,
  FETCHING_ACTIVE_CATEGORY_LIST_FAILED,
  ON_SELECT_ITEM,
  ADD_NEW_EXPENSE,
  ADD_NEW_EXPENSE_FAILED,
  ADD_NEW_EXPENSE_SUCCESS,
  CREATE_NEW_USER_FAIL
} from "../config/actionType";

export const budgetOnChange = budget => {
  return {
    type: BUDGET_CHANGE,
    payload: budget
  };
};

export const categoryOnChange = category => {
  return {
    type: CATEGORY_CHANGE,
    payload: category
  };
};

export const updateBudget = budget => {
  console.log("[Budget updated thanks]");

  return dispatch => {
    // do call here and wait for response
    dispatch({ type: UPDATING_BUDGET });

    Axious.post(UpdateBudgetRoute, {
      userId: "sudheergupta@gmnail.com",
      budget: budget
    })
      .then(response => {
        console.log("Server Respodsfwsnse", response.data);
        let serverRes = { ...response.data };
        if (serverRes.success) {
          dispatch({
            type: UPDATE_BUDGET_SUCCESS,
            payload: serverRes.budget.budget
          });
        } else {
          dispatch({
            type: UPDATE_BUDGET_FAILED,
            payload: serverRes.details
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: UPDATE_BUDGET_FAILED,
          payload: "Budget updation failed"
        });

        console.log("Server Error", error);
      });
  };
};

export const addCategory = category => {
  console.log("[Budget updated thanks]");

  return dispatch => {
    // do call here and wait for response
    dispatch({ type: ADDING_CATEGORY });

    Axious.post(addCategoryRoute, {
      userId: "sudheergupta@gmnail.com",
      name: category
    })
      .then(response => {
        console.log("Add category server response", response.data);
        let serverRes = { ...response.data };
        if (serverRes.success) {
          dispatch({
            type: FETCHING_CATEGORY_LIST
          });
          //--------------
          Axious.post(listCategoryRoute)
            .then(response => {
              if (response.data.success) {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_SUCCESS,
                  payload: response.data.categories
                });
              } else {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_FAILED,
                  payload: response.data.details
                });
              }

              console.log("list find from server--", response.data);
            })
            .catch(function(err) {
              dispatch({
                type: FETCHING_CATEGORY_LIST_FAILED,
                payload: "Somthing went wrong"
              });
            });

          //-------------
        } else {
          dispatch({
            type: ADD_CATEGORY_FAILED,
            payload: serverRes.details
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: ADD_CATEGORY_FAILED,
          payload: "Something went wrong "
        });

        console.log("Server Error", error);
      });
  };
};

// Login actions
export const login = (userId, password) => {
  return dispatch => {
    dispatch({ type: USER_LOGINING });

    Axious.post(userLoginRoute, {
      userId: userId,
      password: password
    })
      .then(response => {
        if (response.data.success) {
          console.log("LoginData", response.data);
          dispatch({
            type: USER_LOGINING_SUCCESS,
            payload: response.data.userData
          });
          // Initilize Reducers...

          Axious.post(getSettingsRoute)
            .then(response => {
              console.log("[Response for getSetting]", response.data);
              if (response.data.success) {
                console.log(
                  "response.data.settingCompData",
                  response.data.settingCompData
                );
                dispatch({
                  type: INITILIZE_SETTINGS,
                  payload: response.data.settingCompData
                });
              }
            })
            .catch(function(err) {
              console.log("Filed while loading budget", err);
            });

          //----------------End here
          //initializeApp();
        } else {
          dispatch({
            type: USER_LOGINING_FAILED,
            payload: response.data.details
          });
        }
      })
      .catch(function(err) {
        dispatch({
          type: USER_LOGINING_FAILED,
          payload: "Somthing went wrong "
        });
      });
  };
};

export const userIdOnChnage = userId => {
  return {
    type: USER_ID_ON_CHANGE,
    payload: userId
  };
};
export const passwordOnChnage = password => {
  return {
    type: PASSWORD_ON_CHANGE,
    payload: password
  };
};

export const initializeApp = () => {
  // settingns app
  //getBalance
  return dispatch => {
    Axious.post(getSettingsRoute)
      .then(response => {
        console.log("[Response for getSetting]", response.data);
        if (response.data.success) {
          console.log(
            "response.data.settingCompData",
            response.data.settingCompData
          );
          dispatch({
            type: INITILIZE_SETTINGS,
            payload: response.data.settingCompData
          });
        }
      })
      .catch(function(err) {
        console.log("Filed while loading budget", err);
      });
  };

  // fetch budget
  // console.log("[Initilizing app 000000000000000000000]");
};

export const deleteCategory = Id => {
  console.log("[deleteCategory ivokded]  id-", Id, "Route-", delCategoryRoute);

  return dispatch => {
    // do call here and wait for response
    dispatch({ type: DELETING_CATEGORY });

    Axious.post(delCategoryRoute, {
      name: Id
    })
      .then(response => {
        console.log("Delete category server response", response.data);
        let serverRes = { ...response.data };
        if (serverRes.success) {
          dispatch({
            type: FETCHING_CATEGORY_LIST
          });
          //--------------
          Axious.post(listCategoryRoute)
            .then(response => {
              if (response.data.success) {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_SUCCESS,
                  payload: response.data.categories
                });
              } else {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_FAILED,
                  payload: response.data.details
                });
              }

              console.log("list find from server--", response.data);
            })
            .catch(function(err) {
              dispatch({
                type: FETCHING_CATEGORY_LIST_FAILED,
                payload: "Somthing went wrong"
              });
            });

          //-------------
        } else {
          dispatch({
            type: DELETING_CATEGORY_FAILED,
            payload: serverRes.details
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: DELETING_CATEGORY_FAILED,
          payload: "Something went wrong "
        });

        console.log("Server Error", error);
      });
  };
};

export const populateActiveCategory = () => {
  // settingns app
  //getBalance
  return dispatch => {
    Axious.post(listActiveCategoryRoute)
      .then(response => {
        console.log("[activeCategoryList] server response ", response.data);
        if (response.data.success) {
          console.log(
            "response.data.settingCompData",
            response.data.settingCompData
          );
          dispatch({
            type: FETCHING_ACTIVE_CATEGORY_LIST,
            payload: response.data.categories
          });
        } else {
          dispatch({
            type: FETCHING_ACTIVE_CATEGORY_LIST_FAILED,
            payload: response.data.details
          });
        }
      })
      .catch(function(err) {
        console.log("activeCategoryList [Action] failed", err);
      });
  };
};

export const itemOnChnage = item => {
  return {
    type: ITEM_ON_CHANGE,
    payload: item
  };
};
export const expenseOnChnage = expenseAmount => {
  return {
    type: EXPENSE_ON_CHANGE,
    payload: expenseAmount
  };
};

export const onSelectItem = item => {
  return {
    type: ON_SELECT_ITEM,
    payload: item
  };
};

export const onAddExpenseClick = body => {
  return dispatch => {
    // do call here and wait for response
    dispatch({ type: ADD_NEW_EXPENSE });

    Axious.post(addNewExpenseRoute, body)
      .then(response => {
        console.log("ADD_NEW_EXPENSE server response", response.data);
        let serverRes = { ...response.data };
        if (serverRes.success) {
          dispatch({
            type: ADD_NEW_EXPENSE_SUCCESS,
            payload: serverRes.details
          });

          //--------------
          /*  Axious.post(listCategoryRoute)
            .then(response => {
              if (response.data.success) {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_SUCCESS,
                  payload: response.data.categories
                });
              } else {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_FAILED,
                  payload: response.data.details
                });
              }

              console.log("list find from server--", response.data);
            })
            .catch(function(err) {
              dispatch({
                type: FETCHING_CATEGORY_LIST_FAILED,
                payload: "Somthing went wrong"
              });
            }); */

          //-------------
        } else {
          dispatch({
            type: ADD_NEW_EXPENSE_FAILED,
            payload: serverRes.details
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: ADD_NEW_EXPENSE_FAILED,
          payload: "Something went wrong "
        });

        console.log("Server Error", error);
      });
  };
};

export const loadExpenses = () => {
  // settingns app
  //getBalance
  return dispatch => {
    dispatch({
      type: LOADING_EXPENSE
    });

    Axious.post(listExpenseRoute)
      .then(response => {
        console.log("[Response for loadExpenses]", response.data);
        if (response.data.success) {
          console.log("response.data", response.data);
          dispatch({
            type: LOADING_EXPENSE_SUCCESS,
            payload: response.data.expenses
          });
        } else {
          dispatch({
            type: LOADING_EXPENSE_FAILED,
            payload: "response failed"
          });
        }
      })
      .catch(function(err) {
        console.log("Filed while loading budget", err);
        dispatch({
          type: LOADING_EXPENSE_FAILED,
          payload: "Somting went wrong"
        });
      });
  };
};

export const editExpense = id => {
  console.log("[ACTION]>>>>>>>>>>>>>>>>>>>>>>>> editExpense", id);
  return dispatch => {
    dispatch({
      type: EDIT_ITEAM,
      payload: true
    });
    Axious.post(getExpByIdRoute, { expenseId: id })
      .then(response => {
        console.log("[ACTION]>>>>>>>>>>>>>>>>>>>>>>>> Res", response.data);
        if (response.data.success) {
          console.log("response.data", response.data);
          dispatch({
            type: EDIT_ITEAM_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: EDIT_ITEAM_FAILED,
            payload: response.data.details
          });
          // console.log("response.data", response.data);
        }
      })
      .catch(function(err) {
        console.log("[ACTION]>>>>>>>>>>>>>>>>>>>>>>>> Err", err);
        dispatch({
          type: EDIT_ITEAM_FAILED,
          payload: "Somthing went wrong "
        });
      });
  };
};

export const onUpdateClick = body => {
  return dispatch => {
    // do call here and wait for response
    //dispatch({ type: ADD_NEW_EXPENSE });

    Axious.post(editExpenseRoute, body)
      .then(response => {
        console.log("ADD Upadet server response", response.data);
        let serverRes = { ...response.data };
        if (serverRes.success) {
          dispatch({
            type: ADD_NEW_EXPENSE_SUCCESS,
            payload: "Expense edited successfully"
          });

          //--------------
          /*  Axious.post(listCategoryRoute)
            .then(response => {
              if (response.data.success) {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_SUCCESS,
                  payload: response.data.categories
                });
              } else {
                dispatch({
                  type: FETCHING_CATEGORY_LIST_FAILED,
                  payload: response.data.details
                });
              }

              console.log("list find from server--", response.data);
            })
            .catch(function(err) {
              dispatch({
                type: FETCHING_CATEGORY_LIST_FAILED,
                payload: "Somthing went wrong"
              });
            }); */

          //-------------
        } else {
          dispatch({
            type: ADD_NEW_EXPENSE_FAILED,
            payload: serverRes.details
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: ADD_NEW_EXPENSE_FAILED,
          payload: "Something went wrong while editing expense  "
        });

        console.log("Server Error", error);
      });
  };
};

export const logoutAction = body => {
  return {
    type: LOGOUT_ACTION
  };
};

export const createAccountAction = (userId, password) => {
  return dispatch => {
    Axious.post(userCreateRoute, {
      userId: userId,
      password: password
    })
      .then(response => {
        if (response.data.success) {
          console.log("LoginData", response.data);
          dispatch({
            type: CREATE_NEW_USER_SUCCESS,
            payload: response.data.userData
          });
        } else {
          dispatch({
            type: CREATE_NEW_USER_FAIL,
            payload: response.data.details
          });
        }
      })
      .catch(function(err) {
        dispatch({
          type: CREATE_NEW_USER_FAIL,
          payload: "Somthing went wrong "
        });
      });
  };
};
