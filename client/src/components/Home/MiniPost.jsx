import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../../utils";
import { path } from "../../constants";
import icons from "../../utils/icons";

const { FaStar } = icons;

const MiniPost = ({ image, title, price, createAt, id, star }) => {
    const handleStar = (star) => {
        let stars = [];
        for (let i = 1; i <= +star; i++)
            stars.push(<FaStar className="star-item " size={12} />);
        return stars;
    };

    return (
        <div className="flex items-center w-full gap-4 border-b border-gray-300 pb-4 cursor-pointer">
            <img
                src={image[0]}
                alt="img"
                className="w-[65px] h-[65px] rounded-md object-cover"
            />
            <div className="space-y-2 ">
                <div className="flex">
                    <Link
                        to={`${path.DETAIL}${formatVietnameseToString(title).replaceAll(
                            "/",
                            ""
                        )}/${id}`}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        {handleStar(+star).length > 0 &&
                            handleStar(+star).map((star, number) => {
                                return <span key={number}>{star}</span>;
                            })}
                        {`${title?.slice(0, 40)}...`}
                    </Link>
                </div>
                <div className="flex justify-between items-center gap-1">
                    <span className="font-semibold text-sm text-green-600 overflow-hidden 3/4">
                        {price}
                    </span>
                    <span className="text-xs text-gray-400 text-ellipsis whitespace-nowrap overflow-hidden">
                        {moment(createAt).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(MiniPost);
