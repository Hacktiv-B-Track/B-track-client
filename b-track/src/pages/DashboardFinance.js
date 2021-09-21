import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { fetchBudgetsFinance, fetchDepartments, toggleModalFormDetail } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import InvoiceModal from "../components/InvoiceModal";
import FormApproveModal from '../components/FormApproveModal'

export default function DashboardFinance() {''
    const dispatch = useDispatch()
    const [id, setId] = useState(null)
    const [budgetName, setBudgetName] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [due_date, stedue_date] = useState(new Date().toISOString().slice(0, 10))
    const budgets = useSelector(state => state.budgets)
    let history = useHistory()
    const departments = useSelector(state => state.departments)
    useEffect(() => {
        dispatch(fetchBudgetsFinance())
        dispatch(fetchDepartments())
      }, [])

    function handleClick({budgetId, status, name, amount, date, due_date}) {
      if (status === 'Approved') {
        history.push('/budget/' + budgetId)
      } else {
        showModal({budgetId, name, amount, date, due_date})
      }
    }

    const showModal = ({budgetId, name, amount, date, due_date}) => {
      setId(budgetId)
      setBudgetName(name)
      setAmount(amount)
      setDate(date.slice(0, 10))
      stedue_date(due_date.slice(0, 10))
      dispatch(toggleModalFormDetail(true));
    };

  return (
    <>
      {/* section main app.js */}
      <div className="max-w-full max-h-full min-h-screen">
        <div className="container mx-auto">
        <FormApproveModal id={id} name={budgetName} amount={amount} date={date} due_date={due_date}/>
        <InvoiceModal image="https://images.unsplash.com/photo-1628191137573-dee64e727614?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />
          {/* Department Dashboard */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto max-w-7x1">
              {/* Finance Head */}
              <div className="flex flex-wrap w-full p-4 mb-4">
                <div className="w-full mb-6 lg:mb-0">
                  <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                    Dashboard
                  </h1>
                  <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                </div>
              </div>
              {/* /Finance Head */}

              {/* Finance Body */}
              <div className="flex-col p-5 border">
                {/* Chart */}
                <div className="w-8/12 border">
                    <LineChart className=""/>
                </div>
                {/* /Chart */}

                    {departments.map(department => {
                      return (
                        <div key={department.id} className='border mt-5'>
                          <div className="flex flex-wrap w-full p-4 mb-4">
                                <div className="w-full mb-6 lg:mb-0">
                                <h1 className="mb-2 text-5xl font-bold text-gray-900 sm:text-4xl title-font">
                                    {department.name}
                                </h1>
                                <div className="w-20 h-1 bg-indigo-500 rounded"></div>
                                </div>
                            </div>
                            
                            <div className='grid grid-cols-4 gap-4'>
                                {budgets.map(budget=>{
                                  if (budget.DepartmentId === department.id) {
                                    return (
                                        <div 
                                        onClick={e=>handleClick({
                                          budgetId:budget.id, 
                                          status:budget.status, 
                                          name: budget.name, 
                                          amount: budget.amount,
                                          date: budget.date,
                                          due_date: budget.due_date
                                        })} 
                                        key={budget.id} 
                                        className="p-4 border-4 group hover:bg-white hover:shadow-lg hover:border-invisible cursor-pointer">
                                            <div className="p-6 bg-white flex flex-col items-center rounded-lg">
                                                <h2 className="mb-4 text-lg font-medium text-center text-gray-900">
                                                {budget.name}
                                                </h2>
                                                <PieChart data={{amount:budget.amount, initial:budget.initial_amount}} />
                                                {budget.status === 'Unapproved' && (<p className='mt-2 text-base font-medium text-center badge badge-warning'>{budget.status}</p>)}
                                                {budget.status === 'Approved' && (<p className='mt-2 text-base font-medium text-center badge badge-success'>{budget.status}</p>)}
                                                {budget.status === 'Rejected' && (<p className='mt-2 text-base font-medium text-center badge badge-error'>{budget.status}</p>)}
                                            </div>
                                        </div>
                                    )
                                  }
                                })}
                            </div>
                        </div>
                      )
                    })}
                
              </div>
              {/* /Finance Body */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
