import { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "../common";
import icons from "../../utils/icons";
import { dataIntro } from "../../constants";
import { formatVietnameseToString } from "../../utils";

const { FaStar } = icons;

const Intro = () => {
    const { categories } = useSelector((state) => state.app);

    return (
        <div className="w-full shadow-sm border border-gray-400 rounded-md flex flex-col items-center space-y-6 px-[6%] py-[4%] text-center mt-10">
            <h3 className="font-bold text-xl pt-10">{dataIntro.title}</h3>
            <p>
                {dataIntro.description}
                <span>
                    {categories?.map((item) => {
                        return (
                            <Link
                                key={item.code}
                                to={`/${formatVietnameseToString(item.value)}`}
                                className="text-blue-600 font-semibold hover:text-orange-500"
                            >
                                {` ${item.value.toLowerCase()},`}
                            </Link>
                        );
                    })}
                </span>
                {dataIntro.description2}
            </p>
            <div className="flex justify-between w-full px-[10%]">
                {dataIntro.statical.map((item) => {
                    return (
                        <div key={item.name} className="flex flex-col">
                            <span className="font-bold text-xl">{item.value}+</span>
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </div>

            <h3 className="font-bold text-xl pt-10">{dataIntro.priceTitle}</h3>
            <div className="flex text-yellow-400 text-xl gap-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
            </div>
            <p className="italic">{dataIntro.comment}</p>
            <p>{dataIntro.author}</p>

            <h3 className="font-bold text-xl pt-10">{dataIntro.question}</h3>
            <p>{dataIntro.answer}</p>
            <Button text="Đăng tin ngay" textColor={"text-white"} bgColor="bg-[#f73859]" />
        </div>
    );
};

export default memo(Intro);
