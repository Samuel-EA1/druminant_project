import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Footer = () => {
  const router = useRouter();
  return (
    <div className="  mx-auto">
      <footer className="p-4    sm:p-6 bg-[#008000]">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href={"/"}>
              <Image
                src="/image/newlogo.png"
                width={110}
                height={110}
                className=""
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h3 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">
                Contact us
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    href="#"
                    target="_blank"
                    className="hover:underline text-gray-200"
                  ></a>
                </li>
                <li>
                  <a
                    href="mailto:druminant@gmail.com"
                    target="_blank"
                    rel="nofollow"
                    className="hover:underline text-gray-200"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div className=" mb-5">
              <h3 className="mb-6 text-sm font-semibold text-gray-200 uppercase dark:text-white">
                Quick links
              </h3>
              <ul>
                <li className="mb-4">
                  <a
                    href="/help"
                    target="_blank"
                    className="hover:underline text-gray-200"
                  >
                    Help
                  </a>
                </li>
                <li className="mb-4 cursor-pointer">
                  <p
                    onClick={() => {
                      localStorage.removeItem("token");
                      router.push("/login");
                    }}
                    target="_blank"
                    className="hover:underline text-gray-200"
                  >
                    Log out
                  </p>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="hover:underline text-gray-200"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()} Druminant All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};
