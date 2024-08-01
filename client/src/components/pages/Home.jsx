import { Outlet } from "react-router-dom";

import { Search, Header, Navigation, Intro, Contact } from "../layout/index";

const Home = () => {
    return (
        <div className="h-full w-full flex flex-col items-center ">
            <Header />
            <Navigation />
            <div className="w-3/5 flex justify-center items-center flex-col">
                <Search />
                <Outlet />
                <Intro />
                <Contact />
            </div>
        </div>
    );
};

export default Home;
