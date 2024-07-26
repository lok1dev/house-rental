import { memo, useState } from "react";

import icons from "../utils/icons";

const { FaStar, FaHeart, FaRegHeart, BsBookmarkStarFill } = icons;

const Item = ({
  images,
  title,
  user,
  star,
  description,
  attributes,
  address,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);
  const indexs = [0, 1, 2, 3];

  return (
    <div className="w-full flex border-t border-orange-500 py-4 bg-orange-50">
      <div className="w-2/5">
        <div className="flex flex-wrap gap-1 cursor-pointer relative">
          {images.length > 0 &&
            images
              .filter((i, index) => indexs.some((i) => i === index))
              ?.map((i, index) => {
                return (
                  <img
                    key={index}
                    src={i}
                    alt=""
                    className="w-[150px] h-[130px] object-cover"
                  />
                );
              })}
          {images.length > 0 ? (
            <div>
              <span className="text-white bg-overlay-30 rounded-md px-1 absolute bottom-1 left-1">
                {`${images.length} ảnh`}
              </span>
              <span
                className=" rounded-md px-1 absolute bottom-1 right-7"
                onMouseEnter={() => {
                  setIsHoverHeart(true);
                }}
                onMouseLeave={() => {
                  setIsHoverHeart(false);
                }}
              >
                {isHoverHeart ? (
                  <FaHeart className="text-red-600" />
                ) : (
                  <FaRegHeart className="text-white" />
                )}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="w-3/5 space-y-4">
        <div className="flex justify-between gap-2">
          <div className="font-bold text-red-500 hover:underline cursor-pointer items-center">
            <FaStar className="star-item " size={12} />
            <FaStar className="star-item " size={12} />
            <FaStar className="star-item " size={12} />
            <FaStar className="star-item " size={12} />
            <FaStar className="star-item mr-2 " size={12} />
            {title}
          </div>
          <BsBookmarkStarFill className="pt-1  text-yellow-300" size={30} />
        </div>
        <div className="flex mt-2 gap-6">
          <span className="font-bold text-sm text-green-500 min-w-[120px]">
            {attributes?.price}
          </span>
          <span className="text-sm font-bold ">{attributes?.acreage}</span>
          <span className="pr-2 text-sm">{address}</span>
        </div>
        <p className=" text-gray-500 w-full, h-[52px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover pt-1"
              src="https://png.pngtree.com/png-vector/20220618/ourlarge/pngtree-anonymous-unknown-avatar-icon-unnamed-png-image_5209139.png"
              alt=""
            />
            <span className="pl-1 text-gray-500">{user.name}</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white rounded-md px-2 py-1 font-medium text-sm">
              {`Gọi ${user.phone}`}
            </button>
            <button className="bg-white text-blue-500 rounded-md px-2 py-1 font-medium text-sm border border-blue-500 hover:text-white hover:bg-blue-500">
              Nhắn zalo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
