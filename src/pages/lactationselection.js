import ModuleHeader from "@/components/moduleheader"
import Link from "next/link"

function LivestockSelection() {
    return <div>
                <ModuleHeader />
                <h1 className="module-header-first">Lactation Tracking Management</h1>
                <p className="select-header">Select livestock to monitor and keep record of lactation details</p>
                <div className="livestock-select">
                
                    <div className="live-img2">
                    <Link href={"/lactationcattle"} ><img className="live-img1" src="image/cattle.jpg" />
                    <p>Cattle</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/lactationgoat"} className="link2"><img src="image/goat.jpg" />
                    <p>Goat</p></Link>
                    </div>
                
                    <div className="live-img2">
                    <Link href={"/lactationpig"} className="link2"><img src="image/pig.jpg" />
                    <p>Pig</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/lactationsheep"} className="link2"><img src="image/sheep.jpg" />
                    <p>Sheep</p></Link>
                    </div>
                </div>




        </div>
        
        
}

export default LivestockSelection