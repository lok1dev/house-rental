import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { Search, Header, Navigation, Intro, Contact } from "../components/layout/index";
import { path } from "../constants";

const AppLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const location = useLocation();

    return (
        <div className="h-full w-full flex flex-col items-center ">
            <Header />
            <Navigation />
            <div className="w-3/5 flex justify-center items-center flex-col">
                {isLoggedIn &&
                    location.pathname !== `/${path.CONTACT}` &&
                    !location.pathname?.includes(path.DETAIL) && <Search />}
                <Outlet />
                <Intro />
                <Contact />
            </div>
        </div>
    );
};

export default AppLayout;
