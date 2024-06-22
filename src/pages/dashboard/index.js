// import Header2 from "@/components/header2";
import { userState } from "@/atom";
import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { GiCage, GiCow, GiGoat, GiPig, GiSheep } from "react-icons/gi";
import { TbMilk } from "react-icons/tb";
import { FaCow } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";

export default function Staff() {
  const [hamburgerState, setHamburgerState] = useState(false);

  function showHamburgerContent() {
    setHamburgerState(!hamburgerState);
  }

  // render the quarantine modulebased on the role of user
  const [userFromLocalStorage, setUserFromLocalStorage] =
    useRecoilState(userState);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserFromLocalStorage(parsedUser);
      console.log("debugging");
      toast(`Welcome ${parsedUser.username}`);
    }
  }, []);
  console.log(userFromLocalStorage);
  //conditions
  //1. display everything for admin
  //2. display everything except admin roles only when the staff is accepted
  //3. display nothing except "please, wait for admin to accpt yur farmland request " when the staff status is pending or rejected
  //4 . display "join another farm", show a button on a text input to request to join anther farm, only if the status is rejected

  //{userFromLocalStorage?.isAdmin &&
  return (
    <div>
      <Head>
        <title>Druminant - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/image/mobilelogo.png" />
      </Head>
      <div className="dashboard-main  mx-auto">
        <ModuleHeader />

        {userFromLocalStorage ? (
          <>
            {" "}
            <div className="dashboard md:mt-0">
              <p className="first-letter:capitalize md:mt-16 mt-3">
                {userFromLocalStorage && userFromLocalStorage.farmland}
                <br className="break" /> Dashboard
              </p>
            </div>
            <div className="  text-gray-800">
              {" "}
              <div className="desktop-dashboard  mb-28 ">
                <div className="row-1 ">
                  <div className="card1 hover:scale-105 hover:animate-pulse ">
                    <Link href={`/dashboard/livestock`}>
                      <div className="flex items-center">
                        {/* <FaCow style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> */}
                        <h1>Livestock Profile</h1>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center">
                            <GiCow style={{ fontSize: "20px", marginTop: "0px", marginLeft: "5px", color: "#008000" }} />
                            <p>Cattle: <strong>3</strong>{" "}</p>
                          </div>

                          <div className="flex items-center">
                            <GiGoat style={{ fontSize: "17px", marginTop: "0px", marginLeft: "5px", color: "#008000" }} />
                            <p>Goat: <strong>5</strong>{" "} </p>
                          </div>

                          <div className="flex items-center">
                            <GiPig style={{ fontSize: "17px", marginTop: "0px", marginLeft: "5px", color: "#008000" }} />
                           <p> Pig: <strong>0</strong>{" "}</p>
                          </div>

                          <div className="flex items-center">
                            <GiSheep style={{ fontSize: "20px", marginTop: "0px", marginLeft: "5px", color: "#008000" }} />
                            <p> Sheep: <strong>10</strong>{" "}</p>
                          </div>
                        </div>
                        <div>
                          <Image
                            style={{
                              height: "auto",
                              width: "60px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            src={"/image/sheep.jpg"}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="card1 hover:scale-105 hover:animate-pulse">
                    <Link href={`/dashboard/incomeexpense`}>
                      <div className="flex items-center">
                        <AiOutlineDollarCircle style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /><h1>Income/Expense</h1>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p>
                            Cattle: <strong>3/5</strong>{" "}
                          </p>
                          <p>
                            Goat: <strong>5/6</strong>{" "}
                          </p>
                          <p>
                            Pig: <strong>0/5</strong>{" "}
                          </p>
                          <p>
                            Sheep: <strong>2/3</strong>{" "}
                          </p>
                        </div>
                        <div>
                          <Image
                            style={{
                              height: "60px ",
                              width: "60px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            src={"/image/finance.jpg"}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="card1 hover:scale-105 hover:animate-pulse">
                    <Link href={`/dashboard/event`}>
                      <div className="flex items-center">
                        <MdEventAvailable style={{ fontSize: "25px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> <h1>Event Tracker</h1>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p>
                            Cattle: <strong>3</strong>{" "}
                          </p>
                          <p>
                            Goat: <strong>5</strong>{" "}
                          </p>
                          <p>
                            Pig: <strong>0</strong>{" "}
                          </p>
                          <p>
                            Sheep: <strong>10</strong>{" "}
                          </p>
                        </div>
                        <div>
                          <Image
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            src={"/image/event.jpg"}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className=" row-1 ">
                  <div className="card1 hover:scale-105 hover:animate-pulse">
                    <Link href={`/dashboard/pregnancychecker`}>
                      <div className="flex items-center">
                        <BsCalendar2Date style={{ fontSize: "19px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /><h1>Pregnancy Checker</h1>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p>
                            Cattle: <strong>3</strong>{" "}
                          </p>
                          <p>
                            Goat: <strong>5</strong>{" "}
                          </p>
                          <p>
                            Pig: <strong>0</strong>{" "}
                          </p>
                          <p>
                            Sheep: <strong>10</strong>{" "}
                          </p>
                        </div>
                        <div>
                          <Image
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            src={"/image/pregnant.png"}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="card1 hover:scale-105 hover:animate-pulse">
                    <Link href={`/dashboard/lactation`}>
                      <div className="flex items-center">
                        <TbMilk style={{ fontSize: "22px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} />
                        <h1>Lactation Tracker</h1>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p>
                            Cattle: <strong>3</strong>{" "}
                          </p>
                          <p>
                            Goat: <strong>5</strong>{" "}
                          </p>
                          <p>
                            Pig: <strong>0</strong>{" "}
                          </p>
                          <p>
                            Sheep: <strong>10</strong>{" "}
                          </p>
                        </div>
                        <div>
                          <Image
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            src={"/image/lactation2.jpg"}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="card1 hover:scale-105 hover:animate-pulse">
                    <Link href={`/dashboard/quarantine`}>
                      <div className="flex items-center">
                        <GiCage style={{ fontSize: "21px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} />
                        <h1 className="m-0">Quarantine</h1>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <p>
                            Cattle: <strong>3</strong>{" "}
                          </p>
                          <p>
                            Goat: <strong>5</strong>{" "}
                          </p>
                          <p>
                            Pig: <strong>0</strong>{" "}
                          </p>
                          <p>
                            Sheep: <strong>10</strong>{" "}
                          </p>
                        </div>
                        <div>
                          <Image
                            style={{
                              height: "55px",
                              width: "55px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                            src={"/image/quaran.jpg"}
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* mobile 2*/}
              <div className="mobile-dashboard2">
                <div className="row-3">
                  <div className="card3">
                    <Link href={`/dashboard/livestock`}>
                      <div className="flex items-center">
                        <FaCow style={{ fontSize: "21px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /><h1>Livestock Profile</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "auto",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/sheep.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card3">
                    <Link href={`/dashboard/incomeexpense`}>
                      <div className="flex items-center">
                        <AiOutlineDollarCircle style={{ fontSize: "21px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /><h1>Income/Expense</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3/5</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5/6</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0/5</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>2/3</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px ",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/finance.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-3">
                  <div className="card3">
                    <Link href={`/dashboard/event`}>
                      <div className="flex items-center">
                        <MdEventAvailable style={{ fontSize: "21px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> <h1>Event Tracker</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/event.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card3">
                    <Link href={`/dashboard/pregnancychecker`}>
                      <div className="flex items-center">
                        <BsCalendar2Date style={{ fontSize: "17px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /><h1>Pregnancy Checker</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/pregnant.png"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-3">
                  <div className="card3">
                    <Link href={`/dashboard/lactation`}>
                      <div className="flex items-center">
                        <TbMilk style={{ fontSize: "20px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} />
                        <h1>Lactation Tracker</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/lactation2.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card3">
                    <Link href={`/dashboard/quarantine`}>
                      <div className="flex items-center">
                        <GiCage style={{ fontSize: "19px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} />
                        <h1 className="m-0">Quarantine</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "55px",
                            width: "55px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/quaran.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* mobile */}
              <div className="mobile-dashboard">
                <div className="row-2">
                  <div className="card2">
                    <Link href={`/dashboard/livestock`}>
                      <div className="flex items-center">
                        <FaCow style={{ fontSize: "21px", marginTop: "8px", marginLeft: "5px", color: "#030025" }} /><h1>Livestock Profile</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "auto",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/sheep.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card2">
                    <Link href={`/dashboard/incomeexpense`}>
                      <div className="flex items-center">
                        <AiOutlineDollarCircle style={{ fontSize: "20px", marginTop: "9px", marginLeft: "5px", color: "#030025" }} /><h1>Income/Expense</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3/5</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5/6</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0/5</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>2/3</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px ",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/finance.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-2">
                  <div className="card2">
                    <Link href={`/dashboard/event`}>
                      <div className="flex items-center">
                        <MdEventAvailable style={{ fontSize: "20px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /> <h1>Event Tracker</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/event.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card2">
                    <Link href={`/dashboard/pregnancychecker`}>
                      <div className="flex items-center">
                        <BsCalendar2Date style={{ fontSize: "15px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} /><h1>Pregnancy Checker</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/pregnant.png"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-2">
                  <div className="card2">
                    <Link href={`/dashboard/lactation`}>
                      <div className="flex items-center">
                        <TbMilk style={{ fontSize: "20px", marginTop: "7px", marginLeft: "5px", color: "#030025" }} />
                        <h1>Lactation Tracker</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "60px",
                            width: "60px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/lactation2.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card2">
                    <Link href={`/dashboard/quarantine`}>
                      <div className="flex items-center">
                        <GiCage style={{ fontSize: "19px", marginTop: "10px", marginLeft: "5px", color: "#030025" }} />
                        <h1 className="m-0">Quarantine</h1>
                      </div>
                    </Link>
                    <div className="flex justify-between">
                      <div>
                        <p>
                          Cattle: <strong>3</strong>{" "}
                        </p>
                        <p>
                          Goat: <strong>5</strong>{" "}
                        </p>
                        <p>
                          Pig: <strong>0</strong>{" "}
                        </p>
                        <p>
                          Sheep: <strong>10</strong>{" "}
                        </p>
                      </div>
                      <div>
                        <Image
                          style={{
                            height: "55px",
                            width: "55px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={"/image/quaran.jpg"}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-200 mx-0 h-screen flex items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <p className="dashboard-mssg">
                You are not logged in! <br />
                Please, log in to access profile
              </p>
              <Link href={"/login"} className="mss-login">
                login
              </Link>
            </div>
          </div>
        )}

        <div className="md:mt-0 mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
