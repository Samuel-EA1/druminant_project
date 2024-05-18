import Header from "@/components/header";
import Link from "next/link";

export default function Login(){
    return <div className="main">
        <Header />
        <div className="form"> 
        <div className="login-header">
            <h1>D'Ruminant</h1>
            <p>Livestock Management System</p>
        </div>
        <div className="fields">
            {/* field 1 */}
            <input placeholder="Username" type="text"></input><br/>
            <input placeholder="Password" type="password"></input>
        </div>
        <div className="login-btn">
            <Link href={"#"} className="login-btn"><p>LOG IN</p></Link>
        </div>
        <div className="signup">
            <p>Don't have an account yet? <Link href={"/signup"} className="signup-link">Sign up</Link></p>
        </div>
        </div>
        
    </div>
}