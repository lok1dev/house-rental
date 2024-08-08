import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ItemSidebar, RelatedPost } from "../common/index";
import { List, Pagination } from "../layout/index";

const SearchDetail = () => {
    const { categories, prices, acreage } = useSelector((state) => state.app);
    const location = useLocation();

    return (
        <div className="w-full pt-2 space-y-4">
            <h1 className="font-bold text-2xl">
                {location.state?.titleSearch || "Kết quả tìm kiếm"}
            </h1>
            <p className="text-gray-500">{`${location.state?.titleSearch} phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
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
                    <RelatedPost />
                </div>
            </div>
        </div>
    );
};
export default SearchDetail;
