import axios from "../apis/axios";
import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_IMAGE,
  ADD_TRANSACTIONS,
  ADD_MODAL_IMAGE_URL,
  ADD_TRANSACTION,
  LOADING_TOGGLE,
  SCAN_INVOICE,
  SET_LOADING,
  SET_ERROR,
  FETCH_DEPARTMENTS,
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

function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

function setDepartments(payload) {
  return {
    type: FETCH_DEPARTMENTS,
    payload,
  };
}

export function fetchCategories() {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      axios
        .get("/departments")
        .then((response) => {
          dispatch(setDepartments(response.data));
        })
        .finally(() => dispatch(setLoading(false)));
    } catch (error) {
      dispatch(setError(error));
    }
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
      const { data } = await axios({
        method: "GET",
        url: `/budgets/1`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const transactions = data;
      dispatch(addTransactions(transactions));
      return Promise.resolve(transactions);
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch, getState) => {
    try {
      if (id) {
        const { data } = await axios({
          method: "GET",
          url: `/transactions/${id}`,
          headers: { access_token: localStorage.getItem("access_token") },
        });
        const transaction = data;
        dispatch(addTransaction(transaction));
        return Promise.resolve(transaction);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postTransaction = (payload, budgedId) => {
  return async (dispatch, getState) => {
    try {
      console.log(budgedId);
      const { data } = await axios({
        method: "POST",
        url: `/transactions/${budgedId}`,
        headers: { access_token: localStorage.getItem("access_token") },
        data: payload,
      });
      // return Promise.resolve(data);
      // dispatch(fetchTransactions());
      toast.success("Success adding transaction", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

export const editTransaction = (payload, budgedId) => {
  return async (dispatch, getState) => {
    try {
      console.log(budgedId);
      const { data } = await axios({
        method: "PUT",
        url: `/transactions/${budgedId}`,
        headers: { access_token: localStorage.getItem("access_token") },
        data: payload,
      });
      console.log(data);
      // return Promise.resolve(data);
      // dispatch(fetchTransactions());
      toast.success("Success adding transaction", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

export const deleteTransaction = (transactionId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `/transactions/${transactionId}`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
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
