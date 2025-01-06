"use client";

import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const { setAccessToken } = useContext(UserContext);

  const [formValues, setFormValues] = useState({
    credential: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { credential, password } = formValues;

    // API request
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/api/auth/signin`, {
        credential,
        password,
      })
      .then((res) => {
        toast.success("Та амжилттай signed in!");
        setAccessToken(res.data.accessToken);
        router.push("/");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "An error occurred");
      });
  };
  return (
    <div className="flex justify-center mx-auto mt-8 pb-8 w-full h-screen flex-col">
      <div className="flex flex-grow flex-col mt-3 w-[350px] justify-center">
        {/* Logo Section */}
        <div className="border mb-2.5 py-2.5 overflow-hidden">
          <div className="mt-9 mb-3 h-[55px] flex justify-center">
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

          {/* Form Section */}
          <div className="w-full mb-3">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mt-6">
                {/* Email Input */}
                <div className="mx-10 mb-1.5 border relative flex items-center border-[#e5e7eb] rounded">
                  <input
                    name="credential"
                    type="text"
                    value={formValues.credential}
                    onChange={handleChange}
                    placeholder="Phone number, username, or email"
                    className="w-[268px] pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border-transparent"
                  />
                </div>

                <div className="mx-10 mb-1.5 border relative flex items-center border-[#e5e7eb] rounded">
                  <input
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-[268px] pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="mx-10 my-2 relative">
                  <button
                    type="submit"
                    className="bg-[#0095f6] w-full px-4 py-[7px] text-sm leading-[18px] rounded-lg text-white font-semibold hover:bg-[#007ace] transition-all duration-300"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
