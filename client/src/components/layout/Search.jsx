import { SearchItem } from "../common";
import icons from "../../utils/icons";

const {
    MdOutlineNavigateNext,
    TbReportMoney,
    IoLocationOutline,
    FaCropSimple,
    MdApartment,
    FaDeleteLeft,
    FaSearch,
} = icons;

const Search = () => {
    return (
        <div className="w-full  flex-col lg:flex-row bg-yellow-400 rounded-lg flex items-center px-4 py-1 gap-4 mt-2">
            <SearchItem
                text="Phòng trọ, nhà trọ"
                iconBefore={<MdApartment />}
                iconAfter={<FaDeleteLeft />}
                fontWeight
            />
            <SearchItem
                text="Toàn quốc"
                iconBefore={<IoLocationOutline />}
                iconAfter={<MdOutlineNavigateNext />}
            />
            <SearchItem
                text="Chọn giá"
                iconBefore={<TbReportMoney />}
                iconAfter={<MdOutlineNavigateNext />}
            />
            <SearchItem
                text="Chọn diện tích"
                iconBefore={<FaCropSimple />}
                iconAfter={<MdOutlineNavigateNext />}
            />
            <button
                type="button"
                className="text-white outline-none px-4 py-2  bg-secondary rounded-lg min-w-[120px] flex items-center gap-2 "
            >
                <FaSearch />
                <p className=" text-sm font-medium  ">Search</p>
            </button>
        </div>
    );
};

export default Search;
