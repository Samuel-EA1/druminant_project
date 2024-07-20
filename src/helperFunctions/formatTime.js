import moment from "moment";

export const formatDateString = (isoString) => {
  if (!isoString) return "";
  const localDate = moment.utc(isoString).local();
  return localDate.format("YYYY-MM-DDTHH:mm");
};

export const formatDateLocal = (isoString) => {
  const date = new Date(isoString);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  return localDate;
};


export const formatDateTimeLocal = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatBalance = (number) => {
  if (number >= 1000000000) {
    // Billions
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number >= 1000000) {
    // Millions
    return (number / 1000000).toFixed(1) + "M";
  }   else {
    // Less than a thousand
    return new Intl.NumberFormat("en-US").format(number);
  }
};

