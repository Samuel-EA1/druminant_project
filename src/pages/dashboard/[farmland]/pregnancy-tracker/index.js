import { userState } from "@/atom";
import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useRecoilValue } from "recoil";

function LivestockSelection() {
  const userData = useRecoilValue(userState);
  const router = useRouter();

  console.log(userData);
  const currentPath = router.asPath;

  return (
    <div>
      <Head>
        <title>druminant - pregnancy-tracker profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/image/mobilelogo.png"
        />
      </Head>
      <div>
        <ModuleHeader />
        <div className="dashboard-main  mx-auto">
          <h1
            className=" text-white mt-5 text-center md:mt-16"
            style={{
              fontFamily: "verdana",
              fontWeight: "bold",
              fontSize: "17px",
            }}
          >
            Pregnancy Tracker Profile Management
          </h1>
          <p
            className="text-white mt-2 text-xs text-center md:text-sm"
            style={{ fontFamily: "verdana" }}
          >
            Select livestock to monitor and record expected delivery date
          </p>

          <div className="mx-auto mt-12 md:mt-36">
            <div className="grid grid-cols-1 w-11/12 gap-8 mx-auto md:grid-cols-2 md:gap-16 md:w-4/5">
              <div className="card4 transform duration-1000    hover:scale-105 hover:animate-pulse">
                <Link
                  href={`/dashboard/${userData?.farmland}/pregnancy-tracker/cattle`}
                >
                  <div className="flex justify-between mt-10">
                    <h1>Cattle</h1>
                    <div style={{ marginTop: "-28px" }}>
                      <Image
                        style={{
                          height: "auto",
                          width: "60px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        src={"/image/cattle.jpg"}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="card4 transform duration-1000  hover:scale-105 hover:animate-pulse">
                <Link href={`/dashboard/${userData?.farmland}/pregnancy-tracker/goat`}>
                  <div className="flex justify-between mt-10">
                    <h1>Goat</h1>
                    <div style={{ marginTop: "-28px" }}>
                      <Image
                        style={{
                          height: "auto",
                          width: "60px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        src={"/image/goat.jpg"}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="card4 transform duration-1000  hover:scale-105 hover:animate-pulse">
                <Link href={`/dashboard/${userData?.farmland}/pregnancy-tracker/pig`}>
                  <div className="flex justify-between mt-10">
                    <h1>Pig</h1>
                    <div style={{ marginTop: "-28px" }}>
                      <Image
                        style={{
                          height: "auto",
                          width: "60px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        src={"/image/pig.jpg"}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </Link>
              </div>

              <div className="card4 transform duration-1000  hover:scale-105 hover:animate-pulse">
                <Link
                  href={`/dashboard/${userData?.farmland}/pregnancy-tracker/sheep`}
                >
                  <div className="flex justify-between mt-10">
                    <h1>Sheep</h1>
                    <div style={{ marginTop: "-28px" }}>
                      <Image
                        style={{
                          height: "auto",
                          width: "60px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        src={"/image/sheep.jpg"}
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className=" md:mt-80 mt-32">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivestockSelection;
