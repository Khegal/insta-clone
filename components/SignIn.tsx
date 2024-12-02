export const SignIn = () => {
  return (
    <div className="flex justify-center mx-auto mt-8 pb-8 w-full h-screen flex-col">
      <div className="flex flex-grow flex-col mt-3 w-[350px] justify-center">
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
          <div className="w-full mb-3">
            <form action="" className="flex flex-col">
              <div className="mt-6">
                <div className="mx-10 mb-1.5 border relative flex items-center border-[#e5e7eb] rounded">
                  <span className="absolute text-[12px] font-normal left-2 text-[#737373] top-1/2 -translate-y-1/2">
                    Phone number, username, or email
                  </span>
                  <input
                    type="email"
                    className="w-[268px] pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border-transparent"
                  />
                </div>
                <div className="mx-10 mb-1.5 border relative flex items-center border-[#e5e7eb] rounded">
                  <span className="absolute text-[12px] font-normal left-2 text-[#737373] top-1/2 -translate-y-1/2">
                    Password
                  </span>
                  <input
                    type="password"
                    className="w-[268px] pb-[7px] pt-[9px] pl-2 h-9 bg-[#fafafa] focus:outline-none focus:border-[#0095f6] border-transparent"
                  />
                </div>
                <div className="mx-10 my-2 relative">
                  <button className="bg-[#0095f6] w-full px-4 py-[7px] text-sm leading-[18px] rounded-lg text-white font-semibold hover:bg-[#007ace] transition-all duration-300">
                    Log in
                  </button>
                </div>
                <div className="mx-10 mt-[14px] mb-[22px] flex items-center">
                  <div className="border-t flex-grow border-[#e5e7eb]"></div>
                  <div className="mx-[18px] text-[13px] font-semibold leading-none text-[#737373]">
                    OR
                  </div>
                  <div className="border-t flex-grow border-[#e5e7eb]"></div>
                </div>
                <div className="mx-10 my-2 flex justify-center items-center">
                  <button className="bg-none border-none font-semibold text-sm text-[#385185]">
                    <span> </span>Log in with Facebook
                  </button>
                </div>
              </div>
              <a
                href=""
                className="text-[#385185] text-sm flex justify-center text-center"
              >
                Forgot password?
              </a>
            </form>
          </div>
        </div>

        <div className="border mb-2.5 py-2.5 flex justify-center">
          <span>
            Don&apos;t have an account?
            <a href="/signUp" className="text-[#0095f6] font-semibold">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
