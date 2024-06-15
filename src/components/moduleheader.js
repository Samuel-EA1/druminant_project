import Link from "next/link"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { IoIosLogOut } from "react-icons/io"

function ModuleHeader() {
    const [activateIcon, setactivateIcon] = useState(false)
    const [hamburg, setHamburg] = useState(true)
    const [cancel, setCancel] = useState(false)

    function dropNav() {
        setactivateIcon(true);
        setCancel(true)
        setHamburg(false)
    }
    function hideNav() {
        setactivateIcon(false);
        setCancel(false)
        setHamburg(true)
    }


    return <div>
        <div className="admin-header">
            <div>
                <Link href={"/"}><img src="image/newlogo.png" className="main-image-laptop" /></Link>
            </div>

            <div className="module-nav-list">
                <ul>
                    <Link href={"/"} className="menu-nav2"><li>Home</li></Link>
                    <Link href={"/dashboard"} className="menu-nav2"><li>Dashboard</li></Link>
                    <Link href={"#"} className="menu-nav2"><li>Profile</li></Link>
                    <Link href={"#"} className="menu-nav2" ><li>Help</li></Link>
                </ul>
            </div>

            <div>
                
           <p><Link href={"/login"}><IoIosLogOut className="log-out" title="Log out" /></Link></p>
            </div>

        </div>



        <div className="mobile-header">
            <img src="image/mobilelogo.png" className="main-image" />
            {
                hamburg && <Link className="link1" href={"#"}><p onClick={dropNav} className="icon1">&#9776;</p></Link>
            }
            {
                cancel && <Link className="link1" href={"#"}><p style={{ paddingTop: "12px" }} onClick={hideNav} className="icon1"><AiOutlineClose /></p></Link>
            }



        </div>
        {
            activateIcon && <div className="module-drop">
                <ul className="dropDownList-md">
                    <li><Link href={"#"} className="menu-nav2">Home</Link></li>
                    <li><Link href={"/dashboard"} className="menu-nav2">Dashboard</Link></li>
                    <li><Link href={"#"} className="menu-nav2">Profile</Link></li>
                    <li ><Link href={"#"} className="menu-nav2">Help</Link></li>
                    <li style={{ borderBottom: "none" }}><Link href={"/"} className="menu-nav2">Log out</Link></li>
                </ul>
            </div>
        }


    </div>

}

export default ModuleHeader
