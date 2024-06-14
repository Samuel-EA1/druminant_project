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
import livestockForm from "./livestockform";


// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Livestock() {
  const [formModal, setFormModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [editFormModal, setEditFormModal] = useState(false);
  const [editFormInput, setEditFormInput] = useState({
    tagId: '',
    eventType: '',
    eventDate: '',
    entryDate: '',
    staff: '',
    remark: ''
  });

  const [editId, setEditId] = useState('');
  const [closeForm, setCloseForm] = useState(false);
  const [viewLivestock, setViewLivestock] = useState(false);
  const [tagIdError, setTagIdError] = useState('');
  const [selected, setSelected] = useState({
    tagId: '',
    eventType: '',
    eventDate: '',
    entryDate: '',
    staff: '',
    remark: ''
  });

  const [formInput, setFormInput] = useState({
    tagId: '',
    eventType: '',
    eventDate: '',
    entryDate: '',
    staff: '',
    remark: ''
  });

  const [livestockData, setLivestockData] = useState([]);

  const deleteRecord = (tagId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (confirmDelete) {
      setLivestockData(livestockData.filter(record => record.tagId !== tagId));
    }
  };

  function closeFormModal() {
    if (confirm("Are you sure you want to close the form?")) {
      setFormModal(false);
      setFormInput({
        tagId: '',
        eventType: '',
        eventDate: '',
        entryDate: '',
        staff: '',
        remark: ''
      });
    }
  }

  function closeEditFormModal() {
    if (confirm("Are you sure you want to close the form?")) {
      setEditFormModal(false);
      setEditFormInput({
        tagId: '',
        eventType: '',
        eventDate: '',
        entryDate: '',
        staff: '',
        remark: ''
      });
    }
  }

  function handleViewLivestock(tagId) {
    const selectedRecord = livestockData.find((record) => record.tagId === tagId);
    if (selectedRecord) {
      setSelected(selectedRecord);
      setViewLivestock(true);
    }
  }

  function addDummyRecord() {
    const dummy = {
      breed: "Bosss",
      tagId: "EE11",
      sex: "Male",
      birthDate: "July 30th 2022",
      entryDate: getCurrentDateTime()
    };
    setLivestockData(num => [...num, dummy]);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formModal) {
      setFormInput((prevData) => ({ ...prevData, [name]: value }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(now - offset).toISOString().slice(0, 19).replace('T', ' ');
    return localISOTime;
  };

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { tagId, eventType, eventDate, staff, remark } = formInput;
    if (!tagId || !eventType || !eventDate || !staff || !remark) {
      alert('Please, ensure you fill in all fields.');
      return;
    }
    
    const entryRecord = {
      ...formInput,
      entryDate: getCurrentDateTime() // Generate dynamic entryDate
    };
  
    setLivestockData([...livestockData, entryRecord]);
    setFormModal(false);
    setFormInput({
      tagId: '',
      eventType: '',
      eventDate: '',
      staff: '',
      remark: ''
    });
  };
  

  function editBtnFn(entryDate) {
    setEditId(entryDate);
    setEditFormModal(true);
    const selectedRecord = livestockData.find((record) => record.entryDate === entryDate);
    if (selectedRecord) {
      setEditFormInput({
        tagId: selectedRecord.tagId,
        eventType: selectedRecord.eventType,
        eventDate: selectedRecord.eventDate,
        entryDate: selectedRecord.entryDate,
        staff: selectedRecord.staff,
        remark: selectedRecord.remark
      });
    }
  }
  const handleEditFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Destructure the editFormInput object for validation
    const { tagId, eventType, eventDate, staff, remark } = editFormInput;
  
    // Validate required fields
    if (!tagId || !eventType || !eventDate || !staff || !remark) {
      alert('Please, ensure you fill in all fields.');
      return;
    }
  
    // Debug: Log editFormInput and editId
    console.log('editFormInput:', editFormInput);
    console.log('editId:', editId);
  
    // Check types of tagId and editId
    console.log('Type of editFormInput.tagId:', typeof tagId);
    console.log('Type of editId:', typeof editId);
  
    // Update livestock data with the edited form input
    const newLivestockData = livestockData.map((row) => {
      if (row.tagId === tagId) {
        console.log('Updating row:', row);
        return { ...row, ...editFormInput };
      }
      return row;
    });
   
    // Debug: Log newLivestockData
    console.log('newLivestockData:', newLivestockData);
  
    // Set the updated livestock data
    setLivestockData(newLivestockData);
  
    // Debug: Verify state update
    console.log('Updated livestockData state:', livestockData);
  
    // Close the edit form modal and reset the form input
    setEditFormModal(false);
    setEditFormInput({
      tagId: '',
      eventType: '',
      eventDate: '',
      staff: '',
      remark: ''
    });
  };
  
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (


    <div className="relative">

      <ModuleHeader />
      <div>
        <div className="up">
          <div>
          <h1 className="module-header">Event Tracker (Cattle)</h1>
          <p>Keep track of events in the lifetime of each livestock</p>
          </div>
          <div>
          <MdOutlineHelp className="help-icon" title="help"/>
          </div>
        </div>
      
      <div className="add-search-div">
        <div className="cursor">
          <p className="add-btn" onClick={() => setFormModal(!formModal)}><span>+ </span> Add Event</p>
        </div>
        <input type="text" className="search-input"  maxLength={15} placeholder="Search here (Tag id)" />
        <GoSearch className="search-icon" style={{cursor:"pointer"}}/>
      </div>
    
      </div>
      <table className="w-full mt-0">
        <thead>
          <tr>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Tag Id
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Event Type
            </th>
             <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Event date
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Staff-in-Charge
            </th>
           
             <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
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
                  Tag Id
                </span>
                <div style={{ fontSize: "14px" }} >
                {row.tagId}
                </div>
                
              </td>
            
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Event Type
                </span>
                <div style={{ fontSize: "14px" }} >
                {row.eventType}
                </div>
              
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Event Date
                </span>
                <span style={{ fontSize: "14px" }}>
                  
                  {row.eventDate}
                </span>
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                 Staff-in-charge
                </span>
                <span style={{ fontSize: "14px" }}>
                  
                  {row.staff}
                </span>
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Actions
                </span>


                <div className="">
                  <button title="Edit" onClick={() => editBtnFn(row.entryDate)} className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md">
                    {/* Edit */}
                    <FaRegEdit style={{ fontSize: "14px" }}  />
                  </button>

                  <button title="More info"  onClick={() => handleViewLivestock(row.tagId)} className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md">
                    <MdRemoveRedEye style={{ fontSize: "14px" }} />
                  </button>

                  <button title="Delete" className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md" onClick={() => deleteRecord(row.tagId)}>
                    {/* Delete */}
                    <RiDeleteBin6Line style={{ fontSize: "14px" }}  />
                  </button>

                 
                </div>


              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {//Livestock input form

        formModal && <div className="form-backdrop"  class=" py-12 bg-white transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
          <p className="form-header">Event details</p>

          <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl">
            <div class="w-[auto] relative mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
              <form >
                <div >
                  <div>
                    
                    <label className="input-label" htmlFor="tag Id" >Tag ID</label>
                    <input title="Input the unique identification number assigned to the livestock tag." maxLength={15} required value={formInput.tagId} onChange={handleChange} id="name" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    
                    <label className="input-label" for="name" >Event Type</label>
                    <input title="E.g (Vaccination)" placeholder="E.g (Vaccination)" maxLength={25} value={formInput.eventType} onChange={handleChange} id="taglocation" name="eventType" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name">Event Date</label>
                    <input type="Date" id="name" value={formInput.eventDate} onChange={handleChange} name="eventDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                  </div>
                  <div>

                    <label className="input-label" for="name" >Staff in charge</label>
                    <input title="Name of staff creating this livestock profile" placeholder="e.g Mr. Samuel " id="name" value={formInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    <label className="input-label" for="name" >Remark</label>
                    <input title="Add additional remarks about the livestock here. Make it brief for easy readablility."  id="name" value={formInput.remark} onChange={handleChange} type="text" name="remark" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
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
              <button onClick={closeFormModal} className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"  aria-label="close modal" role="button">

                <IoMdClose />
              </button>
            </div>
            {/* <button className="close-btn" onClick={show()}>hsh</button> */}
          </div>
        </div>
      }




        {//Livestock EDIT form

editFormModal && <div className="form-backdrop" class=" py-12 bg-white transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
<p className="form-header">Event details</p>

<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl">
  <div class="w-[auto] relative mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
    <form >
      <div className="general-form">
        <div>
          <label className="input-label" for="name" >Tag ID</label>
          <input title="Input the unique identification number assigned to the livestock tag." maxLength={15} value={editFormInput.tagId} onChange={handleInputChange} id="name" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
   
          <label className="input-label" for="name" >Event type</label>
          <input title="" maxLength={10} value={editFormInput.eventType} onChange={handleInputChange} id="taglocation" name="eventType" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

          <label className="input-label" for="name">Event Date</label>
          <input type="Date" id="name" value={editFormInput.eventDate} onChange={handleInputChange} name="eventDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
        </div>
        <div>

          <label className="input-label" for="name" >Staff in charge</label>
                    <input title="Add any additional notes and remarks about the livestock here." placeholder="e.g Mr. Ibharalu" id="name" value={editFormInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    <label className="input-label" for="name" >Remark</label>
                    <input title="Add any additional notes and remarks about the livestock here."  id="name" value={editFormInput.remark} onChange={handleChange} type="text" name="remark" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
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
      <button className="btn" onClick={(e) => handleEditFormSubmit(e, editId )} style={{width:"80px"}}>Save</button>
      <button className="btn2" onClick={closeEditFormModal} >Cancel</button>
    </div>
    <button onClick={closeEditFormModal} className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"  aria-label="close modal" role="button">

      <IoMdClose />
    </button>
  </div>
  {/* <button className="close-btn" onClick={show()}>hsh</button> */}
</div>
</div>
}


      {
        viewLivestock && <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
            <div class="mt-2 mb-8 w-full">
              <h4  class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Event details
              </h4>
            </div>
            <div class="grid grid-cols-1 gap-4 px-1 w-full">

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Tag ID</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.tagId}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Tag Location</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.eventType}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Birth Date</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.eventDate}
                </p>
              </div>
        
              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Staff in charge</p>
                <p class="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.staff}
                </p>
              </div>
              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Entry Date</p>
                <p class="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.entryDate}
                </p>
              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Remark</p>
                <p class="text-base font-medium text-navy-700  dark:text-green-700" style={{width:"100%", overflow:"scroll"}} >
                  {selected.remark}
                </p>
              </div>

              <div className="btn-div">
                <button className="close-btn" onClick={() => setViewLivestock(false)}>Close</button>
              </div>
            </div>
          </div>

        </div>
      }


    </div>
  );
}
