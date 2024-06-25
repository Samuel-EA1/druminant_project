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

// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Livestock() {
  const [formModal, setFormModal] = useState(false);
  const userData = useRecoilValue(userState);
  const [errors, setErrors] = useState({});

  const [editFormModal, setEditFormModal] = useState(false);
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

  const [editId, setEditId] = useState("");

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

  const handleEdit = (tagId) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
      setEditFormInput({
        breed: selectedRecord.breed,
        tagId: selectedRecord.tagId,
        tagLocation: selectedRecord.tagLocation,
        sex: selectedRecord.sex,
        birthDate: selectedRecord.birthDate,
        weight: selectedRecord.weight,
        status: selectedRecord.status,
        origin: selectedRecord.origin,
        remark: selectedRecord.remark,
        staff: selectedRecord.staff,
      });
    setEditId(tagId);
    setEditFormModal(true);
  };

  const [livestockData, setLivestockData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(now - offset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    return localISOTime;
  };

  const deleteRecord = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (confirmDelete) {
      const updatedLivestockData = livestockData.filter(
        (record) => record.id !== id
      );
      // Reassign IDs to the remaining records
      const reassignedLivestockData = updatedLivestockData.map(
        (record, index) => ({
          ...record,
          id: index + 1,
        })
      );
      setLivestockData(reassignedLivestockData);
      setIdCounter(reassignedLivestockData.length + 1);
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

  function handleViewLivestock(id) {
    const selectedRecord = livestockData.find((record) => record.id === id);
    if (!selectedRecord) {
      console.error("Record not found for id:", id);
      return;
    }
    setSelected(selectedRecord);
    setviewLivestock(true);
  }

  const dummy = {
    breed: "Bosss",
    tagId: "EE11  ",
    sex: "Male",
    birthDate: "July 30th 2022",
  };

  console.log(tagIdError);
  function addRecord() {
    setLivestockData((num) => [...num, dummy]);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (formModal) {
      setformInput((prevData) => ({ ...prevData, [name]: value }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  function editBtnFn(id) {
    setEditId(id);
    setEditFormModal(true);

    const selectedRecord = livestockData.find((record) => record.id === id);
    setEditFormInput({
      breed: selectedRecord.breed,
      tagId: selectedRecord.tagId,
      tagLocation: selectedRecord.tagLocation,
      sex: selectedRecord.sex,
      birthDate: selectedRecord.birthDate,
      weight: selectedRecord.weight,
      status: selectedRecord.status,
      origin: selectedRecord.origin,
      remark: selectedRecord.remark,
      staff: selectedRecord.staff,
    });
  }

  const fetchLiveStocks = async () => {
    try {
      if (userData.token) {
        const res = await axios.get(
          `https://druminant-seven.vercel.app/api/v1/farmland/${userData.farmland}/livestock/cattle`,

          {
            headers: {
              Authorization: `Bearer ${userData?.token}`,
            },
          }
        );

        if (res.data) {
          setLivestockData(res.data.message.reverse());
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchLiveStocks();
  }, [creating, userData?.token]);

  const handleFormSubmit = async (e) => {
    setCreating(true);
    try {
      e.preventDefault();

      const { breed, tagId, sex, birthDate, weight, status, origin, remark } =
        formInput;

      if (
        !breed ||
        !tagId ||
        !sex ||
        !birthDate ||
        !weight ||
        !status ||
        !origin 
       
      ) {
        setCreating(false);
        alert("Please, ensure you fill in all fields.");
        return;
      }

      const res = await axios.post(
        `https://druminant-seven.vercel.app/api/v1/farmland/${userData.farmland}/livestock/cattle`,
        formInput,
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );

      if (res.data) {
        toast.success(res.data);

        setCreating(false);
        setFormModal(false);
        // setformInput({
        //   breed: "",
        //   tagId: "",
        //   tagLocation: "",
        //   sex: "",
        //   birthDate: "",
        //   weight: "",
        //   status: "",
        //   origin: "",
        //   remark: "",
        //   staff: "",
        // });
      }
    } catch (error) {
      setCreating(false);
       if (error.response) {
         toast.error(error.response.data.message);
       }
    }
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Destructure the editformInput object for validation
    const {
      breed,
      tagId,
      tagLocation,
      sex,
      birthDate,
      weight,
      status,
      origin,
      remark,
      staff,
    } = editformInput;

    // Validate required fields
    if (
      !breed ||
      !tagId ||
      !tagLocation ||
      !sex ||
      !birthDate ||
      !weight ||
      !status ||
      !origin ||
      !remark ||
      !staff
    ) {
      alert("Please, ensure you fill in all fields.");
      return;
    }

    // Update livestock data with the edited form input
    const newLivestockData = livestockData.map((row) => {
      if (row.id === editId) {
        return { ...row, ...editformInput };
      }
      return row;
    });

    setLivestockData(newLivestockData);

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
  };

  function addProfile() {
    setFormModal(!formModal);
  }

  return (
    <div className="livestock">
      <Head>
        <title>Druminant - Livestock Profile (Cattle)</title>
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
      <div className="">
        <div className="up">
          <div>
            <h1 className="module-header md:mt-0  mt-0 ">
              Livestock Profile (Cattle)
            </h1>
            <p>Keep track of your livestock profile</p>
          </div>
        </div>

        <div className="add-search-div">
          <div className="cursor">
            <p className="add-btn" onClick={addProfile}>
              <span>+ </span> Add Profile
            </p>
          </div>
          <input
            type="text"
            className="search-input"
            maxLength={15}
            placeholder="Search here (Tag id)"
          />
          {/* <GoSearch className="search-icon" style={{ cursor: "pointer" }} /> */}
        </div>
      </div>

      <div>
        <table className="w-full mt-0">
          <thead>
            <tr>
              <th
                className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                style={{ backgroundColor: "green" }}
              >
                id
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
          <tbody >
            {livestockData.map((row, key) => (
              <tr
                key={key}
                className="bg-white    md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-1 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
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
                <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                  <span
                    className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                    className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                    className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                    {moment(row.birthDate).format("MMMM Do, YYYY, h:mm:ss A")}
                  </span>
                </td>
                <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                  <span
                    className="md:hidden  top-0 left-0 rounded-md  px-2 py-1  font-bold uppercase"
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
                      onClick={() => editBtnFn(row.id)}
                      className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                    >
                      {/* Edit */}
                      <FaRegEdit style={{ fontSize: "14px" }} />
                    </button>

                    <button
                      title="More info"
                      onClick={() => handleViewLivestock(row.id)}
                      className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                    >
                      <MdRemoveRedEye style={{ fontSize: "14px" }} />
                    </button>

                    <button
                      title="Delete"
                      className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                      onClick={() => deleteRecord(row.id)}
                    >
                      {/* Delete */}
                      <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                    </button>

                    <button
                      title="Quarantine"
                      className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                    >
                      {/* <PiHouseLineLight title="Quarantine" /> */}
                      <PiHouseBold style={{ fontSize: "14px" }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        //Livestock input form

        formModal && (
          <div
            className="dashboard-main2 py-12 bg-[#01000D]  transition overflow-y-auto  duration-150 ease-in-out z-10 absolute  top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-0"
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
                        maxLength={20}
                        required
                        value={formInput.breed}
                        onChange={handleChange}
                        name="breed"
                        id="breed"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" htmlFor="tag Id">
                        Tag ID
                      </label>
                      <input
                        title="Input the unique identification number assigned to the livestock tag."
                        maxLength={10}
                        required
                        value={formInput.tagId}
                        onChange={handleChange}
                        id="name"
                        name="tagId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      {tagIdError && <span>{tagIdError}</span>}
                      <label className="input-label" for="name">
                        Tag Location
                      </label>
                      <input
                        title="Specify where the livestock tag is located on the animal (e.g., ear, leg)."
                        maxLength={10}
                        value={formInput.tagLocation}
                        onChange={handleChange}
                        id="taglocation"
                        name="tagLocation"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Sex
                      </label>
                      <select
                        id="name"
                        value={formInput.sex}
                        name="sex"
                        onChange={handleChange}
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      >
                        <option value={""}>Select a sex</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                      </select>

                      <label className="input-label" for="name">
                        Birth Date
                      </label>
                      <input
                        type="datetime-local"
                        id="name"
                        value={formInput.birthDate}
                        onChange={handleChange}
                        name="birthDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                    </div>
                    <div>
                      <label className="input-label" for="name">
                        Weight
                      </label>
                      <input
                        title="Enter the weight of the livestock in kilograms (kg)."
                        maxLength={10}
                        value={formInput.weight}
                        onChange={handleChange}
                        type="number"
                        name="weight"
                        id="name"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Status
                      </label>
                      <select
                        id="name"
                        value={formInput.status}
                        onChange={handleChange}
                        name="status"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
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
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      >
                        <option value={""}>Select origin</option>
                        <option>Purchased</option>
                        <option>Born on farm</option>
                        <option>Donated</option>
                        <option>Inherited</option>
                        <option>Adopted</option>
                      </select>

                      {/* <label className="input-label" for="name">
                        Staff in charge
                      </label>
                      <input
                        title="Name of staff creating this livestock profile"
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
                        title="Add additional remarks about the livestock here. Make it brief for easy readablility."
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
                    onClick={(e) => handleFormSubmit(e)}
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
            className="form-backdrop py-12 bg-[#01000D] overflow-y-auto  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
            id="modal"
          >
            <p
              className="form-header pt-10 pb:0 md:pt-0"
              style={{ color: "white" }}
            >
              Edit livestock profile
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
                        Breed
                      </label>
                      <input
                        title="Enter the breed of the livestock here."
                        placeholder="E.g. Holstein Friesian"
                        maxLength={20}
                        value={editformInput.breed}
                        onChange={handleChange}
                        name="breed"
                        id="breed"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Tag ID
                      </label>
                      <input
                        title="Input the unique identification number assigned to the livestock tag."
                        maxLength={15}
                        value={editformInput.tagId}
                        onChange={handleChange}
                        id="name"
                        name="tagId"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Tag Location
                      </label>
                      <input
                        title="Specify where the livestock tag is located on the animal (e.g., ear, leg)."
                        maxLength={10}
                        value={editformInput.tagLocation}
                        onChange={handleChange}
                        id="taglocation"
                        name="tagLocation"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Sex
                      </label>
                      <select
                        id="name"
                        value={editformInput.sex}
                        name="sex"
                        onChange={handleChange}
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      >
                        <option value={""}>Select a sex</option>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                      </select>

                      <label className="input-label" for="name">
                        Birth Date
                      </label>
                      <input
                        type="Date"
                        id="name"
                        value={editformInput.birthDate}
                        onChange={handleChange}
                        name="birthDate"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                    </div>
                    <div>
                      <label className="input-label" for="name">
                        Weight
                      </label>
                      <input
                        title="Enter the weight of the livestock in kilograms (kg)."
                        maxLength={10}
                        value={editformInput.weight}
                        onChange={handleChange}
                        type="number"
                        name="weight"
                        id="name"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />

                      <label className="input-label" for="name">
                        Status
                      </label>
                      <select
                        id="name"
                        value={editformInput.status}
                        onChange={handleChange}
                        name="status"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
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
                        value={editformInput.origin}
                        onChange={handleChange}
                        name="origin"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      >
                        <option value={""}>Select origin</option>
                        <option>Purchased</option>
                        <option>Born on farm</option>
                        <option>Donated</option>
                        <option>Inherited</option>
                        <option>Adopted</option>
                      </select>
                      <label className="input-label" for="name">
                        Staff in charge
                      </label>
                      <input
                        title="Name of staff creating this livestock profile"
                        id="name"
                        value={editformInput.staff}
                        onChange={handleChange}
                        type="text"
                        name="staff"
                        className="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                      />
                      <label className="input-label" for="name">
                        Remark
                      </label>
                      <input
                        title="Add any additional notes and remarks about the livestock here."
                        id="name"
                        value={editformInput.remark}
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
                    onClick={(e) => handleEditFormSubmit(e, editId)}
                    style={{ width: "80px" }}
                  >
                    Save
                  </button>
                  <button className="btn2" onClick={closeEditFormModal}>
                    Cancel
                  </button>
                </div>
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
                Livestock Profile
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-4 px-1 w-full">
              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Breed</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.breed}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Tag ID</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.tagId}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Tag Location</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.tagLocation}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Sex</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.sex}
                </p>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Birth Date</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.birthDate}
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
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.status}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Origin</p>
                <p className="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.origin}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Staff in charge</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.staff}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Entry Date</p>
                <p className="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.entryDate}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p className="text-sm text-gray-600">Remark</p>
                <p
                  className="text-base font-medium text-navy-700  dark:text-green-700"
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
    </div>
  );
}
