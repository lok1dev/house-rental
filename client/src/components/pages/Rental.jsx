import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import { Province, ItemSidebar, RelatedPost } from "../common/index";
import { List, Pagination } from "../layout/index";
import { text } from "../../utils/constant";
import * as actions from "../../store/actions";
import { formatVietnameseToString } from "../../utils/Common";

const Rental = () => {
    const { categories, prices, acreage } = useSelector((state) => state.app);
    const [categoryCurrent, setCategoryCurrent] = useState("");
    const [categoryCode, setCategoryCode] = useState("none");
    const location = useLocation();

    useEffect(() => {
        const category = categories?.find(
            (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
        );
        setCategoryCurrent(category);
        if (category) {
            setCategoryCode(category.code);
        }
    }, [location]);

    return (
        <div className="w-full pt-2 space-y-4">
            <h1 className="font-bold text-2xl">{categoryCurrent?.header}</h1>
            <p className="text-gray-500">{categoryCurrent?.subHeader}</p>
            <h2 className="text-center font-semibold text-lg">Khu vực nổi bật</h2>

            <Province />
            <div className="flex gap-4">
                <div className="w-[70%]">
                    <List categoryCode={categoryCode} />
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
                    <RelatedPost />
                </div>
            </div>
        </div>
    );
};
export default Rental;
