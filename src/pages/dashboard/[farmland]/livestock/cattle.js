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
  FaAddressBook,
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
  formatDateString,
  formatDateTimeLocal,
} from "@/helperFunctions/formatTime";
import { GiStorkDelivery } from "react-icons/gi";
import { fail } from "assert";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import SearchComponent from "@/components/searchbtn";
import AddSearchComponent from "@/components/searchbtn";

// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Livestock() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const [formModal, setFormModal] = useState(false);
  const [viewId, setviewId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [fetching, setFetching] = useState(false);
  const userData = useRecoilValue(userState);
  const [deleting, setdelete] = useState(false);
  const [edittagId, setEditTagId] = useState("");
  const [editFormModal, setEditFormModal] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searching, setSearching] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    breed: "",
    tagId: "",
    tagLocation: "",
    sex: "",
    birthDate: "",
    weight: "",
    status: "",
    origin: "",
    remark: "",
  });
  const [viewing, setViewing] = useState(false);
  const [quarantinFormData, setQuarantinForm] = useState({
    quarantineDate: "",
    reason: "",
    action: "Quarantine",
  });

  const [editting, setEditting] = useState(false);
  const [quarantineModal, setQuarantineModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [viewLivestock, setviewLivestock] = useState(false);
  const [tagIdError, setTagIdError] = useState("");
  const [selected, setSelected] = useState({
    breed: "",
    tagId: "",
    tagLocation: "",
    sex: "",
    birthDate: "",
    weight: "",
    status: "",
    origin: "",
    remark: "",
  });

  const [quarantining, setquarantining] = useState(false);
  const [formInput, setformInput] = useState({
    breed: "",
    tagId: "",
    tagLocation: "",
    sex: "",
    birthDate: "",
    weight: "",
    status: "",
    origin: "",
    remark: "",
  });

  const [quarantinTagId, setQuarantinTagId] = useState(null);
  const tableRef = useRef(null);

  const handleEdit = (tagId) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
      setEditFormInput({
        breed: selectedRecord.breed,
        tagId: selectedRecord.tagId,
        tagLocation: selectedRecord.tagLocation,
        sex: selectedRecord.sex,
        birthDate: formatDateTimeLocal(selectedRecord.birthDate),
        weight: selectedRecord.weight,
        status: selectedRecord.status,
        origin: selectedRecord.origin,
        remark: selectedRecord.remark,
        staff: selectedRecord.inCharge,
      });
    setEditId(tagId);
    setEditFormModal(true);
  };

  const [livestockData, setLivestockData] = useState([]);
  const [idCounter, setIdCounter] = useState("");

  // fetch livestock
  // fetch livestock
  const fetchLiveStocks = async () => {
    setFetching(true);
    try {
      if (userData?.token) {
        const res = await fetchAllRecords(
          userData.token,
          userData.farmland,
          "livestock",
          "cattle",
          ""
        );

        if (res.data) {
          setFetching(false);
          setLivestockData(res.data.message.reverse());
          if (query) {
            handleSearch();
          } else {
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
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchLiveStocks();
  }, [creating, userData?.token, deleting, editting, quarantining]);

  console.log(livestockData.length, fetching);

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
          "livestock",
          "cattle",
          id
        );

        setSearchData([]);
        setdelete(false);
        toast.success(response);
      } catch (error) {
        setdeleteId("");
        setdelete(false);
        console.log(error);
        if (error.code === "ERR_BAD_REQUEST") {
          toast.error(error.response.data.message);
        }
      }
    } else {
      setdelete(false);
      setdeleteId("");
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

  function cancelQuarantineModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setQuarantineModal(false);
      setformInput({});
    }
  }

  async function handleViewLivestock(id) {
    setviewId(id);
    setViewing(true);
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "livestock",
        "cattle",
        id
      );
      setViewing(false);
      setSelected(selectedRecord.data.message);
      setviewLivestock(true);
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

    if (name === "weight" && value.length > 6) {
      return; // Prevent setting value if it exceeds length
    }

    if (name === "birthDate") {
      // Convert local date and time to UTC
      const utcDate = moment(value).utc().format();
      if (formModal) {
        setformInput((prevData) => ({ ...prevData, [name]: utcDate }));
      } else if (editFormModal) {
        setEditFormInput((prevData) => ({ ...prevData, [name]: utcDate }));
      } else if (quarantineModal) {
        setQuarantinForm((prevData) => ({ ...prevData, [name]: utcDate }));
      }
    } else {
      if (formModal) {
        setformInput((prevData) => ({ ...prevData, [name]: value }));
      } else if (editFormModal) {
        setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
      } else if (quarantineModal) {
        setQuarantinForm((prevData) => ({ ...prevData, [name]: value }));
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearching(false);
    setSearchData([]);
    setQuery(e.target.value);
  };

  async function handleSearch(e) {
    if (e) {
      e.preventDefault();
    }
    if (!query.trim()) {
      return toast.error("Please, enter a search query!");
    }
    setSearching(true);
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "livestock",
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

  // edit livestock
  function editBtnFn(id) {
    setEditTagId(id);
    setEditFormModal(true);
    const selectedRecord = livestockData.find((record) => record._id === id);

    setEditFormInput({
      breed: selectedRecord.breed,
      tagId: selectedRecord.tagId,
      tagLocation: selectedRecord.tagLocation,
      sex: selectedRecord.sex,
      birthDate: formatDateTimeLocal(selectedRecord.birthDate),
      weight: selectedRecord.weight,
      status: selectedRecord.status,
      origin: selectedRecord.origin,
      remark: selectedRecord.remark,
    });
  }

  // create livestock
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const {
        breed,
        tagId,
        sex,
        birthDate,
        weight,
        status,
        origin,
        tagLocation,
        remark,
      } = formInput;

      if (
        !breed ||
        !tagId ||
        !sex ||
        !birthDate ||
        !weight ||
        !status ||
        !tagLocation ||
        !origin
      ) {
        setCreating(false);
        alert("Please, ensure you fill in all fields.");
        return;
      }

      const res = await createRecord(
        userData.token,
        userData.farmland,
        "livestock",
        "cattle",
        formInput
      );

      if (res.data) {
        toast.success(res.data.message);
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

    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEditFormSubmit = async (e) => {
    setEditting(true);
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formdata = editformInput;

      const editResponse = await editRecord(
        userData.token,
        userData.farmland,
        "livestock",
        "cattle",
        edittagId,
        formdata
      );

      if (editResponse) {
        setEditting(false);
        setEditFormModal(false);
        setEditFormInput({
          breed: "",
          tagId: "",
          tagLocation: "",
          sex: "",
          birthDate: "",
          weight: "",
          status: "",
          origin: "",
          remark: "",
          staff: "",
        });
      }

      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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

  // Quarantine livestock
  const prepareQurantine = (tagId) => {
    setQuarantinTagId(tagId);
    setQuarantineModal(true);
  };

  console.log(fetching);
  const handleQuarantine = async () => {
    setquarantining(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/farmland/${userData.farmland}/livestock/cattle/${quarantinTagId}`,
        quarantinFormData,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      if (res.data) {
        toast.success(res.data.message);
        setquarantining(false);
        setQuarantineModal(false);

        setQuarantinForm({ action: "Quarantine" });
      }
    } catch (error) {
      setquarantining(false);
      if (error.code === "ERR_NETWORK") {
        toast.error("Please check your internet connection!");
      }

      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="livestock" ref={tableRef}>
      <Head>
        <title>Druminant - Livestock Profile (Cattle)</title>
        <meta name="description" content="Druminant Livestock cattle" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>

      <ModuleHeader />

      <div className="  p-2 md:p-5     my-10 lg:mt-2">
        {" "}
        <div className={`md:mt-10 ${(editFormModal || formModal) && "hidden"}`}>
          {userData?.token && (
            <div className="  ">
              <div>
                <h1 className="text-lg md:text-2xl head font-bold">
                  Livestock Profile (Cattle)
                </h1>
                <p className=" mt-1">Keep track of your livestock profile</p>
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
        {userData?.token && (
          <div
            className={`flex  flex-col justify-between min-h-screen ${
              (editFormModal || quarantineModal || formModal) && "hidden"
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
                    BREED
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
                    SEX
                  </th>
                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    BIRTH Date
                  </th>
                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    Weight
                  </th>
                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              {/* To create space for scrolling */}
              {!fetching && !searching && livestockData.length > 0 && (
                <tbody>
                  {livestockData.map((row, key) => (
                    <tr
                      key={key}
                      className="  md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap my-5 md:mb-0 shadow-md bg-gray-100 shadow-gray-800 md:shadow-none"
                    >
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          ID
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {key + 1}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breed
                        </span>
                        <div
                          className=""
                          style={{ fontSize: "14px", color: "black" }}
                        >
                          {row.breed}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Sex
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {row.sex}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Birth Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.birthDate)
                            .local()
                            .format("MMMM D, YYYY, HH:mm:ss")}
                        </span>
                      </td>
                      <td className="w-full md:w-auto  flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Weight
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {row.weight}
                        </span>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                        <span
                          className="md:hidden w-20 top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Actions
                        </span>

                        <div className=" flex items-center justify-center ">
                          <button
                            title="Edit"
                            onClick={() => editBtnFn(row._id)}
                            className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                          >
                            {/* Edit */}
                            <FaRegEdit style={{ fontSize: "14px" }} />
                          </button>

                          {viewing && viewId === row.tagId ? (
                            <button
                              title="More info"
                              className=" px-3 py-1 ml-2 animate-pulse   hover:bg-green-600 text-white bg-green-500 rounded-md"
                            >
                              <HiDotsHorizontal style={{ fontSize: "14px" }} />
                            </button>
                          ) : (
                            <button
                              title="More info"
                              onClick={() => handleViewLivestock(row.tagId)}
                              className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                            >
                              <MdRemoveRedEye style={{ fontSize: "14px" }} />
                            </button>
                          )}
                          {row.tagId === deleteId ? (
                            <button
                              className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                              onClick={() => handledeleteRecord(row.tagId)}
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
                              onClick={() => handledeleteRecord(row.tagId)}
                            >
                              {/* Delete */}
                              <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                            </button>
                          )}
                          <button
                            onClick={() => prepareQurantine(row.tagId)}
                            title="Quarantine"
                            className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                          >
                            <FaWarehouse style={{ fontSize: "14px" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

              {query && searchData.length > 0 && (
                <tbody>
                  {searchData.map((row, key) => (
                    <tr
                      key={key}
                      className="  md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap my-5 md:mb-0 shadow-md bg-gray-100 shadow-gray-800 md:shadow-none"
                    >
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          ID
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {key + 1}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Breed
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {row.breed}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Sex
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {row.sex}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Birth Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.birthDate).format(
                            "MMMM D, YYYY, HH:mm:ss"
                          )}
                        </span>
                      </td>
                      <td className="w-full md:w-auto  flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden w-20  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Weight
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {row.weight}
                        </span>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                        <span
                          className="md:hidden w-20 top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Actions
                        </span>

                        <div className=" flex items-center justify-center ">
                          <button
                            title="Edit"
                            onClick={() => editBtnFn(row._id)}
                            className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                          >
                            {/* Edit */}
                            <FaRegEdit style={{ fontSize: "14px" }} />
                          </button>

                          {viewing && viewId === row.tagId ? (
                            <button
                              title="More info"
                              className=" px-3 py-1 ml-2 animate-pulse   hover:bg-green-600 text-white bg-green-500 rounded-md"
                            >
                              <HiDotsHorizontal style={{ fontSize: "14px" }} />
                            </button>
                          ) : (
                            <button
                              title="More info"
                              onClick={() => handleViewLivestock(row.tagId)}
                              className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                            >
                              <MdRemoveRedEye style={{ fontSize: "14px" }} />
                            </button>
                          )}
                          {row.tagId === deleteId ? (
                            <button
                              className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                              onClick={() => handledeleteRecord(row.tagId)}
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
                              onClick={() => handledeleteRecord(row.tagId)}
                            >
                              {/* Delete */}
                              <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                            </button>
                          )}
                          <button
                            onClick={() => prepareQurantine(row.tagId)}
                            title="Quarantine"
                            className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                          >
                            <FaWarehouse style={{ fontSize: "14px" }} />
                          </button>
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
              livestockData.length === 0 &&
              userData?.token &&
              idCounter === "done" && (
                <div className="text-center mx-0  flex-col text-black h-[100vh] flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col">
                    Sorry no livestock Record found!
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
        )}
      </div>

      {!userData?.token && !fetching && (
        <div className="text-center   text-gray-800 mx-0 h-screen flex items-center justify-center">
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
        //Livestock input form

        formModal && (
          <div
            className="dashboard-main2 py-12 bg-[#01000D] min-h-screen    h-fit transition   duration-150 ease-in-out z-10 absolute  top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-10 "
              style={{ color: "white" }}
            >
              Livestock Profile Details
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 md:mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div>
                      <label className="input-label" htmlFor="breed">
                        Breed
                      </label>
                      <input
                        title="Enter the breed of the livestock here."
                        placeholder="E.g. Holstein Friesian"
                        maxLength={17}
                        required
                        value={formInput.breed}
                        onChange={handleChange}
                        name="breed"
                        id="breed"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" htmlFor="tagId">
                        Tag ID
                      </label>
                      <input
                        title="Input the unique identification number assigned to the livestock tag."
                        maxLength={10}
                        required
                        value={formInput.tagId}
                        onChange={handleChange}
                        id="tagId"
                        name="tagId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />
                      {tagIdError && <span>{tagIdError}</span>}
                      <label className="input-label" for="tagLocation">
                        Tag Location
                      </label>
                      <input
                        title="Specify where the livestock tag is located on the animal (e.g., ear, leg)."
                        maxLength={10}
                        value={formInput.tagLocation}
                        onChange={handleChange}
                        id="tagLocation"
                        name="tagLocation"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="sex">
                        Sex
                      </label>
                      <select
                        id="sex"
                        value={formInput.sex}
                        name="sex"
                        onChange={handleChange}
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      >
                        <option value={""}>Select a sex</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                      </select>

                      <label className="input-label" for="birthDate">
                        Birth Date
                      </label>
                      <input
                        type="datetime-local"
                        id="birthDate"
                        value={formatDateString(formInput.birthDate)}
                        onChange={handleChange}
                        name="birthDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />
                    </div>
                    <div>
                      <label className="input-label" for="weight">
                        Weight
                      </label>
                      <input
                        title="Enter the weight of the livestock in kilograms (kg)."
                        max={999999}
                        value={formInput.weight}
                        onChange={handleChange}
                        type="number"
                        name="weight"
                        id="weight"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Status
                      </label>
                      <select
                        id="name"
                        value={formInput.status}
                        onChange={handleChange}
                        name="status"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      >
                        <option value={""}>Select a status</option>
                        <option>Sick</option>
                        <option>Healthy</option>
                        <option>Deceased</option>
                        <option>Pregnant</option>
                        <option>Injured</option>
                      </select>

                      <label className="input-label" for="name">
                        Origin
                      </label>
                      <select
                        id="name"
                        value={formInput.origin}
                        onChange={handleChange}
                        name="origin"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      >
                        <option value={""}>Select origin</option>
                        <option>Purchased</option>
                        <option>Born on farm</option>
                        <option>Donated</option>
                        <option>Inherited</option>
                        <option>Adopted</option>
                      </select>
                      <label className="input-label" for="name">
                        Remark
                      </label>
                      <input
                        title="Add additional remarks about the livestock here. Make it brief for easy readablility."
                        id="name"
                        value={formInput.remark}
                        onChange={handleChange}
                        type="text"
                        name="remark"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
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
        //Livestock EDIT form

        editFormModal && (
          <div
            className="dashboard-main2 py-12 bg-[#01000D] min-h-screen    h-fit transition   duration-150 ease-in-out z-10 absolute  top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-10 "
              style={{ color: "white" }}
            >
              Edit Livestock
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 md:mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div>
                      <label className="input-label" for="breed">
                        Breed
                      </label>
                      <input
                        title="Enter the breed of the livestock here."
                        placeholder="E.g. Holstein Friesian"
                        maxLength={17}
                        value={editformInput.breed}
                        onChange={handleChange}
                        name="breed"
                        id="breed"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="tagId">
                        Tag ID
                      </label>
                      <input
                        title="Input the unique identification number assigned to the livestock tag."
                        maxLength={17}
                        value={editformInput.tagId}
                        onChange={handleChange}
                        id="tagId"
                        name="tagId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="tagLocation">
                        Tag Location
                      </label>
                      <input
                        title="Specify where the livestock tag is located on the animal (e.g., ear, leg)."
                        maxLength={17}
                        value={editformInput.tagLocation}
                        onChange={handleChange}
                        id="taglocation"
                        name="tagLocation"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="sex">
                        Sex
                      </label>
                      <select
                        id="sex"
                        value={editformInput.sex}
                        name="sex"
                        onChange={handleChange}
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      >
                        <option value={""}>Select a sex</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                      </select>

                      <label className="input-label" for="birthDate">
                        Birth Date
                      </label>
                      <input
                        type="Datetime-local"
                        id="birthDate"
                        value={formatDateString(editformInput.birthDate)}
                        onChange={handleChange}
                        name="birthDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />
                    </div>
                    <div>
                      <label className="input-label" for="weight">
                        Weight
                      </label>
                      <input
                        title="Enter the weight of the livestock in kilograms (kg)."
                        max={999999}
                        value={editformInput.weight}
                        onChange={handleChange}
                        type="number"
                        name="weight"
                        id="weight"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Status
                      </label>
                      <select
                        id="name"
                        value={editformInput.status}
                        onChange={handleChange}
                        name="status"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      >
                        <option value={""}>Select a status</option>
                        <option>Sick</option>
                        <option>Healthy</option>
                        <option>Deceased</option>
                        <option>Pregnant</option>
                        <option>Injured</option>
                      </select>

                      <label className="input-label" for="origin">
                        Origin
                      </label>
                      <select
                        id="origin"
                        value={editformInput.origin}
                        onChange={handleChange}
                        name="origin"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      >
                        <option value={""}>Select origin</option>
                        <option>Purchased</option>
                        <option>Born on farm</option>
                        <option>Donated</option>
                        <option>Inherited</option>
                        <option>Adopted</option>
                      </select>

                      <label className="input-label" for="remark">
                        Remark
                      </label>
                      <input
                        title="Add any additional notes and remarks about the livestock here."
                        id="remark"
                        value={editformInput.remark}
                        onChange={handleChange}
                        type="text"
                        name="remark"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
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

      {
        //Livestock EDIT form

        quarantineModal && (
          <div
            className="dashboard-main2 py-12 bg-[#01000D] min-h-screen    h-fit transition   duration-150 ease-in-out z-10 absolute  top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-10  text-lg"
              style={{ color: "white" }}
            >
              Quarantine Livestock Profile
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div>
                      <label className="input-label" for="name">
                        Quarantine Date
                      </label>
                      <input
                        type="Datetime-local"
                        id="name"
                        value={formatDateString(
                          quarantinFormData.quarantineDate
                        )}
                        onChange={handleChange}
                        name="quarantineDate"
                        className="mb-5 md:w-[230%] mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-base border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Reason for Quarantine
                      </label>
                      <textarea
                        title="Add any additional notes and remarks about the livestock here."
                        id="name"
                        typeof="text"
                        value={quarantinFormData.reason}
                        onChange={handleChange}
                        name="reason"
                        className="mb-5 md:w-[230%]  mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-20 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      ></textarea>
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
                {!quarantining ? (
                  <div className="flex w-full justify-evenly">
                    <button className="btn" onClick={handleQuarantine}>
                      Quarantine
                    </button>
                    <button className="btn2" onClick={cancelQuarantineModal}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="form-btns">
                    <button
                      disabled={quarantining}
                      className=" bg-[#008000]  text-white px-5 py-2 rounded-md  w-full       flex justify-center space-x-2 items-center"
                      onClick={(e) => handleEditFormSubmit(e)}
                    >
                      <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                      <p>Processing...</p>
                    </button>
                  </div>
                )}
                <button
                  onClick={cancelQuarantineModal}
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

      {viewLivestock && (
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3"
            style={{ marginTop: "10px" }}
          >
            <div className="mt-2 mb-4 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Livestock Profile
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 px-1 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Breed</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.breed}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Tag ID</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.tagId}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Tag Location</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.tagLocation}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Sex</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.sex}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Birth Date</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 ">
                  {moment(selected.birthDate)
                    .local()
                    .format("MMM D, YYYY, HH:mm:ss")}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.weight}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.status}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Origin</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700 first-letter:capitalize">
                  {selected.origin}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">User In charge</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700 first-letter:capitalize">
                  {selected.inCharge}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Entry Date</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700">
                  {moment(selected.createdAt).format("MMM D, YYYY, HH:mm:ss")}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ">
                <p className="text-sm text-gray-600">Remark</p>
                <p
                  className="text-base font-medium text-navy-700  dark:text-green-700  first-letter:capitalize"
                  style={{ width: "100%", overflow: "auto" }}
                >
                  {selected.remark}
                </p>
              </div>

              <div className="btn-div" style={{ width: "100%" }}>
                <button
                  className="close-btn"
                  onClick={() => setviewLivestock(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:mt-0 mt-20   ">
        <Footer />
      </div>
    </div>
  );
}
