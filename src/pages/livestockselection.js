import ModuleHeader from "@/components/moduleheader"
import Link from "next/link"

function LivestockSelection() {
    return <div>
                <ModuleHeader />
                <h1 className="module-header-first">Livestock Profile Management</h1>
                <p className="select-header">Select livestock to monitor and record livestock details</p>
                <div className="livestock-select">
                
                    <div className="live-img2">
                    <Link href={"/livestockcattle"} ><img className="live-img1" src="image/cattle.jpg" />
                    <p>Cattle</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/livestockgoat"} className="link2"><img src="image/goat.jpg" />
                    <p>Goat</p></Link>
                    </div>
                
                    <div className="live-img2">
                    <Link href={"/livestockpig"} className="link2"><img src="image/pig.jpg" />
                    <p>Pig</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/livestocksheep"} className="link2"><img src="image/sheep.jpg" />
                    <p>Sheep</p></Link>
                    </div>
                </div>




        </div>
        
        
}

export default LivestockSelection