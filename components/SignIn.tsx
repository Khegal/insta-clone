export const SignIn = () => {
  return (
    <div className="border py-2.5 flex justify-center w-[350px] flex-grow flex-col items-center">
      <div className="h-[55px] mt-9 mb-3">
        <div
          role="img"
          aria-label="Instagram"
          className="bg-[url('https://static.cdninstagram.com/rsrc.php/v3/ym/r/BQdTmxpRI6f.png')] 
                     bg-no-repeat bg-[0px_0px] bg-[length:176px_181px] w-[175px] h-[51px]"
        ></div>
      </div>
      <div className="mb-3">
        <form>
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
        </form>
      </div>
    </div>
  );
};
