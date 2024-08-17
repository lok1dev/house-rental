const validateFields = (payload, setInvalidFields) => {
   let invalids = 0;
   let fields = Object.entries(payload);

   fields.forEach((item) => {
      if (item[1] === "") {
         setInvalidFields((prev) => [
            ...prev,
            {
               name: item[0],
               message: "Bạn nhập thiếu trường này",
            },
         ]);
         invalids++;
      }
   });
   fields.forEach((item) => {
      switch (item[0]) {
         case "password":
            if (item[1].length < 8) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     message: "Mật khẩu phải lớn hơn 8 kí tự",
                  },
               ]);
               invalids++;
            }
            break;
         case "phone":
            if (!+item[1]) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     message: "Số điện thoại không hợp lệ",
                  },
               ]);
               invalids++;
            }
            break;
         case "priceNumber":
         case "acreageNumber":
            if (+item[1] === 0) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     message: "Hãy nhập giá trị hợp lệ",
                  },
               ]);
               invalids++;
            }
            if (!+item[1]) {
               setInvalidFields((prev) => [
                  ...prev,
                  {
                     name: item[0],
                     message: "Hãy nhập giá trị là số",
                  },
               ]);
               invalids++;
            }
            break;
         default:
            break;
      }
   });
   return invalids;
};

export default validateFields;
