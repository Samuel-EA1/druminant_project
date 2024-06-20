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
    return <div className="dashboard-main">
        <ModuleHeader />
        <hr />

        <div className="dashboard">
            <p className="first-letter:capitalize">{userFromLocalStorage && userFromLocalStorage.farmland}<br className="break" /> Dashboard</p>
        </div>
        <p style={{ color: "white", textAlign: "center", fontSize: "14px" }}>(Click on the name of the module)</p>

        <div className="desktop-dashboard">
            <div className="row-1">
                <div className="card1">
                    <Link href={`/dashboard/livestock`}><h1>Livestock Profile</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "auto", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/sheep.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <Link href={`/dashboard/incomeexpense`}><h1>Income & Expense</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px ", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/finance.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <Link href={`/dashboard/event`}><h1>Event Tracker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/event.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-1">

                <div className="card1">
                    <Link href={`/dashboard/pregnancychecker`}><h1>Pregnancy Checker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/pregnant.png"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <Link href={`/dashboard/lactation`}><h1>Lactation Tracker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/lactation2.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <Link href={`/dashboard/quarantine`}><h1>Quarantine</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "55px", width: "55px", borderRadius: "50%", marginRight: "10px" }} src={"/image/quaran.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* mobile 2*/}
        <div className="mobile-dashboard2">

            <div className="row-3">
                <div className="card3">
                    <Link href={`/dashboard/livestock`}><h1>Livestock Profile</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "auto", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/sheep.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card3">
                    <Link href={`/dashboard/incomeexpense`}><h1>Income & Expense</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px ", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/finance.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-3">
                <div className="card3">
                    <Link href={`/dashboard/event`}><h1>Event Tracker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/event.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card3">
                    <Link href={`/dashboard/pregnancychecker`}><h1>Pregnancy Checker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/pregnant.png"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-3">
                <div className="card3">
                    <Link href={`/dashboard/lactation`}><h1>Lactation Tracker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/lactation2.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card3">
                    <Link href={`/dashboard/quarantine`}><h1>Quarantine</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "55px", width: "55px", borderRadius: "50%", marginRight: "10px" }} src={"/image/quaran.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* mobile */}
        <div className="mobile-dashboard">

            <div className="row-2">
                <div className="card2">
                    <Link href={`/dashboard/livestock`}><h1>Livestock Profile</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "auto", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/sheep.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card2">
                    <Link href={`/dashboard/incomeexpense`}><h1>Income & Expense</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px ", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/finance.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-2">
                <div className="card2">
                    <Link href={`/dashboard/event`}><h1>Event Tracker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/event.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card2">
                    <Link href={`/dashboard/pregnancychecker`}><h1>Pregnancy Checker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/pregnant.png"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-2">
                <div className="card2">
                    <Link href={`/dashboard/lactation`}><h1>Lactation Tracker</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "60px", width: "60px", borderRadius: "50%", marginRight: "10px" }} src={"/image/lactation2.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className="card2">
                    <Link href={`/dashboard/quarantine`}><h1>Quarantine</h1></Link>
                    <div className="flex justify-between">
                        <div>
                            <p>Cattle: <strong>3</strong> </p>
                            <p>Goat: <strong>5</strong> </p>
                            <p>Pig: <strong>0</strong> </p>
                            <p>Sheep: <strong>10</strong> </p>
                        </div>
                        <div>
                            <Image style={{ height: "55px", width: "55px", borderRadius: "50%", marginRight: "10px" }} src={"/image/quaran.jpg"} width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
}