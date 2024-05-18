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
                <input placeholder="Farmland Name" type="text"></input><br />
                <input placeholder="Email Address" type="gmail"></input><br />
                <input placeholder="Password" type="password"></input><br />
                <input placeholder="Password Confirmation" type="password"></input><br />
                <input placeholder="Role" type="text"></input>
            </div>
            <div className="login-btn">
                <Link href={"#"} className="login-btn"><p>SIGN UP</p></Link>
            </div>
            <div className="signup2">
                <p>Have an account already? <Link href={"/login"} className="signup-link">Log In</Link></p>
            </div>
        </div>


    </div>
}