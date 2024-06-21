import { Footer } from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { FaArrowRight, FaUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { PiPlantLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";

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

  function login() {
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      alert("Fill the form");
    }
    //send form data to backend and expect a response

    const res = {
      isAdmin: true,
      username: formData.username,
      farmland: "farmland1",
      status: "pending",
      token: "d7dsuhsudi",
    };
    //save response to local storage
    console.log(formData);

    localStorage.setItem("user", JSON.stringify(res));

    router.push(`/dashboard/`);
  }

  return (
    <div className="main">
      <Header />
      <div className="mt-28">
        <div className="flex justify-center items-center    px-2  ">
          <div className="bg-white p-8 rounded shadow-md max-w-xl   w-full  ">
            <h2 className="text-2xl flex items-center space-x-3 font-bold mb-4">
              <FaUser className="text-[#008000]" />
              <p>Log In</p>
            </h2>
            <form onSubmit={login}>
              <div className="mb-4">
                <label htmlFor="username" className="text-sm">
                  Username
                </label>
                <div className="flex items-center border rounded mt-1">
                  <span className="pl-3">
                    <AiOutlineUser className="text-[#008000]" />
                  </span>
                  <input
                    type="text"
                    id="username"
                    className="w-full py-2 px-2 outline-none  bg-transparent  "
                    placeholder="Enter your username"
                    required
                    maxLength={12}
                    value={"username"}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="ethAddress" className="text-sm">
                  Password
                </label>
                <div className="flex items-center border rounded mt-1">
                  <span className="pl-3">
                    <GoKey className="text-[#008000]" />
                  </span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full py-2 px-2 outline-none bg-transparent"
                    placeholder="Enter your BNB wallet address"
                    required
                    value={"wallet_address"}
                    onChange={(e) =>  handleChange(e)}
                  />
                </div>
              </div>

              {/*   */}
              {loading ? (
                <button
                  className="w-full bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded opacity-50 cursor-not-allowed"
                  disabled
                >
                  Registering...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded"
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
              <p className="text-">
                {" "}
                You don&apos;t have an account?{" "}
                <Link href={"/signup"}>Sign up</Link>{" "}
              </p>
              {/* <Link href="/login" className="text-[#008000]">
              Login
            </Link> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-48">
        <Footer />
      </div>
    </div>
  );
}
