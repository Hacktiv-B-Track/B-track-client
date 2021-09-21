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
  FETCH_BUDGETS,
  FETCH_BUDGET_DETAIL,
  ADD_BUDGET,
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

export function requestBudget({
  name,
  amount,
  initial_amount,
  date,
  due_date,
}) {
  return async function (dispatch, getState) {
    try {
      dispatch(setLoading(true));
      axios
        .post(
          "/budgets",
          {
            name,
            amount,
            initial_amount,
            date,
            due_date,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        )
        .then((response) => {
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
        })
        .finally(() => dispatch(setLoading(false)));
    } catch (error) {
      dispatch(setError(error));
    }
  };
}

export const fetchTransactions = ({ budgetId }) => {
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

export const postTransaction = (payload, budgetId) => {
  return async (dispatch, getState) => {
    try {
      console.log(budgetId);
      const { data } = await axios({
        method: "POST",
        url: `/transactions/${budgetId}`,
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

export const editTransaction = (payload, budgetId) => {
  return async (dispatch, getState) => {
    try {
      console.log(budgetId);
      const { data } = await axios({
        method: "PUT",
        url: `/transactions/${budgetId}`,
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
