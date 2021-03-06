import React from "react";
import PieChart from "../components/PieChart";
import { fetchBudgets, toggleModalDelete, toggleModalFormDetail } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import FormBudgetModal from "../components/FormBudgetModal";
import InvoiceModal from "../components/InvoiceModal";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import FormDeleteModal from "../components/DeleteModal";

export default function DashboardDepartment() {
  const dispatch = useDispatch();
  const refresh = useSelector(state => state.refresh)
  const [DepartmentId] = useState(localStorage.getItem("DepartmentId"));
  const [DepartmentName] = useState(localStorage.getItem("DepartmentName"));
  const [id, setId] = useState(null);
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [due_date, setDueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [role] = useState(localStorage.getItem("role"));
  const budgets = useSelector((state) => state.budgets);
  const loading = useSelector((state) => state.loading);
  let history = useHistory();

  useEffect(() => {
    dispatch(fetchBudgets({ DepartmentId }));
  }, [refresh]);

  const showModal = () => {
    dispatch(toggleModalFormDetail(true));
  };

  const showDeleteModal = ({ id, name, amount, date, due_date }) => {
    setId(id);
    setBudgetName(name);
    setAmount(amount);
    setDate(date.slice(0, 10));
    setDueDate(due_date.slice(0, 10));
    dispatch(toggleModalDelete(true));
  };

  function handleApproved(budgetId) {
    history.push("/budget/" + budgetId);
  }

  function handleOnClick({status, id, name, amount, date, due_date}) {
    if (status === 'Approved') {
      handleApproved(id)
    }else if (status === 'Rejected' && role === 'manager_department') {
      showDeleteModal({ id, name, amount, date, due_date })
    }
  }

  const lottiStyle = {
    width: "10rem",
    margin: "0 auto",
    marginTop: "25rem"
  };

  if (loading) {
    return (
      <lottie-player
        src="https://assets9.lottiefiles.com/private_files/lf30_p3pfeg6p.json"
        style={lottiStyle}
        background="transparent"
        speed="1"
        loop
        autoplay
      ></lottie-player>
    );
  }

  return (
    <>
      {/* section main app.js */}
      <div className="max-w-full max-h-full min-h-screen">
        <div className="container mx-auto">
          <FormBudgetModal name="add" />
          <FormDeleteModal
            id={id}
            name={budgetName}
            amount={amount}
            date={date}
            due_date={due_date}
          />
          <InvoiceModal image="https://images.unsplash.com/photo-1628191137573-dee64e727614?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />

          {/* Department Dashboard */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">
              {/* Departemen Head */}
              <div className="flex flex-wrap w-full p-4 mb-4">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                    {DepartmentName}
                  </h1>
                  <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                </div>
              </div>

              {role === 'manager_department' && (<button
                className="px-5 py-2 mb-10 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                onClick={showModal}
              >
                Request New Budget
              </button>)}
              
              {/* Departemen Head */}

              {/* Departemen Body */}
              <div className="grid grid-cols-4 gap-4">
                {budgets.map((budget) => {
                  return (
                    <div 
                        onClick={()=>handleOnClick({
                          id: budget.id,
                          status: budget.status,
                          name: budget.name,
                          amount: budget.amount,
                          date: budget.date,
                          due_date: budget.due_date,
                        })}
                        key={budget.id} 
                        className="p-4 border-4 group hover:bg-white hover:shadow-lg hover:border-invisible cursor-pointer"
                        >
                        <div className="p-6 bg-white flex flex-col items-center rounded-lg">
                            <div className='h-16 flex items-center'>
                              <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                              {budget.name}
                              </h2>
                            </div>
                            <PieChart data={{amount:budget.amount, initial:budget.initial_amount}} />
                            {budget.status === 'Unapproved' && (<p className='mt-2 text-base font-medium text-center badge badge-warning'>{budget.status}</p>)}
                            {budget.status === 'Approved' && (<p className='mt-2 text-base font-medium text-center badge badge-success'>{budget.status}</p>)}
                            {budget.status === 'Rejected' && (<p className='mt-2 text-base font-medium text-center badge badge-error'>{budget.status}</p>)}
                        </div>
                    </div>
                  );
                })}
              </div>
              {/* Departemen Body */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
