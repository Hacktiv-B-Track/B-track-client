import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { format } from "date-fns";
import {
  toggleModalFormDetail,
  toggleModalImage,
  fetchTransactions,
  addModalImageUrl,
  deleteTransaction,
  loadingToggle,
} from "../store/action";
import LineChartTransaction from "../components/LineChartTransaction";
import FormTransactionModal from "../components/FormTransactionModal";
import InvoiceModal from "../components/InvoiceModal";
import { idrCurrency } from "../helpers/currency";
import { getDate, getFinalDate } from "../helpers/getDate";
import generatePDF from "../helpers/reportGenerator";

export default function BudgetDetail() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { budgetId } = useParams();
  const transactions = useSelector((state) => state.transactions);
  const [transactionId, setTransactionId] = useState("");
  const [lineLabel, setLineLabel] = useState([]);
  const [lineData, setLineData] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchTransactions(budgetId));
    dispatch(loadingToggle(false));
  }, []);

  useEffect(() => {
    //! mapping buat chart
    let label = [];
    let data = [];
    const sorted = transactions?.Transactions?.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    sorted?.map((el) => {
      label.push(format(new Date(el.date), "d MMM yy"));
      data.push(el.amount);
    });
    // transactions?.Transactions.map((el) => {
    //   label.push(getDate(el.date));
    //   data.push(el.amount);
    // });
    let dataSets = {
      label: "Budget Utilization",
      data: data,
      fill: true,
      backgroundColor: "#60A5FA",
      borderColor: "#60A5FA",
    };
    setLineLabel(label);
    setLineData(dataSets);
  }, [transactions]);

  const showModal = (transactionId) => {
    if (typeof transactionId === "number") {
      setTransactionId(transactionId);
      dispatch(toggleModalFormDetail(true));
    } else {
      setTransactionId(null);
      dispatch(toggleModalFormDetail(true));
    }
  };

  const showImageModal = (url) => {
    dispatch(addModalImageUrl(url));
    dispatch(toggleModalImage(true));
  };

  const deleteHandler = (transactionId) => {
    dispatch(deleteTransaction(transactionId, budgetId))
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => console.log(err));
  };

  if (isLoading) {
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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto max-w-7x1">
        {/* Name & back to dashboard */}
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold mb-7">{transactions.name}</h1>
          <div className="flex items-center">
            <button
              className="px-5 py-2 mb-10 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
              onClick={() => history.push("/")}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-1 -ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Back to Dashboard</span>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5 border-2">
          <div className="col-span-2">
            <LineChartTransaction
              data={{ labels: lineLabel, datasets: [lineData] }}
            />
          </div>

          <div className="grid-flow-row shadow stats">
            <div className="stat">
              <div className="text-xl stat-title">
                Total Spending
                <span className="ml-3 text-sm font-bold text-blue-700 ">
                  (
                  {parseFloat(
                    ((transactions.initial_amount - transactions.amount) /
                      transactions.initial_amount) *
                      100
                  ).toFixed(2)}
                  %)
                </span>
              </div>
              <div className="text-lg stat-value">
                {idrCurrency(transactions.initial_amount - transactions.amount)}
              </div>
            </div>
            <div className="stat">
              <div className="text-xl stat-title">Total Budget</div>
              <div className="text-lg stat-value">
                {idrCurrency(transactions.initial_amount)}
              </div>
            </div>
            <div className="stat">
              <div className="text-xl stat-title">Requested Date</div>
              <div className="text-lg stat-value">
                {getFinalDate(transactions.date)}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Due Date</div>
              <div className="text-xl stat-value">
                {getFinalDate(transactions.due_date)}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Add Transaction */}
        <FormTransactionModal id={transactionId} />
        <InvoiceModal />

        {/* Table */}
        <div className="py-2 pr-10 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full px-8 pt-3 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
            <h1 className="mb-5 text-5xl font-bold">Transaction List</h1>

            {localStorage.getItem("DepartmentName") !== "Finance" && (
              <button
                className="px-5 py-2 mb-10 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                onClick={showModal}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1 -ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Add New Transaction</span>
                </div>
              </button>
            )}

            {localStorage.getItem("DepartmentName") !== "Finance" && (
              <button
                className="px-5 py-2 mb-10 ml-5 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                onClick={() => generatePDF(transactions)}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-1 -ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download PDF Report</span>
                </div>
              </button>
            )}

            <table className="min-w-full mb-10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xl leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xl leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xl leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-xl leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xl leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                    By
                  </th>
                  <th className="px-6 py-3 text-xl leading-4 tracking-wider text-left text-blue-500 border-b-2 border-gray-300">
                    Invoice
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {transactions?.Transactions?.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 ">
                        <div className="text-lg leading-5 text-blue-900">
                          {transaction.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-lg leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {getDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-lg leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {idrCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 text-lg leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.Category.name}
                      </td>
                      <td className="px-6 py-4 text-lg leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.User.username}
                      </td>
                      <td className="px-6 py-4 text-lg leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        <button
                          className="text-blue-500"
                          onClick={() => showImageModal(transaction.invoice)}
                        >
                          see invoice
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-right whitespace-no-wrap border-b border-gray-500 ">
                        <div className="flex justify-between w-44">
                          {localStorage.getItem("DepartmentName") !==
                            "Finance" && (
                            <button
                              className="px-3 py-2 text-green-500 transition duration-300 border border-green-500 rounded hover:bg-green-700 hover:text-white focus:outline-none"
                              onClick={() => showModal(transaction.id)}
                            >
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 mr-1 -ml-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                <span>Edit</span>
                              </div>
                            </button>
                          )}
                          {localStorage.getItem("DepartmentName") !==
                            "Finance" && (
                            <button
                              className="px-3 py-2 text-red-500 transition duration-300 border border-red-500 rounded hover:bg-red-700 hover:text-white focus:outline-none"
                              onClick={() => deleteHandler(transaction.id)}
                            >
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 mr-1 -ml-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                <span>Delete</span>
                              </div>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
