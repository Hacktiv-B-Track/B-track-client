import jsPDF from "jspdf";
import "jspdf-autotable";
import { idrCurrency } from "./currency";

import { format } from "date-fns";

const generatePDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = ["ID", "Name", "Amount", "Date", "Category"];
  const tableRows = [];

  data?.Transactions.forEach((transaction) => {
    const transactionsData = [
      transaction.id,
      transaction.name,
      idrCurrency(transaction.amount),
      format(new Date(transaction.date), "yyyy-MM-dd"),
      transaction.Category.name,
    ];
    tableRows.push(transactionsData);
  });
  doc.text(`${data?.name} | ${idrCurrency(data?.initial_amount)}`, 14, 15);

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
