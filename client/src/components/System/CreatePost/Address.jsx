import { memo, useEffect, useState } from "react";

import { InputReadOnly, Select } from "../../common";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../../../services";

const Address = ({ setPayload }) => {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState();
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const publicProvinces = async () => {
            const response = await apiGetPublicProvinces();
            if (response.status === 200) setProvinces(response?.data?.results);
        };

        publicProvinces();
    }, []);

    useEffect(() => {
        setDistrict(null);
        const publicDistrict = async () => {
            const response = await apiGetPublicDistrict(province);
            if (response.status === 200) setDistricts(response?.data?.results);
        };
        province && publicDistrict();
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([]);
    }, [province]);

    useEffect(() => {
        setPayload((prev) => ({
            ...prev,
            province: province
                ? provinces.find((item) => item.province_id === province)?.province_name
                : "",
            address: `${
                district
                    ? `${districts.find((item) => item.district_id === district)?.district_name},`
                    : ""
            } ${
                province
                    ? provinces.find((item) => item.province_id === province)?.province_name
                    : ""
            }`,
        }));
    }, [province, district]);

    return (
        <div className="">
            <h2 className="font-bold text-xl py-4 mt-2">Địa chỉ cho thuê</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Select
                        type="province"
                        value={province}
                        setValue={setProvince}
                        label="Tỉnh/ Thành phố"
                        options={provinces}
                    />
                    <Select
                        type="district"
                        value={district}
                        setValue={setDistrict}
                        options={districts}
                        reset={reset}
                        label="Quận/ Huyện"
                    />
                </div>
                <InputReadOnly
                    label="Địa chỉ chính xác"
                    value={`${
                        district
                            ? `${
                                  districts.find((item) => item.district_id === district)
                                      ?.district_name
                              },`
                            : ""
                    } ${
                        province
                            ? provinces.find((item) => item.province_id === province)?.province_name
                            : ""
                    }`}
                />
            </div>
        </div>
    );
};

export default memo(Address);
