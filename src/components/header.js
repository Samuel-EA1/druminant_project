import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModuleHeader from "./moduleheader";
import { useRecoilState } from "recoil";
import { userState } from "@/atom";

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [userFromLocalStorage, setUserFromLocalStorage] = useRecoilState(userState);
  const router = useRouter();

  const toggleDropdown = () => setDropdown(!dropdown);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUserFromLocalStorage(user);
  }, []);

  const logOut = () => {
    localStorage.removeItem('user');
    setUserFromLocalStorage(null);
    router.push('/');
  };

  console.log(router)
  return (
    <div className="parent-nav">
  <ModuleHeader/>
      {/* <div className="navbar">
        <div>
          <Link href="/">
            <img src="image/newlogo.png" alt="Logo" />
          </Link>
        </div>
        <div className="nav-list-head">
          <ul className="nav-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Profile</Link>
            </li>
            <li onClick={logOut} style={{ cursor: "pointer" }}>
              {userFromLocalStorage === null ? "Sign up" : "Log out"}
            </li>
            <li>
              <Link href="/help">Help</Link>
            </li>
          </ul>
          <div className="menu-icon" onClick={toggleDropdown}>
            {dropdown ? (
              <h1 style={{ paddingTop: "10px", fontSize: "23px" }}>
                <AiOutlineClose />
              </h1>
            ) : (
              <h1 style={{ paddingTop: "4px", fontSize: "23px" }}>
                &#9776;
              </h1>
            )}
          </div>
        </div>
      </div> */}
      {/* {dropdown && (
        <ModuleHeader/>
        // <div className="drop">
        //   <ul className="dropDownList">
        //     <li>
        //       <Link href="/">Home</Link>
        //     </li>
        //     <li>
        //       <Link href="/login">Profile</Link>
        //     </li>
        //     <li onClick={logOut}>
        //       <p>{userFromLocalStorage === null ? "Sign up" : "Log out"}</p>
        //     </li>
        //     <li style={{ borderBottom: "none" }}>
        //       <Link href="/help">Help</Link>
        //     </li>
        //   </ul>
        // </div>
      )} */}
    </div>
  );
}

export default Header;
