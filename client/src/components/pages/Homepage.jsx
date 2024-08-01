import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Province, ItemSidebar } from "../common/index";
import { List, Pagination } from "../layout/index";
import { text } from "../../utils/constant";
import * as actions from "../../store/actions";

const Homepage = () => {
    const dispatch = useDispatch();

    const { categories, prices, acreage } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAcreage());
    }, []);

    return (
        <div className="w-full pt-2 space-y-4">
            <h1 className="font-bold text-2xl">{text.HOME_TITLE}</h1>
            <p className="text-gray-500">{text.HOME_DESCRIPTION}</p>
            <h2 className="text-center font-semibold text-lg">Khu vực nổi bật</h2>

            <Province />
            <div className="flex gap-4">
                <div className="w-[70%]">
                    <List />
                    <Pagination />
                </div>
                <div className="w-[30%] flex flex-col gap-4">
                    <ItemSidebar title="Danh sách cho thuê" content={categories} />
                    <ItemSidebar title="Xem theo giá" type="priceCode" content={prices} cols2 />
                    <ItemSidebar
                        title="Xem theo diện tích"
                        type="acreageCode"
                        content={acreage}
                        cols2
                    />
                </div>
            </div>
        </div>
    );
};

export default Homepage;
