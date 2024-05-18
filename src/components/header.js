import Link from "next/link"


function Header() {
  return <div className="parent-nav">
    <div className="navbar">
      <div>
        <Link href={"/"} className="Header-links"><img src="image/drlogo.png" alt="broken image"/></Link>
      </div>
      <div className="nav-list-head">
        <ul className="nav-list">
          <li><a href="#" >Home</a></li>
          <li><a href="#">Resources</a></li>
          <li><a href="#">Adminstration</a></li>
          <li><a href="#">Help Center</a></li>
        </ul>
        <div className="menu-icon">
          <h1>&#9776;</h1>
        </div>

      </div>
    </div>
  </div>

}

export default Header
