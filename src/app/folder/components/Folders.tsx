"use client";
import React from "react";
import Folder from "./Folder";

function Folders({ folders }: { folders: IFolder[] }) {
    return (
        <div className="folder-list">
            {folders.map((item: any) => (
                <Folder key={item.id} item={item} />
            ))}
        </div>
    );
}

export default Folders;
