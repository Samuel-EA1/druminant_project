// pages/passwordReset.js

import { userState } from "@/atom";
import { Footer } from "@/components/footer";
import ModuleHeader from "@/components/moduleheader";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

const PasswordReset = () => {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const router = useRouter();
  const { token, userId } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const userData = useRecoilValue(userState);

  useEffect(() => {
    if (token && userId) {
      setError("");
      setLoading(false);
    } else {
      setError("Missing token or userId");
      setLoading(false);
    }
  }, [token, userId, router.isReady]);

  const handleSubmit = async (e) => {
    console.log(userId, token);
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/passwordReset?token=${token}&userId=${userId}`,
        {
          userId,
          token,
          newPassword,
        }
      );

      setSuccess(true);
      setNewPassword("");
      toast.success(response.data.message);
      setConfirmPassword("");
      router.push("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (success) {
    return <div>Password reset successful!</div>;
  }

  return (
    <div className="">
      <ModuleHeader />

      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="bg-card shadow-lg bg-white mx-2 rounded-lg p-6 w-full max-w-md">
          {" "}
          <h2 className="text-2xl text-green-900 font-bold  text-center mb-4">
            Reset Your Password
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-primary"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md text-base shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                placeholder="Enter your new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-primary"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md text-base shadow-sm focus:outline-none focus:ring focus:ring-primary focus:border-primary"
                placeholder="Confirm your new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#008000] text-white text-primary-foreground py-2 rounded-lg hover:bg-primary/80 transition duration-300"
            >
              {loading ? (
                <div className="flex  items-center justify-center space-x-2">
                  <AiOutlineLoading3Quarters className="text-2xl  animate-spin" />{" "}
                  <p>Processing</p>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="md:mt-0 mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default PasswordReset;
