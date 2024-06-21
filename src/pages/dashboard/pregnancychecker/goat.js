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
import { FaEdit, FaEye, FaRegEdit, FaSearch, FaTag, FaWarehouse } from "react-icons/fa";
import { HiAtSymbol, HiHashtag, HiTag } from "react-icons/hi2";
import { MdDelete, MdOutlineHelp, MdRemoveRedEye } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { IoIosMore, IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiHouseBold, PiHouseLineLight } from "react-icons/pi";
import Head from "next/head";



// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Livestock() {
  const [formModal, setFormModal] = useState(false)
  const [errors, setErrors] = useState({});
  const [table, settable] = useState(true)
  const [editFormModal, setEditFormModal] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    breed: '',
    tagId: '',
    pregStatus: '',
    breedDate: '',
    gestationPeriod: 150,
    entryDate: '',
    dueDate: '',
    remark: '',
    staff: ''
  });

  const [editId, setEditId] = useState("")

  const [closeForm, setCloseForm] = useState(false)
  const [viewLivestock, setviewLivestock] = useState(false)
  const [tagIdError, setTagIdError] = useState("")
  const [selected, setSelected] = useState({
    breed: '',
    tagId: '',
    pregStatus: '',
    breedDate: '',
    gestationPeriod: '',
    entryDate: '',
    dueDate: '',
    remark: '',
    staff: ''
  })

  const [formInput, setformInput] = useState({
    breed: '',
    tagId: '',
    pregStatus: '',
    breedDate: '',
    gestationPeriod: 150,
    dueDate: '',
    remark: '',
    staff: ''
  })

  function addNewRecord() {
    setFormModal(true)
    settable(false)
    setformInput({
      breed: '',
      tagId: '',
      pregStatus: '',
      breedDate: '',
      gestationPeriod: 150,
      dueDate: '',
      remark: '',
      staff: ''
    })


  }

  const handleEdit = (tagId) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
      setEditFormInput({
        breed: selectedRecord.breed,
        tagId: selectedRecord.tagId,
        pregStatus: selectedRecord.pregStatus,
        breedDate: selectedRecord.breedDate,
        gestationPeriod: selectedRecord.gestationPeriod,
        dueDate: selectedRecord.dueDate,
        remark: selectedRecord.remark,
        staff: selectedRecord.staff
      });
    setEditId(tagId);
    setEditFormModal(true);
  };

  const [livestockData, setLivestockData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const deleteRecord = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (confirmDelete) {
      const updatedLivestockData = livestockData.filter(record => record.id !== id);
      // Reassign IDs to the remaining records
      const reassignedLivestockData = updatedLivestockData.map((record, index) => ({
        ...record,
        id: index + 1
      }));
      setLivestockData(reassignedLivestockData);
      setIdCounter(reassignedLivestockData.length + 1);
    }
  };

  function closeFormModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setFormModal(false)
      setformInput({})
      settable(true)
    }
  }

  function closeEditFormModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setEditFormModal(false)
      setformInput({})
      settable(true)
    }
  }

  function handleViewLivestock(id) {
    const selectedRecord = livestockData.find(record => record.id === id);
    if (!selectedRecord) {
      console.error("Record not found for id:", id);
      return;
    }
    setSelected(selectedRecord);
    setviewLivestock(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (formModal) {
      setformInput((prevData) => ({ ...prevData, [name]: value }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  function editBtnFn(id) {
    setEditId(id);
    setEditFormModal(true);
    settable(false)
    const selectedRecord = livestockData.find((record) => record.id === id);
    setEditFormInput({
      breed: selectedRecord.breed,
      tagId: selectedRecord.tagId,
      pregStatus: selectedRecord.pregStatus,
      breedDate: selectedRecord.breedDate,
      gestationPeriod: selectedRecord.gestationPeriod,
      dueDate: selectedRecord.dueDate,
      remark: selectedRecord.remark,
      staff: selectedRecord.staff
    });
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(now - offset).toISOString().slice(0, 19).replace('T', ' ');
    return localISOTime;
  };


  const calculateECD = (breedDate, gestationPeriod) => {
    // Validate input and convert breedDate to a Date object
    const breedDateObj = new Date(breedDate);
    if (isNaN(breedDateObj.getTime())) {
      console.error('Invalid breed date format. Expected format: YYYY-MM-DD');
      return '';
    }

    // Calculate ECD
    const gestationDays = parseInt(gestationPeriod, 10);
    if (isNaN(gestationDays)) {
      console.error('Invalid gestation period. Expected a number of days.');
      return '';
    }

    const ecdTimestamp = breedDateObj.getTime() + gestationDays * 24 * 60 * 60 * 1000; // Add gestation period in milliseconds
    const ecdDate = new Date(ecdTimestamp);

    // Format ECD as "Month Day, Year" format
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedECD = ecdDate.toLocaleDateString('en-US', options);

    return formattedECD;
  };


  const handleFormSubmit = (e) => {
    []
    e.preventDefault();

    const { breed, tagId, pregStatus, breedDate, gestationPeriod, remark, staff } = formInput;

    if (!breed || !tagId || !pregStatus || !breedDate || !gestationPeriod || !remark || !staff) {
      alert('Please, ensure you fill in all fields.');
      return;
    }
    const isTagIdUsed = livestockData.some(record => record.tagId === tagId);

    if (isTagIdUsed) {
      alert(`Tag ID '${tagId}' is already used. Please choose a different Tag ID.`);
      return;
    }


    const entryRecord = {
      ...formInput,
      id: 1,
      entryDate: getCurrentDateTime(), // Generate dynamic entryDate
      dueDate: calculateECD(formInput.breedDate, formInput.gestationPeriod)  // Calculate ECD
    };
    // Proceed with form submission
    console.log('Form submitted:', formInput);

    const updatedLivestockData = [entryRecord, ...livestockData.map(record => ({
      ...record,
      id: record.id + 1
    }))];

    setLivestockData(updatedLivestockData);
    settable(true)


    // Reset form input and close modal
    setFormModal(false);
    setformInput({
      breed: '',
      tagId: '',
      pregStatus: '',
      breedDate: '',
      gestationPeriod: 150,
      dueDate: '',
      remark: '',
      staff: ''
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Destructure the editformInput object for validation
    const { breed, tagId, pregStatus, breedDate, gestationPeriod, dueDate, remark, staff } = editformInput;

    // Validate required fields
    if (!breed || !tagId || !pregStatus || !breedDate || !gestationPeriod || !dueDate || !remark || !staff) {
      alert('Please, ensure you fill in all fields.');
      return;
    }

    // Update livestock data with the edited form input
    const newLivestockData = livestockData.map((row) => {
      if (row.id === editId) {
        return { ...row, ...editformInput, dueDate: calculateECD(editformInput.breedDate, editformInput.gestationPeriod) };
      }
      return row;
    });

    // Set the updated livestock data
    setLivestockData(newLivestockData);
    setEditFormModal(false);
    settable(true)
    setEditFormInput({
      breed: '',
      tagId: '',
      pregStatus: '',
      breedDate: '',
      gestationPeriod: '',
      dueDate: '',
      remark: '',
      staff: ''
    });
  };






  return (
    <div className="livestock">
      <Head>
        <title>Druminant - Pregnancy Checker (Goat)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/image/mobilelogo.png" />
      </Head>
      <div className="relative">

        <ModuleHeader />
        <div>
          <div className="up">
            <div>
              <h1 className="module-header">Pregnancy Checker (Goat)</h1>
              <p>Keep track of the expected calving date for your livestock</p>
            </div>
          </div>

          <div className="add-search-div">
            <div className="cursor">
              <p className="add-btn3" onClick={addNewRecord}><span> <MdAdd style={{ marginTop: "4px", color: "white" }} /> </span> Add Record</p>
            </div>
            <input type="text" className="search-input" maxLength={15} placeholder="Search here (Tag id)" />
            {/* <GoSearch className="search-icon" style={{ cursor: "pointer" }} /> */}
          </div>

        </div>
        {table && <div>
          <table className="w-full mt-0">
            <thead>
              <tr>
                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)" }}>
                  id
                </th>
                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)" }}>
                  Tag ID
                </th>
                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)" }}>
                  Gestation Period
                </th>
                <th className="p-0 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)" }}>
                  Breeding Date
                </th>
                <th className="p-0 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)" }}>
                  Expected Calving Date (ECD)
                </th>
                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {livestockData.map((row, key) => (
                <tr
                  key={key}
                  className="bg-white md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-10 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
                >
                  <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                    <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                      id
                    </span>
                    <div style={{ fontSize: "14px" }} >
                      {row.id}
                    </div>

                  </td>
                  <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                    <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                      Tag ID
                    </span>
                    <div style={{ fontSize: "14px" }} >
                      {row.tagId}
                    </div>

                  </td>
                  <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                    <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                      Gestation Period
                    </span>
                    <div style={{ fontSize: "14px" }} >
                      <p>{row.gestationPeriod} days</p>
                    </div>
                  </td>

                  <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                    <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                      Breeding Date
                    </span>
                    <div style={{ fontSize: "14px" }} >
                      {row.breedDate}
                    </div>

                  </td>
                  <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                    <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                      Expected Calving Date
                    </span>
                    <span style={{ fontSize: "14px" }}>

                      {row.dueDate}
                    </span>
                  </td>

                  <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                    <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                      Actions
                    </span>


                    <div className="">
                      <button title="Edit" onClick={() => editBtnFn(row.id)} className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md">
                        {/* Edit */}
                        <FaRegEdit style={{ fontSize: "14px" }} />
                      </button>

                      <button title="More info" onClick={() => handleViewLivestock(row.id)} className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md">
                        <MdRemoveRedEye style={{ fontSize: "14px" }} />
                      </button>

                      <button title="Delete" className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md" onClick={() => deleteRecord(row.id)}>
                        {/* Delete */}
                        <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                      </button>


                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}


        {//Livestock input form

          formModal && <div className="form-backdrop" class=" py-14 bg-[#01000D] overflow-y-auto h-screen  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
            <p className="form-header pt-10 pb:0 md:pt-0">Due Date Details</p>

            <div role="alert" class="container bg-white rounded mx-auto w-11/12 md:w-2/3 max-w-xl">
              <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form >
                  <div className="general-form">
                    <div>
                      <label className="input-label" htmlFor="breed" >Breed</label>
                      <input title="Enter the breed of the cattle" maxLength={25} required value={formInput.breed} onChange={handleChange} name="breed" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />


                      <label className="input-label" htmlFor="tag Id" >Tag ID</label>
                      <input title="Input the unique identification number assigned to the livestock tag." maxLength={20} required value={formInput.tagId} onChange={handleChange} id="name" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                      <label className="input-label" for="name" >Pregnancy Confirmation</label>
                      <select id="name" value={formInput.pregStatus} name="pregStatus" onChange={handleChange} class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border">
                        <option value={""}>Select pregnancy status</option>
                        <option value={"Pregnant"}>Pregnant</option>
                        <option value={"Not Pregnant"}>Not pregnant</option>
                      </select>

                      <label className="input-label" for="name">Breeding Date</label>
                      <input type="Date" id="name" value={formInput.breedDate} onChange={handleChange} name="breedDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    </div>
                    <div>
                      <label className="input-label" for="name" >Gestation Period</label>
                      <input title="Average gestation period" readOnly placeholder="283 days" maxLength={10} value={formInput.gestationPeriod} onChange={handleChange} type="number" name="gestationPeriod" id="name" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                      <label className="input-label" for="name" >Staff in charge</label>
                      <input title="Name of staff creating this record" placeholder="Enter your name" maxLength={20} id="name" value={formInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                      <label className="input-label" for="name" >Remark</label>
                      <input title="Add additional remarks about the livestock here. Make it brief for easy readablility." id="name" value={formInput.remark} onChange={handleChange} type="text" name="remark" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    </div>
                  </div>
                </form>



                <div class="relative mb-5 mt-2">
                  <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">

                  </div>

                </div>
                {/* <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Expiry Date</label> */}
                <div class="relative mb-5 mt-2">
                  <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">

                  </div>

                </div>
                {/* <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">CVC</label> */}
                <div class="relative mb-5 mt-2">
                  <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">

                  </div>
                  {/* <input id="cvc" class="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" /> */}
                </div>
                <div className="form-btns" >
                  <button className="btn" onClick={(e) => handleFormSubmit(e)}>Submit</button>
                  <button className="btn2" onClick={closeFormModal} >Cancel</button>
                </div>
                <button onClick={closeFormModal} className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">

                  <IoMdClose />
                </button>
              </div>
              {/* <button className="close-btn" onClick={show()}>hsh</button> */}
            </div>
          </div>
        }




        {//Livestock EDIT form

          editFormModal && <div className="form-backdrop" class=" py-12 bg-[#01000D] overflow-y-auto h-screen  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
            <p className="form-header pt-10 pb:0 md:pt-0">Edit Due Date Details</p>

            <div role="alert" class="container bg-white rounded mx-auto w-11/12 md:w-2/3 max-w-xl">
              <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                <form >
                  <div className="general-form">
                    <div>
                      <label className="input-label" for="name" >Breed</label>
                      <input title="Enter the breed of the livestock (e.g., Angus, Holstein) here." maxLength={25} value={editformInput.breed} onChange={handleChange} name="breed" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                      <label className="input-label" for="name" >Tag ID</label>
                      <input title="Input the unique identification number assigned to the livestock tag." maxLength={20} value={editformInput.tagId} onChange={handleChange} id="name" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                      <label className="input-label" for="name" >Pregnancy Confirmation</label>
                      <select id="name" value={editformInput.pregStatus} name="pregStatus" onChange={handleChange} class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border">
                        <option value={""}>Select pregnancy status</option>
                        <option value={"Pregnant"}>Pregnant</option>
                        <option value={"Not Pregnant"}>Not pregnant</option>
                      </select>

                      <label className="input-label" for="name">Breeding Date</label>
                      <input type="Date" id="name" value={editformInput.breedDate} onChange={handleChange} name="breedDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    </div>
                    <div>
                      <label className="input-label" for="name" >Gestation Period</label>
                      <input title="Enter the weight of the livestock in kilograms (kg)." maxLength={10} readOnly value={editformInput.gestationPeriod} onChange={handleChange} type="number" name="gestationPeriod" id="name" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                      <label className="input-label" for="name" >Staff in charge</label>
                      <input title="Name of staff creating this livestock profile" placeholder="e.g Mr. Ibharalu" maxLength={20} id="name" value={editformInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                      <label className="input-label" for="name" >Remark</label>
                      <input title="Add additional remarks about the livestock here. Make it brief for easy readablility." id="name" value={editformInput.remark} onChange={handleChange} type="text" name="remark" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />


                    </div>
                  </div>
                </form>



                <div class="relative mb-5 mt-2">
                  <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">

                  </div>

                </div>
                {/* <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Expiry Date</label> */}
                <div class="relative mb-5 mt-2">
                  <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">

                  </div>

                </div>
                {/* <label for="cvc" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">CVC</label> */}
                <div class="relative mb-5 mt-2">
                  <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">

                  </div>
                  {/* <input id="cvc" class="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" /> */}
                </div>
                <div className="form-btns" >
                  <button className="btn" onClick={(e) => handleEditFormSubmit(e, editId)} style={{ width: "80px" }}>Save</button>
                  <button className="btn2" onClick={closeEditFormModal} >Cancel</button>
                </div>
                <button onClick={closeEditFormModal} className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">

                  <IoMdClose />
                </button>
              </div>
              {/* <button className="close-btn" onClick={show()}>hsh</button> */}
            </div>
          </div>
        }


        {
          viewLivestock && <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div class="relative flex flex-col mt-4 items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
              <div class="mt-2 mb-8 w-full">
                <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                  ECD Details
                </h4>
              </div>
              <div class="grid grid-cols-2 gap-4 px-1 w-full">
                <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Breed</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.breed}
                  </p>

                </div>

                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Tag ID</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.tagId}
                  </p>
                </div>

                <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Pregnancy Status</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.pregStatus}
                  </p>
                </div>

                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Gestation Period</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.gestationPeriod}
                  </p>
                </div>

                <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Breeding Date</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.breedDate}
                  </p>
                </div>

                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">ECD</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.dueDate}
                  </p>
                </div>

                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Entry Date & Time</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.entryDate}
                  </p>
                </div>

                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Staff in charge</p>
                  <p class="text-base font-medium text-navy-700  dark:text-green-700">
                    {selected.staff}
                  </p>
                </div>

                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Remark</p>
                  <p class="text-base font-medium text-navy-700  dark:text-green-700" style={{ width: "100%", overflow: "auto" }} >
                    {selected.remark}
                  </p>
                </div>

                <div className="btn-div" style={{ width: "100%" }}>
                  <button className="close-btn" onClick={() => setviewLivestock(false)}>Close</button>
                </div>
              </div>
            </div>

          </div>
        }
      </div>
    </div>
  );
}
