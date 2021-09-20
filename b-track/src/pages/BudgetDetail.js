import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
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
import { getDate, getFullYear } from "../helpers/getDate";

export default function BudgetDetail() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);
  const [transactionId, setTransactionId] = useState("");
  const [lineLabel, setLineLabel] = useState([]);
  const [lineData, setLineData] = useState([]);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchTransactions())
      .then((response) => {
        let label = [];
        let data = [];
        response.Transactions.map((el) => {
          label.push(getFullYear(el.date));
          data.push(el.amount);
        });
        let dataSets = {
          label: "Budget Utilization",
          data: data,
          fill: true,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        };
        setLineLabel(label);
        setLineData(dataSets);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(loadingToggle(false));
      });
  }, []);

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
    dispatch(deleteTransaction(transactionId)).then((response) => {
      toast.success(response.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  if (isLoading) {
    return (
      <lottie-player
        src="https://assets2.lottiefiles.com/packages/lf20_YMim6w.json"
        className="w-2/3 mx-auto h-2/3"
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
        {/* Line Chart */}
        <div className="mb-5 border">
          <LineChartTransaction
            data={{ labels: lineLabel, datasets: [lineData] }}
          />
        </div>

        {/* <pre>{JSON.stringify(lineLabel, null, 2)}</pre>
        <pre>{JSON.stringify(lineData, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(transactions, null, 2)}</pre> */}

        {/* Modal Add Transaction */}
        <FormTransactionModal id={transactionId} />
        <InvoiceModal />

        {/* Table */}
        <div className="py-2 pr-10 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full px-8 pt-3 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
            <h1 className="mb-5 text-5xl font-bold">{transactions.name}</h1>
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
                {transactions.Transactions.map((transaction) => {
                  return (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 ">
                        <div className="text-sm leading-5 text-blue-900">
                          {transaction.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {getDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {idrCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.Category.name}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        {transaction.User.username}
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-blue-900 whitespace-no-wrap border-b border-gray-500 ">
                        <button
                          className="text-blue-500"
                          onClick={() => showImageModal(transaction.invoice)}
                        >
                          see invoice
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm leading-5 text-right whitespace-no-wrap border-b border-gray-500 ">
                        <div className="flex justify-between w-40">
                          <button
                            className="px-5 py-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                            onClick={() => showModal(transaction.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-5 py-2 text-blue-500 transition duration-300 border border-blue-500 rounded hover:bg-blue-700 hover:text-white focus:outline-none"
                            onClick={() => deleteHandler(transaction.id)}
                          >
                            Delete
                          </button>
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
