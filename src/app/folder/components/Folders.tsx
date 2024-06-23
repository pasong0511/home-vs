"use client";
import React from "react";
import Folder from "./Folder";

function Folders({ folders }: { folders: IFolder[] }) {
    return folders.map((item: any) => <Folder key={item.id} item={item} />);
}

export default Folders;
