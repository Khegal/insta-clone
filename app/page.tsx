import SignIn from "@/components/SignIn";

const Home = () => {
  return (
    <div className=" flex justify-center items-center h-screen flex-grow">
      <div className="mt-8 mx-auto pb-8 max-w-md">
        <div className="mt-3">
          <SignIn></SignIn>
        </div>
      </div>
    </div>
  );
};

export default Home;
