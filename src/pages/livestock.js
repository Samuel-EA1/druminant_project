import ModuleHeader from "@/components/moduleheader";
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
} from "@nextui-org/react";
import React from "react";
import { FaEdit, FaEye, FaSearch, FaTag } from "react-icons/fa";
import { HiAtSymbol, HiHashtag, HiTag } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
// import 'react-smart-data-table/dist/react-smart-data-table.css';

export default function Livestock() {
  const LivestockData = [
    { tagId: "BisitGoat123", eventType: "Bought", eventDate: "Apr 20th 2024" },
    {
      tagId: "HerdSheep456",
      eventType: "Vaccinated",
      eventDate: "May 5th 2024",
    },
    { tagId: "FlockSheep789", eventType: "Sold", eventDate: "Jun 10th 2024" },
    { tagId: "RanchCow101", eventType: "Bought", eventDate: "Mar 15th 2024" },
    {
      tagId: "StableHorse112",
      eventType: "Checked",
      eventDate: "Apr 1st 2024",
    },
    { tagId: "PastureGoat131", eventType: "Sold", eventDate: "Jul 23rd 2024" },
    { tagId: "FarmPig415", eventType: "Vaccinated", eventDate: "Aug 9th 2024" },
    { tagId: "BarnCow223", eventType: "Bought", eventDate: "Feb 18th 2024" },
    {
      tagId: "MeadowHorse333",
      eventType: "Checked",
      eventDate: "Sep 30th 2024",
    },
    { tagId: "HerdSheep909", eventType: "Sold", eventDate: "Oct 12th 2024" },
  ];

  return (
    <div>
      {/* 
        <div className="module-content">
                <h1>Livestock Records</h1>
                <div className="search">
                    <p> + New Record</p>
                    <div className="searc-bar">
                    <input type="search"/>
                    <FaSearch className="search-icon" />
                    </div>
                    
                </div>
        </div> */}
      {/* <Demo/> */}
      {/* 
        <SmartDataTable
    data={testData}
    name="test-table"
    className="ui compact selectable table"
    sortable
  /> */}
      <ModuleHeader />
      <table className="w-full mt-10">
        <thead>
          <tr>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden md:table-cell">
              Tag ID
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden md:table-cell">
              Event Type
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden md:table-cell">
              Event Date
            </th>
            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {LivestockData.map((row, key) => (
            <tr
              key={key}
              className="bg-white md:hover:bg-gray-100 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-10 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
            >
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b block md:table-cell relative md:static">
                <span className="md:hidden  top-0 left-0 rounded-md bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Tag ID
                </span>
                <div className="flex items-center">
                  {" "}
                  <HiHashtag className="text-xs font-extrabold text-black" />
                  <p>{row.tagId}</p>
                </div>{" "}
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                <span className="md:hidden  top-0 left-0 rounded-md bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Event Type
                </span>
                {row.eventType}
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                <span className="md:hidden  top-0 left-0 rounded-md bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Event Date
                </span>
                <span className="rounded bg-green-400  py-1 px-3 text-xs font-bold">
                  {row.eventDate}
                </span>
              </td>
              <td className="w-full md:w-auto flex justify-between items-center p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                <span className="md:hidden  top-0 left-0 rounded-md bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Actions
                </span>
                <button className=" px-3 py-1  hover:bg-blue-600 text-white bg-blue-500 rounded-md">
                  Edit
                </button>

                <button className=" px-3 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
