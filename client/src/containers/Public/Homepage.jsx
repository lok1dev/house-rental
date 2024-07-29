import { Province } from "../../components";
import { text } from "../../utils/constant";
import { List, Pagination } from "./index";
import { useParams, useSearchParams } from "react-router-dom";

const Homepage = () => {
  const [params] = useSearchParams();

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
        <div className="w-[30%]">Sidebar</div>
      </div>
    </div>
  );
};

export default Homepage;
