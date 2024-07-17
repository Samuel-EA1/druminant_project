import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Reset() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${BASE_URL}/auth/requestPasswordReset`, {
        email,
      });

      setLoading(false);
      setEmail("");
      toast.success("You will receive a reset link shortly.");
      setMessage(`You will receive a reset link shortly.`);
    } catch (err) {
      setLoading(false);
      console.log(err)
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(
          err.response.data.message || "An error occurred. Please try again."
        );
      } else if (err.request) {
        // The request was made but no response was received
        toast.error(
          "No response from the server. Please check your network connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="   flex flex-col justify-between">
      <ModuleHeader />

      <div className="h-screen     flex items-center justify-center ">
        <div className="border-2 bg-white mx-2 shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-lg md:text-2xl font-bold text-green-900 mb-4">
            Forgot Your Password?
          </h2>
          <p className="text-primary-foreground mb-6">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-primary-foreground">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="john.doe@example.com"
                className="w-full px-3 py-2 rounded-lg text-base border bg-input focus:outline-none focus:ring focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#008000] text-white text-primary-foreground py-2 rounded-lg hover:bg-primary/80 transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>
      </div>
      <div className="md:mt-0 mt-10   ">
        <Footer />
      </div>
    </div>
  );
}

export default Reset;
