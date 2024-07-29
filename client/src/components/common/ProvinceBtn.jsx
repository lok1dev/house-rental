import { memo } from "react";

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className=" text-blue-600 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:text-orange-500">
      <img
        className="w-[220px] h-[110px] object-cover rounded-tl-lg rounded-tr-lg"
        src={image}
        alt=""
      />
      <p className=" font-bold py-2  ">{name}</p>
    </div>
  );
};

export default memo(ProvinceBtn);
