import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Search, Header, Navigation, Intro, Contact } from "../components/layout/index";

const AppLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    return (
        <div className="h-full w-full flex flex-col items-center ">
            <Header />
            <Navigation />
            <div className="w-3/5 flex justify-center items-center flex-col">
                {isLoggedIn && <Search />}
                <Outlet />
                <Intro />
                <Contact />
            </div>
        </div>
    );
};

export default AppLayout;
