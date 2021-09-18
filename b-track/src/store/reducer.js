import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_IMAGE,
  ADD_TRANSACTIONS,
  ADD_MODAL_IMAGE_URL,
} from "./actionType";

const initialState = {
  isModalFormDetail: false,
  isModalImage: false,
  transactions: [],
  modalImageUrl: "",
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
    default:
      return state;
  }
}
