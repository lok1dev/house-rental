import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center ">
      <Header />
      <Navigation />
      <div className="w-3/5 flex justify-center items-center flex-col">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
