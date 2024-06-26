import ModuleHeader from "@/components/moduleheader"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { MdRemoveRedEye } from "react-icons/md"
import { PiHouseBold } from "react-icons/pi"
import { RiDeleteBin6Line, RiListView } from "react-icons/ri"


function FinanceRecord() {
    const [incomeFormModal, setIncomeFormModal] = useState(false)
    const [expenseFormModal, setExpenseFormModal] = useState(false)
    const [incomeData, setincomeData] = useState([]);
    const [expenseData, setexpenseData] = useState([]);
    const [tableModal, setTableModal] = useState(false)
    const [tableModal2, setTableModal2] = useState(false)
    const [activeSection, setActiveSection] = useState('income');
    const [viewIncomeDetails, setviewIncomeDetails] = useState(false)
    const [viewExpenseDetails, setviewExpenseDetails] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
    const [editId, setEditId] = useState("")
    const [editId2, setEditId2] = useState("")
    const [editIncomeModal, seteditIncomeModal] = useState(false)
    const [editExpenseModal, seteditExpenseModal] = useState(false)


    const [editformIncome, seteditformIncome] = useState({
        description: "",
        transactionDate: "",
        amount: "",
        payMethod: "",
        entryDate: "", // Default value is the current date and time
        remark: "",
        staff: ""
    });


    const [editformExpense, seteditformExpense] = useState({
        description: "",
        transactionDate: "",
        amount: "",
        payMethod: "",
        entryDate: "", // Default value is the current date and time
        remark: "",
        staff: ""
    });



    const [idCounter, setIdCounter] = useState(1);







    const getCurrentDateTime = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = new Date(now - offset).toISOString().slice(0, 19).replace('T', ' ');
        return localISOTime;
    };



    const [incomeInput, setincomeInput] = useState({
        description: "",
        transactionDate: "",
        amount: "",
        payMethod: "",
        entryDate: "", // Default value is the current date and time
        remark: "",
        staff: ""
    });

    const [expenseInput, setexpenseInput] = useState({
        description: "",
        transactionDate: "",
        amount: "",
        payMethod: "",
        entryDate: "", // Default value is the current date and time
        remark: "",
        staff: ""
    });

    const [selected, setSelected] = useState({
        description: "",
        transactionDate: "",
        amount: "",
        payMethod: "",
        entryDate: "", // Default value is the current date and time
        remark: "",
        staff: ""
    })

    const [selected2, setSelected2] = useState({
        description: "",
        transactionDate: "",
        amount: "",
        payMethod: "",
        entryDate: "", // Default value is the current date and time
        remark: "",
        staff: ""
    })


    const handleAddIncomeClick = () => {
        setIncomeFormModal(true);
        setTableModal2(false)
        setTableModal(false);
        if (incomeData.length === 0) {
            setActiveSection('income');
        }

    }

    function handleViewRecord(id) {
        const selectedRecord = incomeData.filter((record) => record.id === id)
        setSelected(selectedRecord[0])
        setviewIncomeDetails(true)
    }




    function handleViewExpense(id) {
        const selectedRecord2 = expenseData.filter((record) => record.id === id)
        setSelected2(selectedRecord2[0])
        setviewExpenseDetails(true)
    }


    const handleAddExpenseClick = () => {
        setExpenseFormModal(true);
        setTableModal(false);
        setTableModal2(false);
        setActiveSection('expense'); // Set active section to expense
        if (incomeData === "") {

        }
    }

    const handleViewIncomeClick = () => {
        setTableModal(true);
        setTableModal2(false);
        setActiveSection('income'); // Set active section to income
    }

    const getActiveStyle = (section) => ({
        boxShadow: activeSection === section ? '3px 3px 5px #008000' : 'initial' // Set the active background color
    });

    const handleViewExpenseClick = () => {
        setTableModal2(true);
        setTableModal(false);
        setActiveSection('expense'); // Set active section to expense
    }
    function closeIncomeModal() {
        if (confirm("Are you sure you want to close the form?") == true) {
            setIncomeFormModal(false)
            setincomeInput({})
            setTableModal(true)

        }
    }
    function closeExpenseModal() {
        if (confirm("Are you sure you want to close the form?") == true) {
            setExpenseFormModal(false)
            setexpenseInput({})
            setTableModal2(true)

        }
    }
    //for income submit
    const handleIncomeSubmit = (e) => {
        e.preventDefault(); // Prevent form submission if needed
        const { description, transactionDate, amount, payMethod, remark, staff } = incomeInput;

        if (!description || !transactionDate || !amount || !payMethod || !remark || !staff) {
            alert('Please ensure you fill in all fields.');
            return;
        }

        const newIncomeRecord = {
            ...incomeInput,
            id: 1,
            entryDate: getCurrentDateTime() // Set the entry date to the current date and time
        };

        const newAmount = totalAmount + parseFloat(incomeInput.amount); // Calculate new total amount
        setTotalAmount(newAmount);

        setincomeData([newIncomeRecord, ...incomeData.map(record => ({
            ...record,
            id: record.id + 1
        }))]); // Update the incomeData state with the new record
        setIncomeFormModal(false);
        setTableModal(true); // Show the table page
        setincomeInput({});


    };


    //submit for expenses
    const handleExpenseSubmit = (e) => {
        e.preventDefault(); // Prevent form submission if needed
        const { description, transactionDate, amount, payMethod, remark, staff } = expenseInput;

        if (!description || !transactionDate || !amount || !payMethod || !remark || !staff) {
            alert('Please ensure you fill in all fields.');
            return;
        }

        const newExpenseRecord = {
            ...expenseInput,
            id: 1,
            entryDate: getCurrentDateTime() // Set the entry date to the current date and time
        };

        const newAmount2 = totalExpenseAmount + parseFloat(expenseInput.amount); // Calculate new total amount
        setTotalExpenseAmount(newAmount2);

        setexpenseData([newExpenseRecord, ...expenseData.map(record => ({
            ...record,
            id: record.id + 1
        }))]);

        setExpenseFormModal(false); // Close the modal
        setTableModal2(true);
        setTableModal(false)
        setexpenseInput({})
    };


    const handleChange = (e) => {
        const { name, value } = e.target
        if (incomeFormModal) {
            setincomeInput((prevData) => ({ ...prevData, [name]: value }))
        }
    }

    const handleEditIncomeChange = (e) => {
        const { name, value } = e.target;
        seteditformIncome(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleEditExpenseChange = (e) => {
        const { name, value } = e.target;
        seteditformExpense(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleChange2 = (e) => {
        const { name, value } = e.target
        if (expenseFormModal) {
            setexpenseInput((prevData) => ({ ...prevData, [name]: value }))
        }
    }


    //for delete
    const deleteRecord = (id, isIncome = true) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this record?");
        if (confirmDelete) {
            if (isIncome) {
                const deletedRecord = incomeData.find((record) => record.id === id);
                if (deletedRecord) {
                    const newTotalAmount = totalAmount - parseFloat(deletedRecord.amount);
                    setTotalAmount(newTotalAmount);
                    setincomeData(incomeData.filter((record) => record.id !== id));
                    const updatedIncomeData = incomeData.filter(record => record.id !== id);

                    const reassignedIncomeData = updatedIncomeData.map((record, index) => ({
                        ...record,
                        id: index + 1
                    }));
                    setincomeData(reassignedIncomeData);
                    setIdCounter(reassignedIncomeData.length + 1);

                }
            } else {
                const deletedRecord = expenseData.find((record) => record.id === id);
                if (deletedRecord) {
                    const newTotalExpenseAmount = totalExpenseAmount - parseFloat(deletedRecord.amount);
                    setTotalExpenseAmount(newTotalExpenseAmount);
                    setexpenseData(expenseData.filter((record) => record.id !== id));
                    const updatedExpenseData = expenseData.filter(record => record.id !== id);

                    const reassignedExpenseData = updatedExpenseData.map((record, index) => ({
                        ...record,
                        id: index + 1
                    }));
                    setexpenseData(reassignedExpenseData);
                    setIdCounter(reassignedExpenseData.length + 1);
                }
            }
        }
    };

    function editBtnFn(id) {
        setEditId(id);
        seteditIncomeModal(true);
        const selectedRecord = incomeData.find((record) => record.id === id);
        seteditformIncome({
            description: selectedRecord.description,
            transactionDate: selectedRecord.transactionDate,
            amount: selectedRecord.amount,
            payMethod: selectedRecord.payMethod,
            entryDate: selectedRecord.entryDate,
            remark: selectedRecord.remark,
            staff: selectedRecord.staff
        });
    }

    //edit for expense
    function editBtnFn2(id) {
        setEditId2(id);
        setTableModal2(false)
        seteditExpenseModal(true);
        const selectedRecord = expenseData.find((record) => record.id === id);
        seteditformExpense({
            description: selectedRecord.description,
            transactionDate: selectedRecord.transactionDate,
            amount: selectedRecord.amount,
            payMethod: selectedRecord.payMethod,
            entryDate: selectedRecord.entryDate,
            remark: selectedRecord.remark,
            staff: selectedRecord.staff
        });
    }

    function closeEditIncomeModal() {
        if (confirm("Are you sure you want to close the form?") == true) {
            seteditIncomeModal(false)
            setincomeInput({})
            setTableModal(true)
        }
    }
    function closeEditExpenseModal() {
        if (confirm("Are you sure you want to close the form?") == true) {
            seteditExpenseModal(false)
            setexpenseInput({})
            setTableModal2(true)
        }
    }

    const handleEditIncomeSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Destructure the editformInput object for validation
        const { description, transactionDate, amount, payMethod, remark, staff } = editformIncome;

        if (description == null || description == "" || transactionDate == null || transactionDate == "" || amount == null || amount == ""
            || payMethod == "" || payMethod == null || remark == "" || remark == "" || staff == null || staff == ""
        ) {
            alert('Please, ensure you fill in all fields.');
            return;
        }
        const oldRecord = incomeData.find((record) => record.id === editId);
        const oldAmount = parseFloat(oldRecord.amount);
        const newAmount = parseFloat(amount);
        const amountDifference = newAmount - oldAmount;

        // Update the total amount
        setTotalAmount(totalAmount + amountDifference);

        // Update income data with the edited form input
        const newIncomeData = incomeData.map((row) => {
            if (row.id === editId) {
                return { ...row, ...editformIncome };
            }
            return row;
        });

        // Set the updated income data
        setincomeData(newIncomeData);

        // Close the edit form modal and reset the form input
        seteditIncomeModal(false);
        setTableModal(true)
        seteditformIncome({
            description: "",
            transactionDate: "",
            amount: "",
            payMethod: "",
            entryDate: "", // Default value is the current date and time
            remark: "",
            staff: ""
        });

    };

    const handleEditExpensubmit2 = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setTableModal2(true)
        // Destructure the editformInput object for validation
        const { description, transactionDate, amount, payMethod, remark, staff } = editformExpense;

        if (description == null || description === "" || transactionDate == null || transactionDate === "" || amount == null || amount === ""
            || payMethod === "" || payMethod == null || remark === "" || staff == null || staff === ""
        ) {
            alert('Please, ensure you fill in all fields.');
            return;
        }

        const oldRecord = expenseData.find((record) => record.id === editId2);

        if (!oldRecord) {
            alert('Record not found');
            return;
        }

        const oldAmount = parseFloat(oldRecord.amount);
        const newAmount = parseFloat(amount);
        const amountDifference = newAmount - oldAmount;

        // Update income data with the edited form input
        const newExpenseData = expenseData.map((row) => {
            if (row.id === editId2) {
                return { ...row, ...editformExpense };
            }
            return row;
        });

        // Update the total amount
        setexpenseData(newExpenseData); // Update the expense data state
        setTotalExpenseAmount(prevTotal => prevTotal + amountDifference); // Update the total expense amount state
        seteditExpenseModal(false);
        setTableModal2(true)
        seteditformExpense({
            description: "",
            transactionDate: "",
            amount: "",
            payMethod: "",
            entryDate: "", // Default value is the current date and time
            remark: "",
            staff: ""
        });

    };

    return <div>
        <Head>
            <title>Druminant - Income/Expense (Cattle)</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/png" sizes="16x16" href="/image/mobilelogo.png" />
        </Head>
        <div className="livestock">
            <ModuleHeader />
            <div className="amount">
                <h1>Income/Expense (CATTLE)</h1>
                <p>Track your income and expenses</p>
            </div>

            <div className="finance-cards">
                <div className="incomeCard" style={getActiveStyle('income')}>
                    <div>
                        <Image width={100} height={100} src="/image/financeIncome.png" />
                        <p>Income (<span>{incomeData.length}</span>)</p>
                        <h3>N<span>{totalAmount}.00</span></h3>

                    </div>
                    <div>
                        <button className="finan-add-btn" onClick={handleViewIncomeClick}>View Income</button>
                        <span><button className="finan-add-btn2" onClick={handleViewIncomeClick}><RiListView /></button></span>

                        <button className="finan-add-btn" onClick={handleAddIncomeClick}>Add Income</button>
                        <span><button className="finan-add-btn2" onClick={handleAddIncomeClick}><IoMdAdd /></button></span>
                    </div>
                </div>

                <div className="incomeCard" style={getActiveStyle('expense')}>
                    <div>
                        <Image width={100} height={100} src="/image/financeExpense.png" />
                        <p>Expense (<span>{expenseData.length}</span>)</p>
                        <h3>N<span>{totalExpenseAmount}.00</span></h3>
                    </div>
                    <div>
                        <button className="finan-add-btn" onClick={handleViewExpenseClick}>View Expense</button>
                        <span><button className="finan-add-btn2" onClick={handleViewExpenseClick}><RiListView /></button></span>
                        <button className="finan-add-btn" onClick={handleAddExpenseClick}>Add Expense</button>
                        <span><button className="finan-add-btn2" onClick={handleAddExpenseClick}><IoMdAdd /></button></span>
                    </div>
                </div>
            </div>


            {/* income table */}

            {
                tableModal && <div>
                    <table className="w-full mt-5" >
                        <thead>
                            <tr>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    id
                                </th>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    description
                                </th>
                                <th className=" p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Amount (ngn)
                                </th>
                                <th className=" p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Transaction Date
                                </th>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Entry Date & Time
                                </th>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {incomeData.map((row, key) => (
                                <tr
                                    key={key}
                                    className="bg-white md:hover:bg-emerald-50 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-10 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
                                >
                                    <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                                        <span className="md:hidden   top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            id
                                        </span>
                                        <div style={{ fontSize: "14px" }} className="desc">
                                            {row.id}
                                        </div>

                                    </td>
                                    <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-center border border-b   md:table-cell relative md:static">
                                        <span className="md:hidden   top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Description
                                        </span>
                                        <div style={{ fontSize: "14px" }} className="desc">
                                            {row.description}
                                        </div>

                                    </td>
                                    <td className="w-full md:w-auto flex justify-between  border-green-200 items-center p-3 text-gray-800 text-center border block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1 font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Amount
                                        </span>
                                        <div className="flex items-center" style={{ fontSize: "14px" }}>

                                            {/* <HiHashtag className="text-xs font-extrabold text-black" /> */}
                                            <p>{row.amount}.00</p>
                                        </div>
                                    </td>
                                    <td className="w-full md:w-auto flex justify-between items-center  border-green-200 p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Transaction Date
                                        </span>
                                        <span style={{ fontSize: "14px" }}>
                                            {row.transactionDate}
                                        </span>

                                    </td>
                                    <td className="w-full md:w-auto flex justify-between items-center  border-green-200 p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Entry Date & Time
                                        </span>
                                        <span style={{ fontSize: "14px" }}>
                                            {row.entryDate}
                                        </span>
                                    </td>
                                    <td className="w-full md:w-auto flex justify-between items-center p-3  border-green-200 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Actions
                                        </span>


                                        <div className="">

                                            <button title="Edit" onClick={() => editBtnFn(row.id)} className=" px-2 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md">

                                                <FaRegEdit style={{ fontSize: "14px" }} />
                                            </button>



                                            <button title="More info" onClick={() => handleViewRecord(row.id)} className=" px-2 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md">
                                                <MdRemoveRedEye style={{ fontSize: "14px" }} />
                                            </button>

                                            <button title="Delete" className=" mr-0 px-2 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md" onClick={() => deleteRecord(row.id, true)} >

                                                <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                                            </button>

                                        </div>


                                    </td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                </div>
            }

            {/* Expense table */}

            {
                tableModal2 && <div>
                    <table className="w-full mt-5">
                        <thead>
                            <tr>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    id
                                </th>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    description
                                </th>
                                <th className=" p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Amount (ngn)
                                </th>
                                <th className=" p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Transaction Date
                                </th>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Entry Date & Time
                                </th>
                                <th className="p-3 pt-2 pb-2 font-bold uppercase text-white border border-gray-300 hidden md:table-cell" style={{ backgroundColor: '#005a06' }}>
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {expenseData.map((row2, key) => (
                                <tr
                                    key={key}
                                    className="bg-white md:hover:bg-emerald-50 flex md:table-row flex-row md:flex-row flex-wrap md:flex-no-wrap mb-10 md:mb-0 shadow-sm shadow-gray-800 md:shadow-none"
                                >
                                    <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-left border border-b text-center block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            id
                                        </span >
                                        <div style={{ fontSize: "14px" }} className="desc">
                                            {row2.id}
                                        </div>
                                    </td>
                                    <td className="w-full md:w-auto flex justify-between border-green-200 items-center p-3 text-gray-800 text-left border border-b text-center block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Description
                                        </span >
                                        <div style={{ fontSize: "14px" }} className="desc">
                                            {row2.description}
                                        </div>
                                    </td>
                                    <td className="w-full md:w-auto flex justify-between  border-green-200 items-center p-3 text-gray-800 text-center border block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Amount
                                        </span>
                                        <div className="flex items-center" style={{ color: "red", fontSize: "14px" }}>
                                            <p>-{row2.amount}.00</p>
                                        </div>
                                    </td>
                                    <td className="w-full md:w-auto flex justify-between items-center  border-green-200 p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Transaction Date
                                        </span>
                                        <span style={{ fontSize: "14px" }}>
                                            {row2.transactionDate}
                                        </span>

                                    </td>
                                    <td className="w-full md:w-auto flex justify-between items-center  border-green-200 p-3 text-gray-800 text-center border border-b text-center block md:table-cell relative md:static">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Entry Date & Time
                                        </span>
                                        <span style={{ fontSize: "14px" }}>
                                            {row2.entryDate}
                                        </span>
                                    </td>
                                    <td className="w-full md:w-auto flex justify-between items-center p-3  border-green-200 text-gray-800  border border-b text-center blockryur md:table-cell relative md:static ">
                                        <span className="md:hidden  top-0 left-0 rounded-none  px-2 py-1  font-bold uppercase" style={{ backgroundColor: "#c1ffb4", fontSize: "11px" }}>
                                            Actions
                                        </span>


                                        <div className="">
                                            <button title="Edit" onClick={() => editBtnFn2(row2.id)} className=" px-2 py-1 hover:bg-blue-600 text-white bg-blue-500 rounded-md">

                                                <FaRegEdit style={{ fontSize: "14px" }} />
                                            </button>

                                            <button title="More info" onClick={() => handleViewExpense(row2.id)} className=" px-2 py-1 ml-2   hover:bg-green-600 text-white bg-green-500 rounded-md">
                                                <MdRemoveRedEye style={{ fontSize: "14px" }} />
                                            </button>

                                            <button title="Delete" className=" mr-0 px-2 py-1 ml-2   hover:bg-red-600 text-white bg-red-500 rounded-md" onClick={() => deleteRecord(row2.id, false)} >

                                                <RiDeleteBin6Line style={{ fontSize: "14px" }} />
                                            </button>

                                        </div>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {//Income form

                incomeFormModal &&
                <div className="form-backdrop" class=" py-9 bg-[#01000D] transition duration-150 overflow-y-auto  ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <p className="form-header2">Income Record Details</p>

                    <div role="alert" class="container bg-white rounded mx-auto w-11/12 md:w-2/3 max-w-xl" >
                        <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                            <form onSubmit={handleIncomeSubmit}>

                                <div>
                                    <label className="input-label" htmlFor="description" >Description</label>
                                    <input title="(Brief description with maximum of 70 characters)" maxLength={50} placeholder="E.g. Sales of livestock" value={incomeInput.description} onChange={handleChange} name="description" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="transactionDate" >Transaction Date</label>
                                    <input title="Date of transaction" type="date" value={incomeInput.transactionDate} onChange={handleChange} name="transactionDate" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="amount" >Amount</label>
                                    <input title="Amount in Naira" pattern="\d{1,2}" maxLength={2} type="number" pat value={incomeInput.amount} onChange={handleChange} name="amount" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="payMethod" >Payment method</label>
                                    <select id="name" value={incomeInput.payMethod} onChange={handleChange} name="payMethod" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" >
                                        <option value={""}>Select payment method</option>
                                        <option>Cash</option>
                                        <option>Transfer</option>
                                        <option>Cheque</option>
                                    </select>
                                    <label className="input-label" htmlFor="remark">Remark</label>
                                    <input placeholder="Brief remark" title="Log additional information into this record" maxLength={100} value={incomeInput.remark} onChange={handleChange} name="remark" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="staff" >Staff-in-charge of entry</label>
                                    <input value={incomeInput.staff} onChange={handleChange} placeholder="Enter your name" maxLength={50} name="staff" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                                </div>


                                <div className="form-btns" >
                                    <button className="btn" type="submit" >Submit</button>
                                    <button className="btn2" onClick={closeIncomeModal} >Cancel</button>
                                </div>
                                <button className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">

                                    <IoMdClose onClick={closeIncomeModal} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

            }

            {// expense form

                expenseFormModal &&
                <div className="form-backdrop" class=" py-9 bg-[#01000D] transition duration-150 overflow-y-auto  ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <p className="form-header2">Expense Record Details</p>

                    <div role="alert" class="container rounded bg-white mx-auto w-11/12 md:w-2/3 max-w-xl">
                        <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                            <form onSubmit={handleExpenseSubmit}>

                                <div>
                                    <label className="input-label" htmlFor="description" >Description</label>
                                    <input title="(Brief description with maximum of 70 characters)" maxLength={50} placeholder="E.g. Vaccination" value={expenseInput.description} onChange={handleChange2} name="description" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="transactionDate" >Transaction Date</label>
                                    <input title="Date of transaction" maxLength={20} type="date" value={expenseInput.transactionDate} onChange={handleChange2} name="transactionDate" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="amount" >Amount</label>
                                    <input title="Amount in Naira" placeholder="Amount in Naira" maxLength={5} type="number" value={expenseInput.amount} onChange={handleChange2} name="amount" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="payMethod" >Payment method</label>
                                    <select id="name" value={expenseInput.payMethod} onChange={handleChange2} name="payMethod" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" >
                                        <option value={""}>Select payment method</option>
                                        <option>Cash</option>
                                        <option>Transfer</option>
                                        <option>Cheque</option>
                                    </select>
                                    <label className="input-label" htmlFor="remark">Remark</label>
                                    <input title="Log additional information into this record" maxLength={100} value={expenseInput.remark} onChange={handleChange2} name="remark" placeholder="Brief remark" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="staff" >Staff-in-charge of entry</label>
                                    <input title="Enter your name" value={expenseInput.staff} onChange={handleChange2} name="staff" placeholder="Enter your name" maxLength={50} type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                                </div>


                                <div className="form-btns" >
                                    <button className="btn" type="submit" >Submit</button>
                                    <button className="btn2" onClick={closeExpenseModal} >Cancel</button>
                                </div>
                                <button className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">

                                    <IoMdClose onClick={closeExpenseModal} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            }

            {
                viewIncomeDetails && <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                        <div class="mt-2 mb-8 w-full">
                            <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                                Income Details
                            </h4>
                        </div>
                        <div class="grid grid-cols-2 gap-4 px-1 w-full">
                            <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Description</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700" style={{ overflow: "auto", width: "100%" }}>
                                    {selected.description}
                                </p>

                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Amount</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected.amount}.00
                                </p>
                            </div>

                            <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Payment Method</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected.payMethod}
                                </p>
                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Entry Date & Time</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected.entryDate}
                                </p>
                            </div>

                            <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Transaction Date</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected.transactionDate}
                                </p>
                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Staff-in-charge</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected.staff}
                                </p>
                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Remark</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700" style={{ overflow: "auto", width: "150%" }}>
                                    {selected.remark}
                                </p>
                            </div>


                            <div className="btn-div" style={{ width: "100%" }}>
                                <button className="close-btn" onClick={() => setviewIncomeDetails(false)}>Close</button>
                            </div>
                        </div>
                    </div>

                </div>
            }

            {
                viewExpenseDetails && <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div class="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                        <div class="mt-2 mb-8 w-full">
                            <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-green-700">
                                Expense Details
                            </h4>
                        </div>
                        <div class="grid grid-cols-2 gap-4 px-1 w-full">
                            <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Description</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700" style={{ overflow: "auto", width: "100%" }}>
                                    {selected2.description}
                                </p>

                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Amount</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected2.amount}.00
                                </p>
                            </div>

                            <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Payment Method</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected2.payMethod}
                                </p>
                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Entry Date & Time</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected2.entryDate}
                                </p>
                            </div>

                            <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Transaction Date</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected2.transactionDate}
                                </p>
                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Staff-in-charge</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700">
                                    {selected2.staff}
                                </p>
                            </div>

                            <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p class="text-sm text-gray-600">Remark</p>
                                <p class="text-base font-medium text-navy-700 dark:text-green-700" style={{ overflow: "auto", width: "150%" }}>
                                    {selected2.remark}
                                </p>
                            </div>


                            <div className="btn-div" style={{ width: "100%" }}>
                                <button className="close-btn" onClick={() => setviewExpenseDetails(false)}>Close</button>
                            </div>
                        </div>
                    </div>

                </div>
            }


            {/* Edit income */

                editIncomeModal &&
                <div className="form-backdrop" class="  py-9 bg-[#01000D] transition duration-150 overflow-y-auto  ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <p className="form-header2">Edit Income Details</p>

                    <div role="alert" class="container bg-white mx-auto w-11/12 rounded md:w-2/3 max-w-xl">
                        <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700">
                            <form onSubmit={handleIncomeSubmit}>

                                <div>
                                    <label className="input-label" htmlFor="description" >Description</label>
                                    <input title="Enter the breed of the livestock (e.g., Angus, Holstein) here." maxLength={80} value={editformIncome.description} onChange={handleEditIncomeChange} name="description" placeholder="E.g. Sales of animal" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="transactionDate" >Transaction Date</label>
                                    <input title="Enter the breed of the livestock (e.g., Angus, Holstein) here." type="date" value={editformIncome.transactionDate} onChange={handleEditIncomeChange} name="transactionDate" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="amount" >Amount</label>
                                    <input title="in Naira" type="number" value={editformIncome.amount} onChange={handleEditIncomeChange} name="amount" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="payMethod" >Payment method</label>
                                    <select id="name" value={editformIncome.payMethod} onChange={handleEditIncomeChange} name="payMethod" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" >
                                        <option value={""}>Select payment method</option>
                                        <option>Cash</option>
                                        <option>Transfer</option>
                                        <option>Cheque</option>
                                    </select>
                                    <label className="input-label" htmlFor="remark">Remark</label>
                                    <input value={editformIncome.remark} onChange={handleEditIncomeChange} name="remark" placeholder="give additional information here." type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="staff" >Staff-in-charge of entry</label>
                                    <input value={editformIncome.staff} onChange={handleEditIncomeChange} name="staff" placeholder="enter your name" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                                </div>


                                <div className="form-btns" >
                                    <button className="btn" onClick={(e) => handleEditIncomeSubmit(e, editId)}>Submit</button>
                                    <button className="btn2" onClick={closeEditIncomeModal} >Cancel</button>
                                </div>
                                <button className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">

                                    <IoMdClose onClick={closeEditIncomeModal} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

            }


            {/* Edit expense */

                editExpenseModal &&
                <div className="form-backdrop" class="  py-9 bg-[#01000D] transition duration-150 overflow-y-auto  ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                    <p className="form-header2">Edit Expense Details</p>

                    <div role="alert" class="container bg-white  mx-auto w-11/12 rounded md:w-2/3 max-w-xl">
                        <div class="w-[auto] relative mt-4 py-8 px-5 md:px-10  shadow-md rounded border border-green-700" >
                            <form onSubmit={handleEditExpensubmit2} >

                                <div>
                                    <label className="input-label" htmlFor="description" >Description</label>
                                    <input title="Enter the breed of the livestock (e.g., Angus, Holstein) here." value={editformExpense.description} onChange={handleEditExpenseChange} name="description" placeholder="E.g. Sales of animal" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="transactionDate" >Transaction Date</label>
                                    <input title="Enter the breed of the livestock (e.g., Angus, Holstein) here." type="date" value={editformExpense.transactionDate} onChange={handleEditExpenseChange} name="transactionDate" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="amount" >Amount</label>
                                    <input title="in Naira" type="number" value={editformExpense.amount} maxLength={2} onChange={handleEditExpenseChange} name="amount" id="breed" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="payMethod" >Payment method</label>
                                    <select id="name" value={editformExpense.payMethod} onChange={handleEditExpenseChange} name="payMethod" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" >
                                        <option value={""}>Select payment method</option>
                                        <option>Cash</option>
                                        <option>Transfer</option>
                                        <option>Cheque</option>
                                    </select>
                                    <label className="input-label" htmlFor="remark">Remark</label>
                                    <input value={editformExpense.remark} onChange={handleEditExpenseChange} name="remark" placeholder="give additional information here." type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />
                                    <label className="input-label" htmlFor="staff" >Staff-in-charge of entry</label>
                                    <input value={editformExpense.staff} onChange={handleEditExpenseChange} name="staff" placeholder="enter your name" type="text" id="description" class="mb-5 mt-2 text-gray-800 focus:outline-none focus:border focus:border-gray-500 font-normal w-full h-10 flex items-center pl-1 text-sm border-gray-400 rounded border" />

                                </div>


                                <div className="form-btns" >
                                    <button className="btn" onClick={(e) => handleEditExpensubmit2(e, editId2)}>Submit</button>
                                    <button className="btn2" onClick={closeEditExpenseModal} >Cancel</button>
                                </div>
                                <button className="cursor-pointer text-xl absolute top-0 right-0 mt-4 mr-5 text-gray-700 hover:text-gray-400 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" aria-label="close modal" role="button">

                                    <IoMdClose onClick={closeEditExpenseModal} />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

            }


        </div>
    </div>
}



export default FinanceRecord