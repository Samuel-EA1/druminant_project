import { userState } from "@/atom";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRecoilValue } from "recoil";

function Body() {
  const [loading, setLoading] = useState(true);

  const userFromLocalStorage = useRecoilValue(userState);

  // console.log(JSON.parse(userFromLocalStorage));

  return (
    <div className="parent-body ">
      {/* <h1 className="main-name">D&apos;Ruminant</h1> */}
      <Image
        className="main-name"
        src={"/image/newlogo.png"}
        width={100}
        height={100}
      />
      <p className="main-text ">
        Your solution for streamlined ruminant livestock management which
        centralizes all aspects of livestock care, offering tools to enhance
        efficiency and productivity. Record and organize detailed animal
        information effortlessly, and access vital data with ease.
      </p>{" "}
      <Link href={userFromLocalStorage === null ? "/login" : "/dashboard"}>
        <p className="lauchBtn group flex items-center justify-center  hover:bg-[#008000]/80  bg-[#008000] text-gray-200 px-2 py-3 max-w-40 rounded-lg text-center text-lg font-bold  ">
          {userFromLocalStorage === null ? "Launch App" : "Proceed"}{" "}
          <span>
            <FaArrowRight className="ml-2 group-hover:translate-x-2 transform duration-150" />
          </span>
        </p>
      </Link>
    </div>
  );
}

export default Body;
