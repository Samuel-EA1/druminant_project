import ModuleHeader from "@/components/moduleheader";
// import React, { Component } from "react";
import Demo from "@/components/table";
import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
  button,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaLongArrowAltDown,
  FaRegEdit,
  FaSearch,
  FaTag,
  FaUser,
  FaUserAlt,
  FaWarehouse,
} from "react-icons/fa";
import { HiAtSymbol, HiHashtag, HiTag } from "react-icons/hi2";
import {
  MdDelete,
  MdMarkEmailRead,
  MdOutlineHelp,
  MdRemoveRedEye,
} from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { IoIosMore, IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiHouseBold, PiHouseLineLight } from "react-icons/pi";
import livestockForm from "./livestockform";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "@/atom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { BsArrow90DegDown, BsArrowBarLeft, BsPeople } from "react-icons/bs";
import { Footer } from "@/components/footer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Head from "next/head";

// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Staffinfo() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const [customers, setcustomers] = useState([]);
  const userData = useRecoilValue(userState);
  const [fetching, setFetching] = useState(false);

  const [processingIndex, setProcessingIndex] = useState(null);

  useEffect(() => {
    setFetching(true);
    if (userData?.token) {
      axios
        .get(`${BASE_URL}/farmland/${userData?.farmland}/requests/accepted`, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        })
        .then((response) => {
          setFetching(false);
          setcustomers(response.data.message);
          console.log(response.data.message);
        })
        .catch((error) => {
          setFetching(false);
          console.error("shsgshgssjhs", error);
          if (error.code === "ERR_BAD_REQUEST") {
            toast.error(error.response.data.message);
          }
        });
    }
  }, [userData?.token, processingIndex]);

  const handleRequests = async (e, index, username, status) => {
    e.preventDefault();
    setProcessingIndex(index);

    try {
      const res = await axios.post(
        `${BASE_URL}/farmland/${userData.farmland}/staff/${username}/process`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      if (res) {
        setProcessingIndex(null);
        toast.success(res.data.message);
      }
    } catch (error) {
      setProcessingIndex(null);
      console.log(error);
      console.error("shsgshgssjhs", error);
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="dashboard-main   ">
      <Head>
        <title>Druminant - Farmland staff</title>
        <meta name="description" content="druminant- farmland request" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>
      <ModuleHeader />
      {userData && (
        <div className="   my-20 max-md:my-10  mx-auto px-1">
          <div className="p-4 min-h-screen   max-md:max-w-lg max-w-4xl mx-auto  rounded-lg border shadow-md sm:p-8 bg-gray-800 dark:border-gray-700">
            <div className="  mb-4 border-b pb-2 border-gray-500 flex items-center space-x-2">
              <BsPeople className="text-white text-lg h-10 w-10" />
              <h3 className="text-2xl font-bold leading-none   text-white">
                Staff
              </h3>
            </div>
            {fetching ? (
              <div className="text-center  mx-0  text-white h-[50vh] flex items-center justify-center ">
                <div className="flex items-center justify-center flex-col">
                  <AiOutlineLoading3Quarters className="text-4xl  animate-spin" />
                </div>
              </div>
            ) : !fetching && customers.length == 0 ? (
              <div className="text-center  mx-0  flex-col  text-black h-[80vh] flex items-center justify-center">
                <h2 className="flex items-center text-white  justify-center flex-col">
                  Sorry no Staff found!
                </h2>
                <Link
                  className="px-10 py-2 flex items-center space-x-2 group cursor-pointer hover:bg-green-800 mt-5 text-white bg-[#008000] rounded-md justify-center"
                  href={`/dashboard/${userData.farmland}`}
                >
                  <FaLongArrowAltDown className="rotate-90  group-hover:-translate-x-2 transform duration-1000" />
                  <p> Back to Framland dashboard</p>
                </Link>
              </div>
            ) : (
              <div>
                <ul role="list" className="">
                  {customers.map((customer, index) => (
                    <li
                      key={index}
                      className="py-3  hover:bg-gray-700  hover:rounded-md px-2 md:px-5 border-b-[1px] border-gray-700  sm:py-4"
                    >
                      <div className="flex justify-between items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm flex items-center space-x-2 font-medium truncate text-white">
                            <FaUserAlt /> <p>@{customer.username}</p>
                          </p>
                          <p className="text-sm  flex items-center space-x-2  truncate text-gray-400">
                            <MdMarkEmailRead /> <p> {customer.email}</p>
                          </p>
                        </div>
                        <div className="  space-x-2 items-center text-base font-semibold text-gray-900 dark:text-white">
                          {processingIndex !== index ? (
                            <>
                              <button
                                disabled={
                                  processingIndex && processingIndex !== index
                                }
                                onClick={(e) =>
                                  handleRequests(
                                    e,
                                    index,
                                    customer.username,
                                    "Reject"
                                  )
                                }
                                className={`px-3 sm:px-5 py-3 bg-red-700 rounded-md text-white ${
                                  processingIndex &&
                                  processingIndex !== index &&
                                  "bg-transparent border-2 border-gray-50/10"
                                }`}
                              >
                                Dismiss
                              </button>
                            </>
                          ) : (
                            <button
                              disabled
                              className="bg-[#008000] text-white px-5 py-2 rounded-md w-full flex justify-center space-x-2 items-center"
                            >
                              <AiOutlineLoading3Quarters className="animate-spin" />
                              <p>Processing...</p>
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="md:mt-0 mt-20 ">
        <Footer />
      </div>
    </div>
  );
}
