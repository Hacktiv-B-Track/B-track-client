import axios from "../apis/axios";
import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_IMAGE,
  ADD_TRANSACTIONS,
  ADD_MODAL_IMAGE_URL,
  ADD_TRANSACTION,
  LOADING_TOGGLE,
} from "./actionType";

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

export function addModalImageUrl(payload) {
  return {
    type: ADD_MODAL_IMAGE_URL,
    payload: payload,
  };
}

export function addTransactions(payload) {
  return {
    type: ADD_TRANSACTIONS,
    payload: payload,
  };
}

export function addTransaction(payload) {
  return {
    type: ADD_TRANSACTION,
    payload: payload,
  };
}

export const fetchTransactions = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`/`);
      const transactions = response.data;
      dispatch(addTransactions(transactions));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch, getState) => {
    // const { transaction } = getState();
    try {
      if (id) {
        const response = await axios.get(`/${id}`);
        const transaction = response.data;
        dispatch(addTransaction(transaction));
        return Promise.resolve(transaction);
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export function loadingToggle(payload) {
  return {
    type: LOADING_TOGGLE,
    payload: payload,
  };
}
