import React, { memo } from "react";

const InputReadOnly = ({ label, value, isFlexRow }) => {
   return (
      <div className={`flex gap-2 ${!isFlexRow && "flex-col"}`}>
         <label htmlFor="exactly-address" className="font-medium  w-48 flex-none">
            {label}
         </label>
         <div className="flex flex-auto">
            <input
               id="exactly-address"
               type="text"
               readOnly
               className="border border-gray-200 bg-gray-100 flex-auto rounded-md outline-none cursor-default p-2"
               value={value}
            />
         </div>
      </div>
   );
};

export default memo(InputReadOnly);
