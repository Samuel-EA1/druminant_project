import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [cancel, setCancel] = useState(false)
  const [hamburg, setHamburg] = useState(true)

  function dropNav() {
    setDropdown(true);
    setCancel(true)
    setHamburg(false)
  }
  
  function hideNav(){
    setDropdown(false);
    setCancel(false)
    setHamburg(true)
  }

  return (
    <div className="parent-nav">
      <div className="navbar">
        <div>
          <Link href="/" className="Header-links">
            <img src="image/newlogo.png" alt="broken image" />
          </Link>
        </div>
        <div className="nav-list-head">
          <ul className="nav-list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="/signup">Sign up</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
          </ul>
          <div className="menu-icon">
            {
              hamburg &&   <h1 style={{paddingTop:"4px", fontSize:"23px"}} onClick={dropNav}>&#9776;</h1>
            }
            {
              cancel &&  <h1 style={{paddingTop:"10px", fontSize:"23px"}} onClick={hideNav}> <AiOutlineClose /></h1>
            }
           
          </div>
        </div>
      </div>
      <div className="drop">
        {dropdown && 
          <div>
            <ul className="dropDownList">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/login">Log in</a>
              </li>
              <li>
                <a href="signup">Sign up</a>
              </li>
              <li>
                <a href="#">Administration</a>
              </li>
              <li style={{borderBottom: "none"}}>
                <a href="#">Help Center</a>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default Header;
