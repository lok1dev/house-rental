import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Province, ItemSidebar } from "../common/index";
import { List, Pagination } from "../layout/index";
import { text } from "../../utils/constant";

const Homepage = () => {
  const [params] = useSearchParams();

  const { categories } = useSelector((state) => state.app);

  console.log(categories);

  return (
    <div className="w-full pt-2 space-y-4">
      <h1 className="font-bold text-2xl">{text.HOME_TITLE}</h1>
      <p className="text-gray-500">{text.HOME_DESCRIPTION}</p>
      <h2 className="text-center font-semibold text-lg">Khu vực nổi bật</h2>

      <Province />
      <div className="flex gap-4">
        <div className="w-[70%]">
          <List page={params.get("page")} />
          <Pagination page={params.get("page")} />
        </div>
        <div className="w-[30%] flex flex-col gap-4">
          <ItemSidebar title="Danh sách cho thuê" content={categories} />
          <ItemSidebar title="Xem theo giá" />
          <ItemSidebar title="Xem theo diện tích" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
