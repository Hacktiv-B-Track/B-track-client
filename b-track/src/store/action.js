import axios from "../apis/axios";
import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_IMAGE,
  ADD_TRANSACTIONS,
  ADD_MODAL_IMAGE_URL,
  ADD_TRANSACTION,
  LOADING_TOGGLE,
  SCAN_INVOICE,
} from "./actionType";
import { toast } from "react-toastify";

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
      dispatch(loadingToggle(true));
      const { data } = await axios.get(`/budgets/1`);
      const transactions = data;
      dispatch(addTransactions(transactions));
      return Promise.resolve(transactions);
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch, getState) => {
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

export const postTransaction = (payload) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/transactions/1`,
        data: payload,
      });
      // return Promise.resolve(data);
      // dispatch(fetchTransactions());
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTransaction = (transactionId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.delete(`/transactions/${transactionId}`);
      return Promise.resolve(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

export const fetchScanInvoice = (file) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggle(true));
      const { data } = await axios({
        method: "POST",
        url: `/scanInvoice`,
        headers: { "Content-Type": "multipart/form-data" },
        data: file,
      });
      return Promise.resolve(data);
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
export function scanInvoice(payload) {
  return {
    type: SCAN_INVOICE,
    payload: payload,
  };
}
