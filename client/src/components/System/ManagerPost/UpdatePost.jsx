import React from "react";
import CreatePost from "../../../containers/System/CreatePost";
import icons from "../../../utils/icons";

const { FaRegWindowClose } = icons;

const UpdatePost = ({ setIsEdit }) => {
    return (
        <div
            className="fixed top-[-16px] right-0 bottom-0 left-0 bg-overlay-30 overflow-y-auto flex justify-center"
            onClick={(e) => {
                e.stopPropagation();
                setIsEdit(false);
            }}
        >
            <div
                className="bg-white w-3/5 h-max pt-2 pb-10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="right-4 absolute p-4">
                    <FaRegWindowClose
                        size={20}
                        cursor="pointer"
                        onClick={() => setIsEdit(false)}
                    />
                </div>
                <CreatePost isEdit setIsEdit={setIsEdit} />
            </div>
        </div>
    );
};

export default UpdatePost;
