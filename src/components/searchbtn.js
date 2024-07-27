import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function AddSearchComponent({
  query,
  handleSearchChange,
  handleSearch,
  addProfile,
  profile = "",
  showbtn = true,
}) {
  return (
    <div className="flex items-center  space-x-5 mt-3 ">
      {showbtn && (
        <div
          className="text-white w-fit cursor-pointer rounded-md bg-[#008000] flex items-center p-2 space-x-2 justify-center"
          onClick={addProfile}
        >
          <div >
            {" "}
            <IoMdAdd />
          </div>
          <p className="mr-2">Add {profile} {/*  */}</p>
        </div>
      )}

      {/* search */}
      <form onSubmit={handleSearch}>
        <div className={`relative w-36 sm:w-40 md:w-full ${!showbtn && "  max-sm:w-full border-2"} `}>
          <div className="flex items-center max-w-md mx-auto bg-white rounded-lg">
            <div className="w-full">
              <input
 
                className= {`w-full px-4 py-1 text-gray-800 border-2 border-r-0 h-10 focus:outline-none active:outline-none" ${
                  query.length > 0
                    ? "border-[#008000] "
                    : "border-gray-500"
                }`}
                placeholder="tag id"
                value={query}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <button
                onClick={handleSearch}
                type="submit"
                className={`flex items-center justify-center w-12 h-10 text-white rounded-r-lg ${
                  query.length > 0
                    ? "bg-[#008000] "
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                disabled={query.length === 0}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
