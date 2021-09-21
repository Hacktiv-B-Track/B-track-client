import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_IMAGE,
  ADD_MODAL_IMAGE_URL,
  ADD_TRANSACTIONS,
  ADD_TRANSACTION,
  LOADING_TOGGLE,
  SCAN_INVOICE,
  SET_ERROR,
  SET_LOADING,
  FETCH_DEPARTMENTS,
  FETCH_BUDGETS,
  FETCH_BUDGET_DETAIL,
  ADD_BUDGET,
  ADD_CATEGORIES,
} from "./actionType";

const initialState = {
  isModalFormDetail: false,
  isModalImage: false,
  loading: false,
  error: null,
  departments: [],
  modalImageUrl: "",
  transactions: {},
  transaction: {},
  isLoading: true,
  dataScan: {},
  budgets: [],
  budgetDetail: [],
  categories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL_FORM_DETAIL:
      return {
        ...state,
        isModalFormDetail: action.payload,
      };
    case TOGGLE_MODAL_IMAGE:
      return {
        ...state,
        isModalImage: action.payload,
      };
    case ADD_MODAL_IMAGE_URL:
      return {
        ...state,
        modalImageUrl: action.payload,
      };
    case ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    case LOADING_TOGGLE:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SCAN_INVOICE:
      return {
        ...state,
        dataScan: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case FETCH_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
      };
    case FETCH_BUDGET_DETAIL:
      return {
        ...state,
        budgetDetail: action.payload,
      };
    case ADD_BUDGET:
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
}
