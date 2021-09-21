import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import generatePDF from "../helpers/reportGenerator";
import TableReport from "./TableReport";
import { fetchTransactions } from "../store/action";

const Report = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.transactions);
  const transactions = data.Transactions;

  useEffect(() => {
    dispatch(fetchTransactions({ budgetId: 1 }));
  }, []);

  //   useEffect(() => {
  //     const getAllTransactions = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:3000/budgets/2");
  //         console.log(response.data, "DATA");
  //         setTransactions(response.data.Transactions);
  //       } catch (err) {
  //         console.log("error");
  //       }
  //     };
  //     getAllTransactions();
  //   }, []);

  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          <button
            className="btn btn-primary"
            onClick={() => generatePDF(transactions)}
          >
            Generate monthly report
          </button>
        </div>
      </div>
      <TableReport transactions={transactions} />
    </div>
  );
};

export default Report;
