import jsPDF from "jspdf";
import "jspdf-autotable";

import { format } from "date-fns";
import { idrCurrency } from "./currency";

const generatePDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = ["Id", "Name", "Amount", "Date", "Category"];
  const tableRows = [];

  data?.Transactions.forEach((transaction, index) => {
    const transactionsData = [
      index + 1,
      transaction.name,
      idrCurrency(transaction.amount),
      format(new Date(transaction.date), "d MMMM y"),
      transaction.Category.name,
    ];

    tableRows.push(transactionsData);
  });

  const totalTransactions = [
    "",
    "TOTAL AMOUNT",
    idrCurrency(data?.initial_amount - data?.amount),
    "",
    "",
  ];

  tableRows.push(totalTransactions);

  doc.text(`${data?.name} | ${idrCurrency(data?.initial_amount)}`, 14, 15);

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;