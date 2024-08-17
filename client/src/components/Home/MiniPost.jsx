import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";

const MiniPost = ({ image, title, price, createAt }) => {
   return (
      <div className="flex items-center w-full gap-4 border-b border-gray-300 pb-4 cursor-pointer ">
         <img src={image[0]} alt="img" className="w-[65px] h-[65px] rounded-md " />
         <div className="space-y-2">
            <h4 className="text-sm text-blue-500 hover:underline">{`${title?.slice(
               0,
               40
            )}...`}</h4>
            <div className="flex justify-between items-center">
               <span className="font-semibold text-sm text-green-600">{price}</span>
               <span className="text-xs text-gray-400">{moment(createAt).fromNow()}</span>
            </div>
         </div>
      </div>
   );
};

export default memo(MiniPost);
