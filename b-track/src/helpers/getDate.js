export const getDate = (isoDate) => {
  const newDate = new Date(isoDate);
  let date = newDate.getDate() + "";
  let month = newDate.getMonth() + 1 + "";
  let year = newDate.getFullYear();

  if (date.length < 2) date = "0" + date;
  if (month.length < 2) month = "0" + month;

  return [date, month, year].join("-");
};
