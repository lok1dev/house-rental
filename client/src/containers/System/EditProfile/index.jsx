import React, { useState } from "react";

import { Button, InputFormV2, InputReadOnly } from "../../../components/common";

const EditProfile = () => {
   const [invalidFields, setInvalidFields] = useState([]);
   return (
      <div className="px-6">
         <h1 className="text-2xl font-medium py-4 border-b border-gray-200">
            Sửa thông tin cá nhân
         </h1>
         <div className="flex justify-center min-h-screen">
            <div className="w-3/5 mt-10 space-y-6">
               <InputReadOnly label="Mã thành viên" isFlexRow />
               <InputReadOnly label="Số điện thoại" isFlexRow />
               <InputFormV2
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  label="Tên hiển thị"
                  isFlexRow
               />
               <InputFormV2
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  label="Email"
                  isFlexRow
               />
               <InputFormV2
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  label="Zalo"
                  isFlexRow
               />
               <InputFormV2
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  label="Facebook"
                  isFlexRow
               />
               <div className="flex items-center gap-2 ">
                  <span className="w-48 flex-none font-medium">Mật khẩu</span>
                  <small className="flex-auto text-blue-400">Đổi mật khẩu</small>
               </div>
               <div className="flex items-center gap-2 ">
                  <span className="w-48 flex-none font-medium">Ảnh đại diện</span>
                  <div className="flex-auto">
                     <img src={"/user.png"} alt="" className="size-20" />
                     <small className="flex-auto text-blue-400">Sửa ảnh đại diện</small>
                  </div>
               </div>
               <Button
                  text="Sửa thông tin"
                  textColor="text-white"
                  bgColor="bg-blue-400"
                  widthFull
               />
            </div>
         </div>
      </div>
   );
};

export default EditProfile;
