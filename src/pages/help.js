import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdAdd, MdRemoveRedEye } from "react-icons/md";
import { PiHouseBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Help() {
  const [openTab, setOpenTab] = useState(null);

  const handleClick = (tabIndex) => {
    setOpenTab(openTab === tabIndex ? null : tabIndex);
  };

  const handleToggle = (tabIndex) => ({
    maxHeight: openTab === tabIndex ? "1000px" : "0",
  });

  const handleRotate = (tabIndex) => (openTab === tabIndex ? "rotate-180" : "");

  return (
    <div className="bg-[#01000D] dashboard-main ">
      <ModuleHeader />

      <div className="flex p-2 justify-center  items-start my-2   md:mt-20">
        <div className="w-full sm:w-10/12  my-1 md:max-w-2xl">
         <h1 className=" help">Help</h1>
          <p className=" text-justify text-md px-1 text-vnet-blue text-white w-11/12 mx-auto  mb-2">
            D&apos;Ruminant livestock management system&apos;s help page
            provides detailed summaries for essential modules. Each summary
            offers clear instructions on accessing, recording, and managing
            data, ensuring users can effectively utilize our platform for
            streamlined and efficient livestock management.
          </p>
          <ul className="flex flex-col">
            {[
              {
                question: "Livestock Profile Module",
                answer:
                  " The Livestock Profile module helps farmers manage detailed records for each animal in their herd. Accessible on the dashboard after login or sign-up, users can click on the module to enter the page. To add a profile, click the Add Profile button, complete the form, and save it. The livestock table displays all profiles with headers and includes action buttons for editing, deleting, viewing details, and quarantining records. Each button is represented by an icon with a hover-over title for clarification.",
              },
              {
                question: "Income/Expense Module",
                answer:
                  "The income/expense module helps farmers manage detailed records of livestock-related income and expenses. Accessible from the dashboard upon login or sign-up, the module appears after logging in. Users can select the Income and Expense option and choose the relevant livestock. The page has two sections: Income on the left and Expense on the right. To add entries, click Add Income or Add Expense, complete the form, and submit it. View records by clicking View Income or View Expense. The actions column includes icons for editing, deleting, and viewing records, with hover-over titles for clarification.",
              },
              {
                question: "Event Tracker Module",
                answer:
                  "The Event Tracker module helps livestock farmers keep track of events throughout their livestock's lifetime. Accessible from the dashboard, users can enter the event tracking page by clicking on the Event Tracker module. After selecting the livestock, click the Add Event button to open a new event form, fill it in, and submit it. The table lists all event records with headers for Table ID, Tag ID, Event Type, Event Date, Entry Date, and Actions. The actions column includes icons for editing, deleting, and viewing records. Each icon has a hover-over title for clarification.",
              },
              {
                question: "Pregnancy Checker Module",
                answer:
                  "The Pregnant Checker module helps livestock farmers monitor due dates for delivery by automatically calculating a due date based on the breeding date entered by the farmer. Accessible from the dashboard, users can select the Pregnant Checker module and choose the livestock they want to monitor. o add a new due date record, click the Add Record button on the pregnancy checker page, fill out the form accurately, and submit it. The table lists all due date records with headers for Table ID, Tag ID, Gestation Period, Breeding Date, Expected Delivery Date, and Actions. The actions column includes icons for editing, deleting, and viewing records. Each icon has a hover-over title for clarification.",
              },
              {
                question: "Lactation Tracking Module",
                answer:
                  "The Lactation Tracking module helps livestock farmers monitor parameters such as milk yield and milk composition. Accessible from the dashboard, users can click on the Lactation Tracking module and select the livestock they want to track. To add a new lactation record, click the Add Record button on the lactation tracking page, complete the form accurately, and submit it. The table lists all lactation records with headers for Table ID, Milk Yield, Tag ID, Delivery Date, Weight, and Actions. The actions column includes icons for editing, deleting, viewing records, and viewing milk composition details. Each icon has a hover-over title for clarification.",
              },
              {
                question: "Quarantine Module",
                answer:
                  "The Quarantine module helps farmers manage quarantined livestock profiles, providing visibility and control over animals in quarantine. Accessible from the dashboard, users can select the Quarantine module and choose the livestock to check quarantined profiles. The module displays a table of records for livestock profiles moved from the Livestock Profile module to the Quarantine module. The table headers include Table ID, Tag ID, Quarantine Date, Release Date, and Actions. The actions column includes icons for viewing details of the selected quarantined record and releasing the quarantined livestock profile back to the Livestock Profile module. Each icon has a hover-over title for clarification.",
              },
            ].map((item, index) => (
              <li key={index} className="bg-white my-2 shadow-neutral-50 rounded w-11/12 mx-auto" >
                <h2
                  onClick={() => handleClick(index)}
                  className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer"
                >
                  <span>{item.question}</span>
                  <svg
                    className={`fill-current text-green-700 h-6 w-6 transform transition-transform duration-500 ${handleRotate(
                      index
                    )}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                  </svg>
                </h2>
                <div
                  style={handleToggle(index)}
                  className="border-l-2 border-green-600 overflow-hidden max-h-0 duration-500 transition-all"
                >
                  <p className="p-3 bg-[#f5fff3]  text-gray-900">{item.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className=" mt-44 ">
        <Footer />
      </div>
    </div>
  );
}
