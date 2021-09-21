import React from "react";

const TableReport = ({ transactions }) => {
  // a function that assigns bootstrap styling classes based on
  // the status of the ticket
  console.log(transactions, "transactions");
  return (
    <div className="container">
      {transactions?.length === 0 ? (
        "You currently have no transactions created"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.Category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableReport;
