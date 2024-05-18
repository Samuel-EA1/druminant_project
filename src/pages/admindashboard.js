import Link from "next/link";
import { IoPeopleOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { GiGoat } from "react-icons/gi";
import { HiCurrencyDollar } from "react-icons/hi2";
import { MdEventNote } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbCalendarClock } from "react-icons/tb";
import { PiBarnDuotone } from "react-icons/pi";
import { IoPeople } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { AiFillSetting } from "react-icons/ai";
import { IoIosHelpCircle } from "react-icons/io";


export default function Admin() {
    return <div>
        <div className="admin-header">
            <div>
            <img src="image/newlogo.png" className="main-image-laptop" />
            </div>
            <div className="right">
            <h4>Hello Admin!</h4>
            <hr className="hr-right"/>
            <Link className="link1" href={"/"}><img className="logout" src="image/logout.png" /></Link>
            
            </div>

        </div>
        <div className="mobile-header">
            <img src="image/mobilelogo.png" className="main-image" />
            <Link className="link1" href={"#"}><p className="icon1">&#9776;</p></Link>
        </div>
        <div className="hello-message">
            <p>Hello Admin!</p>
        </div>
        <div className="dashboard">
            <p>Dashboard</p>
        </div>
        <div className="general">
            <div className="mainPage">
                <div className="left-navbar">
                    <Link href={"#"} className="menu-nav2"><li><FaHome className="sym-1" /> <p>Home</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><RiDashboardFill className="sym-2"  /><p>Dashboard</p> </li></Link>
                    <Link href={"#"} className="menu-nav2"><li><GiGoat className="sym-3"  /> <p>Livestock Records</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><HiCurrencyDollar className="sym-4"  /> <p>Finance Records</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li className="check"><MdEventNote className="sym-4"  /> <p>Event Records</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><FaTasks className="sym-6"  /> <p>Scheduled Tasks</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><TbCalendarClock className="sym-7"  /> <p>Due Date Records</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><PiBarnDuotone className="sym-8"  /> <p>Quarantined Animals</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><IoPeople className="sym-9"  /> <p>Staff Information</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><TbWorldWww className="sym-10"  /> <p>Resources</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><IoIosNotifications className="sym-11"  /> <p>View Requests</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><AiFillSetting className="sym-12"  /> <p>Administration</p></li></Link>
                    <Link href={"#"} className="menu-nav2"><li><IoIosHelpCircle className="sym-13"  /> <p>Help</p></li></Link>
                </div>
            </div>
            <div className="mainPage2">
                <div>
                    <div className="right-row1">
                        <div className="box1">
                            <IoPeopleOutline className="icon111" />
                            <h2>0</h2>
                            <p>STAFF</p>
                        </div>
                        <div className="box1">
                        <img src="image/animal.png" />
                        <h2>0</h2>
                        <p>ANIMAL</p>
                        </div>
                        <div className="box1">
                        <img src="image/adminevent.png" />
                        <h2>0</h2>
                        <p>DUE DATE</p>
                        </div>
                        
                    </div>
                    <div className="right-row1">
                        <div className="box1">
                            {/* <img src="image/quarantine.png" /> */}
                            <PiBarnDuotone className="icon222"/>
                            <h2>0</h2>
                            <p> QUARANTINE</p>
                        </div>
                        <div className="box1">
                        <img src="image/income.png" />
                        <h2>0</h2>
                        <p>TOTAL INCOME</p>
                        </div>
                        <div className="box1">
                        <img src="image/expense.png" />
                        <h2>0</h2>
                        <p>TOTAL EXPENSES </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>





        {/* <div className="mainnnn">
            <div className="admin-navlinks">
                <Link href={"#"} className="menu-nav2"><li>Dashboard</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Livestock Records</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Finance Records</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Event Records</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Scheduled Tasks</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Due Date Records</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Quarantined Animals</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Staff Information</li></Link>
                <Link href={"#"} className="menu-nav2"><li>View Requests</li></Link>
            </div>
            <div className="mainpage2">
                <div className="admin-row-1">
                    <div className="img1">
                        <p>Total Staff</p>
                        <h1>0</h1>
                    </div>
                    <div className="img1">
                        <p>Total Animal</p>
                        <h1>0</h1>
                    </div>
                    <div className="img1">
                        <p>Quarantined Animal</p>
                        <h1>0</h1>
                    </div>
                </div>
                <div className="admin-row-2">
                    <div className="img1">
                        <p>Total Number of Events</p>
                        <h1>0</h1>
                    </div>
                    <div className="img1">
                        <p>Total Number of Income</p>
                        <h1>0</h1>
                    </div>
                    <div className="img1">
                        <p>Total Number of Expense</p>
                        <h1>0</h1>
                    </div>
                </div>
            </div>

        </div> */}


    </div>

}