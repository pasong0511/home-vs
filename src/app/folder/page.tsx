import { folders } from "@/mock/folder";
import React from "react";
import Folder from "./components/Folder";

import { BsFillPlusCircleFill } from "react-icons/bs";

const page = async () => {
    return (
        <div>
            <div className="folder-header">
                <span className="folder-title">폴더</span>
                <span>
                    <BsFillPlusCircleFill />
                </span>
            </div>
            <div className="folder-list">
                {folders.map((item) => {
                    return <Folder key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default page;
