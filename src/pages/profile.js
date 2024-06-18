import { userState } from "@/atom"
import ModuleHeader from "@/components/moduleheader"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"


function Profile() {
    const [userFromLocalStorage, setUserFromLocalStorage] = useRecoilState(userState)
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserFromLocalStorage(parsedUser);
          console.log("debugging")
          toast(`Welcome ${parsedUser.username}`);
        }
      }, []);

    return <div>
        <ModuleHeader/>

        {userFromLocalStorage === null ? <div className="text-center mx-0 h-screen flex items-center justify-center">
           <div className="flex items-center justify-center flex-col">
           <p className="dashboard-mssg">You are not logged in! <br/>Please, log in to access profile</p>
           <Link href={"/login"} className="mss-login">login</Link>
           </div>
            </div> 
            : 
            <div class="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            {/* <Image class="w-32 h-32 rounded-full mx-auto" width={100} height={100} src="https://picsum.photos/200" alt="Profile picture"/> */}
            <FaUser class="w-32 h-32 text-[#008000] rounded-full mx-auto"/>
                <h2 class="text-center text-2xl font-semibold mt-3">@Samuel</h2>
                <p class="text-center text-gray-600 mt-1">awunor@gmail.com</p>
                {/* <div class="flex justify-center mt-5">
                    <Link href="#" class="text-blue-500 hover:text-blue-700 mx-3">Twitter</Link>
                    <Link href="#" class="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</Link>
                    <Link href="#" class="text-blue-500 hover:text-blue-700 mx-3">GitHub</Link>
                </div> */}
                {/* <div class="mt-5">
                    <h3 class="text-xl font-semibold">Bio</h3>
                    <p class="text-gray-600 mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
                </div> */}
        </div>
        }
        

        

    </div>
}

export default Profile