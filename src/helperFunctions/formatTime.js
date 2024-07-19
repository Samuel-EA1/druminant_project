import moment from "moment";

export const formatDateString = (isoString) => {
  if (!isoString) return "";
  const localDate = moment.utc(isoString).local();
  return localDate.format("YYYY-MM-DDTHH:mm");
};
