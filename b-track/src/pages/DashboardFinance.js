import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { fetchBudgetsFinance, fetchDepartments, toggleModalFormDetail } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FormApproveModal from '../components/FormApproveModal'
import { idrCurrency } from "../helpers/currency";

export default function DashboardFinance() {''
    const dispatch = useDispatch()
    const [id, setId] = useState(null)
    const [budgetName, setBudgetName] = useState('')
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [due_date, setDueDate] = useState(new Date().toISOString().slice(0, 10))
    const [role] = useState(localStorage.getItem("role"));
    const [totalBudget, setTotalBudget] = useState([])
    const [totalSpent, setTotalSpent] = useState([])
    const budgets = useSelector(state => state.budgets)
    const loading = useSelector(state => state.loading)
    const error = useSelector(state => state.error)
    const departments = useSelector(state => state.departments)
    const refresh = useSelector(state => state.refresh)
    let history = useHistory()
    const reducer = (accumulator, curr) => accumulator + curr;
    
    useEffect(() => {
        dispatch(fetchBudgetsFinance())
        dispatch(fetchDepartments())
      }, [refresh])

    useEffect(() => {
      let arrayBudget = budgets?.map(el=>el.initial_amount)
      let arraySpent = budgets?.map(el=>el.amount)
      if(arrayBudget.length) {
        setTotalBudget(arrayBudget.reduce(reducer)) 
        if (arraySpent.length) setTotalSpent(arrayBudget.reduce(reducer)-arraySpent.reduce(reducer))
      }
    }, [budgets])

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
      setDueDate(due_date.slice(0, 10))
      dispatch(toggleModalFormDetail(true));
    };

  if (loading) {
    return (
      <lottie-player
        src="https://assets9.lottiefiles.com/private_files/lf30_p3pfeg6p.json"
        className="mx-auto w-96 h-96"
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
        
        <FormApproveModal id={id} name={budgetName} amount={amount} date={date} due_date={due_date}/>
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
                <div className='grid grid-cols-3 gap-2 mb-5 border-2'>
                  <div className="col-span-2">
                    <LineChart/>
                  </div>

                  <div className="grid-flow-row shadow stats">
                    <div className="stat">
                      <div className="text-xl stat-title">Total Spending</div>
                      <div className="text-xl stat-value">
                        {idrCurrency(totalSpent)}
                        <span className="ml-1 stat-desc text-success">
                          (
                            {parseFloat(
                              (totalSpent /
                                totalBudget) *
                                100
                            ).toFixed(2)}
                          %)
                        </span>
                      </div>
                    </div>
                    <div className="stat">
                      <div className="text-xl stat-title">Total Budget</div>
                      <div className="text-xl stat-value">
                         {idrCurrency(totalBudget)}
                      </div>
                    </div>
                  </div>
                </div>
                
                
                {/* /Chart */}

                    {departments.map(department => {
                      if (department.name !== 'Finance') {
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
                                          onClick={()=>budget.status !== 'Rejected' && handleClick({
                                                          budgetId:budget.id, 
                                                          status:budget.status, 
                                                          name: budget.name, 
                                                          amount: budget.amount,
                                                          date: budget.date,
                                                          due_date: budget.due_date
                                                        }) || null 
                                          } 
                                          key={budget.id} 
                                          className="p-4 border-4 group hover:bg-white hover:shadow-lg hover:border-invisible cursor-pointer">
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
                                      )
                                    }
                                  })}
                              </div>
                          </div>
                        )
                      }
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
