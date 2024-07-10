import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL =
  "http://localhost:5000/api/v1" || process.env.NEXT_PUBLIC_API_BASE_URL;

export const refreshToken = async (userData) => {
  if (userData && userData.status) {
    console.log(userData, "inside block");
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/refresh-token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log("refreshed new token");
      localStorage.setItem("token", res.data.message);
      return res.data.message;
    } catch (error) {
      console.log(error);

      if (error.code === "ERR_  NETWORK") {
        return toast.error("Something went wrong, please try again later!");
      }
      if (error.response.data.message === "Invalid token") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.error("Error fetching data", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      }
    }
  } else {
    console.log(userData, "else block");
  }
};

export const fetchStatus = async (username) => {
  try {
    // Fetch user info from backend
    const response = await axios.get(`${BASE_URL}/profile/${username}`);
    const userData = response.data.message;

    return userData.status;

    // Optionally, store the token in localStorage or state
  } catch (error) {
    console.error("Error fetching user info or generating token:", error);
  }
};
