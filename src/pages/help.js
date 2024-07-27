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
         <h1 className=" help">Help Center</h1>
          <p className=" text-justify text-md mb-5 mt-4  text-vnet-blue text-white w-11/12 mx-auto ">
            D&apos;Ruminant livestock management system&apos;s help page
            provides detailed summaries for essential modules. Each summary
            offers clear instructions on accessing, recording, and managing
            data, ensuring you can effectively utilize this platform for
            streamlined and efficient livestock management.
          </p>
          <ul className="flex flex-col">
            {[
              {
                question: "Sign Up",
                answer:
                  "The sign up enables you to have access to create an account with D'Ruminant Livestock Management System. To sign up, please follow these steps: Navigate to the home page and click on the 'Launch App' button, which will direct you to the login page. On the login page, click on the 'Sign Up' link located below the login form. This will take you to the sign-up page, where you will need to enter a unique username without spaces, a unique email address that has not been used previously, a strong password with a minimum of six characters, the name of the farmland you work on (ensure that the farmland name exists), and select your role. For a successful sign-up, ensure that the username and email address are unique, the password meets the required strength and length, and the farmland name is valid. By adhering to these guidelines, you will be able to create an account and gain access to D'Ruminant Livestock Management System.",
              },
              {
                question: "Log In",
                answer:
                  "To access the dashboard, you must log in with your registered account. First, ensure you have already created an account. Then, navigate to the home page and click on the 'Launch App' button. This will direct you to the login page, which contains the login form. Enter your registered username and password in the appropriate fields and click on the 'Login' button. If you have forgotten your password, click on the 'Forgot Password' link. You will be prompted to enter your email address. After submitting your email address, wait for an email from us. Upon receiving the email, open it and click on the 'Reset Password' link, which will direct you to the reset password page. On this page, enter your new password, confirm it, and click on the 'Reset Password' button. You can then log in with your original username and new password.",
              },
              {
                question: "Livestock Profile Module",
                answer:
                  " To keep records of your farm animals, navigate to the Livestock Profile Management section on the dashboard. After clicking on it, select the livestock you want to work on. This will direct you to the main page for the selected livestock. To add a new livestock profile, click on the 'Add Profile' button and fill in the form correctly. Please note that all fields, except for 'Remark' are required for successful submission. The table will display and keep all the records you have entered. You can manipulate these records by editing, deleting, or quarantining them. However, it is important to note that only the admin and the creator of the record have the permissions to manipulate it. To understand the function of each icon, hover over them if you are using a desktop or laptop computer. Additionally, for quick access, you can use the search bar to find a record using its unique tag id.",
              },
              {
                question: "Income/Expense Module",
                answer:
                  "To record and maintain livestock-related financial records, navigate to the dashboard and select 'Income/Expense'. Choose the livestock to which the income or expense relates. The page will display income cards on the left and expense cards on the right. These cards show the total number of records and the total amount for both income and expenses, updating each time a new record is added or an existing record is edited. To add a new record, click on the 'Add' button and complete the form that appears. You can view either the income table or the expense table by clicking the corresponding 'View' button. Please note that only the admin and the creator of the record have the permissions to manipulate it.",
              },
              {
                question: "Event Tracker Module",
                answer:
                  "To keep and monitor events in your livestock, navigate to the 'Event Tracker' on the dashboard. Select the livestock you want to monitor, which will direct you to the main page for the selected livestock. To add a new event, click on the 'Add Record' button and fill in the form correctly. Please note that all fields, except for 'Remark' are required for successful submission. The table will display and keep all the records you have entered. You can manipulate these records by editing or deleting them. However, it is important to note that only the admin and the creator of the record have the permissions to manipulate it. To understand the function of each icon, hover over them if you are using a desktop or laptop computer. Additionally, for quick access, you can use the search bar to find a record using its tag ID.",
              },
              {
                question: "Pregnancy Checker Module",
                answer:
                  "To monitor and record the expected delivery dates in your livestock, select 'Pregnancy Tracker' on the dashboard. Then, choose the livestock you want to track, which will direct you to the main page. To add a new record, click on the 'Add Record' button and completely and correctly fill in the form. The page also contains a table displaying all the records that have been entered, including the approximate delivery date, which is calculated manually based on the gestation period entered. You can manipulate these records by editing or deleting them. However, it is important to note that only the admin and the creator of the record have the permissions to manipulate it. To understand the function of each icon, hover over them if you are using a desktop or laptop computer. Additionally, for quick access, you can use the search bar to find a record using its unique tag ID.",
              },
              {
                question: "Lactation Module",
                answer:
                  "To record and monitor parameters such as milk yield and milk composition, navigate to the dashboard and click on 'Lactation'. Select the livestock you want to monitor, which will direct you to the main page for the selected livestock. To add a new record, click on the Add Record button and fill in the form correctly. The table will display and keep all the records you have entered. You can manipulate these records by editing or deleting them. However, it is important to note that only the admin and the creator of the record have the permissions to manipulate it. To understand the function of each icon, hover over them if you are using a desktop or laptop computer. Additionally, for quick access, you can use the search bar to find a record using its tag ID.",
              },
              {
                question: "Quarantine Module",
                answer:
                  "To view quarantined profiles, head to the dashboard and select 'Quarantine'. Then, select the livestock you want to view, which will direct you to the main page for the selected livestock. This page contains the profiles that have been quarantined from the livestock profile page. On this page, you can either view the details of a quarantined profile or release a quarantined profile, which will then return it to the livestock profile. Additionally, for quick access, you can use the search bar to find a record using its tag ID.",
              },
              {
                question: "Profile",
                answer:
                  "To view or update your profile, navigate to the navbar and select 'Profile', which will take you to the profile page. Alternatively, you can access the profile page by heading to the footer and clicking on 'Profile'. To update your profile, click on 'Update Profile', fill in the form that appears correctly, and save the changes.",
              },
              {
                question: "Requests",
                answer:
                  "As an admin, you have the ability to view individuals or workers requesting to join your farmland. You can choose to accept or decline these requests. The Requests section is located on the navbar. Upon accepting a request, the individual is automatically added to your staff list and gains access to your farmland dashboard, enabling them to view existing records and add new ones. For security and integrity purposes, their permissions are restricted to manipulating only the records they have created.",
              },
              {
                question: "Staff",
                answer:
                  "As an admin, you can also see all the people whose requests you have accepted and who have become your staff. You have the authority to dismiss any staff member. To view the staff list, navigate to the navbar and click on 'Staff'",
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
