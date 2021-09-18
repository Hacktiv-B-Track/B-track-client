import { TOGGLE_MODAL } from "./actionType";

export function toggleModal(payload) {
  return {
    type: TOGGLE_MODAL,
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
