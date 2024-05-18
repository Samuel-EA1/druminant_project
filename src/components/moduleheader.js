import Link from "next/link"

function ModuleHeader() {
    return <div>
        <div className="admin-header">
            <div>
                <img src="image/newlogo.png" className="main-image-laptop" />
            </div>
            <div>
            <div className="module-nav-list">
            <ul>
                <Link href={"#"} className="menu-nav2"><li>Home</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Dashboard</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Administration</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Resources</li></Link>
                <Link href={"#"} className="menu-nav2"><li>Help</li></Link>
            </ul>
        </div>
            </div>
            <div>
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
    </div>

}

export default ModuleHeader
