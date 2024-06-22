"use client";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

function Folder({ item }: { item: IFolder }) {
    return (
        <article key={item.id} className="folder-item">
            <div className="item-title">{item.title}</div>
            <BsThreeDots />
        </article>
    );
}

export default Folder;
