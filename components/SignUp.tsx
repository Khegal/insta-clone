import React from "react";
import Link from "next/link";

const Signup = () => {
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
          <form action="" className="flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <span className="absolute text-sm font-normal left-2 text-[#737373] top-1/2 -translate-y-1/2">
                  Mobile number or Email
                </span>
                <input
                  type="text"
                  className="w-full pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute text-sm font-normal left-2 text-[#737373] top-1/2 -translate-y-1/2">
                  Full Name
                </span>
                <input
                  type="text"
                  className="w-full pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute text-sm font-normal left-2 text-[#737373] top-1/2 -translate-y-1/2">
                  Username
                </span>
                <input
                  type="text"
                  className="w-full pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <span className="absolute text-sm font-normal left-2 text-[#737373] top-1/2 -translate-y-1/2">
                  Password
                </span>
                <input
                  type="password"
                  className="w-full pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border border-[#e5e7eb] rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <button className="bg-[#0095f6] w-full py-2 text-sm font-semibold text-white rounded-lg hover:bg-[#007ace] transition-all duration-300">
                Sign up
              </button>
            </div>
            <div className="my-4 flex items-center">
              <div className="border-t flex-grow border-[#e5e7eb]"></div>
              <div className="mx-2 text-sm font-semibold text-[#737373]">
                OR
              </div>
              <div className="border-t flex-grow border-[#e5e7eb]"></div>
            </div>
            <div className="mb-4 flex justify-center">
              <button className="bg-none border-none font-semibold text-sm text-[#385185]">
                Sign up with Facebook
              </button>
            </div>
          </form>
          <div className="text-center text-xs text-[#737373] mt-4">
            By signing up, you agree to our Terms, Privacy Policy, and Cookies
            Policy.
          </div>
        </div>

        <div className="border-t py-4 flex justify-center">
          <span className="text-sm text-[#737373]">
            Already have an account?
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
