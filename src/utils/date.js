const getDate = (dateTime = new Date(), type = "date") => {
  if (!(dateTime instanceof Date)) return dateTime;
  const fullYear = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const fullMonth = month < 10 ? '0' + month : month
  const dayDate =  dateTime.getDate()
  const fullDayDate = dayDate < 10 ? '0' + dayDate : dayDate
  switch (type) {
    case "date":
      return `${fullYear}-${fullMonth}-${fullDayDate}`
    case "time":
      return (
        dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds()
      );
    default:
      return dateTime;
  }
};

export { getDate };
