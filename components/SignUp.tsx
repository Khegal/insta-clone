"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";
import { redirect } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const { isSignedIn, setIsSignedIn } = useContext(UserContext);

  const [formValues, setFormValues] = useState({
    credential: "",
    fullName: "",
    userName: "",
    password: "",
  });
  if (isSignedIn) {
    return redirect("/");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { credential, fullName, userName, password } = formValues;

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/signup`, {
        credential,
        password,
        fullName,
        userName,
      })
      .then(() => {
        toast.success("Та амжилттай бүртгүүллээ!");
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="flex flex-col w-[350px] p-6 border border-[#e5e7eb] bg-white">
        <div className="mb-6 flex justify-center">
          <div
            role="img"
            aria-label="Instagram"
            className="w-[175px] h-[51px]"
            style={{
              backgroundImage:
                "url('https://static.cdninstagram.com/rsrc.php/v3/ym/r/BQdTmxpRI6f.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "176px 181px",
              backgroundPosition: "0 0",
            }}
          ></div>
        </div>

        <div className="flex flex-col mb-4">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              name="credential"
              type="text"
              value={formValues.credential}
              onChange={handleChange}
              placeholder="Credential"
              className="w-full mb-4 pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
            />

            <input
              name="fullName"
              type="text"
              value={formValues.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full mb-4 pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
            />

            <input
              name="userName"
              type="text"
              value={formValues.userName}
              onChange={handleChange}
              placeholder="Username"
              className="w-full mb-4 pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
            />

            <input
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full mb-4 pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
            />

            <button
              type="submit"
              className="bg-[#0095f6] w-full py-2 text-sm font-semibold text-white rounded-lg hover:bg-[#007ace] transition-all duration-300"
            >
              Sign up
            </button>

            <div className="my-4 flex items-center">
              <div className="border-t flex-grow border-[#e5e7eb]"></div>
              <div className="mx-2 text-sm font-semibold text-[#737373]">
                OR
              </div>
              <div className="border-t flex-grow border-[#e5e7eb]"></div>
            </div>

            <button className="mb-4 bg-none border-none font-semibold text-sm text-[#385185]">
              Sign up with Facebook
            </button>
          </form>

          <div className="text-center text-xs text-[#737373] mt-4">
            By signing up, you agree to our Terms, Privacy Policy, and Cookies
            Policy.
          </div>
        </div>

        <div className="border-t py-4 flex justify-center">
          <span className="text-sm text-[#737373]">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#0095f6] font-semibold">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
