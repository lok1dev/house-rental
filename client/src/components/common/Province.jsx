import { ProvinceBtn } from "./index";
import { location } from "../../utils/constant";

const Province = () => {
    return (
        <div className="flex justify-center gap-4">
            {location.map((item) => {
                return <ProvinceBtn key={item.id} name={item.name} image={item.image} />;
            })}
        </div>
    );
};

export default Province;
