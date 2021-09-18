import { TOGGLE_MODAL_FORM_DETAIL, TOGGLE_MODAL_IMAGE } from "./actionType";

const initialState = {
  isModalFormDetail: false,
  isModalImage: false,
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
    default:
      return state;
  }
}
