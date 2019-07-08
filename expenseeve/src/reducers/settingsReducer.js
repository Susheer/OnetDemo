import {
  BUDGET_CHANGE,
  CATEGORY_CHANGE,
  UPDATE_BUDGET_FAILED,
  UPDATE_BUDGET_SUCCESS,
  UPDATING_BUDGET,
  ADDING_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  FETCHING_CATEGORY_LIST,
  FETCHING_CATEGORY_LIST_FAILED,
  FETCHING_CATEGORY_LIST_SUCCESS,
  INITILIZE_SETTINGS,
  DELETE_CATEGORY,
  DELETING_CATEGORY,
  DELETING_CATEGORY_FAILED
} from "../config/actionType";

const INITIAL_STATE = {
  budget: 0,
  categories: [],
  category: "",
  loadingUpdate: false,
  loadingCategory: false,
  loadingCategoryList: false,
  error: " "
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUDGET_CHANGE:
      //  console.log("[Action]BudgetChnage", BUDGET_CHANGE, "state", state);
      return { ...state, budget: action.payload };

    case CATEGORY_CHANGE:
      //  console.log("[Category]");
      return { ...state, category: action.payload };
    // start categoty

    case ADDING_CATEGORY:
      //  console.log("[Action]: addingCategory");
      return { ...state, loadingCategory: true, error: "Adding..." };

    case DELETING_CATEGORY:
      //console.log("[Action]: deleting Category");
      return { ...state, loadingCategoryList: true, error: "deleting.." };

    case ADD_CATEGORY_FAILED:
      // console.log("[Action]:Add category failed");
      return {
        ...state,
        error: action.payload,
        loadingCategory: false
      };
    case DELETING_CATEGORY_FAILED:
      // console.log("[Action]:DELETING_CATEGORY_FAILED");
      return {
        ...state,
        error: action.payload,
        loadingCategory: false
      };
    //------------------------------
    case FETCHING_CATEGORY_LIST:
      console.log("[Action]: fetching category Category");
      return {
        ...state,
        loadingCategoryList: true,
        error: "loading data ...."
      };

    case FETCHING_CATEGORY_LIST_FAILED:
      console.log("[Action]: FETCHING_CATEGORY_LIST_FAILED");
      return {
        ...state,
        loadingCategory: false,
        loadingCategoryList: false,
        error: action.payload
      };

    case FETCHING_CATEGORY_LIST_SUCCESS:
      console.log("[Action]: FETCHING_CATEGORY_LIST_SUCCESS");
      return {
        ...state,
        loadingCategoryList: false,
        loadingCategory: false,
        error: "",
        categories: action.payload
      };
    // end category

    case UPDATING_BUDGET:
      console.log("[Action]: updating udget");
      return { ...state, loadingUpdate: true, error: "" };

    case UPDATE_BUDGET_SUCCESS:
      console.log("[Action]: updateBudget");
      return {
        ...state,
        budget: action.payload,
        error: "",
        loadingUpdate: false
      };
    case UPDATE_BUDGET_FAILED:
      console.log("[Action]: updateBudget");
      return {
        ...state,
        budget: 0,
        error: action.payload,
        loadingUpdate: false
      };
    case INITILIZE_SETTINGS:
      // console.log("[Action]: INITILIZE SETTING", action.payload);
      state.budget = action.payload.budget.budget;
      state.categories = action.payload.categories;
      return state;

    default:
      return state;
  }
};
