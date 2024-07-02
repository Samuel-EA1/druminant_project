import { userState } from "@/atom";
import { Footer } from "@/components/footer";
import Header from "@/components/header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { FaArrowRight, FaTruckLoading, FaUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { PiPlantLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function login(e) {
    e.preventDefault();
    // if (formData.username.trim() === "" || formData.password.trim() === "") {
    //   alert("Fill the form");
    // }
    // //send form data to backend and expect a response

    // const res = {
    //   isAdmin: true,
    //   username: formData.username,
    //   farmland: "farmland1",
    //   status: "pending",
    //   token: "d7dsuhsudi",
    // };
    // //save response to local storage
    // console.log(formData);

    // localStorage.setItem("user", JSON.stringify(res));

    // router.push(`/dashboard/`);

    // https://druminant-seven.vercel.app/api/v1/auth/login

    // const userFromLocalStorage = useRecoilValue(userState);

    try {
      console.log(formData);
      setLoading(true);
      const res = await axios.post(
        "https://druminant-seven.vercel.app/api/v1/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      const decoded = jwtDecode(res.data.token);
       
      setLoading(false);
      router.push(`/dashboard/${decoded.farmland}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.code === "ERR_NETWORK") {
        toast.error(error.message + ", Please try again later!");
      } else if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Druminant - Log in</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>

      <div className="main">
        <Header />
        <div className="mt-36">
          <div className="flex justify-center items-center    px-2  ">
            <div className="md:bg-white p-8 rounded shadow-md max-w-xl   w-full  ">
              <h2 className="text-2xl flex items-center space-x-3 font-bold mb-4">
                <FaUser className="md:text-[#008000] text-[#24c024]" />
                <p className="text-white md:text-black">Log In</p>
              </h2>
              <form onSubmit={login}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="text-sm text-white md:text-black"
                  >
                    Username
                  </label>
                  <div className="flex items-center border rounded mt-1">
                    <span className="pl-3">
                      <AiOutlineUser className="md:text-[#008000] text-white" />
                    </span>
                    <input
                      type="text"
                      id="username"
                      className="w-full py-2 px-2 outline-none text-base text-white h-12 md:text-black bg-transparent  "
                      placeholder="Enter your username"
                      required
                      maxLength={12}
                      name="username"
                      value={formData.username}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="ethAddress"
                    className="text-sm text-white md:text-black"
                  >
                    Password
                  </label>
                  <div className="flex items-center border rounded mt-1">
                    <span className="pl-3">
                      <GoKey className="md:text-[#008000] text-white" />
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full py-2 px-2 outline-none text-base h-12 text-white md:text-black bg-transparent"
                      placeholder="Enter password"
                      required
                      value={formData.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                {/*   */}
                {loading ? (
                  <button
                    className="w-full flex justify-center items-center space-x-2 bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded  cursor-not-allowed"
                    disabled
                  >
                    <AiOutlineLoading3Quarters className="text-white text-2xl animate-spin " />{" "}
                    <p> Processing</p>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-[#008000] hover:bg-[#00801ef1]  text-white py-2 px-4 rounded"
                  >
                    Log in
                  </button>
                )}
                {error && (
                  <p className="bg-red-900  p-2 text-white w-fit   rounded-sm mt-2">
                    {error}
                  </p>
                )}
              </form>
              <div className="mt-10 text-sm text-center flex justify-between w-full items-center max-w-xs mx-auto">
                <p className=" mx-auto text-sm text-white md:text-black">
                  You don&apos;t have an account?
                  <Link href={"/signup"} className="md:text-[#008000]">
                    {" "}
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-48 md:mt-64">
          <Footer />
        </div>
      </div>
    </div>
  );
}
