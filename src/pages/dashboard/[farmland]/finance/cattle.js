import { userState } from "@/atom";
import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import { formatDateString } from "@/helperFunctions/formatTime";
import {
  createRecord,
  deleteRecord,
  editRecord,
  fetchAllRecords,
  viewRecord,
} from "@/helperFunctions/handleRecord";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Line, RiListView } from "react-icons/ri";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

function FinanceRecord() {
  const userData = useRecoilValue(userState);
  const [viewId, setviewId] = useState(null);
  const [deleteId, setdeleteId] = useState(null);
  const [creating, setcreating] = useState(false);
  const [financeForm, setFinanceForm] = useState(false);
  const [financeData, setFinanceData] = useState([]);
  const [financeTotal, setFinanceTotal] = useState({});
  const [financeType, setFinanceType] = useState("income");
  const [viewIncomeDetails, setviewIncomeDetails] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editId, setEditId] = useState("");
  const [editting, setEditting] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [editform, seteditform] = useState({
    desc: "",
    transactionDate: "",
    amount: null,
    paymentmethod: "",
    financeEntryId: "",
  });

  {
  }
  const [formInput, setformInput] = useState({
    financeEntryId: "",
    paymentmethod: "",
    desc: "",
    transactionDate: "",
    amount: null,
  });

  const [selected, setSelected] = useState({
    description: "",
    transactionDate: "",
    amount: "",
    paymentmethod: "",
    entryDate: "", // Default value is the current date and time
    remark: "",
    staff: "",
  });

  const incomeBtn = () => {
    setFinanceType("income");
    setFinanceForm(true);
  };

  const expenseBtn = () => {
    setFinanceType("expense");
    setFinanceForm(true);
  };

  const handleFinanceSubmit = async (e) => {
    e.preventDefault();
    setcreating(true);
    try {
      const res = await createRecord(
        userData.token,
        userData.farmland,
        "finance",
        "cattle",
        formInput,
        financeType
      );
      if (res.data) {
        setcreating(false);
        setformInput({});
        setFinanceForm(false);
        toast.success(`${financeType} sucessfully created`);
      }
    } catch (error) {
      setcreating(false);
      if (error.code === "ERR_NETWORK") {
        toast.error("Please check your internet connection!");
      }
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const fetchFinances = async () => {
    setFetching(true);
    try {
      if (userData && financeType) {
        const res = await fetchAllRecords(
          userData.token,
          userData.farmland,
          "finance",
          "cattle",
          financeType
        );
        console.log(res);
        if (res.data) {
          setFetching(false);
          console.log(res.data.message);
          const { incomeLength, expenseLength } = res.data.message;

          setFinanceTotal({ incomeLength, expenseLength });
          setFinanceData(res.data.message.allFinance.reverse());
        }
      } else {
        console.log(userData, financeType);
      }
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
    fetchFinances();
  }, [creating, editting, userData, financeType, deleteId]);

  console.log(viewId);

  async function handleViewRecord(id) {
    setviewId(id);

    try {
      const selectedRecord = await viewRecord(
        userData.token,
        userData.farmland,
        "finance",
        "cattle",
        id,
        financeType
      );
      console.log(selectedRecord);
      if (selectedRecord) {
        setviewIncomeDetails(true);
        setSelected(selectedRecord.data.message);
      }
    } catch (error) {
      setviewIncomeDetails(false);
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
    }
  }

  const handleAddExpenseClick = () => {
    setFinanceType("expense");
  };

  const handleViewIncomeClick = () => {
    setFinanceType("income");
  };

  const getActiveStyle = (section) => ({
    boxShadow: financeType === section ? "3px 3px 5px #008000" : "initial", // Set the active background color
  });

  function closeFormModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      setformInput({});

      setFinanceForm(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    seteditform((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function editBtnFn(id) {
    setEditId(id);
    seteditModal(true);
    const selectedRecord = financeData.find(
      (record) => record.financeEntryId === id
    );

    seteditform({
      desc: selectedRecord.desc,
      transactionDate: selectedRecord.transactionDate,
      amount: selectedRecord.amount,
      paymentmethod: selectedRecord.paymentmethod,
      financeEntryId: selectedRecord.financeEntryId,
    });
  }

  function closeeditModal() {
    if (confirm("Are you sure you want to close the form?") == true) {
      seteditModal(false);
    }
  }

  const handleEditRecord = async (e) => {
    setEditting(true);
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const formdata = editform;

      console.log(financeType);
      const editResponse = await editRecord(
        userData.token,
        userData.farmland,
        "finance",
        "cattle",
        editId,
        formdata,
        financeType
      );

      if (editResponse) {
        setEditting(false);
        seteditModal(false);
        seteditform({
          description: "",
          transactionDate: "",
          amount: "",
          paymentmethod: "",
          entryDate: "",
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

      if (error.code === "ERR_BAD_REQUEST") {
        toast.error(error.response.data.message);
      }
      if (error.code === "ERR_BAD_RESPONSE") {
        console.log(error);
        toast.error(error.response.data.codeName);
      }
    }
  };

  // delete record

  const handleDeleteFinance = async (id) => {
    setdeleteId(id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteRecord(
          userData.token,
          userData.farmland,
          "finance",
          "cattle",
          id,
          financeType
        );

        toast.success(response.data.message);
        setdeleteId(null);
      } catch (error) {
        setdelete(false);
        if (error.code === "ERR_NETWORK") {
          toast.error("Please check your internet connection!");
        }

        console.log(error);
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    } else {
      setdeleteId(null);
    }
  };

  console.log(fetchError);
  return (
    <div>
      <Head>
        <title>Druminant - Income/Expense (Cattle)</title>
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
      {userData && !fetchError ? (
        <div className="livestock">
          <div className="amount">
            <h1>Income/Expense (CATTLE)</h1>
            <p>Track your income and expenses</p>
          </div>

          <div className={`finance-cards `}>
            <div className="incomeCard flex" style={getActiveStyle("income")}>
              <div className=" w-full">
                <Image
                  width={100}
                  height={100}
                  src="/image/financeIncome.png"
                />
                <p className="flex items-center">
                  Income
                  {fetching ? (
                    <AiOutlineLoading3Quarters className="animate-spin ml-1" />
                  ) : (
                    <span className="ml-1">({financeTotal.incomeLength})</span>
                  )}
                </p>
                <h3>
                  N<span>{totalAmount}.00</span>
                </h3>
              </div>
              <div className="w-2/4  mr-2  flex space-x-3  items-center  mt-2">
                <button
                  className="  hidden sm:flex border-green-700 py-2 lg:px-10 px-4 bg-[#008000]  text-white    rounded-md  border-2   self-center "
                  onClick={handleViewIncomeClick}
                >
                  View
                </button>

                <RiListView
                  onClick={handleViewIncomeClick}
                  className="text-green-700 sm:hidden    text-xl border-green-600 border-2 rounded-sm"
                />

                <button
                  className="  hidden sm:flex border-green-700 py-2 lg:px-10 px-4 bg-[#008000]  text-white  rounded-md  border-2   self-center "
                  onClick={incomeBtn}
                >
                  Add
                </button>

                <IoMdAdd
                  onClick={incomeBtn}
                  className="text-green-700 sm:hidden    text-xl border-green-600 border-2 rounded-sm"
                />
              </div>
            </div>

            <div className="incomeCard flex" style={getActiveStyle("expense")}>
              <div className=" w-full">
                <Image
                  width={100}
                  height={100}
                  src="/image/financeexpense.png"
                />
                <p className="flex items-center">
                  Expense
                  {fetching ? (
                    <AiOutlineLoading3Quarters className="animate-spin ml-1" />
                  ) : (
                    <span className="ml-1">({financeTotal.expenseLength})</span>
                  )}
                </p>
                <h3>
                  N<span>{totalAmount}.00</span>
                </h3>
              </div>
              <div className="w-2/4  mr-2  flex space-x-3  items-center  mt-2">
                <button
                  className="  hidden sm:flex border-green-700 py-2 lg:px-10 px-4 bg-[#008000]  text-white    rounded-md  border-2   self-center "
                  onClick={handleAddExpenseClick}
                >
                  View
                </button>

                <RiListView
                  onClick={handleAddExpenseClick}
                  className="text-green-700 sm:hidden    text-xl border-green-600 border-2 rounded-sm"
                />

                <button
                  className="  hidden sm:flex border-green-700 py-2 lg:px-10 px-4 bg-[#008000]  text-white  rounded-md  border-2   self-center "
                  onClick={expenseBtn}
                >
                  Add
                </button>

                <IoMdAdd
                  onClick={expenseBtn}
                  className="text-green-700 sm:hidden    text-xl border-green-600 border-2 rounded-sm"
                />
              </div>
            </div>
          </div>

          {/* table */}

          {financeData.length > 0 && !editModal && !financeForm && (
            <div>
              <table className="w-full mt-5">
                <thead>
                  <tr>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      N/A
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      Id
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      description
                    </th>
                    <th
                      className=" p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      Amount (ngn)
                    </th>
                    <th
                      className=" p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      Transaction Date
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      Entry Date & Time
                    </th>
                    <th
                      className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell"
                      style={{ backgroundColor: "#005a06" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.map((row, key) => (
                    <tr
                      key={key}
                      className="bg-white md:hover:bg-emerald-50 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-10 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
                    >
                      <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                        <span
                          className="md:hidden   top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          N/A
                        </span>
                        <div style={{ fontSize: "14px" }} className="desc">
                          {key + 1}
                        </div>
                      </td>

                      <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                        <span
                          className="md:hidden   top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          id
                        </span>
                        <div style={{ fontSize: "14px" }} className="desc">
                          {row.financeEntryId}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                        <span
                          className="md:hidden   top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          Description
                        </span>
                        <div style={{ fontSize: "14px" }} className="desc">
                          {row.desc}
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between  border-green-200 items-center p-3 text-gray-800 text-center border block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-none  px-2 py-1 font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          Amount
                        </span>
                        <div
                          className="flex items-center"
                          style={{ fontSize: "14px" }}
                        >
                          {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                          <p>{row.amount}.00</p>
                        </div>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center  border-green-200 p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-none  px-1 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          Transaction Date
                        </span>
                        <span style={{ fontSize: "14px" }}>
                          {moment(row.transactionDate).format(
                            "MMMM Do, YYYY, h:mm:ss A"
                          )}
                        </span>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center  border-green-200 p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                        <span
                          className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          Entry Date & Time
                        </span>
                        <span style={{ fontSize: "14px" }}>
                          {moment(row.createdAt).format(
                            "MMMM Do, YYYY, h:mm:ss A"
                          )}
                        </span>
                      </td>
                      <td className="w-full md:w-auto flex justify-between items-center p-3  border-green-200 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                        <span
                          className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase"
                          style={{
                            backgroundColor: "#c1ffb4",
                            fontSize: "11px",
                          }}
                        >
                          Actions
                        </span>

                        <div className="">
                          <button
                            title="Edit"
                            onClick={() => editBtnFn(row.financeEntryId)}
                            className=" px-2 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md"
                          >
                            <FaRegEdit style={{ fontSize: "14px" }} />
                          </button>

                          <button
                            title="More info"
                            onClick={() => handleViewRecord(row.financeEntryId)}
                            className=" px-2 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md"
                          >
                            {viewId === row.financeEntryId ? (
                              <HiDotsHorizontal style={{ fontSize: "14px" }} />
                            ) : (
                              <MdRemoveRedEye style={{ fontSize: "14px" }} />
                            )}
                          </button>
                          <button
                            title="Delete"
                            className=" mr-0 px-2 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md"
                            onClick={() =>
                              handleDeleteFinance(row.financeEntryId)
                            }
                          >
                            {deleteId === row.financeEntryId ? (
                              <AiOutlineLoading3Quarters
                                className="animate-spin"
                                style={{ fontSize: "14px" }}
                              />
                            ) : (
                              <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {financeData.length === 0 && (
            <div className="text-center mx-0  flex-col text-black h-[100vh] flex items-center justify-center">
              <div className="flex items-center justify-center flex-col">
                Sorry no Finance Record found!
              </div>
              <div className="cursor">
                <p
                  className="px-10 py-2 cursor-pointer hover:bg-green-800 mt-5 text-white bg-[#008000] rounded-md justify-center"
                  onClick={financeType === "income" ? incomeBtn : expenseBtn}
                >
                  Create
                </p>
              </div>
            </div>
          )}

          {
            //Income form

            financeForm && (
              <div
                className="form-backdrop"
                class=" py-9 bg-[#01000D] transition duration-150 overflow-y-auto  ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                id="modal"
              >
                <p className="form-header2 first-letter:capitalize">
                  {financeType} Record Details
                </p>

                <div
                  role="alert"
                  class="container bg-white rounded mx-auto w-11/12 md:w-2/3 max-w-xl"
                >
                  <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                    <form onSubmit={handleFinanceSubmit}>
                      <div>
                        <label className="input-label" htmlFor="financeEntryId">
                          Finance Id
                        </label>
                        <input
                          title="(Brief description with maximum of 70 characters)"
                          maxLength={50}
                          placeholder="E.g. Sales of livestock"
                          value={formInput.financeEntryId}
                          onChange={handleChange}
                          name="financeEntryId"
                          type="text"
                          id="financeEntryId"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />

                        <label className="input-label" htmlFor="desc">
                          Description
                        </label>
                        <input
                          title="(Brief description with maximum of 70 characters)"
                          maxLength={50}
                          placeholder="E.g. Sales of livestock"
                          value={formInput.desc}
                          onChange={handleChange}
                          name="desc"
                          type="text"
                          id="desc"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label
                          className="input-label"
                          htmlFor="transactionDate"
                        >
                          Transaction Date
                        </label>
                        <input
                          title="Date of transaction"
                          type="datetime-local"
                          value={formInput.transactionDate}
                          onChange={handleChange}
                          name="transactionDate"
                          id="breed"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label className="input-label" htmlFor="amount">
                          Amount
                        </label>
                        <input
                          title="Amount in Naira"
                          pattern="\d{1,2}"
                          maxLength={2}
                          type="number"
                          pat
                          value={formInput.amount}
                          onChange={handleChange}
                          name="amount"
                          id="breed"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label className="input-label" htmlFor="paymentmethod">
                          Payment method
                        </label>
                        <select
                          id="name"
                          value={formInput.paymentmethod}
                          onChange={handleChange}
                          name="paymentmethod"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        >
                          <option value={""}>Select payment method</option>
                          <option>Cash</option>
                          <option>Transfer</option>
                          <option>Cheque</option>
                        </select>
                      </div>

                      {creating ? (
                        <div className="form-btns">
                          <button
                            disabled={!editting}
                            className=" bg-[#008000]  text-white px-5 py-2 rounded-md  w-full   cursor-not-allowed     flex justify-center space-x-2 items-center"
                          >
                            <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                            <p>Processing...</p>
                          </button>
                        </div>
                      ) : (
                        <>
                          {" "}
                          <div className="form-btns">
                            <button className="btn" type="submit">
                              Submit
                            </button>
                            <button className="btn2" onClick={closeFormModal}>
                              Cancel
                            </button>
                          </div>
                          <button
                            className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                            aria-label="close modal"
                            role="button"
                          >
                            <IoMdClose onClick={closeFormModal} />
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )
          }

          {viewIncomeDetails && (
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div class="mt-2 mb-8 w-full">
                  <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                    {financeType} Details
                  </h4>
                </div>
                <div class="grid grid-cols-2 gap-4 px-1 w-full">
                  <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Description</p>
                    <p
                      class="text-base font-medium text-navy-700 dark:text-green-700"
                      style={{ overflow: "auto", width: "100%" }}
                    >
                      {selected.desc}
                    </p>
                  </div>

                  <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Amount</p>
                    <p class="text-base font-medium text-navy-700 dark:text-green-700">
                      {selected.amount}
                    </p>
                  </div>

                  <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Payment Method</p>
                    <p class="text-base font-medium text-navy-700 dark:text-green-700">
                      {selected.paymentmethod}
                    </p>
                  </div>
                  {/* 
                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Entry Date & Time</p>
                  <p class="text-base font-medium text-navy-700 dark:text-green-700">
                    {selected.entryDate}
                  </p>
                </div> */}

                  <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Transaction Date</p>
                    <p class="text-base font-medium text-navy-700 dark:text-green-700">
                      {moment(selected.transactionDate).format(
                        "MMMM Do, YYYY, h:mm:ss A"
                      )}
                    </p>
                  </div>

                  <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                    <p class="text-sm text-gray-600">Staff-in-charge</p>
                    <p class="text-base font-medium text-navy-700 dark:text-green-700">
                      {selected.inCharge}
                    </p>
                  </div>

                  {/* <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                  <p class="text-sm text-gray-600">Remark</p>
                  <p
                    class="text-base font-medium text-navy-700 dark:text-green-700"
                    style={{ overflow: "auto", width: "150%" }}
                  >
                    {selected.remark}
                  </p>
                </div> */}

                  <div className="btn-div" style={{ width: "100%" }}>
                    <button
                      className="close-btn"
                      onClick={() => {
                        setviewIncomeDetails(false);
                        setviewId(null);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {
            /* Edit modal */

            editModal && (
              <div
                className="form-backdrop "
                class="  py-9 bg-[#01000D] transition duration-150 overflow-y-auto  ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                id="modal"
              >
                <p className="form-header2">Edit {financeType} Details</p>

                <div
                  role="alert"
                  class="container bg-white mx-auto w-11/12 rounded md:w-2/3 max-w-xl"
                >
                  <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                    <form onSubmit={(e) => handleEditRecord(e)}>
                      <div>
                        <label className="input-label" htmlFor="financeEntryId">
                          Finance Id
                        </label>
                        <input
                          title="Enter the breed of the livestock (e.g., Angus, Holstein) here."
                          maxLength={80}
                          value={editform.financeEntryId}
                          onChange={handleEditChange}
                          name="financeEntryId"
                          placeholder="E.g. Sales of animal"
                          type="text"
                          id="financeEntryId"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label className="input-label" htmlFor="description">
                          Description
                        </label>
                        <input
                          title="Enter the breed of the livestock (e.g., Angus, Holstein) here."
                          maxLength={80}
                          value={editform.desc}
                          onChange={handleEditChange}
                          name="desc"
                          placeholder="E.g. Sales of animal"
                          type="text"
                          id="description"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label
                          className="input-label"
                          htmlFor="transactionDate"
                        >
                          Transaction Date
                        </label>
                        <input
                          title="Enter the breed of the livestock (e.g., Angus, Holstein) here."
                          type="datetime-local"
                          value={formatDateString(editform.transactionDate)}
                          onChange={handleEditChange}
                          name="transactionDate"
                          id="breed"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label className="input-label" htmlFor="amount">
                          Amount
                        </label>
                        <input
                          title="in Naira"
                          type="number"
                          value={editform.amount}
                          onChange={handleEditChange}
                          name="amount"
                          id="breed"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        />
                        <label className="input-label" htmlFor="paymentmethod">
                          Payment method
                        </label>
                        <select
                          id="name"
                          value={editform.paymentmethod}
                          onChange={handleEditChange}
                          name="paymentmethod"
                          class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border"
                        >
                          <option value={""}>Select payment method</option>
                          <option>Cash</option>
                          <option>Transfer</option>
                          <option>Cheque</option>
                        </select>
                      </div>

                      <div className="form-btns">
                        {editting ? (
                          <div className="form-btns">
                            <button
                              disabled={!editting}
                              className=" bg-[#008000]  text-white px-5 py-2 rounded-md  w-full   cursor-not-allowed     flex justify-center space-x-2 items-center"
                            >
                              <AiOutlineLoading3Quarters className="animate-spin" />{" "}
                              <p>Processing...</p>
                            </button>
                          </div>
                        ) : (
                          <>
                            <button type="submit" className="btn">
                              Submit
                            </button>
                            <button className="btn2" onClick={closeeditModal}>
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                      <button
                        className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                        aria-label="close modal"
                        role="button"
                      >
                        <IoMdClose onClick={closeeditModal} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      ) : (
        userData &&
        fetchError === "Unauthorized" && (
          <div className="livestock text-center border-2 p-2 text-gray-800 mx-0 h-screen flex items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <p className="dashboard-mssg">
                You are not allowed to access this Farmland finance 
              </p>
              <Link href={`/dashboard/${userData.farmland}`} className="mss-login">
              Go back to dashboard
              </Link>
            </div>
          </div>
        )
      )}

      {!userData && (
        <div className="livestock">
          {" "}
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
        </div>
      )}

      <Footer />
    </div>
  );
}

export default FinanceRecord;
