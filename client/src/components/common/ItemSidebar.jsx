import icons from "../../utils/icons";

const { GrLinkNext } = icons;

const ItemSidebar = ({ content, title }) => {
    return (
        <div className="w-full p-4 rounded-md shadow bg-white">
            <h3 className="font-semibold ">{title}</h3>
            <div className="space-y-3 ml-1 mt-2">
                {content?.length > 0 &&
                    content.map((item) => {
                        return (
                            <div
                                key={item.code}
                                className="flex gap-2 text-sm text-gray-700 items-center hover:text-orange-500 cursor-pointer hover:translate-x-2 "
                            >
                                <GrLinkNext size={12} className="pt-1" />
                                <p className="border-b border-gray-300 border-dotted">
                                    {item.value}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ItemSidebar;
