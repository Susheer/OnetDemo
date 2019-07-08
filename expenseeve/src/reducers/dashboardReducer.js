import data from "../dataSets/Expenses.json";
import {
  LOADING_EXPENSE_FAILED,
  LOADING_EXPENSE_SUCCESS,
  LOADING_EXPENSE,
  FETCHING_ACTIVE_CATEGORY_LIST,
  FETCHING_ACTIVE_CATEGORY_LIST_FAILED,
  ITEM_ON_CHANGE,
  POP_ADD_EXPENSE,
  EXPENSE_ON_CHANGE,
  ON_SELECT_ITEM,
  ADD_NEW_EXPENSE,
  ADD_NEW_EXPENSE_SUCCESS,
  ADD_NEW_EXPENSE_FAILED,
  EDIT_ITEAM,
  EDIT_ITEAM_SUCCESS,
  EDIT_ITEAM_FAILED
} from "../config/actionType";
const INITIAL_STATE = {
  totalBudget: 0,
  categories: [{ sudheer: "gupta" }],
  loading: false,
  selectedItem: "",
  selectedCategory: "",
  expenseAmount: 0,
  loadingCategory: false,
  loadingCategoryList: false,
  error: " ",
  message: "",
  expenses: data,
  isExpenseLoading: false,
  expTblMsg: "",
  expLoadingErr: "",
  doesNewExpenseAdded: false,
  editExpenseLoader: false,
  expenseId: "",
  errorDetailsForUpdatingExpense: ""
};
export default (state = INITIAL_STATE, action) => {
  // console.log("[DASHBORED  REDUCER] STATE", state);
  switch (action.type) {
    case FETCHING_ACTIVE_CATEGORY_LIST:
      return {
        ...state,
        categories: action.payload,
        error: "",
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };
    case FETCHING_ACTIVE_CATEGORY_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };
    case ITEM_ON_CHANGE:
      return {
        ...state,
        selectedItem: action.payload,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };
    case EXPENSE_ON_CHANGE:
      return {
        ...state,
        expenseAmount: action.payload,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };
    case ON_SELECT_ITEM:
      return {
        ...state,
        selectedCategory: action.payload,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };

    case ADD_NEW_EXPENSE:
      return {
        ...state,
        message: action.payload,
        error: "",
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };
    case ADD_NEW_EXPENSE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        error: "",
        doesNewExpenseAdded: true,
        editExpenseLoader: false
      };
    case ADD_NEW_EXPENSE_FAILED:
      return { ...state, error: action.payload, doesNewExpenseAdded: false };

    case LOADING_EXPENSE:
      return {
        ...state,
        error: "",
        expTblMsg: "Please wait ,expenses are being upadated",
        isExpenseLoading: true,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };

    case LOADING_EXPENSE_SUCCESS:
      return {
        ...state,
        error: "",
        expTblMsg: "Expenses updsuccated succssfully",
        isExpenseLoading: false,
        expenses: action.payload,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };

    case LOADING_EXPENSE_FAILED:
      return {
        ...state,
        error: action.payload,
        expTblMsg: "",
        isExpenseLoading: false,
        doesNewExpenseAdded: false,
        editExpenseLoader: false
      };
    case EDIT_ITEAM:
      return {
        ...state,
        error: "",
        expTblMsg: "",
        isExpenseLoading: false,
        doesNewExpenseAdded: false,
        editExpenseLoader: true
      };

    case EDIT_ITEAM_SUCCESS:
      return {
        ...state,
        error: "",
        expTblMsg: "",
        isExpenseLoading: false,
        doesNewExpenseAdded: false,
        editExpenseLoader: false,
        selectedCategory: action.payload.categoryName,
        expenseId: action.payload._id,
        selectedItem: action.payload.iteamName,
        expenseAmount: action.payload.amount
      };
    case EDIT_ITEAM_FAILED:
      return {
        ...state,
        error: "",
        expTblMsg: "",
        isExpenseLoading: false,
        doesNewExpenseAdded: false,
        editExpenseLoader: false,
        errorDetailsForUpdatingExpense: action.payload
      };

    default:
      return state;
  }
};
