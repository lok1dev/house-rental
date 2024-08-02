import icons from "../../utils/icons";

const { GrLinkPrevious } = icons;

const Modal = ({ setShowModal, content, name }) => {
    return (
        <div
            className="fixed top-0 bottom-0 left-0 right-0  bg-overlay-30 z-10 flex"
            onClick={() => {
                setShowModal(false);
            }}
        >
            <div
                className="w-1/3 m-auto bg-white rounded-md px-4"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                }}
            >
                <div className="h-10 gap-56 flex items-center border-b border-gray-400 py-6">
                    <span
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowModal(false);
                        }}
                    >
                        <GrLinkPrevious size={30} />
                    </span>
                    <h3 className="font-bold text-xl">{name.toUpperCase()}</h3>
                </div>
                <div className="py-4 flex flex-col gap-4 px-6">
                    {content.map((item) => {
                        return (
                            <div
                                key={item.code}
                                className="flex gap-4 items-center border-b border-gray-300 pb-2"
                            >
                                <input type="radio" name={name} id={item.code} value={item.code} />
                                <label htmlFor={item.code} className="cursor-pointer">
                                    {item.value}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Modal;
