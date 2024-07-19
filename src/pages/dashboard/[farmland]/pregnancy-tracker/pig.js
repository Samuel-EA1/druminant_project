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
  FaRegEdit,
  FaSearch,
  FaTag,
  FaWarehouse,
} from "react-icons/fa";
import { HiAtSymbol, HiHashtag, HiTag } from "react-icons/hi2";
import { MdDelete, MdOutlineHelp, MdRemoveRedEye } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { IoIosMore, IoMdClose } from "react-icons/io";
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
import { formatDateString } from "@/helperFunctions/formatTime";
import { GiStorkDelivery } from "react-icons/gi";
import { fail } from "assert";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";

// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function PregnancyTracker() {
  const [formModal, setFormModal] = useState(false);
  const [viewId, setviewId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [fetching, setFetching] = useState(false);
  const userData = useRecoilValue(userState);
  const [deleting, setdelete] = useState(false);
  const [edittagId, setEditTagId] = useState("");
  const [editFormModal, setEditFormModal] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    tagId: "",
    breedingDate: "",
    status: "",
    breed: "",
    gestationPeriod: null,
    remark: "",
  });
  const [viewing, setViewing] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [editting, setEditting] = useState(false);

  const [creating, setCreating] = useState(false);
  const [viewPregnancy, setviewPregnancy] = useState(false);
  const [tagIdError, setTagIdError] = useState("");
  const [selected, setSelected] = useState({
    tagId: "",
    breedingDate: "",
    status: "",
    breed: "",
    gestationPeriod: null,
    remark: "",
  });

  const [formInput, setformInput] = useState({
    tagId: "",
    status: "",
    breed: "",
    gestationPeriod: null,
    remark: "",
    breedingDate: "",
  });

  const [quarantinTagId, setQuarantinTagId] = useState(null);

  const handleEdit = (tagId) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
      setEditFormInput({
        tagId: selectedRecord.tagId,
        breedingDate: selectedRecord.breedingDate,
        breed: selectedRecord.breed,
        staff: selectedRecord.inCharge,
      });
    setEditId(tagId);
    setEditFormModal(true);
  };

  const [pregnancyData, setpregnancyData] = useState([]);
  const [idCounter, setIdCounter] = useState("");

  // fetch pregnancy
  // fetch pregnancy
  const fetchpregnancys = async () => {
    setFetching(true);
    try {
      if (userData?.token) {
        const res = await fetchAllRecords(
          userData.token,
          userData.farmland,
          "pregnancy",
          "pig",
          ""
        );

        if (res.data) {
          setFetching(false);
          setpregnancyData(res.data.message.reverse());
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
    fetchpregnancys();
  }, [creating, userData?.token, deleting, editting]);

  console.log(pregnancyData.length, fetching);

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
          "pregnancy",
          "pig",
          id
        );

        setdelete(false);
        setSearchData([]);
        toast.success(response);
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

  async function handleViewPregnancy(id) {
    setviewId(id);
    setViewing(true);
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "pregnancy",
        "pig",
        id
      );

      setViewing(false);
      setSelected(selectedRecord.data.message);
      setviewPregnancy(true);
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

    if (formModal) {
      setformInput((prevData) => ({ ...prevData, [name]: value }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // edit pregnancy
  function editBtnFn(id) {
    setEditTagId(id);
    setEditFormModal(true);
    const selectedRecord = pregnancyData.find((record) => record._id === id);

    setEditFormInput({
      tagId: selectedRecord.tagId,
      breedingDate: selectedRecord.breedingDate,
      breed: selectedRecord.breed,
      status: selectedRecord.status,
      gestationPeriod: selectedRecord.gestationPeriod,
      remark: selectedRecord.remark,
    });
  }

  // create pregnancy
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await createRecord(
        userData.token,
        userData.farmland,
        "pregnancy",
        "pig",
        formInput
      );

      if (res.data) {
        toast.success(res.data);
        setCreating(false);
        setFormModal(false);
        setformInput({});
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
    e.preventDefault();
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "pregnancy",
        "pig",
        query
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

  const handleEditFormSubmit = async (e) => {
    setEditting(true);
    e.preventDefault(); // Prpregnancy default form submission behavior

    try {
      const formdata = editformInput;

      const editResponse = await editRecord(
        userData.token,
        userData.farmland,
        "pregnancy",
        "pig",
        edittagId,
        formdata
      );

      if (editResponse) {
        setEditting(false);
        setEditFormModal(false);
        setEditFormInput({
          tagId: "",
          tagId: "",
          tagLocation: "",
          sex: "",
          breedingDate: "",
          weight: "",
          status: "",
          origin: "",
          remark: "",
          staff: "",
        });
      }
      toast.success("Record updated!");
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
    setCreating(false);
  }

  return (
    <div className="livestock">
      <Head>
        <title>Druminant - pregnancy Profile (pig)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>

      <ModuleHeader />

      <div className="livestock p-2 md:p-5  border-2  my-10 lg:mt-2">
        {" "}
        <div className=" md:mt-10 ">
          {userData?.token && !formModal && (
            <div className="  ">
              <div>
                <h1 className="text-lg md:text-2xl head font-bold">
                  Pregnancy Tracker (pig)
                </h1>
                <p className=" mt-1">
                  Monitor expected calving date (ecd) in livestock
                </p>
              </div>

              <div className="flex items-center space-x-5 ">
                <p
                  className="text-white bg-[#008000]  cursor-pointer w-fit p-3 text-center mt-3 rounded-md"
                  onClick={addProfile}
                >
                  <span>+ </span> Add Record
                </p>

                <form onSubmit={handleSearch}>
                  <div className="relative w-40 md:w-full mt-3">
                    <input
                      type="text"
                      name="search"
                      placeholder="Tag Id..."
                      className="w-full px-4 py-2 border-2 rounded-lg bg-input text-primary placeholder-primary-foreground focus:outline-none focus:ring ring-primary"
                      value={query}
                      onChange={handleSearchChange}
                    />
                    <button
                      type="submit"
                      className="absolute right-0 top-0 h-full px-4 bg-[#008000]  text-white rounded-r-lg flex items-center justify-center"
                      onClick={handleSearch}
                    >
                      <BsSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>

            //   {/* <input
            //   type="text"
            //   className="search-input"
            //   maxLength={15}
            //   placeholder="Search here (Tag id)"
            // /> */}
          )}
        </div>
        {userData?.token && !fetchError && !formModal ? (
          <div
            className={`flex  flex-col justify-between min-h-screen ${
              editFormModal && "hidden"
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
                    Tag ID
                  </th>
                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    Breed
                  </th>

                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    Breeding Date
                  </th>

                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    ECD
                  </th>

                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {!fetching && !searching && pregnancyData.length > 0 && (
                <tbody>
                  {pregnancyData.map((row, key) => (
                    <tr
                      key={key}
                      className="  md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap my-5 md:mb-0 shadow-md bg-gray-100 shadow-gray-800 md:shadow-none"
                    >
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
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

                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Tag ID
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.tagId}</p>
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breed
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.breed}</p>
                        </div>
                      </td>

                      <td className="w-full md:w-auto flex  justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breeding Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.breedingDate).format(
                            "MMMM Do, YYYY, h:mm:ss A"
                          )}
                        </span>
                      </td>

                      <td className="w-full md:w-auto flex   space-x-3  justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breeding Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.ecd).format("MMMM Do, YYYY")}
                        </span>
                      </td>

                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
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

                        <div className="">
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
                              <HiDotsHorizontal style={{ fontSize: "14px" }} />
                            </button>
                          ) : (
                            <button
                              title="More info"
                              onClick={() => handleViewPregnancy(row.tagId)}
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
                              <RiDeleteBin6Line style={{ fontSize: "14px" }} />
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
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
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

                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Tag ID
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.tagId}</p>
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breed
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.breed}</p>
                        </div>
                      </td>

                      <td className="w-full md:w-auto flex  justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breeding Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.breedingDate).format(
                            "MMMM Do, YYYY, h:mm:ss A"
                          )}
                        </span>
                      </td>

                      <td className="w-full md:w-auto flex   space-x-3  justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-28  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breeding Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.ecd).format("MMMM Do, YYYY")}
                        </span>
                      </td>

                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
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

                        <div className="">
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
                              <HiDotsHorizontal style={{ fontSize: "14px" }} />
                            </button>
                          ) : (
                            <button
                              title="More info"
                              onClick={() => handleViewPregnancy(row.tagId)}
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
                              <RiDeleteBin6Line style={{ fontSize: "14px" }} />
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
              pregnancyData.length === 0 &&
              userData?.token &&
              idCounter === "done" && (
                <div className="text-center mx-0  flex-col text-black h-[100vh] flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col">
                    Sorry, No Data Found !
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
                  You are not allowed to access this Farmland pregnancy
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

      {!userData?.token && !fetching && (
        <div className="text-center border-2 text-gray-800 mx-0 h-screen flex items-center justify-center">
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
        //pregnancy input form

        formModal && (
          <div
            className="form-backdrop py-12 bg-[#01000D] overflow-y-auto  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header   mt-14  pb:0 md:pt-5"
              style={{ color: "white" }}
            >
              Pregnancy Details
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 md:mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div className=" w-full">
                      <label className="input-label" htmlFor="tagId">
                        Tag ID
                      </label>
                      <input
                        title="Enter Tag Id of the livestock"
                        placeholder="pig294"
                        maxLength={20}
                        required
                        value={formInput.tagId}
                        onChange={handleChange}
                        name="tagId"
                        id="tagId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      <label className="input-label" htmlFor="breed">
                        Breed
                      </label>
                      <input
                        title="Enter breed of the livestock"
                        maxLength={40}
                        required
                        value={formInput.breed}
                        onChange={handleChange}
                        id="breed"
                        name="breed"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      <label className="input-label" for="breedingDate">
                        Breeding Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        id="breedingDate"
                        value={formInput.breedingDate}
                        onChange={handleChange}
                        name="breedingDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="gestationPeriod">
                        Gestation Period
                      </label>
                      <input
                        type="number"
                        id="gestationPeriod"
                        placeholder="Enter gestation period for the livestock"
                        value={formInput.gestationPeriod}
                        onChange={handleChange}
                        name="gestationPeriod"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      <label className="input-label" for="status">
                        Pregnancy Confirmation
                      </label>
                      <select
                        id="name"
                        value={formInput.status}
                        name="status"
                        onChange={handleChange}
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      >
                        <option value={""}>Select status</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                      <label className="input-label" for="name">
                        Remark
                      </label>
                      <input
                        title="Add additional remarks about the pregnancy here. Make it brief for easy readablility."
                        id="name"
                        value={formInput.remark}
                        onChange={handleChange}
                        type="text"
                        name="remark"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
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
                <button
                  onClick={closeFormModal}
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

      {
        //pregnancy EDIT form

        editFormModal && (
          <div
            className="form-backdrop py-12 bg-[#01000D] overflow-y-auto  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-0"
              style={{ color: "white" }}
            >
              Edit Pregnancy Details
            </p>

            <div className="container mx-auto w-11/12 md:w-2/3 max-w-xl">
              <div className="w-[auto] bg-white relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div className="w-full">
                      <label className="input-label" for="tagId">
                        Tag Id
                      </label>
                      <input
                        title="Enter the Tag Id of livestock"
                        placeholder="pig294"
                        maxLength={20}
                        value={editformInput.tagId}
                        onChange={handleChange}
                        name="tagId"
                        id="tagId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="breed">
                        Breed
                      </label>
                      <input
                        title="Enter breed of the livestock"
                        maxLength={15}
                        value={editformInput.breed}
                        onChange={handleChange}
                        id="breed"
                        name="breed"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="breedingDate">
                        Breeding Date
                      </label>
                      <input
                        type="Datetime-local"
                        id="breedingDate"
                        value={formatDateString(editformInput.breedingDate)}
                        onChange={handleChange}
                        name="breedingDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="gestationPeriod">
                        Gestation Period
                      </label>
                      <input
                        title="Enter gestation period for the livestock"
                        maxLength={15}
                        value={editformInput.gestationPeriod}
                        onChange={handleChange}
                        id="gestationPeriod"
                        name="gestationPeriod"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="status">
                        Status
                      </label>
                      <select
                        id="name"
                        value={editformInput.status}
                        name="status"
                        onChange={handleChange}
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      >
                        <option value={""}>Select status</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>

                      <label className="input-label" for="remark">
                        Remark
                      </label>
                      <input
                        title="Add additional remarks about the pregnancy here. Make it brief for easy readablility."
                        value={editformInput.remark}
                        onChange={handleChange}
                        id="remark"
                        name="remark"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
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

      {viewPregnancy && (
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3"
            style={{ marginTop: "10px" }}
          >
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Pregnancy Details
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 px-1 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Tag Id</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.tagId}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Breed</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.breed}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Pregnancy Confirmation</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.status}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Staff in charge</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.inCharge}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Entry Date</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700">
                  {moment(selected.createdAt).format("MMM Do, YYYY, h:mm:ss A")}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Remark</p>
                <p
                  className="text-base font-medium text-navy-700 dark:text-green-700"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  {selected.remark}
                </p>
              </div>

              <div className="btn-div" style={{ width: "200%" }}>
                <button
                  className="close-btn"
                  onClick={() => setviewPregnancy(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!formModal && !editFormModal && (
        <div className="md:mt-0 mt-20   ">
          <Footer />
        </div>
      )}
    </div>
  );
}
