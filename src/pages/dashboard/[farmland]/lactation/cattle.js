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
import React, { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaRegEdit,
  FaSearch,
  FaTag,
  FaWarehouse,
} from "react-icons/fa";
import { HiAtSymbol, HiHashtag, HiTag } from "react-icons/hi2";
import { MdDelete, MdOutlineHelp, MdRemoveRedEye } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { IoIosMore, IoMdAdd, IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiHouseBold, PiHouseLineLight } from "react-icons/pi";
import Head from "next/head";
import { Footer } from "@/components/footer";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import moment from "moment/moment";
import {
  createRecord,
  deleteRecord,
  editRecord,
  fetchAllRecords,
  viewRecord,
} from "@/helperFunctions/handleRecord";
import {
  formatDateLocal,
  formatDateString,
  formatDateTimeLocal,
} from "@/helperFunctions/formatTime";
import { GiStorkDelivery } from "react-icons/gi";
import { fail } from "assert";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsEyeFill, BsSearch, BsViewList } from "react-icons/bs";
import AddSearchComponent from "@/components/searchbtn";

// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Lactation() {
  const [formModal, setFormModal] = useState(false);
  const [viewId, setviewId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [fetching, setFetching] = useState(false);
  const userData = useRecoilValue(userState);
  const [deleting, setdelete] = useState(false);
  const [edittagId, setEditTagId] = useState("");
  const [editFormModal, setEditFormModal] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    deliveryDate: "",
    tagId: "",
    offspringNumber: null,
    milkYield: null,
    weight: null,
    fat: null,
    snf: null,
    lactose: null,
    salt: null,
    protein: null,
    water: null,
    observation: "",
  });
  const [viewing, setViewing] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [editting, setEditting] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [ViewLactation, setViewLactation] = useState(false);
  const [milkCompositionState, setmilkCompositionState] = useState(false);
  const [selected, setSelected] = useState({
    deliveryDate: "",
    tagId: "",
    offspringNumber: null,
    milkYield: null,
    weight: null,
    fat: null,
    snf: null,
    lactose: null,
    salt: null,
    protein: null,
    water: null,
    observation: "",
  });

  const [formInput, setformInput] = useState({
    deliveryDate: "",
    tagId: "",
    offspringNumber: null,
    milkYield: null,
    weight: null,
    fat: null,
    snf: null,
    lactose: null,
    salt: null,
    protein: null,
    water: null,
    observation: "",
  });

  const [quarantinTagId, setQuarantinTagId] = useState(null);

  const [lactationData, setlactationData] = useState([]);
  const [idCounter, setIdCounter] = useState("");
  const tableRef = useRef(null);

  // fetch lactation
  // fetch lactation
  const fetchlactations = async () => {
    setFetching(true);
    try {
      if (userData?.token) {
        const res = await fetchAllRecords(
          userData.token,
          userData.farmland,
          "lactation",
          "cattle",
          ""
        );

        if (res.data) {
          setFetching(false);
          setlactationData(res.data.message.reverse());
           if (query && res.data.message.find((e) => e.tagId === query)) {
            handleSearch();
          } else {
            setSearching(false);
            setQuery("");
            setSearchData([]);
          }
        }
      } else {
        setFetching(false);
        setIdCounter("done");
      }

      setIdCounter("done");
    } catch (error) {
      setFetching(false);
      if (error.code === "ERR_NETWORK") {
        toast.error("Please check your internet connection!");
      }

      console.log(error);
      if (error.response) {
        setFetchError(error.response.statusText);
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchlactations();
  }, [creating, userData?.token, deleting, editting]);

  const handledeleteRecord = async (id) => {
    setdeleteId(id);
    setdelete(true);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteRecord(
          userData.token,
          userData.farmland,
          "lactation",
          "cattle",
          id
        );
        setSearchData([]);
        setdelete(false);
        toast.success(response.data.message);
      } catch (error) {
        setdelete(false);
        console.log(error);
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error(error.response.data.message);
        }
      }
    } else {
      setdelete(false);
    }
  };

  function closeFormModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setFormModal(false);
      setformInput({});
    }
  }

  function closeEditFormModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setEditFormModal(false);
      setformInput({});
    }
  }

  async function handleViewLactation(id) {
    setviewId(id);
    setViewing(true);
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "lactation",
        "cattle",
        id
      );

      console.log(selectedRecord);
      setViewing(false);
      setSelected(selectedRecord.data.message);
      setViewLactation(true);
    } catch (error) {
      setViewing(false);
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is numeric and if the value length exceeds 6
    const numericFields = [
      "offspringNumber",
      "milkYield",
      "weight",
      "fat",
      "snf",
      "lactose",
      "salt",
      "protein",
      "water",
    ];
    if (numericFields.includes(name) && value.length > 6) {
      return; // Do not update the state if length exceeds 6
    }

    let convertedValue = value;
    if (name === "deliveryDate") {
      convertedValue = moment(value).utc().format();
    }
    if (formModal) {
      setformInput((prevData) => ({ ...prevData, [name]: convertedValue }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: convertedValue }));
    }
  };

  // edit lactation
  function editBtnFn(id) {
    setEditTagId(id);
    setEditFormModal(true);
    const selectedRecord = lactationData.find((record) => record._id === id);

    setEditFormInput({
      tagId: selectedRecord.tagId,
      deliveryDate: formatDateTimeLocal(selectedRecord.deliveryDate),
      offspringNumber: selectedRecord.offspringNumber,
      milkYield: selectedRecord.milkYield,
      weight: selectedRecord.weight,
      fat: selectedRecord.fat,
      snf: selectedRecord.snf,
      lactose: selectedRecord.lactose,
      salt: selectedRecord.salt,
      protein: selectedRecord.protein,
      water: selectedRecord.water,
      observation: selectedRecord.observation,
    });
  }

  const handleSearchChange = (e) => {
    setSearching(false);
    setSearchData([]);
    setQuery(e.target.value);
  };

  async function handleSearch(e) {
    if (!query.trim()) {
      return toast.error("Please, enter a search query!");
    }
    setSearching(true);
    if (e) {
      e.preventDefault();
    }
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "lactation",
        "cattle",
        query.toLowerCase()
      );
      setSearchData([selectedRecord.data.message]);
    } catch (error) {
      setSearchData([]);
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
    }
  }

  // create lactation
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const {
        deliveryDate,
        tagId,
        offspringNumber,
        milkYield,
        weight,
        fat,
        snf,
        water,
        protein,
        lactose,
      } = formInput;

      const res = await createRecord(
        userData.token,
        userData.farmland,
        "lactation",
        "cattle",
        formInput
      );

      if (res.data) {
        toast.success(res.data.message);
        setCreating(false);
        setFormModal(false);
        setformInput({});
        if (tableRef.current) {
          tableRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    } catch (error) {
      setCreating(false);
      if (error.code === "ERR_NETWORK") {
        toast.error("Please check your internet connection!");
      }

      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleEditFormSubmit = async (e) => {
    setEditting(true);
    e.preventDefault(); // Prlactation default form submission behavior

    try {
      const formdata = editformInput;
      const editResponse = await editRecord(
        userData.token,
        userData.farmland,
        "lactation",
        "cattle",
        edittagId,
        formdata
      );

      if (editResponse) {
        setEditting(false);
        setEditFormModal(false);
        setEditFormInput({
          deliveryDate: "",
          tagId: "",
          offspringNumber: null,
          milkYield: null,
          weight: null,
          fat: null,
          snf: null,
          lactose: null,
          salt: null,
          protein: null,
          water: null,
          observation: "",
        });
      }
      toast.success("Record updated!");
      if (tableRef.current) {
        tableRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Please check your internet connection!");
      }

      setEditting(false);
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.error.codeName);
      }
    }
  };

  function addProfile() {
    setFormModal(!formModal);
  }

  return (
    <div className="livestock flex flex-col justify-between  " ref={tableRef}>
      <Head>
        <title>Druminant - Lactation Tracker (Cattle)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>

      <div>
        <ModuleHeader />

        <div className="  p-2 md:p-5    my-10 lg:mt-2">
          {" "}
          <div
            className={`md:mt-10 ${(editFormModal || formModal) && "hidden"}`}
          >
            {userData?.token && (
              <div className="  ">
                <div>
                  <h1 className="text-lg md:text-2xl head font-bold">
                    Lactation Tracker (Cattle)
                  </h1>
                  <p className=" mt-1">
                    Keep track of livestock lactation records
                  </p>
                </div>
                <AddSearchComponent
                  handleSearch={handleSearch}
                  handleSearchChange={handleSearchChange}
                  query={query}
                  addProfile={addProfile}
                />
              </div>
            )}
          </div>
          {userData?.token && !fetchError ? (
            <div
              className={`flex flex-col justify-between min-h-screen ${
                (editFormModal || formModal) && "hidden"
              }`}
            >
              <table className="w-full mt-5">
                <thead>
                  <tr>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "green" }}
                    >
                      N/A
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "green" }}
                    >
                      Tag Id
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "green" }}
                    >
                      Number of offspring
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "green" }}
                    >
                      Delivery Date
                    </th>

                    <th
                      className="p-3 w-fit px-16 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "green" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                {!fetching && !searching && lactationData.length > 0 && (
                  <tbody>
                    {lactationData.map((row, key) => (
                      <tr
                        key={key}
                        className="  md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap my-5 md:mb-0 shadow-md bg-gray-100 shadow-gray-800 md:shadow-none"
                      >
                        <td className="w-full md:w-auto   justify-between items-center p-3 text-gray-800 text-center border border-b   flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            N/A
                          </span>
                          <div style={{ fontSize: "14px", color: "black" }}>
                            {key + 1}
                          </div>
                        </td>

                        <td className="w-full md:w-auto  justify-between items-center p-3 text-gray-800 text-center border border-b flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            Tag Id
                          </span>
                          <div style={{ fontSize: "14px", color: "black" }}>
                            {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                            <p>{row.tagId}</p>
                          </div>
                        </td>
                        <td className="w-full md:w-auto  justify-between items-center p-3 text-gray-800 text-center border border-b flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            No. of Offspring
                          </span>
                          <div style={{ fontSize: "14px", color: "black" }}>
                            {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                            <p>{row.offspringNumber}</p>
                          </div>
                        </td>
                        <td className="w-full md:w-auto  space-x-2  justify-between items-center p-3 text-gray-800  border border-b text-center flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            DELIVERY DATE
                          </span>
                          <span style={{ fontSize: "14px", color: "black" }}>
                            {moment
                              .utc(row.deliveryDate)
                              .local()
                              .format("MMM D, YYYY, HH:mm:ss")}
                          </span>
                        </td>

                        <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center   md:table-cell relative md:static ">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            Actions
                          </span>

                          <div className=" ">
                            <button
                              title="Edit"
                              onClick={() => editBtnFn(row._id)}
                              className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                            >
                              {/* Edit */}
                              <FaRegEdit style={{ fontSize: "14px" }} />
                            </button>

                            {viewing && viewId === row._id ? (
                              <button
                                title="More info"
                                className=" px-3 py-1 ml-2 animate-pulse   hover:bg-green-600 text-white bg-green-500 rounded-md"
                              >
                                <HiDotsHorizontal
                                  style={{ fontSize: "14px" }}
                                />
                              </button>
                            ) : (
                              <button
                                title="More info"
                                onClick={() => handleViewLactation(row.tagId)}
                                className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                              >
                                <MdRemoveRedEye style={{ fontSize: "14px" }} />
                              </button>
                            )}
                            {deleting && deleteId === row._id ? (
                              <button
                                className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                                onClick={() => handledeleteRecord(row._id)}
                              >
                                {/* Delete */}
                                <AiOutlineLoading3Quarters
                                  className={`${
                                    row.tagId === deleteId && "animate-spin"
                                  } `}
                                  style={{ fontSize: "14px" }}
                                />
                              </button>
                            ) : (
                              <button
                                title="Delete"
                                className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                                onClick={() => handledeleteRecord(row._id)}
                              >
                                {/* Delete */}
                                <RiDeleteBin6Line
                                  style={{ fontSize: "14px" }}
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
                {query && searching && searchData.length > 0 && (
                  <tbody>
                    {searchData.map((row, key) => (
                      <tr
                        key={key}
                        className="  md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap my-5 md:mb-0 shadow-md bg-gray-100 shadow-gray-800 md:shadow-none"
                      >
                        <td className="w-full md:w-auto   justify-between items-center p-3 text-gray-800 text-center border border-b   flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            N/A
                          </span>
                          <div style={{ fontSize: "14px", color: "black" }}>
                            {key + 1}
                          </div>
                        </td>

                        <td className="w-full md:w-auto  justify-between items-center p-3 text-gray-800 text-center border border-b flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            Tag Id
                          </span>
                          <div style={{ fontSize: "14px", color: "black" }}>
                            {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                            <p>{row.tagId}</p>
                          </div>
                        </td>
                        <td className="w-full md:w-auto  justify-between items-center p-3 text-gray-800 text-center border border-b flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            No. of Offspring
                          </span>
                          <div style={{ fontSize: "14px", color: "black" }}>
                            {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                            <p>{row.offspringNumber}</p>
                          </div>
                        </td>
                        <td className="w-full md:w-auto  space-x-2  justify-between items-center p-3 text-gray-800  border border-b text-center flex md:table-cell relative md:static">
                          <span
                            className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            DELIVERY DATE
                          </span>
                          <span style={{ fontSize: "14px", color: "black" }}>
                            {moment
                              .utc(row.deliveryDate)
                              .local()
                              .format("MMM D, YYYY, HH:mm:ss")}
                          </span>
                        </td>

                        <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center  flex md:table-cell relative md:static ">
                          <span
                            className="md:hidden w-32   top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                            style={{
                              backgroundColor: "#9be49b",
                              color: "#01000D",
                              fontSize: "11px",
                            }}
                          >
                            Actions
                          </span>

                          <div className=" ">
                            <button
                              title="Edit"
                              onClick={() => editBtnFn(row._id)}
                              className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                            >
                              {/* Edit */}
                              <FaRegEdit style={{ fontSize: "14px" }} />
                            </button>

                            {viewing && viewId === row._id ? (
                              <button
                                title="More info"
                                className=" px-3 py-1 ml-2 animate-pulse   hover:bg-green-600 text-white bg-green-500 rounded-md"
                              >
                                <HiDotsHorizontal
                                  style={{ fontSize: "14px" }}
                                />
                              </button>
                            ) : (
                              <button
                                title="More info"
                                onClick={() => handleViewLactation(row.tagId)}
                                className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                              >
                                <MdRemoveRedEye style={{ fontSize: "14px" }} />
                              </button>
                            )}
                            {deleting && deleteId === row._id ? (
                              <button
                                className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                                onClick={() => handledeleteRecord(row._id)}
                              >
                                {/* Delete */}
                                <AiOutlineLoading3Quarters
                                  className={`${
                                    row.tagId === deleteId && "animate-spin"
                                  } `}
                                  style={{ fontSize: "14px" }}
                                />
                              </button>
                            ) : (
                              <button
                                title="Delete"
                                className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                                onClick={() => handledeleteRecord(row._id)}
                              >
                                {/* Delete */}
                                <RiDeleteBin6Line
                                  style={{ fontSize: "14px" }}
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {fetching && (
                <div className="text-center  mx-0   text-black h-[80vh] flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col">
                    <AiOutlineLoading3Quarters className="text-4xl  animate-spin" />
                  </div>
                </div>
              )}

              {!fetching &&
                lactationData.length === 0 &&
                userData?.token &&
                idCounter === "done" && (
                  <div className="text-center mx-0  flex-col text-black h-[100vh] flex items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                      Sorry no lactation Record found!
                    </div>
                    <div className="cursor">
                      <p
                        className="px-10 py-2 cursor-pointer hover:bg-green-800 mt-5 text-white bg-[#008000] rounded-md justify-center"
                        onClick={addProfile}
                      >
                        Create
                      </p>
                    </div>
                  </div>
                )}
            </div>
          ) : (
            userData &&
            fetchError === "Unauthorized" && (
              <div className="livestock text-center border-2 p-2 text-gray-800 mx-0 h-screen flex items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                  <p className="dashboard-mssg">
                    You are not allowed to access this Farmland lactation
                  </p>
                  <Link
                    href={`/dashboard/${userData.farmland}`}
                    className="mss-login"
                  >
                    Go back to dashboard
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {!userData?.token && !fetching && (
        <div className="text-center  text-gray-800 mx-0 h-screen flex items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <p className="dashboard-mssg">
              You are not logged in! <br />
              Please, log in to access this profile
            </p>
            <Link href={"/login"} className="mss-login">
              login
            </Link>
          </div>
        </div>
      )}

      {
        //lactation input form

        formModal && (
          <div className="form-backdrop py-12 bg-[#01000D]  transition duration-150 ease-in-out  z-50 absolute right-0 left-0">
            <p className="form-header  pb:0 md:pt-0" style={{ color: "white" }}>
              Lactation Details
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white   mt-4 md:mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div className=" w-full flex flex-wrap items-center   justify-between">
                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="tagId">
                          Tag Id
                        </label>
                        <input
                          title="Enter the lactationEntryId of the lactation here."
                          placeholder="E.g. cattle321"
                          maxLength={10}
                          required
                          value={formInput.tagId}
                          onChange={handleChange}
                          name="tagId"
                          id="tagId"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full  h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" for="deliveryDate">
                          Delivery Date
                        </label>
                        <input
                          type="datetime-local"
                          id="deliveryDate"
                          value={formatDateString(formInput.deliveryDate)}
                          onChange={handleChange}
                          name="deliveryDate"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal min-w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                      <div className=" w-full md:w-[40%]">
                        <label
                          className="input-label"
                          htmlFor="offspringNumber"
                        >
                          number of offspring
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.offspringNumber}
                          onChange={handleChange}
                          id="offspringNumber"
                          name="offspringNumber"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full  h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="milkYield">
                          Milk Yield
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.milkYield}
                          onChange={handleChange}
                          id="milkYield"
                          name="milkYield"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="weight">
                          Weight
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.weight}
                          onChange={handleChange}
                          id="weight"
                          name="weight"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" for="observation">
                          Observation
                        </label>
                        <input
                          title="Add additional remarks about the lactation here. Make it brief for easy readablility."
                          id="observation"
                          value={formInput.observation}
                          onChange={handleChange}
                          type="text"
                          name="observation"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full  h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="fat">
                          Fat
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.fat}
                          onChange={handleChange}
                          id="fat"
                          name="fat"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="snf">
                          Snf
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.snf}
                          onChange={handleChange}
                          id="snf"
                          name="snf"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="lactose">
                          Lactose
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.lactose}
                          onChange={handleChange}
                          id="lactose"
                          name="lactose"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="salt">
                          Salt
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.salt}
                          onChange={handleChange}
                          id="salt"
                          name="salt"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="protein">
                          Protein
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.protein}
                          onChange={handleChange}
                          id="protein"
                          name="protein"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="water">
                          Water
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={formInput.water}
                          onChange={handleChange}
                          id="water"
                          name="water"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="relative mb-5 mt-2">
                  <div className="absolute text-gray-600 flex items-center px-4 border-r h-full"></div>
                </div>
                {/* <label for="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Expiry Date</label> */}
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"></div>
                </div>
                {/* <label for="cvc" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">CVC</label> */}
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"></div>
                  {/* <input id="cvc" className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" /> */}
                </div>
                <div className="form-btns">
                  <button
                    className="btn"
                    onClick={(e) => handleCreate(e)}
                    disabled={creating}
                  >
                    {creating ? (
                      <div className="flex items-center space-x-2">
                        <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                        <p>Processing...</p>
                      </div>
                    ) : (
                      "    Submit"
                    )}
                  </button>
                  {!creating && (
                    <button className="btn2" onClick={closeFormModal}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {/* <button className="close-btn" onClick={show()}>hsh</button> */}
            </div>
          </div>
        )
      }

      {
        //lactation EDIT form

        editFormModal && (
          <div className="form-backdrop py-12 bg-[#01000D]  transition duration-150 ease-in-out  z-50 absolute right-0 left-0">
            <p
              className="form-header pt-0 pb:0 md:pt-0"
              style={{ color: "white" }}
            >
              Edit Lactation Record
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div className=" w-full flex flex-wrap items-center   justify-between">
                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="tagId">
                          Tag Id
                        </label>
                        <input
                          title="Enter the lactationEntryId of the lactation here."
                          placeholder="E.g. cattle321"
                          maxLength={10}
                          required
                          value={editformInput.tagId}
                          onChange={handleChange}
                          name="tagId"
                          id="tagId"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full  h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" for="deliveryDate">
                          Delivery Date
                        </label>
                        <input
                          type="datetime-local"
                          id="deliveryDate"
                          value={formatDateString(editformInput.deliveryDate)}
                          onChange={handleChange}
                          name="deliveryDate"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal min-w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                      <div className=" w-full md:w-[40%]">
                        <label
                          className="input-label"
                          htmlFor="offspringNumber"
                        >
                          number of offspring
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.offspringNumber}
                          onChange={handleChange}
                          id="offspringNumber"
                          name="offspringNumber"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full  h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="milkYield">
                          Milk Yield
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.milkYield}
                          onChange={handleChange}
                          id="milkYield"
                          name="milkYield"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="weight">
                          Weight
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.weight}
                          onChange={handleChange}
                          id="weight"
                          name="weight"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="fat">
                          Fat
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.fat}
                          onChange={handleChange}
                          id="fat"
                          name="fat"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="snf">
                          Snf
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.snf}
                          onChange={handleChange}
                          id="snf"
                          name="snf"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="lactose">
                          Lactose
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.lactose}
                          onChange={handleChange}
                          id="lactose"
                          name="lactose"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="salt">
                          Salt
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.salt}
                          onChange={handleChange}
                          id="salt"
                          name="salt"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="protein">
                          Protein
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.protein}
                          onChange={handleChange}
                          id="protein"
                          name="protein"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>

                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" htmlFor="water">
                          Water
                        </label>
                        <input
                          title="Input the unique identification number assigned to the lactation tag."
                          max={99999}
                          required
                          type="number"
                          value={editformInput.water}
                          onChange={handleChange}
                          id="water"
                          name="water"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full   h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                      <div className=" w-full md:w-[40%]">
                        <label className="input-label" for="observation">
                          Observation
                        </label>
                        <textarea
                          title="Add additional remarks about the lactation here. Make it brief for easy readablility."
                          id="observation"
                          value={editformInput.observation}
                          onChange={handleChange}
                          type="text"
                          name="observation"
                          className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full  h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                        />
                      </div>
                    </div>
                  </div>
                </form>

                <div className="relative mb-5 mt-2">
                  <div className="absolute text-gray-600 flex items-center px-4 border-r h-full"></div>
                </div>
                {/* <label for="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Expiry Date</label> */}
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"></div>
                </div>
                {/* <label for="cvc" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">CVC</label> */}
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer"></div>
                  {/* <input id="cvc" className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" /> */}
                </div>
                {!editting ? (
                  <div className="form-btns">
                    <button
                      className="btn"
                      onClick={(e) => handleEditFormSubmit(e)}
                      style={{ width: "80px" }}
                    >
                      Save
                    </button>
                    <button className="btn2" onClick={closeEditFormModal}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="form-btns">
                    <button
                      disabled={editting}
                      className=" bg-[#008000]  text-white px-5 py-2 rounded-md  w-full       flex justify-center space-x-2 items-center"
                      onClick={(e) => handleEditFormSubmit(e)}
                    >
                      <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                      <p>Processing...</p>
                    </button>
                  </div>
                )}
                <button
                  onClick={closeEditFormModal}
                  className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                  aria-label="close modal"
                  role="button"
                >
                  <IoMdClose />
                </button>
              </div>
              {/* <button className="close-btn" onClick={show()}>hsh</button> */}
            </div>
          </div>
        )
      }

      {ViewLactation && (
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-5"
            style={{ marginTop: "10px" }}
          >
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Lactation Profile
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 px-1 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Tag Id</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.tagId}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Delivery Date & Time</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {moment(selected.deliveryDate).format(
                    "MMM D, YYYY, HH:mm:ss"
                  )}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Number of offspring</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.offspringNumber}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Milk Yield</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.milkYield}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.weight}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Observation</p>
                <textarea
                  readOnly
                  className="text-base font-medium text-navy-700 h-20 dark:text-green-700 first-letter:capitalize border-none focus:outline-none active:outline-none resize-none"
                  style={{ border: "none", resize: "none", outline: "none" }}
                >
                  {selected.observation}
                </textarea>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Entry Date</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700 first-letter:capitalize">
                  {moment(selected.createdAt).format("MMM D, YYYY, HH:mm:ss")}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">User In charge</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.inCharge}
                </p>
              </div>
            </div>
            <div className="flex  justify-between mt-8 max-w-lg  space-x-5   rounded-2xl bg-white bg-clip-border  shadow-3xl shadow-shadow-500  ">
              <p
                onClick={() => {
                  setmilkCompositionState(true);
                  setViewLactation(false);
                }}
                className="text-white bg-[#008000]  max-w-lg px-2 py-2 text-center  rounded-md cursor-pointer hover:bg-green-700"
              >
                Milk Composition{" "}
              </p>{" "}
              <p
                onClick={() => setViewLactation(false)}
                className="text-white bg-[red]  hover:bg-red-700  px-5  text-center py-2 rounded-md cursor-pointer  "
              >
                Close
              </p>
            </div>
          </div>
        </div>
      )}

      {milkCompositionState && (
        <div className="fixed flex  inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3"
            style={{ marginTop: "10px" }}
          >
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Milk Composition
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 px-1 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Fat</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.fat}%
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Snf</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.snf}%
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Lactose</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.lactose}%
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Salt</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.salt}%
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Protein</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.protein}%
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Water</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.water}%
                </p>
              </div>
            </div>
            <div className="flex  justify-between  max-w-lg  space-x-2   rounded-2xl bg-white bg-clip-border  shadow-3xl shadow-shadow-500  ">
              <p
                onClick={() => {
                  setmilkCompositionState(false);
                  setViewLactation(true);
                }}
                className="text-white bg-[red]  hover:bg-red-700  w-full  px-5    text-center py-2 rounded-md cursor-pointer  "
              >
                Close
              </p>
            </div>
          </div>
        </div>
      )}
      {/* <div className="md:mt-0 mt-20  md:hidden ">
        <Footer />
      </div> */}

      {(!formModal || !editformInput) && (
        <div className="md:mt-0 mt-20 F   ">
          <Footer />
        </div>
      )}
    </div>
  );
}
