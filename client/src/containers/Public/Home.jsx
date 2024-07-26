import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Search, Navigation } from "./index";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center ">
      <Header />
      <Navigation />
      <div className="w-4/5 flex justify-center items-center flex-col">
        <Search />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
