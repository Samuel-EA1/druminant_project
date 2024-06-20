import Header from "@/components/header";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Login() {
    return <div className="main">
        <Header />
        <div className="form">
        <div className="login-header">
            <FaUser className="login-user" style={{marginTop:"-70px"}}/>
                <p style={{paddingBottom:"10px"}}>USER SIGNUP</p>
            </div>
            
            <div className="signup-fields ">
                {/* field 1 */}
                <input placeholder="Username" maxLength={20} type="text"></input><br />
                <input placeholder="Farmland name" maxLength={40}  type="text"></input><br />
                <input placeholder="Email Address" maxLength={40} type="gmail"></input><br />
                <select className="signup-role">
                    <option>Select role</option>
                    <option>Admin</option>
                    <option>Staff</option>
                </select>
                <input placeholder="Password" maxLength={20} type="password"></input><br />
                <input placeholder="Password Confirmation" maxLength={20} type="password"></input><br />
                
    
            </div>
            <link>
            </link>
            <div className="login-btn">
               <p><Link href={"/dashboard"}>Sign up</Link></p>
            </div>
            <div className="signup2">
                <p>Have an account already? <Link href={"/login"} className="signup-link">Log In</Link></p>
            </div>
        </div>


    </div>
}