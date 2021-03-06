import axios from "../apis/axios";
import {
  TOGGLE_MODAL_FORM_DETAIL,
  TOGGLE_MODAL_DELETE,
  TOGGLE_MODAL_IMAGE,
  ADD_TRANSACTIONS,
  ADD_MODAL_IMAGE_URL,
  ADD_TRANSACTION,
  LOADING_TOGGLE,
  SCAN_INVOICE,
  SET_LOADING,
  SET_ERROR,
  FETCH_DEPARTMENTS,
  FETCH_BUDGETS,
  FETCH_BUDGET_DETAIL,
  ADD_BUDGET,
  ADD_CATEGORIES,
  SET_REFRESH,
} from "./actionType";
import { toast } from "react-toastify";

export function toggleModalFormDetail(payload) {
  return {
    type: TOGGLE_MODAL_FORM_DETAIL,
    payload: payload,
  };
}

export function toggleModalDelete(payload) {
  return {
    type: TOGGLE_MODAL_DELETE,
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

function setRefresh(payload) {
  return {
    type: SET_REFRESH,
    payload,
  };
}

function setDepartments(payload) {
  return {
    type: FETCH_DEPARTMENTS,
    payload,
  };
}

function setBudgets(payload) {
  return {
    type: FETCH_BUDGETS,
    payload,
  };
}

function addBudget(payload) {
  return {
    type: ADD_BUDGET,
    payload,
  };
}

export function fetchDepartments() {
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

export function addCategories(payload) {
  return {
    type: ADD_CATEGORIES,
    payload: payload,
  };
}

export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `/categories`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(addCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export function fetchBudgets({ DepartmentId }) {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      axios
        .get("/budgets/department/" + DepartmentId, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          dispatch(setBudgets(response.data));
        })
        .finally(() => dispatch(setLoading(false)));
    } catch (error) {
      dispatch(setError(error));
    }
  };
}

export function deleteBudget({ id }) {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      const response = await axios.delete("/budgets/" + id, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
      })
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(setRefresh(1))
      dispatch(toggleModalDelete(false))
    } catch (error) {
      dispatch(setError(error));
      if (error.response) {
        // Request made and server responded
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
      dispatch(setLoading(false))
    }
  };
}

export function fetchBudgetsFinance() {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      axios
        .get("/budgets", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          dispatch(setBudgets(response.data));
        })
        .finally(() => dispatch(setLoading(false)));
    } catch (error) {
      dispatch(setError(error));
    }
  };
}

export function EditBudget({ amount, date, due_date, status, budgetId }) {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        "/budgets/" + budgetId,
        {
          amount,
          date,
          due_date,
          status,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      dispatch(setRefresh(1));
      dispatch(toggleModalFormDetail(false));
      toast.success("Status Edited", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(setError(error));
      if (error.response) {
        // Request made and server responded
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function requestBudget({ name, amount, date, due_date }) {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "/budgets",
        {
          name,
          amount,
          date,
          due_date,
        },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      dispatch(addBudget(response.data));
      dispatch(toggleModalFormDetail(false));
      toast.success("Budget Request Success", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(setError(error));
      if (error.response) {
        // Request made and server responded
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const fetchTransactions = (budgetId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggle(true));
      const { data } = await axios({
        method: "GET",
        url: `/budgets/${budgetId}`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const transactions = data;

      dispatch(addTransactions(transactions));
      dispatch(loadingToggle(false));
      // return Promise.resolve(transactions);
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

export const postTransaction = (payload, budgetId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `/transactions/${budgetId}`,
        headers: { access_token: localStorage.getItem("access_token") },
        data: payload,
      });
      dispatch(fetchTransactions(budgetId));
      dispatch(toggleModalFormDetail(false));
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
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.map((err) =>
          toast.error(err, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      } else {
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
    }
  };
};

export const editTransaction = (payload, transactionId, budgetId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "PUT",
        url: `/transactions/${transactionId}`,
        headers: { access_token: localStorage.getItem("access_token") },
        data: payload,
      });
      dispatch(fetchTransactions(budgetId));
      dispatch(toggleModalFormDetail(false));
      toast.success("Success edit transaction", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.map((err) =>
          toast.error(err, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      } else {
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
    }
  };
};

export const deleteTransaction = (transactionId, budgetId) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `/transactions/${transactionId}`,
        headers: { access_token: localStorage.getItem("access_token") },
      });
      dispatch(fetchTransactions(budgetId));
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

// function setBudgetDetail(payload) {
//   return {
//       type : FETCH_BUDGET_DETAIL,
//       payload
//   }
// }

// export function fetchBudgetDetail({budgetId}) {
//   return async function (dispatch, getState) {
//       try {
//           dispatch(setLoading(true))
//           axios.get('/budgets/'+ budgetId, {
//             headers:{
//               access_token:localStorage.getItem('access_token')
//             }
//           })
//           .then((response) => {
//             dispatch(setBudgetDetail(response.data))
//           })
//           .finally(() => dispatch(setLoading(false)))
//       } catch (error) {
//           dispatch(setError(error))
//       }
//   }
// }
