import ModuleHeader from "@/components/moduleheader"
import Link from "next/link"

function LivestockSelection() {
    return <div>
                <ModuleHeader />
                <h1 className="module-header-first">Income and Expense Management</h1>
                <p className="select-header">Select livestock to monitor and record related finances</p>
                <div className="livestock-select">
                
                    <div className="live-img2">
                    <Link href={"/financecattle"} ><img className="live-img1" src="image/cattle.jpg" />
                    <p>Cattle</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/financegoat"} className="link2"><img src="image/goat.jpg" />
                    <p>Goat</p></Link>
                    </div>
                
                    <div className="live-img2">
                    <Link href={"/financepig"} className="link2"><img src="image/pig.jpg" />
                    <p>Pig</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/financesheep"} className="link2"><img src="image/sheep.jpg" />
                    <p>Sheep</p></Link>
                    </div>
                </div>




        </div>
        
        
}

export default LivestockSelection