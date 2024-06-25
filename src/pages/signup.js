import { Footer } from "@/components/footer";
import Header from "@/components/header";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiFillMedicineBox,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { FaKey, FaUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { MdMoney, MdRotateLeft } from "react-icons/md";
import { PiPlantLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    farmland: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };



  async function signUp(e) {
    e.preventDefault()
    try {
      console.log(formData)
      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        farmland: formData.farmland
      }
      const res = await axios.post(`https://druminant-seven.vercel.app/api/v1/auth/${formData.role}/register`, newUser)

      if (res) {
        toast.success("Registration successful")
        router.push("/login")
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }



  return (
    <div>
      <Head>
        <title>Druminant - Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/image/mobilelogo.png" />
      </Head>
      <div className="main">
        <Header />
        <div className="form mt-20  ">

          <>
            <div className="flex justify-center items-center  px-2  ">
              <div className=" md:bg-white h-full p-8 rounded shadow-md max-w-xl  w-full  ">
                <h2 className="text-2xl flex items-center space-x-3 font-bold mb-4">
                  <FaUser className="md:text-[#008000] text-[#24c024]" />
                  <p className="text-white md:text-black">Sign Up</p>
                </h2>
                <form onSubmit={signUp}>
                  <div className="grid grid-cols-1 w-11/12 gap-8 mx-auto md:grid-cols-2 md:gap-16 md:w-4/5">
                    <div className="mb-4">
                      <label htmlFor="username" className="text-s text-white md:text-black">
                        Username
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <AiOutlineUser className="md:text-[#008000] text-white" />
                        </span>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="w-full py-2 px-2 outline-none h-10 text-white md:text-black bg-transparent  "
                          placeholder="Enter your username"
                          required
                          maxLength={12}
                          value={formData.username}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="text-sm text-white md:text-black">
                        Email
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <AiOutlineMail className="md:text-[#008000] text-white" />
                        </span>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full py-2 px-2 outline-none text-white md:text-black h-10 bg-transparent"
                          placeholder="Enter your email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="ethAddress" className="text-sm text-white md:text-black">
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
                          className="w-full py-2 px-2 outline-none text-white md:text-black h-10 bg-transparent"
                          placeholder="Enter password"
                          required
                          value={formData.password}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="ethAddress" className="text-sm text-white md:text-black">
                        Farmland name
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <PiPlantLight className="md:text-[#008000] text-white" />
                        </span>
                        <input
                          type="text"
                          id=""
                          name="farmland"
                          className="w-full py-2 px-2 outline-none text-white md:text-black h-10 bg-transparent"
                          placeholder="Enter farmland name"
                          required
                          value={formData.farmland}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="ethAddress" className="text-sm text-white md:text-black">
                        Role
                      </label>
                      <div className="flex items-center border rounded mt-1">
                        <span className="pl-3">
                          <RiAdminLine className="md:text-[#008000] text-white" />
                        </span>
                        <select
                          type="text"
                          id="role"
                          name="role"
                          className="w-full py-2 px-2 outline-none h-10 text-white md:text-black bg-transparent"
                          placeholder="Enter your BNB wallet address"
                          required
                          value={formData.role}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value={""}>Select role</option>
                          <option value={"admin"}>Admin</option>
                          <option value={"staff"}>Staff</option>
                        </select>
                      </div>
                    </div>
                  </div>


                  {/* <div className="mb-4">
                    <label htmlFor="image" className="text-sm">
                      Profile Image
                    </label>
                    <input
                      multiple={false}
                      type="file"
                      id="image"
                      className="w-full py-2 px-2 outline-none bg-transparent"
                      accept="image/*"
                      onChange={"handleImageChange"}
                    />
                  </div> */}
                  {loading ? (
                    <button
                      className="w-full bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded  cursor-not-allowed"
                      disabled
                    >
                      Registering...
                    </button>
                  ) : (
                    <button
                      type="submit" onClick={signUp}
                      className="w-full bg-[#008000] hover:bg-[#00801ef1] text-white py-2 px-4 rounded"
                    >
                      Sign up
                    </button>
                  )}
                  {error && (
                    <p className="bg-red-900  p-2 text-white w-fit   rounded-sm mt-2">
                      {error}
                    </p>
                  )}
                </form>
                <div className="mt-5 text-sm text-center flex justify-between w-full items-center max-w-xs mx-auto">
                  <p className="mx-auto text-white md:text-black">
                    You have an account? <Link href={"/login"} className="md:text-[#008000]">Log in</Link>
                  </p>
                  {/* <Link href="/login" className="text-[#008000]">
              Login
            </Link> */}
                </div>
              </div>
            </div>
          </>
          {/* 
        <div >
          <div className="login-btn">
            <p>
              <Link href={"/dashboard"}>Sign up</Link>
            </p>
          </div>
          <div className="signup2">
            <p>
              Have an account already?{" "}
              <Link href={"/login"} className="signup-link">
                Log In
              </Link>
            </p>
          </div>
        </div> */}
        </div>

        <div className="mt-20 md:mt-48">
          <Footer />
        </div>
      </div>
    </div>
  );
}
