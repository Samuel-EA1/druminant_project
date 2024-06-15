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
  const [formModal, setFormModal] = useState(false)
  const [errors, setErrors] = useState({});
  const [editFormModal, setEditFormModal] = useState(false);
  const [editformInput, setEditFormInput] = useState({
    milkYield: "",
    tagId: "",
    deliveryDate:"",
    weight: "",
    noOffSpring: "",
    observation: "",
    fat: "",
    snf: "",
    lactose: "",
    salt: "",
    protein: "",
    water: "",
    staff: ""
  });
  
  const [editId, setEditId] = useState("")

  const [closeForm, setCloseForm] = useState(false)
  const [viewLivestock, setviewLivestock] = useState(false)
  const [viewLivestock2, setviewLivestock2] = useState(false)
  const [tagIdError, setTagIdError] = useState("")
  const [selected, setSelected] = useState({
    milkYield: "",
    tagId: "",
    deliveryDate:"",
    weight: "",
    noOffSpring: "",
    observation: "",
    fat: "",
    snf: "",
    lactose: "",
    salt: "",
    protein: "",
    water: "",
    staff: ""
  })

  const [formInput, setformInput] = useState({
    milkYield: "",
    tagId: "",
    deliveryDate:"",
    weight: "",
    noOffSpring: "",
    observation: "",
    fat: "",
    snf: "",
    lactose: "",
    salt: "",
    protein: "",
    water: "",
    staff: ""
  })

  const handleEdit = (tagId) => {
    // Fetch the record with `id` from your data source
    const selectedRecord = // Logic to fetch the record based on `id`
    setEditFormInput({
      milkYield: selectedRecord.milkYield,
      tagId: selectedRecord.tagId,
      deliveryDate: selectedRecord.deliveryDate,
      weight: selectedRecord.weight,
      noOffSpring: selectedRecord.noOffSpring,
      observation: selectedRecord.observation,
      fat: selectedRecord.fat,
      snf: selectedRecord.snf,
      lactose: selectedRecord.lactose,
      salt: selectedRecord.salt,
      protein: selectedRecord.protein,
      water: selectedRecord.water,
      staff: selectedRecord.staff
    });
    setEditId(tagId);
    setEditFormModal(true);
  };

  // const [editFormInput, seteditFormInput] = useState({})




  const [livestockData, setLivestockData] = useState([]);





  const deleteRecord = (tagId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if(confirmDelete){
      setLivestockData(livestockData.filter(record => record.tagId !== tagId));
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

  function handleViewLivestock(tagId) {
    const selectedRecord = livestockData.filter((record) => record.tagId === tagId)
    setSelected(selectedRecord[0])
    setviewLivestock(true)
  }
  function handleViewLivestock2(tagId) {
    const selectedRecord = livestockData.filter((record) => record.tagId === tagId)
    setSelected(selectedRecord[0])
    setviewLivestock2(true)
  }





  const dummy = { breed: "Bosss", tagId: "EE11  ", sex: "Male", birthDate: "July 30th 2022" }

  console.log(tagIdError)
  function addRecord() {
    setLivestockData(num => [...num, dummy])

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput(prevState => ({
      ...prevState,
      [name]: value
  }));


    
    if (formModal) {
      setformInput((prevData) => ({ ...prevData, [name]: value }));
    } else if (editFormModal) {
      setEditFormInput((prevData) => ({ ...prevData, [name]: value }));
    }
  }
    


  function editBtnFn(tagId) {
    setEditId(tagId);
    setEditFormModal(true);
    const selectedRecord = livestockData.find((record) => record.tagId === tagId);
    setEditFormInput({
      milkYield: selectedRecord.milkYield,
      tagId: selectedRecord.tagId,
      deliveryDate: selectedRecord.deliveryDate,
      weight: selectedRecord.weight,
      noOffSpring: selectedRecord.noOffSpring,
      observation: selectedRecord.observation,
      fat: selectedRecord.fat,
      snf: selectedRecord.snf,
      lactose: selectedRecord.lactose,
      salt: selectedRecord.salt,
      protein: selectedRecord.protein,
      water: selectedRecord.water,
      staff: selectedRecord.staff
    });
  }
  

  const handleFormSubmit = (e) => {
[]
    e.preventDefault();
   
    const { milkYield, tagId, deliveryDate,  weight, noOffSpring, observation, fat, snf, lactose, salt, protein, water, staff } = formInput;

    if (milkYield == null || milkYield === ""  || tagId == null || tagId === "" || deliveryDate == null || deliveryDate === "" ||  weight == null || weight === "" ||
      noOffSpring == null || noOffSpring === "" ||  snf == null || snf === "" || lactose == null || lactose === "" ||  fat == null || fat === "" ||
        salt == null || salt === "" || protein == null || protein === "" ||  water == null || water === ""  ||  staff == null || staff === "" || observation == null || observation === ""
    ) {
      alert('Please, ensure you fill in all fields.');
      return;
  }
    const isTagIdUsed = livestockData.some(record => record.tagId === tagId);

    if (isTagIdUsed) {
      alert(`Tag ID '${tagId}' is already used. Please choose a different Tag ID.`);
      return;
    }
  
    // Proceed with form submission
    console.log('Form submitted:', formInput);
  
    // Add form submission logic here (e.g., API call)
    setLivestockData([...livestockData, formInput]);
  
    // Reset form input and close modal
    setFormModal(false);
    setformInput({
      milkYield: "",
      tagId: "",
      deliveryDate:"",
      weight: "",
      noOffSpring: "",
      observation: "",
      fat: "",
      snf: "",
      lactose: "",
      salt: "",
      protein: "",
      water: "",
      staff: ""
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Destructure the editformInput object for validation
    const { milkYield, tagId, deliveryDate,  weight, noOffSpring, observation, fat, snf, lactose, salt, protein, water, staff } = editformInput;

    if (milkYield == null || milkYield === ""  || tagId == null || tagId === "" || deliveryDate == null || deliveryDate === "" ||  weight == null || weight === "" ||
      noOffSpring == null || noOffSpring === "" ||  snf == null || snf === "" || lactose == null || lactose === "" ||  fat == null || fat === "" ||
        salt == null || salt === "" || protein == null || protein === "" ||  water == null || water === ""  ||  staff == null || staff === "" || observation == null || observation === ""
    ) {
      alert('Please, ensure you fill in all fields.');
      return;
  }
    // Update livestock data with the edited form input
    const newLivestockData = livestockData.map((row) => {
      if (row.tagId === editId) {
        return { ...row, ...editformInput };
      }
      return row;
    });

    // Set the updated livestock data
    setLivestockData(newLivestockData);

    // Close the edit form modal and reset the form input
    setEditFormModal(false);
    setEditFormInput({
      milkYield: "",
      tagId: "",
      deliveryDate:"",
      weight: "",
      noOffSpring: "",
      observation: "",
      fat: "",
      snf: "",
      lactose: "",
      salt: "",
      protein: "",
      water: "",
      staff: ""
    });
  };


  

  return (


    <div className="relative">

      <ModuleHeader />
      <div>
        <div className="up">
          <div>
          <h1 className="module-header">Lactation Tracker (Sheep)</h1>
          <p>Keep track of the lactation of your livestock</p>
          </div>
          <div>
          <MdOutlineHelp className="help-icon" title="help"/>
          </div>
        </div>
      
      <div className="add-search-div">
        <div className="cursor">
          <p className="add-btn" onClick={() => setFormModal(!formModal)}><span>+ </span> Add Record</p>
        </div>
        <input type="text" className="search-input"  maxLength={15} placeholder="Search here (Tag id)" />
        <GoSearch className="search-icon" style={{cursor:"pointer"}}/>
      </div>
    
      </div>
      <table className="w-full mt-0">
        <thead>
          <tr>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              MILK YIELD (Kg)
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Tag ID
            </th>
             <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              STAFF-IN-CHARGE
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              DELIVERY DATE
            </th>
            <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: "rgb(7, 78, 0)"}}>
              Weight
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
                  Milk Yield
                </span>
                <div style={{ fontSize: "14px" }} >
                {row.milkYield}
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
                  Staff-In-Charge
                </span>
                <div style={{ fontSize: "14px" }} >
                {row.staff}
                </div>
              
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Delivery Date
                </span>
                <span style={{ fontSize: "14px" }}>
                  
                  {row.deliveryDate}
                </span>
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Weight
                </span>
                <span style={{ fontSize: "14px" }}>
                  
                  {row.weight}
                </span>
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
              <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                  Actions
                </span>


                <div className="">
                  <button title="Edit" onClick={() => editBtnFn(row.tagId)} className=" px-3 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md">
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

                  <button title="Milk Composition" onClick={() => handleViewLivestock2(row.tagId)} className=" px-2  hover:bg-blue-600 text-white bg-blue-500 rounded-md"  style={{ fontSize: "14px", paddingTop:"2px", paddingBottom:"2px"}}>
                    {/* <PiHouseLineLight title="Quarantine" /> */}
                    Milk details
                  </button>
                </div>


              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {//Livestock input form

        formModal && <div className="form-backdrop"  class=" py-12 bg-white transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
          <p className="form-header" style={{marginTop:"-20px"}}>Lactation Details</p>

          <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl">
            <div class="w-[auto] relative mt-3 py-8 px-5 md:px-10  shadow-md rounded border border-green-700" >
              <form >
                <div className="general-form">
                  <div>
                    <label className="input-label" htmlFor="breed" >Milk Yield</label>
                    <input type="number"  maxLength={20} required value={formInput.milkYield} onChange={handleChange} name="milkYield" id="milkYield" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
                    
                    <label className="input-label" htmlFor="tag Id" >Tag ID</label>
                    <input  maxLength={10} required value={formInput.tagId} onChange={handleChange} id="tagId" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
            
                    <label className="input-label" for="name">Delivery Date</label>
                    <input type="Date" id="deliveryDate" value={formInput.deliveryDate} onChange={handleChange} name="deliveryDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                  
                   

                    <label className="input-label" for="name" >Weight</label>
                    <input title="Enter the weight of the livestock in kilograms (kg)."maxLength={10} value={formInput.weight} onChange={handleChange} type="number" name="weight" id="weight" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                 
               
                <label className="input-label" for="name" >Number of offspring</label>
                    <input type="number" maxLength={10} value={formInput.noOffSpring} onChange={handleChange} id="noOffSpring" name="noOffSpring" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (SNF(%))</label>
                    <input type="number" maxLength={10} value={formInput.snf} onChange={handleChange} id="snf" name="snf" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (Fat(%))</label>
                    <input type="number" maxLength={10} value={formInput.fat} onChange={handleChange} id="fat" name="fat" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                </div>
              
                  <div>
                  <label className="input-label" for="name" >Milk composition (Lactose(%))</label>
                    <input type="number" maxLength={10} value={formInput.lactose} onChange={handleChange} id="lactose" name="lactose" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (Salt(%))</label>
                    <input type="number" maxLength={10} value={formInput.salt} onChange={handleChange} id="salt" name="salt" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                   
                    <label className="input-label" for="name" >Milk composition (Protein(%))</label>
                    <input type="number" maxLength={10} value={formInput.protein} onChange={handleChange} id="protein" name="protein" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (Water(%))</label>
                    <input type="number" maxLength={10} value={formInput.water} onChange={handleChange} id="water" name="water" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Staff in charge</label>
                    <input title="Name of staff creating this livestock profile" placeholder="e.g Mr. Ibharalu" id="staff" value={formInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    <label className="input-label" for="name" >Observation</label>
                    <input  id="observation" value={formInput.observation} onChange={handleChange} type="text" name="observation" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
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
              <div className="form-btns2" >
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
<p className="form-header" style={{marginTop:"-20px"}}>Edit lactation Details</p>

<div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-xl">
  <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
    <form >
       <div className="general-form">
                  <div>
                    <label className="input-label" htmlFor="breed" >Milk Yield</label>
                    <input type="number"  maxLength={20} required value={editformInput.milkYield} onChange={handleChange} name="milkYield" id="milkYield" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
                    
                    <label className="input-label" htmlFor="tag Id" >Tag ID</label>
                    <input  maxLength={10} required value={editformInput.tagId} onChange={handleChange} id="tagId" name="tagId" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
            
                    <label className="input-label" for="name">Delivery Date</label>
                    <input type="Date" id="deliveryDate" value={editformInput.deliveryDate} onChange={handleChange} name="deliveryDate" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                  
                   

                    <label className="input-label" for="name" >Weight</label>
                    <input title="Enter the weight of the livestock in kilograms (kg)."maxLength={10} value={editformInput.weight} onChange={handleChange} type="number" name="weight" id="weight" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                 
               
                <label className="input-label" for="name" >Number of offspring</label>
                    <input type="number" maxLength={10} value={editformInput.noOffSpring} onChange={handleChange} id="noOffSpring" name="noOffSpring" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (SNF(%))</label>
                    <input type="number" maxLength={10} value={editformInput.snf} onChange={handleChange} id="snf" name="snf" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (Fat(%))</label>
                    <input type="number" maxLength={10} value={editformInput.fat} onChange={handleChange} id="fat" name="fat" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                </div>
              
                  <div>
                  <label className="input-label" for="name" >Milk composition (Lactose(%))</label>
                    <input type="number" maxLength={10} value={editformInput.lactose} onChange={handleChange} id="lactose" name="lactose" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (Salt(%))</label>
                    <input type="number" maxLength={10} value={editformInput.salt} onChange={handleChange} id="salt" name="salt" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                   
                    <label className="input-label" for="name" >Milk composition (Protein(%))</label>
                    <input type="number" maxLength={10} value={editformInput.protein} onChange={handleChange} id="protein" name="protein" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Milk composition (Water(%))</label>
                    <input type="number" maxLength={10} value={editformInput.water} onChange={handleChange} id="water" name="water" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                    <label className="input-label" for="name" >Staff in charge</label>
                    <input title="Name of staff creating this livestock profile" placeholder="e.g Mr. Ibharalu" id="staff" value={editformInput.staff} onChange={handleChange} type="text" name="staff" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                    <label className="input-label" for="name" >Observation</label>
                    <input  id="observation" value={editformInput.observation} onChange={handleChange} type="text" name="observation" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                   
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
    <div className="form-btns2" >
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
                Lactation Details
              </h4>
            </div>
            <div class="grid grid-cols-2 gap-4 px-1 w-full">
              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Milk Yield</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.milkYield}
                </p>

              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Weight</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.weight}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Tag ID</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.tagId}
                </p>
              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Number of offspring</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.noOffSpring}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Delivery Date</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.deliveryDate}
                </p>
              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Staff in charge</p>
                <p class="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.staff}
                </p>
              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Observation</p>
                <p class="text-base font-medium text-navy-700  dark:text-green-700" style={{width:"170%", overflow:"scroll"}} >
                  {selected.observation}
                </p>
              </div>

              <div className="btn-div">
                <button className="close-btn" onClick={() => setviewLivestock(false)}>Close</button>
              </div>
            </div>
          </div>

        </div>
      }

{
        viewLivestock2 && <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
            <div class="mt-2 mb-8 w-full">
              <h4  class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                Milk Composition
              </h4>
            </div>
            <div class="grid grid-cols-2 gap-4 px-1 w-full">
              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Fat(%)</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.fat}
                </p>

              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Solid Not Fat(%)</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.snf}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Lactose(%)</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.lactose}
                </p>
              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Salt(%)</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.salt}
                </p>
              </div>

              <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Protein(%)</p>
                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                  {selected.protein}
                </p>
              </div>

              <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <p class="text-sm text-gray-600">Water(%)</p>
                <p class="text-base font-medium text-navy-700  dark:text-green-700">
                  {selected.water}
                </p>
              </div>


             
            </div>
            <div className="btn-div2">
                <button className="close-btn" onClick={() => setviewLivestock2(false)}>Close</button>
              </div>
          </div>

        </div>
      }


    </div>
  );
}
