import { memo } from "react";
import { Link, createSearchParams, useNavigate, useLocation } from "react-router-dom";

import icons from "../../utils/icons";
import { formatVietnameseToString } from "../../utils";

const { GrLinkNext } = icons;

const ItemSidebar = ({ content, title, cols2, type }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleFilterPosts = (code) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({ [type]: code }).toString(),
        });
    };

    return (
        <div className="w-full p-4 rounded-md shadow bg-white">
            <h3 className="font-semibold mb-4">{title}</h3>
            {!cols2 && (
                <div className="flex flex-col gap-4 ">
                    {content?.length > 0 &&
                        content.map((item) => {
                            return (
                                <Link
                                    to={formatVietnameseToString(item.value)}
                                    key={item.code}
                                    className="flex gap-2 text-sm text-gray-700 items-center hover:text-orange-500 cursor-pointer hover:translate-x-2"
                                >
                                    <GrLinkNext size={14} />
                                    <p className="border-b border-gray-300 border-dotted w-full ">
                                        {item.value}
                                    </p>
                                </Link>
                            );
                        })}
                </div>
            )}

            {cols2 && (
                <div className=" flex flex-wrap gap-4 ">
                    {content?.length > 0 &&
                        content.map((item) => {
                            return (
                                <div
                                    onClick={() => handleFilterPosts(item.code)}
                                    key={item.code}
                                    className="flex gap-2 items-center text-sm text-gray-700 items-center hover:text-orange-500 cursor-pointer hover:translate-x-2 min-w-[40%]"
                                >
                                    <GrLinkNext size={14} />
                                    <p className="border-b border-gray-300 border-dotted w-full">
                                        {item.value}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default memo(ItemSidebar);
