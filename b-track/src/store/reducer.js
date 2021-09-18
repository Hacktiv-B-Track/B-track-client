import { TOGGLE_MODAL } from "./actionType";

const initialState = {
  isModal: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isModal: action.payload,
      };
    default:
      return state;
  }
}
