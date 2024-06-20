// import Header2 from "@/components/header2";
import { userState } from "@/atom";
import ModuleHeader from "@/components/moduleheader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";

export default function Staff() {
    const [hamburgerState, setHamburgerState] = useState(false)


    function showHamburgerContent() {
        setHamburgerState(!hamburgerState);
    }

    // render the quarantine modulebased on the role of user
    const [userFromLocalStorage, setUserFromLocalStorage] = useRecoilState(userState)
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserFromLocalStorage(parsedUser);
          console.log("debugging")
          toast(`Welcome ${parsedUser.username}`);
        }
      }, []);
    console.log(userFromLocalStorage)
    //conditions
    //1. display everything for admin
    //2. display everything except admin roles only when the staff is accepted
    //3. display nothing except "please, wait for admin to accpt yur farmland request " when the staff status is pending or rejected
    //4 . display "join another farm", show a button on a text input to request to join anther farm, only if the status is rejected

    //{userFromLocalStorage?.isAdmin &&
    return <div>
        <ModuleHeader />
        <div className="dashboard">
            {/*welcome to famrland name dashboard */}
            <p className="first-letter:capitalize">{userFromLocalStorage && userFromLocalStorage.farmland}<br className="break"/> Dashboard</p>
        </div>


        {userFromLocalStorage === null ? <div className="text-center mx-0 h-screen flex items-center justify-center">
           <div className="flex items-center justify-center flex-col">
           <p className="dashboard-mssg">You are not logged in! <br/>Please, log in to access dashboard</p>
           <Link href={"/login"} className="mss-login">login</Link>
           </div>
            </div> 
            : 
            <div className="parent">

            <div className="row-1">
                <div className="img11">
                    <Link href={`/dashboard/livestock`} className="link2"><Image src="/image/live.jpg" width={100} height={100}/>
                        <p>Livestock</p></Link>
                </div>
                <div className="img11">
                    <Link href={`/dashboard/incomeexpense`} className="link2"><Image src="/image/cash.jpg" width={100} height={100} />
                        <p>Income/Expense</p></Link>
                </div>
                <div className="img11">
                    <Link href={`/dashboard/event`} className="link2"><Image width={100} height={100} quality={100} src="/image/eventt.jpg" className="event" />
                        <p>Event Tracker</p></Link>
                </div>
            </div>
            <div className="row-2">
                <div className="img11">
                    <Link href={`/dashboard/pregnancychecker`} className="link2"><Image width={100} height={100} src="/image/duedate.jpg" />
                        <p>Pregnancy Checker</p></Link>
                </div>
                <div className="img11">
                    <Link href={`/dashboard/lactation`} className="link2"><Image width={100} height={100} src="/image/task.jpg" className="task" />
                        <p>Lactation tracking</p></Link>
                </div>
                {/*if userfromlocalstorage is null ? a : b*/}
                <div className="img11">
                    <Link href={`/dashboard/quarantine`} className="link2"><Image width={100} height={100} src="/image/quarantine.jpg" />
                        <p className="qua">Quarantine</p></Link>
                </div>

            </div>
        </div>}
    </div>
}