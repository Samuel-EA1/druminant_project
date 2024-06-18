import { userState } from "@/atom";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

function Body() {

  const [loading, setLoading] = useState(true);

  const userFromLocalStorage = useRecoilValue(userState)

  // console.log(JSON.parse(userFromLocalStorage));

  return (
      <div className="parent-body">
        {/* <h1 className="main-name">D&apos;Ruminant</h1> */}
        <Image className="main-name" src={"/image/newlogo.png"} width={100} height={100} />
        <p className="main-text">
          Your solution for streamlined ruminant livestock management. Our user-friendly web-based system centralizes all aspects
          of livestock care, offering tools to enhance efficiency and productivity. Record and organize detailed animal information effortlessly,
          and access vital data with ease. 
        </p>
          <p className="launch-btn" > <Link href={userFromLocalStorage === null ? "/login" : "/dashboard"}>{userFromLocalStorage === null ? "Launch App" : "Proceed to Dashboard"} </Link></p>
      </div>
  );
}

export default Body;
