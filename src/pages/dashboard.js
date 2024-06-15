// import Header2 from "@/components/header2";
import ModuleHeader from "@/components/moduleheader";
import Link from "next/link";
import { useState } from "react";

export default function Staff() {
    const [hamburgerState,setHamburgerState] = useState(false)


    function showHamburgerContent(){
        setHamburgerState(!hamburgerState);
    }


    return <div>
        <ModuleHeader/>

        <div className="dashboard">
            <p>Dashboard</p>
        </div>
        
       
        <div className="parent">
           
            <div className="row-1">
                <div className="img11">
                <Link href={"/livestockselection"} className="link2"><img src="image/live.jpg" />
                    <p>Livestock</p></Link>
                </div>
                <div className="img11">
                <Link href={"/financeselection"} className="link2"><img src="image/cash.jpg" />
                    <p>Income/Expense</p></Link>
                </div>  
                <div className="img11">
                <Link href={"/eventselection"} className="link2"><img src="image/eventt.jpg" className="event"/>
                    <p>Event Tracker</p></Link>
                </div>
            </div>
            <div className="row-2">
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/duedate.jpg" />
                    <p>Pregnancy Checker</p></Link>
                </div>
                <div className="img11">
                <Link href={"/lactationselection"} className="link2"><img src="image/task.jpg" className="task"/>
                    <p>Lactation tracking</p></Link>
                </div>
                <div className="img11">
                <Link href={"#"} className="link2"><img src="image/quarantine.jpg" />
                    <p className="qua">Quarantine</p></Link>
                </div>
            </div>
        </div>
    </div>
}