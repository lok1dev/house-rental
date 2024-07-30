import { Routes, Route } from "react-router-dom";

import {
    Home,
    Login,
    Homepage,
    RentalApartment,
    RentalHouse,
    RentalRoom,
    RentalSpace,
    DetailPost,
} from "./components/pages";
import { path } from "./utils/constant";

function App() {
    return (
        <div className="h-screen w-screen bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path="*" element={<Homepage />} />
                    <Route path={path.HOME__PAGE} element={<Homepage />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
                    <Route path={path.MAT_BANG} element={<RentalSpace />} />
                    <Route path={path.NHA_CHO_THUE} element={<RentalHouse />} />
                    <Route path={"chi-tiet/*"} element={<DetailPost />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
