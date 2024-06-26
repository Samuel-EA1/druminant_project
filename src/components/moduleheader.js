import { userState } from "@/atom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

function ModuleHeader() {
  const [activateIcon, setactivateIcon] = useState(false);
  const [hamburg, setHamburg] = useState(true);
  const [cancel, setCancel] = useState(false);
  const router = useRouter();
  const [admin, setAdmin] = useState("");

  const currentPath = router.asPath;

  function dropNav() {
    setactivateIcon(true);
    setCancel(true);
    setHamburg(false);
    currentPath === "/" || currentPath === "/login" || currentPath === "/signup"
      ? "bg-transparent"
      : "";
    currentPath !== "/" && currentPath !== "/login" && currentPath !== "/signup"
      ? "#008000"
      : "transparent";
  }
  function hideNav() {
    setactivateIcon(false);
    setCancel(false);
    setHamburg(true);
  }

  //change the link component to a p tag, create a fucntion that when a user clicks on the p tag, it clears the local storage and redirects the
  //user back to home page
  const [userData, setUserData] = useRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('from here', token)

    if (token) {
      const decoded = jwtDecode(token);
      const { isAdmin, status, farmland, userToken } = decoded;
      setUserData({
        isAdmin,
        status,
        farmland,
        token,
      });
    }
  }, []);

  function logOut() {
    confirm("Are you sure you want to log out?");
    localStorage.removeItem("token");
    setUserData(null);
    router.push("/");
    toast("Bye!");
    currentPath === "/" || currentPath === "/login" || currentPath === "/signup"
      ? "bg-transparent"
      : "";
    currentPath !== "/" && currentPath !== "/login" && currentPath !== "/signup"
      ? "#008000"
      : "transparent";
  }

  return (
    <div>
      <div
        className={`admin-header  ${
          currentPath === "/" ||
          currentPath === "/login" ||
          currentPath === "/signup"
            ? "border-none"
            : "border-[1px]"
        } 
        border-gray-800 py-5    ${
          currentPath === "/" ||
          currentPath === "/login" ||
          currentPath === "/signup"
            ? "bg-transparent"
            : "#008000"
        }  fixed top-0 left-0 right-0 ${
          currentPath !== "/" ||
          currentPath !== "/login" ||
          currentPath !== "/signup"
        } 
        `}
        style={{
          backgroundColor:
            currentPath === "/" ||
            currentPath === "/login" ||
            currentPath === "/signup"
              ? " "
              : "rgb(0, 0, 14)",
        }}
      >
        <div>
          <Link href={"/"}>
            <Image
              width={100}
              height={100}
              alt="Home"
              src="/image/newlogo.png"
              title="Home"
              className="main-image-laptop"
            />
          </Link>
        </div>

        <div className="module-nav-list">
          <ul>
            <li className={router.pathname === "/" ? "active" : ""}>
              <Link href={"/"} className="menu-nav2" title="Home">
                Home
              </Link>
            </li>
            <li className={router.pathname === "/dashboard" ? "active" : ""}>
              <Link
                href={`/dashboard/${userData?.farmland}`}
                className="menu-nav2"
                title="View dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className={router.pathname === "/profile" ? "active" : ""}>
              <Link
                href={"/profile"}
                className="menu-nav2"
                title="View and edit profile"
              >
                Profile
              </Link>
            </li>
            <li className={router.pathname === "/help" ? "active" : ""}>
              <Link href={"/help"} className="menu-nav2" title="Get help">
                Help
              </Link>
            </li>
            {admin && (
              <>
                <li className={router.pathname === "/request" ? "active" : ""}>
                  <Link
                    href={"/request"}
                    className="menu-nav2"
                    title="View staff requests"
                  >
                    Requests
                  </Link>
                </li>
                <li
                  className={router.pathname === "/staffinfo" ? "active" : ""}
                >
                  <Link
                    href={"/staffinfo"}
                    className="menu-nav2"
                    title="Staff information"
                  >
                    Staff
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {userData ? (
          <div>
            <p onClick={logOut}>
              <IoIosLogOut className="log-out" title="Log out" />
            </p>
          </div>
        ) : (
          <div>
            <Link href={"/login"} className="log-out2">
              Log in
            </Link>
          </div>
        )}
      </div>

      <div
        className={`mobile-header z-50 relative top-0 right-0 left-0    ${
          currentPath === "/" ||
          currentPath === "/login" ||
          currentPath === "/signup"
            ? "rgba(9, 43, 0, 0.5)"
            : "#008000"
        }`}
        style={{
          backgroundColor:
            currentPath !== "/" &&
            currentPath !== "/login" &&
            currentPath !== "/signup"
              ? "#008000"
              : "rgba(9, 43, 0, 0.5)",
        }}
      >
        {/* <div className="mobile-header"> */}

        <Link href={"/"}>
          <Image
            src="/image/mobilelogo.png"
            width={40}
            height={70}
            className="main-image"
          />
        </Link>
        {hamburg && (
          <p onClick={dropNav} className="icon1 z-10">
            &#9776;
          </p>
        )}
        {cancel && (
          <p style={{ paddingTop: "10px" }} className="icon1  text-black z-50">
            <AiOutlineClose onClick={hideNav} />
          </p>
        )}

        {activateIcon && (
          <div
            className={` module-drop   bg-white top-10 right-0 left-0 absolute   `}
          >
            <ul className="dropDownList-md overflow-hidden">
              <li className={router.pathname === "/" ? "active" : ""}>
                <Link href={"/"} className="menu-nav2">
                  Home
                </Link>
              </li>
              <li className={router.pathname === "/dashboard" ? "active" : ""}>
                <Link
                  href={`/dashboard/${userData.farmland}`}
                  className="menu-nav2"
                >
                  Dashboard
                </Link>
              </li>
              <li className={router.pathname === "/profile" ? "active" : ""}>
                <Link href={"/profile"} className="menu-nav2">
                  Profile
                </Link>
              </li>
              <li className={router.pathname === "/help" ? "active" : ""}>
                <Link href={"/help"} className="menu-nav2">
                  Help
                </Link>
              </li>
              {userData?.isAdmin && (
                <>
                  <li
                    className={router.pathname === "/request" ? "active" : ""}
                  >
                    <Link href={"/request"} className="menu-nav2">
                      Requests
                    </Link>
                  </li>
                  <li
                    className={router.pathname === "/staffinfo" ? "active" : ""}
                  >
                    <Link href={"/staffinfo"} className="menu-nav2">
                      Staff
                    </Link>
                  </li>
                </>
              )}
              <li style={{ borderBottom: "none", cursor: "pointer" }}>
                {userData === null ? (
                  <Link href={"/login"}>Log in</Link>
                ) : (
                  <p onClick={logOut}>
                    {userData === null ? "Log in" : "Log out"}
                  </p>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModuleHeader;
