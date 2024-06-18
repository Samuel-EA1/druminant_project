import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
    const router = useRouter()

    const [formData, setformData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setformData((prevData) => ({ ...prevData, [name]: value }))
    }

    function login() {
        if (formData.username.trim() === "" || formData.password.trim() === "") {
            alert("Fill the form")
        }
        //send form data to backend and expect a response


        const res = {
            isAdmin: true,
            username: formData.username,
            farmland: "farmland1",
            status: "pending",
            token: "d7dsuhsudi"
        }
        //save response to local storage
        console.log(formData)

        localStorage.setItem('user', JSON.stringify(res));

        router.push(`/dashboard/`)

    }


    return <div className="main" >
        <Header />
        <div className="text-center mx-0  items-center justify-center">
            <div className="login-header">
                <Image style={{ margin: "0px auto", width: "120px" }} src={"/image/newlogo.png"} width={100} height={100} />
                <p>Livestock Management System</p>
            </div>
            <div className="fields">
                {/* field 1 */}
                <input placeholder="Username" type="text" name="username" maxLength={20} value={formData.username} onChange={handleChange}></input><br />
                <input placeholder="Password" type="password" name="password" maxLength={20} value={formData.password} onChange={handleChange}></input>
            </div>
            <div className="login-btn">
                <button onClick={login}><p>Login</p></button>
            </div>
            <div className="signup">
                <p>Don&apos;t have an account yet? <Link href={"/signup"} className="signup-link">Sign up</Link></p>
            </div>
        </div>

    </div>
}