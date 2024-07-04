import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api/v1";

const constructUrl = (
  baseUrl,
  farmland,
  moduleType,
  livestockType,
  financeType,
  id = ""
) => {
  let url = `${baseUrl}/farmland/${farmland}/${moduleType}/${livestockType}`;
  if (financeType) {
    url += `/${financeType}`;
  }
  if (id) {
    url += `/${id}`;
  }
  return url;
};

export const createRecord = async (
  token,
  farmland,
  moduleType,
  livestockType,
  formdata,
  financeType = ""
) => {
  const url = constructUrl(
    BASE_URL,
    farmland,
    moduleType,
    livestockType,
    financeType
  );
  const res = await axios.post(url, formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const viewRecord = async (
  token,
  farmland,
  moduleType,
  livestockType,
  id,
  financeType = ""
) => {
  const url = constructUrl(
    BASE_URL,
    farmland,
    moduleType,
    livestockType,
    financeType,
    id
  );
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteRecord = async (
  token,
  farmland,
  moduleType,
  livestockType,
  id,
  financeType = ""
) => {
  const url = constructUrl(
    BASE_URL,
    farmland,
    moduleType,
    livestockType,
    financeType,
    id
  );
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const editRecord = async (
  token,
  farmland,
  moduleType,
  livestockType,
  id,
  data,
  financeType = ""
) => {
  const url = constructUrl(
    BASE_URL,
    farmland,
    moduleType,
    livestockType,
    financeType,
    id
  );
  const res = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const fetchAllRecords = async (
  token,
  farmland,
  moduleType,
  livestockType,
  financeType = ""
) => {
  const url = constructUrl(
    BASE_URL,
    farmland,
    moduleType,
    livestockType,
    financeType
  );
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
