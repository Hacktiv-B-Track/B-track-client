import { TOGGLE_MODAL_FORM_DETAIL, TOGGLE_MODAL_IMAGE, SET_LOADING, SET_ERROR, FETCH_DEPARTMENTS } from "./actionType";
import axios from '../apis/server'

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

function setError(payload) {
  return {
      type : SET_ERROR,
      payload
  }
}

function setLoading(payload) {
  return {
      type : SET_LOADING,
      payload
  }
}

function setDepartments(payload) {
  return {
      type : FETCH_DEPARTMENTS,
      payload
  }
}

export function fetchCategories() {
  return async function (dispatch, getState) {
      try {
          dispatch(setLoading(true))
          axios.get('/departments')
          .then((response) => {
            dispatch(setDepartments(response.data))
          })
          .finally(() => dispatch(setLoading(false)))
      } catch (error) {
          dispatch(setError(error))
      }
  }
}


// export function fetchTes() {
//   return async function (dispatch, getState) {
//     try {
//     } catch (err) {
//     }
//   };
// }
