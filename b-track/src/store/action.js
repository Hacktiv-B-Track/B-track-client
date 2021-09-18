import { TOGGLE_MODAL_FORM_DETAIL, TOGGLE_MODAL_IMAGE } from "./actionType";

export function toggleModalFormDetail(payload) {
  return {
    type: TOGGLE_MODAL_FORM_DETAIL,
    payload: payload,
  };
}

export function toggleModalImage(payload) {
  return {
    type: TOGGLE_MODAL_IMAGE,
    payload: payload,
  };
}

// export function fetchTes() {
//   return async function (dispatch, getState) {
//     try {
//     } catch (err) {
//     }
//   };
// }
