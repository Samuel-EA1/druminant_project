import Header from "@/components/header";
import Link from "next/link";

export default function Login() {
    return <div className="main">
        <Header />
        <div className="form">
            <div className="login-header2">
                <h1>D'Ruminant</h1>
                <p>Livestock Management System</p>
            </div>
          
            
            <div className="signup-fields">
                {/* field 1 */}
                <input placeholder="Username" type="text"></input><br />
                <input placeholder="Farm Name"  type="text"></input><br />
                <input placeholder="Email Address" style={{color:"green", backgroundColor:"red"}} type="gmail"></input><br />
                <select className="signup-role">
                    <option>Select role</option>
                    <option>Admin</option>
                    <option>Staff</option>
                </select>
                <input placeholder="Password" type="password"></input><br />
                <input placeholder="Password Confirmation" type="password"></input><br />
                
    
            </div>
            <link>
            </link>
            <div className="login-btn">
               <p><Link href={"dashboard"}>Sign up</Link></p>
            </div>
            <div className="signup2">
                <p>Have an account already? <Link href={"/login"} className="signup-link">Log In</Link></p>
            </div>
        </div>


    </div>
}