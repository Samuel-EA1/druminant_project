import Link from "next/link"

function Body() {
  return <div className="parent-body">
    <h1 className="main-name">D'Ruminant</h1>
    <p className="main-text">
      Your solution for streamlined ruminant livestock management. Our user-friendly web-based system centralizes<br/> all aspects 
      of livestock care, offering tools to enhance efficiency and productivity. Record and organize detailed animal <br /> information effortlessly,
      and access vital data with ease. Revolutionize your livestock management experience with D’ Ruminant. </p>
    
      <div className="lauch-btn">
        <Link href={"/login"} ><p>LAUNCH APP</p></Link>
      </div>
    
  </div>
}

export default Body