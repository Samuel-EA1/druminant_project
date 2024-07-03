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

// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Event() {
  const [formModal, setFormModal] = useState(false);
  const [viewId, setviewId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [fetching, setFetching] = useState(false);
  const userData = useRecoilValue(userState);
  const [deleting, setdelete] = useState(false);
  const [edittagId, setEditTagId] = useState("");
  const [editFormModal, setEditFormModal] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    eventEntryId: "",
    eventDate: "",
    eventType: "",
  });
  const [viewing, setViewing] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [editting, setEditting] = useState(false);

  const [creating, setCreating] = useState(false);
  const [viewLivestock, setviewLivestock] = useState(false);
  const [tagIdError, setTagIdError] = useState("");
  const [selected, setSelected] = useState({
    eventEntryId: "",
    eventDate: "",
    eventType: "",
  });

  const [quarantining, setquarantining] = useState(false);
  const [formInput, setformInput] = useState({
    eventEntryId: "",
    eventType: "",
    eventDate: "",
  });

  const [quarantinTagId, setQuarantinTagId] = useState(null);

  const handleEdit = (tagId) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
      setEditFormInput({
        eventEntryId: selectedRecord.eventEntryId,
        eventDate: selectedRecord.eventDate,
        eventType: selectedRecord.eventType,
        staff: selectedRecord.inCharge,
      });
    setEditId(tagId);
    setEditFormModal(true);
  };

  const [eventData, seteventData] = useState([]);
  const [idCounter, setIdCounter] = useState("");

  // fetch event
  // fetch event
  const fetchEvents = async () => {
    setFetching(true);
    try {
      if (userData?.token) {
        const res = await fetchAllRecords(
          userData.token,
          userData.farmland,
          "event",
          "goat",
          ""
        );

        if (res.data) {
          setFetching(false);
          seteventData(res.data.message.reverse());
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
    fetchEvents();
  }, [creating, userData?.token, deleting, editting]);

  console.log(eventData.length, fetching);

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
          "event",
          "goat",
          id
        );

        setdelete(false);
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

  async function handleViewLivestock(id) {
    setviewId(id);
    setViewing(true);
    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "event",
        "goat",
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

    if (formModal) {
      setformInput((prevData) => ({ ...prevData, [name]: value }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // edit event
  function editBtnFn(tagId) {
    setEditTagId(tagId);
    setEditFormModal(true);
    const selectedRecord = eventData.find(
      (record) => record.eventEntryId === tagId
    );

    setEditFormInput({
      eventEntryId: selectedRecord.eventEntryId,
      eventDate: selectedRecord.eventDate,
      eventType: selectedRecord.eventType,
    });
  }

  // create event
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const { eventEntryId, eventType, eventDate } = formInput;

      if (!eventEntryId || !eventType || !eventDate) {
        setCreating(false);
        alert("Please, ensure you fill in all fields.");
        return;
      }

      const res = await createRecord(
        userData.token,
        userData.farmland,
        "event",
        "goat",
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

  const handleEditFormSubmit = async (e) => {
    setEditting(true);
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formdata = editformInput;

      const editResponse = await editRecord(
        userData.token,
        userData.farmland,
        "event",
        "goat",
        edittagId,
        formdata
      );

      if (editResponse) {
        setEditting(false);
        setEditFormModal(false);
        setEditFormInput({
          eventEntryId: "",
          tagId: "",
          tagLocation: "",
          sex: "",
          eventDate: "",
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
  }

  return (
    <div className="livestock">
      <Head>
        <title>Druminant - Event Profile (goat)</title>
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

      <>
        {" "}
        <div className="">
          {userData?.token && !fetchError && (
            <>
              <div className="up">
                <div>
                  <h1 className="module-header md:mt-0  mt-0 ">
                    Event Profile (goat)
                  </h1>
                  <p>Keep track of your event profile</p>
                </div>
              </div>

              <div className="add-search-div">
                <div className="cursor">
                  <p className="add-btn" onClick={addProfile}>
                    <span>+ </span> Add Profile
                  </p>
                </div>
                {/* <input
              type="text"
              className="search-input"
              maxLength={15}
              placeholder="Search here (Event Id)"
            /> */}
              </div>
            </>
          )}
        </div>
        {userData?.token && !fetchError ? (
          <div
            className={`flex  flex-col justify-between h-screen ${
              editFormModal && "hidden"
            }`}
          >
            <table className="w-full mt-0">
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
                    Event Id
                  </th>
                  <th
                    className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                    style={{ backgroundColor: "green" }}
                  >
                    Event Type
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
                    Actions
                  </th>
                </tr>
              </thead>
              {!fetching && eventData.length > 0 && (
                <tbody>
                  {eventData.map((row, key) => (
                    <tr
                      key={key}
                      className="bg-white      md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-1 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
                    >
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b  block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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

                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Event Id
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.eventEntryId}</p>
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Event Type
                        </span>
                        <div style={{ fontSize: "14px", color: "black" }}>
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.eventType}</p>
                        </div>
                      </td>
                      <td className="w-full md:w-auto   justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#9be49b",
                            color: "#01000D",
                            fontSize: "11px",
                          }}
                        >
                          Birth Date
                        </span>
                        <span style={{ fontSize: "14px", color: "black" }}>
                          {moment(row.eventDate).format(
                            "MMMM Do, YYYY, h:mm:ss A"
                          )}
                        </span>
                      </td>

                      <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                        <span
                          className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                            onClick={() => editBtnFn(row.eventEntryId)}
                            className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                          >
                            {/* Edit */}
                            <FaRegEdit style={{ fontSize: "14px" }} />
                          </button>

                          {viewing && viewId === row.eventEntryId ? (
                            <button
                              title="More info"
                              className=" px-3 py-1 ml-2 animate-pulse   hover:bg-green-600 text-white bg-green-500 rounded-md"
                            >
                              <HiDotsHorizontal style={{ fontSize: "14px" }} />
                            </button>
                          ) : (
                            <button
                              title="More info"
                              onClick={() =>
                                handleViewLivestock(row.eventEntryId)
                              }
                              className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                            >
                              <MdRemoveRedEye style={{ fontSize: "14px" }} />
                            </button>
                          )}
                          {deleting ? (
                            <button
                              className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                              onClick={() =>
                                handledeleteRecord(row.eventEntryId)
                              }
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
                              onClick={() =>
                                handledeleteRecord(row.eventEntryId)
                              }
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
              eventData.length === 0 &&
              userData?.token &&
              idCounter === "done" && (
                <div className="text-center mx-0  flex-col text-black h-[100vh] flex items-center justify-center">
                  <div className="flex items-center justify-center flex-col">
                    Sorry no event Record found!
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
                  You are not allowed to access this Farmland event
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
      </>

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
        //Event input form

        formModal && (
          <div
            className="dashboard-main2 py-12 bg-[#01000D]  transition overflow-y-auto  duration-150 ease-in-out z-10 absolute  top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-0"
              style={{ color: "white" }}
            >
              Event Profile Details
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 md:mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div className=" w-full">
                      <label className="input-label" htmlFor="eventEntryId">
                        Event Id
                      </label>
                      <input
                        title="Enter the eventEntryId of the event here."
                        placeholder="E.g. Holstein Friesian"
                        maxLength={20}
                        required
                        value={formInput.eventEntryId}
                        onChange={handleChange}
                        name="eventEntryId"
                        id="eventEntryId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      <label className="input-label" htmlFor="eventType">
                        Event Type
                      </label>
                      <input
                        title="Input the unique identification number assigned to the event tag."
                        maxLength={10}
                        required
                        value={formInput.eventType}
                        onChange={handleChange}
                        id="eventType"
                        name="eventType"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      <label className="input-label" for="eventDate">
                        Birth Date
                      </label>
                      <input
                        type="datetime-local"
                        id="eventDate"
                        value={formInput.eventDate}
                        onChange={handleChange}
                        name="eventDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      {/* <label className="input-label" for="name">
                        Staff in charge
                      </label>
                      <input
                        title="Name of staff creating this event profile"
                        id="name"
                        value={formInput.staff}
                        onChange={handleChange}
                        type="text"
                        name="staff"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      /> */}
                      <label className="input-label" for="name">
                        Remark
                      </label>
                      <input
                        title="Add additional remarks about the event here. Make it brief for easy readablility."
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
        //Event EDIT form

        editFormModal && (
          <div
            className="form-backdrop py-12 bg-[#01000D] overflow-y-auto  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-0"
              style={{ color: "white" }}
            >
              Edit event profile
            </p>

            <div
              role="alert"
              className="container mx-auto w-11/12 md:w-2/3 max-w-xl"
            >
              <div className="w-[auto] bg-white relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form>
                  <div className="general-form">
                    <div className="w-full">
                      <label className="input-label" for="name">
                        Event Id
                      </label>
                      <input
                        title="Enter the eventEntryId of the event here."
                        placeholder="E.g. Holstein Friesian"
                        maxLength={20}
                        value={editformInput.eventEntryId}
                        onChange={handleChange}
                        name="eventEntryId"
                        id="eventEntryId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="eventType">
                        Event Type
                      </label>
                      <input
                        title="Input the unique identification number assigned to the event tag."
                        maxLength={15}
                        value={editformInput.eventType}
                        onChange={handleChange}
                        id="eventType"
                        name="eventType"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Birth Date
                      </label>
                      <input
                        type="Datetime-local"
                        id="name"
                        value={formatDateString(editformInput.eventDate)}
                        onChange={handleChange}
                        name="eventDate"
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

      {viewLivestock && (
        <div className="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3"
            style={{ marginTop: "10px" }}
          >
            <div className="mt-2 mb-8 w-full">
              <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Event Profile
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 px-1 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Event Id</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.eventEntryId}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Event Date</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {moment(selected.eventDate).format("MMM Do, YYYY, h:mm:ss A")}
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
      {/* <div className="md:mt-0 mt-20  md:hidden ">
        <Footer />
      </div> */}

      <div className="md:mt-0 mt-20   hidden md:block ">
        <Footer />
      </div>
    </div>
  );
}
