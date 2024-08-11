import { memo } from "react";

import { ProvinceBtn } from "./";
import { location } from "../../constants";

const Province = () => {
    return (
        <div className="flex justify-center gap-4">
            {location.map((item) => {
                return <ProvinceBtn key={item.id} name={item.name} image={item.image} />;
            })}
        </div>
    );
};

export default memo(Province);
