import { TOGGLE_MODAL_FORM_DETAIL, TOGGLE_MODAL_IMAGE, SET_LOADING, SET_ERROR, FETCH_DEPARTMENTS, FETCH_BUDGETS, FETCH_BUDGET_DETAIL, ADD_BUDGET } from "./actionType";
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

function setBudgets(payload) {
  return {
      type : FETCH_BUDGETS,
      payload
  }
}

function addBudget(payload) {
  return {
      type : ADD_BUDGET,
      payload
  }
}

function setBudgetDetail(payload) {
  return {
      type : FETCH_BUDGET_DETAIL,
      payload
  }
}

export function fetchDepartments() {
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

export function fetchBudgets({DepartmentId, access_token}) {
  return async function (dispatch, getState) {
      try {
          dispatch(setLoading(true))
          axios.get('/budgets/department/'+ DepartmentId, {
            headers:{
              access_token
            }
          })
          .then((response) => {
            dispatch(setBudgets(response.data))
          })
          .finally(() => dispatch(setLoading(false)))
      } catch (error) {
          dispatch(setError(error))
      }
  }
}

export function fetchBudgetDetail({budgetId, access_token}) {
  return async function (dispatch, getState) {
      try {
          dispatch(setLoading(true))
          axios.get('/budgets/'+ budgetId, {
            headers:{
              access_token
            }
          })
          .then((response) => {
            dispatch(setBudgetDetail(response.data))
          })
          .finally(() => dispatch(setLoading(false)))
      } catch (error) {
          dispatch(setError(error))
      }
  }
}

export function requestBudget({access_token, name, amount, initial_amount, date, due_date}) {
  return async function (dispatch, getState) {
      try {
          dispatch(setLoading(true))
          axios.post('/budgets',{
            name, amount, initial_amount, date, due_date
          }, 
          {
            headers:{
              access_token
            }
          })
          .then((response) => {
            dispatch(addBudget(response.data))
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
