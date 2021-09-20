import { useDispatch, useSelector } from "react-redux";
import { fetchBudgetDetail, toggleModalFormDetail, toggleModalImage } from "../store/action";
import FormTransactionModal from "../components/FormTransactionModal";
import InvoiceModal from "../components/InvoiceModal";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

export default function BudgetDetail() {
  const [access_token] = useState(localStorage.getItem('access_token'))
  const budgetDetail = useSelector(state => state.budgetDetail)
  const dispatch = useDispatch();
  let { budgetId } = useParams();
  console.log(budgetDetail);

  useEffect(() => {
    dispatch(fetchBudgetDetail({access_token, budgetId}))
  }, [])

  const showModal = () => {
    dispatch(toggleModalFormDetail(true));
  };
  const showImageModal = () => {
    dispatch(toggleModalImage(true));
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto max-w-7x1">
        {/* Modal Add Transaction */}
        <FormTransactionModal name="add" />
        <InvoiceModal image="https://images.unsplash.com/photo-1628191137573-dee64e727614?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" />

        {/* Table */}
        <div className="py-2 pr-10 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full px-8 pt-3 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
            <h1 className="mb-2 text-xl font-bold">{budgetDetail.name}</h1>
            <button
              className="px-5 py-2 mb-10 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
              onClick={showModal}
            >
              Add New Transaction
            </button>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300 ">
                    Name
                  </th>
                  <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300 ">
                    Date
                  </th>
                  <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300 ">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300 ">
                    Category
                  </th>
                  <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300 ">
                    By
                  </th>
                  <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300 ">
                    Invoice
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {budgetDetail?.Transactions?.map(transaction => {
                  return (
                    <tr>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 ">
                        <div className="text-sm leading-5 text-blue-900">
                          {transaction.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.Category.name}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.User.username}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        <button className="text-blue-500" onClick={showImageModal}>
                          see invoice
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-right whitespace-no-wrap border-b border-gray-500 ">
                        <div className="flex justify-between w-40">
                          <button className="px-5 py-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none">
                            Edit
                          </button>
                          <button className="px-5 py-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
