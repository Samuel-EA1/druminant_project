import { userState } from "@/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";

export const viewRecord = async (
  token,
  farmland,
  moduleType,
  livestockType,
  id
) => {
  const res = await axios.get(
    ` http://localhost:5000/api/v1/farmland/${farmland}/${moduleType}/${livestockType}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.message;
};

export const deleteRecord = async (
  token,
  farmland,
  moduleType,
  livestockType,
  id
) => {
  console.log(id);
  const res = await axios.delete(
    ` http://localhost:5000/api/v1/farmland/${farmland}/${moduleType}/${livestockType}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.message;
};
