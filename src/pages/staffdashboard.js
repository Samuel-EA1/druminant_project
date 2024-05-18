// import Header2 from "@/components/header2";
import Link from "next/link";
import { useState } from "react";

export default function Staff() {
    const [hamburgerState,setHamburgerState] = useState(false)


    function showHamburgerContent(){
        setHamburgerState(!hamburgerState);
    }


    return <div>
        <div className="admin-header">
            <Link className="link1" href={"/"}><img className="logout" src="image/logout.png"/></Link>
            <img src="image/drlogo.png" className="main-image" />
            <h4>Hello Staff!</h4>
           
        </div>
        <div className="mobile-header">
            <img src="image/drlogo.png" className="main-image" />
            <p>Hello Staff!</p>
        </div>

        <div className="dashboard">
            <p>Dashboard</p>
        </div>
        {/* <hr className="hr-line"/> */}
        <div className="mobile-icon">
        <p className="icon1" onClick={()=>showHamburgerContent()}>&#9776;</p>
        </div>
        <div className="menu">
            <ul>
                <Link href={"#"} className="menu-nav"><li>Home</li></Link>
                <Link href={"#"} className="menu-nav"><li>Dashboard</li></Link>
                <Link href={"#"} className="menu-nav"><li>Administration</li></Link>
                <Link href={"#"} className="menu-nav"><li>Resources</li></Link>
                <Link href={"#"} className="menu-nav"><li>Help</li></Link>
            </ul>
        </div>
        <div className="parent">
            {hamburgerState && <div className="hamburger-content">
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
                <p>122ww</p>
            </div>}
            <div className="row-1">
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/live.jpg" />
                    <p>Livestock Management</p></Link>
                </div>
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/cash.jpg" />
                    <p>Finance Management</p></Link>
                </div>  
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/eventt.jpg" className="event"/>
                    <p>Event Management</p></Link>
                </div>
            </div>
            <div className="row-2">
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/duedate.jpg" />
                    <p>Due Date Management</p></Link>
                </div>
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/task.jpg" className="task"/>
                    <p>Tasks Management</p></Link>
                </div>
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/quarantine.jpg" />
                    <p className="qua">Quarantined Management</p></Link>
                </div>
            </div>
        </div>
    </div>
}