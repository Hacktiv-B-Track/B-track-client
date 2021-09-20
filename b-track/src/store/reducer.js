import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_IMAGE,
  ADD_MODAL_IMAGE_URL,
  ADD_TRANSACTIONS,
  ADD_TRANSACTION,
  LOADING_TOGGLE,
  SCAN_INVOICE,
} from "./actionType";

const initialState = {
  isModalFormDetail: false,
  isModalImage: false,
  modalImageUrl: "",
  transactions: {},
  transaction: {},
  isLoading: true,
  dataScan: {},
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
    default:
      return state;
  }
}
