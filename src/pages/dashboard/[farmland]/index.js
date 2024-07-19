// import Header2 from "@/components/header2";
import { newUserToken, userState } from "@/atom";
import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineDollarCircle,
  AiOutlineLoading,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { GiCage, GiCow, GiGoat, GiPig, GiSheep } from "react-icons/gi";
import { TbMilk } from "react-icons/tb";
import { FaCow } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import {
  fetchStatus,
  refreshToken,
} from "@/helperFunctions/fetchUserAndGenerateToken";

export default function Dashboard() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const [hamburgerState, setHamburgerState] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [newToken, setnewToken] = useRecoilState(newUserToken);
  const [lactationCount, setLactationCount] = useState([]);
  const [quarantineCount, setQuarantineCount] = useState([]);
  const [expenseCount, setExpenseCount] = useState([]);
  const [incomeCount, setIncomeCount] = useState([]);
  const [moduleCounts, setModuleCounts] = useState([]);
  const [farmlandError, setfarmlandError] = useState("");
  const [farmland, setFarmland] = useState("");
  const router = useRouter();
  // render the quarantine modulebased on the role of user
  const userData = useRecoilValue(userState);

  // useEffect(() => {
  //   toast("Welcome!");
  // }, []);

  // local function to refresh and set new token
  const refreshTOkenCallBack = async () => {
    const refreshedToken = await refreshToken(userData);

    if (refreshedToken) {
      setnewToken(refreshedToken);
    }
  };

  // check  user  status
  useEffect(() => {
    if (userData) {
      const fetchStatusAndRefreshToken = () => {
        fetchStatus(userData.username)
          .then((res) => {
            if (res !== undefined && res !== userData.status) {
          
              // generate new token
              refreshTOkenCallBack();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      fetchStatusAndRefreshToken(); // Initial call
    }
  }, [userData]);

  // fetch farmland details
  useEffect(() => {
    const farmland = router.query.farmland;

    setLoading(true);
    if (userData?.token && farmland) {
      const fetchAllCounts = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/farmland/${farmland}/moduleCount`,
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
            }
          );
          setLoading(false);

          setModuleCounts(response.data.message);
        } catch (error) {
          console.log(error);
          setLoading(false);
          if (error.code === "ERR_NETWORK") {
            return toast.error("Something went wrong, please try again later!");
          }
          if (error.response.data.message === "Invalid token") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          console.error("Error fetching data", error);
          if (error.response && error.response.status === 400) {
            setfarmlandError(error.response.data.message);
          }
          if (error.response && error.response.status === 401) {
            setfarmlandError(error.response.data.message);
          }
        }
      };

      fetchAllCounts();
    }
  }, [userData?.token, router]);

  const getModuleCount = (moduleType, liveStockType) => {
    const match = moduleCounts.find(
      (item) => item.livestockCount.name === liveStockType
    );
    return match[moduleType].data;
  };

  const sendRquest = async () => {
    setSending(true);
    setSent(false);
    try {
      const response = await axios.post(
        `${BASE_URL}/farmland/request`,
        { farmland },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.data.message) {
        const refreshedToken = await refreshToken(userData);
        if (refreshedToken) {
          setnewToken(refreshedToken);
        }
        setSent(true);
        setSending(false);
      }
    } catch (error) {
      console.log(error);
      setSending(false);
      setSent(false);
      if (error.code === "ERR_NETWORK") {
        return toast.error("Something went wrong, please try again later!");
      }
      if (error.response.data.message === "Invalid token") {
        localStorage.removeItem("token");
      }
      console.error("Error fetching data", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }

      if (error.response && error.response.status === 404) {
        toast.error(error.response.data.message);
      }
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.message);
      }
    }

 
  };

  return (
    <div>
      <Head>
        <title>Druminant - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>
      <div className="dashboard-main  mx-auto">
        <ModuleHeader />
        {userData?.token ? (
          userData.status === "Accept" || userData?.isAdmin ? (
            <div>
              {moduleCounts.length && !loading ? (
                <>
                  {" "}
                  <div className="dashboard md:mt-0">
                    <p className="first-letter:capitalize md:mt-16 mt-3">
                      {userData.farmland}
                      <br className="break" /> Dashboard
                    </p>
                  </div>
                  <div className=" md:my-20 max-w-7xl  mx-auto    md:flex flex-wrap items-center justify-center border border-transparent  text-gray-800">
                    {" "}
                    {/* livestock */}
                    <div className="p-2 basis-80 lg:basis-96 md:m-5  ">
                      <Link href={`/dashboard/${userData.farmland}/livestock`}>
                        <div className="bg-gray-200 w-full p-3   rounded-md  max-w-md lg:max-w-sm mx-auto  duration-1000 hover:scale-[1.02] hover:animate-pulse ">
                          <div className="flex items-center">
                            {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                            <h1 className="font-bold text-lg mb-2">
                              Livestock Profile
                            </h1>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center   space-x-2">
                                <GiCow className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Cattle:{" "}
                                  <strong>
                                    {getModuleCount("livestockCount", "cattle")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiGoat className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Goat:{" "}
                                  <strong>
                                    {getModuleCount("livestockCount", "goat")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiPig className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />

                                <p className="font-semibold">
                                  {" "}
                                  Pig:{" "}
                                  <strong>
                                    {getModuleCount("livestockCount", "pig")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiSheep className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  {" "}
                                  Sheep:{" "}
                                  <strong>
                                    {getModuleCount("livestockCount", "sheep")}
                                  </strong>
                                </p>
                              </div>
                            </div>

                            <div className="relative  h-16 w-16 md:h-20 md:w-20">
                              <Image
                                alt=""
                                className="rounded-full  absolute top-0  bottom-0 right-0 left-0"
                                src={"/image/sheep.jpg"}
                                fill="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    {/* income and expense */}
                    <div className="p-2 basis-80 lg:basis-96 md:m-5  ">
                      <Link href={`/dashboard/${userData.farmland}/finance`}>
                        <div className="bg-gray-200 w-full p-3   rounded-md  max-w-md lg:max-w-sm mx-auto  duration-1000 hover:  hover:animate-pulse ">
                          <div className="flex items-center">
                            {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                            <h1 className="font-bold text-lg mb-2">
                              Income/Expense
                            </h1>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center   space-x-2">
                                <GiCow className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Cattle:{" "}
                                  <strong>
                                    {getModuleCount("incomeCount", "cattle")}
                                  </strong>
                                  /
                                  <strong>
                                    {getModuleCount("expenseCount", "cattle")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiGoat className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Goat:{" "}
                                  <strong>
                                    {getModuleCount("incomeCount", "goat")}
                                  </strong>
                                  /
                                  <strong>
                                    {getModuleCount("expenseCount", "goat")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiPig className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />

                                <p className="font-semibold">
                                  {" "}
                                  Pig:{" "}
                                  <strong>
                                    {getModuleCount("incomeCount", "pig")}
                                  </strong>
                                  /
                                  <strong>
                                    {getModuleCount("expenseCount", "pig")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiSheep className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  {" "}
                                  Sheep:{" "}
                                  <strong>
                                    {getModuleCount("incomeCount", "sheep")}
                                  </strong>
                                  /
                                  <strong>
                                    {getModuleCount("expenseCount", "sheep")}
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="relative  h-16 w-16 md:h-20 md:w-20">
                              <Image
                                alt=""
                                className="rounded-full  absolute top-0  bottom-0 right-0 left-0"
                                src={"/image/finance.jpg"}
                                fill="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    {/* envent tracker */}
                    <div className="p-2 basis-80 lg:basis-96 md:m-5  ">
                      <Link href={`/dashboard/${userData.farmland}/event`}>
                        <div className="bg-gray-200 w-full p-3   rounded-md  max-w-md lg:max-w-sm mx-auto  duration-1000 hover:  hover:animate-pulse ">
                          <div className="flex items-center">
                            {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                            <h1 className="font-bold text-lg mb-2">
                              Event Tracker
                            </h1>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center   space-x-2">
                                <GiCow className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Cattle:{" "}
                                  <strong>
                                    {getModuleCount("eventCount", "cattle")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiGoat className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Goat:{" "}
                                  <strong>
                                    {getModuleCount("eventCount", "goat")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiPig className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />

                                <p className="font-semibold">
                                  Pig:{" "}
                                  <strong>
                                    {getModuleCount("eventCount", "pig")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiSheep className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  {" "}
                                  Sheep:{" "}
                                  <strong>
                                    {getModuleCount("eventCount", "sheep")}
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="relative  h-16 w-16 md:h-20 md:w-20">
                              <Image
                                alt=""
                                className="rounded-full  absolute top-0  bottom-0 right-0 left-0"
                                src={"/image/clock.jpg"}
                                fill="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2 basis-80 lg:basis-96 md:m-5  ">
                      <Link
                        href={`/dashboard/${userData.farmland}/pregnancy-tracker`}
                      >
                        <div className="bg-gray-200 w-full p-3   rounded-md  max-w-md lg:max-w-sm mx-auto  duration-1000 hover:  hover:animate-pulse ">
                          <div className="flex items-center">
                            {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                            <h1 className="font-bold text-lg mb-2">
                              Pregnancy Tracker
                            </h1>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center   space-x-2">
                                <GiCow className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Cattle:{" "}
                                  <strong>
                                    {getModuleCount("pregnancyCount", "cattle")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiGoat className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Goat:{" "}
                                  <strong>
                                    {getModuleCount("pregnancyCount", "goat")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiPig className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />

                                <p className="font-semibold">
                                  {" "}
                                  Pig:{" "}
                                  <strong>
                                    {getModuleCount("pregnancyCount", "pig")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiSheep className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  {" "}
                                  Sheep:{" "}
                                  <strong>
                                    {getModuleCount("pregnancyCount", "sheep")}
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="relative  h-16 w-16 md:h-20 md:w-20">
                              <Image
                                alt=""
                                className="rounded-full  absolute top-0  bottom-0 right-0 left-0"
                                src={"/image/pregnant.png"}
                                fill="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    {/* lactation */}
                    <div className="p-2 basis-80 lg:basis-96 md:m-5  ">
                      <Link href={`/dashboard/${userData.farmland}/lactation`}>
                        <div className="bg-gray-200 w-full p-3   rounded-md  max-w-md lg:max-w-sm mx-auto  duration-1000 hover:  hover:animate-pulse ">
                          <div className="flex items-center">
                            {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                            <h1 className="font-bold text-lg mb-2">
                              Lactation
                            </h1>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center   space-x-2">
                                <GiCow className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Cattle:{" "}
                                  <strong>
                                    {getModuleCount("lactationCount", "cattle")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiGoat className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Goat:{" "}
                                  <strong>
                                    {getModuleCount("lactationCount", "goat")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiPig className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />

                                <p className="font-semibold">
                                  {" "}
                                  Pig:{" "}
                                  <strong>
                                    {getModuleCount("lactationCount", "pig")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiSheep className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  {" "}
                                  Sheep:{" "}
                                  <strong>
                                    {getModuleCount("lactationCount", "sheep")}
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="relative  h-16 w-16 md:h-20 md:w-20">
                              <Image
                                alt=""
                                className="rounded-full  absolute top-0  bottom-0 right-0 left-0"
                                src={"/image/lactation2.jpg"}
                                fill="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2 basis-80 lg:basis-96 md:m-5  ">
                      <Link href={`/dashboard/${userData.farmland}/quarantine`}>
                        <div className="bg-gray-200 w-full p-3   rounded-md  max-w-md lg:max-w-sm mx-auto  duration-1000 hover:  hover:animate-pulse ">
                          <div className="flex items-center">
                            {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                            <h1 className="font-bold text-lg mb-2">
                              Quarantine
                            </h1>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center   space-x-2">
                                <GiCow className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Cattle:{" "}
                                  <strong>
                                    {getModuleCount(
                                      "quarantineCount",
                                      "cattle"
                                    )}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiGoat className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  Goat:{" "}
                                  <strong>
                                    {getModuleCount("quarantineCount", "goat")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiPig className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />

                                <p className="font-semibold">
                                  {" "}
                                  Pig:{" "}
                                  <strong>
                                    {getModuleCount("quarantineCount", "pig")}
                                  </strong>
                                </p>
                              </div>

                              <div className="flex items-center   space-x-2">
                                <GiSheep className=" text-[#008000]   border-[1px] border-gray-400  rounded-full   text-xl" />
                                <p className="font-semibold">
                                  {" "}
                                  Sheep:{" "}
                                  <strong>
                                    {getModuleCount("quarantineCount", "sheep")}
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="relative  h-16 w-16 md:h-20 md:w-20">
                              <Image
                                alt=""
                                className="rounded-full  absolute top-0  bottom-0 right-0 left-0"
                                src={"/image/quaran.jpg"}
                                fill="true"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              ) : !loading && moduleCounts.length == 0 ? (
                <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col md:text-2xl">
                    {farmlandError}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col">
                    <AiOutlineLoading3Quarters className="text-4xl  animate-spin" />
                  </div>
                </div>
              )}
            </div>
          ) : userData.status === "Reject" && !sent ? (
            <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
              <div className="flex items-center justify-center flex-col">
                <>
                  {" "}
                  <p className="dashboard-mssg">
                    Your request has been denied!
                  </p>
                  <label className="text-sm mt-10" for="name">
                    You can make a new request
                  </label>
                  <input
                    title="Add additional remarks about the livestock here. Make it brief for easy readablility."
                    id="name"
                    // value={formInput.remark}
                    onChange={(e) => setFarmland(e.target.value)}
                    type="text"
                    placeholder="Farmland name"
                    name="remark"
                    className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                  />
                  <button
                    onClick={sendRquest}
                    disabled={sending}
                    className={`px-3 sm:px-5 py-3 bg-[#008000] rounded-md text-white `}
                  >
                    {sending ? (
                      <div className="flex justify-center space-x-2 items-center">
                        {" "}
                        <AiOutlineLoading3Quarters className="text-xl  animate-spin" />{" "}
                        <span> Processing</span>
                      </div>
                    ) : (
                      "Send Request"
                    )}
                  </button>
                </>
              </div>
            </div>
          ) : userData.status === "Reject" && sent ? (
            <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
              <div className="flex items-center justify-center flex-col">
                <>
                  {" "}
                  <p className="dashboard-mssg">
                    Farmland request successfully sent!
                  </p>
                </>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
              <div className="flex items-center justify-center flex-col">
                <p className=" px-5 max-w-md text-lg">
                  Your request is pending. Please, remind admin to accept your
                  request!
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <p className="dashboard-mssg">
                You are not logged in! <br />
                Please, log in to access profile
              </p>
              <Link href={"/login"} className="mss-login">
                login
              </Link>
            </div>
          </div>
        )}

        <div className="md:mt-0 mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
