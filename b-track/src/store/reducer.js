import { SET_ERROR, SET_LOADING, TOGGLE_MODAL_FORM_DETAIL, TOGGLE_MODAL_IMAGE, FETCH_DEPARTMENTS, FETCH_BUDGETS, FETCH_BUDGET_DETAIL, ADD_BUDGET } from "./actionType";

const initialState = {
  isModalFormDetail: false,
  isModalImage: false,
  loading:false,
  error:null,
  departments:[],
  budgets:[],
  budgetDetail:[]
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
    default:
      return state;
  }
}
