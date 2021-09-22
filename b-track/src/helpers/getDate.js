export const getDate = (isoDate) => {
  const newDate = new Date(isoDate);
  let date = newDate.getDate() + "";
  let month = newDate.getMonth() + 1 + "";
  let year = newDate.getFullYear();

  if (date.length < 2) date = "0" + date;
  if (month.length < 2) month = "0" + month;

  return [date, month, year].join("-");
};

export const getShortMonth = (isoDate) => {
  const newDate = new Date(isoDate);
  let shortMonth = newDate.toLocaleString("default", { month: "short" });
  return shortMonth;
};

export const getLongMonth = (isoDate) => {
  const newDate = new Date(isoDate);
  let longMonth = newDate.toLocaleString("default", { month: "long" });
  return longMonth;
};

export const getFullYear = (isoDate) => {
  const newDate = new Date(isoDate);
  let year = newDate.getFullYear();

  return year;
};

export const editFormDate = (isoDate) => {
  const newDate = new Date(isoDate);
  let date = newDate.getDate() + "";
  let month = newDate.getMonth() + 1 + "";
  let year = newDate.getFullYear();

  if (date.length < 2) date = "0" + date;
  if (month.length < 2) month = "0" + month;

  return [year, month, date].join("-");
};

export const getFinalDate = (isoDate) => {
  const newDate = new Date(isoDate);
  let date = newDate.getDate() + "";
  let year = newDate.getFullYear();

  if (date.length < 2) date = "0" + date;

  return [date, getLongMonth(isoDate), year].join(" ");
};
