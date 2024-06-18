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
import livestockForm from "../../livestockform";


// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Livestock() {
  const [formModal, setFormModal] = useState(false)
  const [errors, setErrors] = useState({});
  const [editFormModal, setEditFormModal] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    tagId: '',
    eventType: '',
    sex: '',
    eventDate: '',
    remark: '',
    staff: ''
  });
  
  const [editId, setEditId] = useState("")

  const [closeForm, setCloseForm] = useState(false)
  const [viewLivestock, setviewLivestock] = useState(false)
  const [tagIdError, setTagIdError] = useState("")
  const [selected, setSelected] = useState({
    tagId: '',
    eventType: '',
    sex: '',
    eventDate: '',
    remark: '',
    staff: ''
  })

  const [formInput, setformInput] = useState({
    tagId: '',
    eventType: '',
    sex: '',
    eventDate: '',
    remark: '',
    staff: ''
  })

  const [livestockData, setLivestockData] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleEdit = (id) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
    setEditFormInput({
      tagId: selectedRecord.tagId,
      eventType: selectedRecord.eventType,
      sex: selectedRecord.sex,
      eventDate: selectedRecord.eventDate,
      remark: selectedRecord.remark,
      staff: selectedRecord.staff
    });
    setEditId(id);
    setEditFormModal(true);
  };



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
    }
  }

  function closeEditFormModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setEditFormModal(false)
      setformInput({})
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
      tagId: selectedRecord.tagId,
      eventType: selectedRecord.eventType,
      sex: selectedRecord.sex,
      eventDate: selectedRecord.eventDate,
      remark: selectedRecord.remark,
      staff: selectedRecord.staff
    })
    
    
  }
  
  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(now - offset).toISOString().slice(0, 19).replace('T', ' ');
    return localISOTime;
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
   
    const { tagId, eventType, sex, eventDate, remark, staff } = formInput;

    if (!tagId || !eventType || !sex || !eventDate || !remark || !staff) {
      alert('Please, ensure you fill in all fields.');
      return;
    }
   
    const entryRecord = {
      ...formInput,
      id: 1,
      entryDate: getCurrentDateTime()
    };

    const updatedLivestockData = [entryRecord, ...livestockData.map(record => ({
      ...record,
      id: record.id + 1
    }))];

    setLivestockData(updatedLivestockData);
  
    setFormModal(false);
    setformInput({
      tagId: '',
      eventType: '',
      sex: '',
      eventDate: '',
      entryDate: '',
      remark: '',
      staff: ''
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    

    const { tagId, eventType, sex, eventDate, remark, staff } = editformInput;

    if (!tagId || !eventType || !sex || !eventDate || !remark || !staff) {
      alert('Please, ensure you fill in all fields.');
      return;
    }

    const newLivestockData = livestockData.map((row) => {
      if (row.id === editId) {
        return { ...row, ...editformInput };
      }
      return row;
    });

    setLivestockData(newLivestockData);
    setEditFormModal(false);
    setEditFormInput({
      tagId: '',
      eventType: '',
      sex: '',
      eventDate: '',
      entryDate: '',
      remark: '',
      staff: ''
    });
  };


  

  return (


    <div className="relative">

      <ModuleHeader />
      <div>
        <div className="up">
          <div>
          <h1 className="module-header">Event Tracker (Sheep)</h1>
          <p>Monitor and keep track of events in the lifetime of your livestock</p>
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
              id
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Tag ID
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Event Type
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Event Date
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Entry Date
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

              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  id
                </span>
                <div style={{ fontSize: "14px" }} >

                  {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                  <p>{row.id}</p>
                </div>
              </td>

              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Tag ID
                </span>
                <div style={{ fontSize: "14px" }} >

                  {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                  <p>{row.tagId}</p>
                </div>
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Event Type
                </span>
                <span style={{ fontSize: "14px" }}>
                  
                  {row.eventType}
                </span>
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
                  Entry Date
                </span>
                <span style={{ fontSize: "14px" }}>
                  
                  {row.entryDate}
                </span>
              </td>
             
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Actions
                </span>


                <div className="">
                  <button title="Edit" onClick={() => editBtnFn(row.id)} className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md">
                    {/* Edit */}
                    <FaRegEdit style={{ fontSize: "14px" }}  />
                  </button>

                  <button title="More info"  onClick={() => handleViewLivestock(row.id)} className=" px-3 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md">
                    <MdRemoveRedEye style={{ fontSize: "14px" }} />
                  </button>

                  <button title="Delete" className=" mr-2 px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md" onClick={() => deleteRecord(row.id)}>
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
          <p className="form-header">Event Details</p>

          <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl">
            <div class="w-[auto] relative mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
              <form >
                <div>
                  <div>

                    <label className="input-label" htmlFor="tag Id" >Tag ID</label>
                    <input title="Input the unique identification number assigned to the livestock tag." maxLength={10} required value={formInput.tagId} onChange={handleChange} id="name" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    {tagIdError && <span>{tagIdError}</span>}

                    <label className="input-label" for="name" >Sex</label>
                    <select id="name" value={formInput.sex} name="sex" onChange={handleChange} class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border">
                      <option value={""}>Select a sex</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>

                    <label className="input-label" for="name">Event Type</label>
                    <input type="text" id="eventType" value={formInput.eventType} placeholder="E.g. Vaccination, death, etc." onChange={handleChange} name="eventType" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                 
                   
                  </div>
                  <div>
                   
                   
                  <label className="input-label" for="name">Event Date</label>
                    <input type="Date" id="name" value={formInput.eventDate} onChange={handleChange} name="eventDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                 
                    <label className="input-label" for="name" >Staff in charge</label>
                    <input title="Name of staff creating this event record" id="name" value={formInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
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
<p className="form-header">Edit Event Details</p>

<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl">
  <div class="w-[auto] relative mt-6 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
    <form >
    <div>
                  <div>

                    <label className="input-label" htmlFor="tag Id" >Tag ID</label>
                    <input title="Input the unique identification number assigned to the livestock tag." maxLength={10} required value={editformInput.tagId} onChange={handleChange} id="name" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    {tagIdError && <span>{tagIdError}</span>}

                    <label className="input-label" for="name" >Sex</label>
                    <select id="name" value={editformInput.sex} name="sex" onChange={handleChange} class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border">
                      <option value={""}>Select a sex</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>
                    </select>

                    <label className="input-label" for="name">Event Type</label>
                    <input type="text" id="eventType" value={editformInput.eventType} placeholder="E.g. Vaccination, death, etc." onChange={handleChange} name="eventType" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                 
                   
                  </div>
                  <div>
                   
                   
                  <label className="input-label" for="name">Event Date</label>
                    <input type="Date" id="name" value={editformInput.eventDate} onChange={handleChange} name="eventDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                 
                    <label className="input-label" for="name" >Staff in charge</label>
                    <input title="Name of staff creating this event record" id="name" value={editformInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    <label className="input-label" for="name" >Remark</label>
                    <input title="Add additional remarks about the livestock here. Make it brief for easy readablility."  id="name" value={editformInput.remark} onChange={handleChange} type="text" name="remark" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
                  </div>
                </div>
    </form>

  
    <div className="form-btns" >
      <button className="btn" onClick={(e) => handleEditFormSubmit(e, editId )} style={{width:"80px"}}>Save</button>
      <button className="btn2" onClick={closeEditFormModal} >Cancel</button>
    </div>
    <button onClick={closeEditFormModal} className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"  aria-label="close modal" role="button">

      <IoMdClose />
    </button>
  </div>
</div>
</div>
}
      {
        viewLivestock && <div class="fixed inset-0 flex  items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3" style={{marginTop:"30px"}}>
            <div class="mt-2 mb-8 w-full">
              <h4  class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Event Details
              </h4>
            </div>
            <div class="grid grid-cols-2 gap-4 px-1 w-full">
              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">tag ID</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.tagId}
                </p>

              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Sex</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.sex}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Event Type</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.eventType}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Event Date</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.eventDate}
                </p>
              </div>

            

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Entry Date</p>
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
                <p class="text-base font-medium text-navy-700  dark:text-green-700" style={{width:"100%", overflow:"auto"}} >
                  {selected.remark}
                </p>
              </div>

              <div className="btn-div" style={{width:"100%"}}>
                <button className="close-btn" onClick={() => setviewLivestock(false)}>Close</button>
              </div>
            </div>
          </div>

        </div>
      }


    </div>
  );
}
