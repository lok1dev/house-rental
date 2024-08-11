import { useSelector } from "react-redux";

import { Province, ItemSidebar, RelatedPost, List, Pagination } from "../../components/Home";
import { text } from "../../constants";

const Home = () => {
    const { categories, prices, acreage } = useSelector((state) => state.app);

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
                    <RelatedPost />
                </div>
            </div>
        </div>
    );
};

export default Home;
