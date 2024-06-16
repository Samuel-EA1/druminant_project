import ModuleHeader from "@/components/moduleheader"
import Link from "next/link"

function LivestockSelection() {
    return <div>
                <ModuleHeader />
                <h1 className="module-header-first">Pregnancy Checker</h1>
                <p className="select-header">Select livestock to monitor and keep track of pregnant livestock</p>
                <div className="livestock-select">
                
                    <div className="live-img2">
                    <Link href={"/pregcheckercattle"} ><img className="live-img1" src="image/cattle.jpg" />
                    <p>Cattle</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/pregcheckergoat"} className="link2"><img src="image/goat.jpg" />
                    <p>Goat</p></Link>
                    </div>
                
                    <div className="live-img2">
                    <Link href={"/pregcheckerpig"} className="link2"><img src="image/pig.jpg" />
                    <p>Pig</p></Link>
                    </div>
                    <div className="live-img2">
                    <Link href={"/pregcheckersheep"} className="link2"><img src="image/sheep.jpg" />
                    <p>Sheep</p></Link>
                    </div>
                </div>




        </div>
        
        
}

export default LivestockSelection