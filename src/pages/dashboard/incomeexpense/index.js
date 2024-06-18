import ModuleHeader from "@/components/moduleheader"
import Image from "next/image"
import Link from "next/link"

function LivestockSelection() {
    return <div>
        <ModuleHeader />
        <h1 className="module-header-first">Income and Expense Management</h1>
        <p className="select-header">Select livestock to monitor and record related finances</p>
        <div className="livestock-select">
            <div className="live-img2">
                <Link href={`/dashboard/incomeexpense/cattle`}>
                    <Image className="live-img1" width={100} height={100} src="/image/cattle.jpg" />
                    <p>Cattle</p>
                </Link>
            </div>

            <div className="live-img2">
                <Link href={`/dashboard/incomeexpense/goat`} className="link2">
                    <Image className="live-img1" width={100} height={100} src="/image/goat.jpg" />
                    <p>Goat</p></Link>
            </div>

            <div className="live-img2">
                <Link href={`/dashboard/incomeexpense/pig`} className="link2">
                    <Image className="live-img1" width={100} height={100} src="/image/pig.jpg" />
                    <p>Pig</p></Link>
            </div>
            <div className="live-img2">
                <Link href={`/dashboard/incomeexpense/sheep`} className="link2">
                    <Image className="live-img1" width={100} height={100} src="/image/sheep.jpg" />
                    <p>Sheep</p></Link>
            </div>
        </div>




    </div>


}

export default LivestockSelection