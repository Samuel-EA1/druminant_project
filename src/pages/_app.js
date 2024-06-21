import Header from "@/components/header";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "@/components/footer";

export default function App({ Component, pageProps }) {
  return (
    <div>
      {/* <Header/> */}
      <RecoilRoot>
        <Component {...pageProps} />
        <ToastContainer />
        {/* <Footer /> */}
      </RecoilRoot>
    </div>
  );
}
