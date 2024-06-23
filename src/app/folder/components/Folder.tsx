// src/app/folder/components/Folder.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

function Folder({ item }: { item: IFolder }) {
    const router = useRouter();

    const onClick = () => {
        router.push(`/folder/${item.id}`);
    };

    return (
        <article key={item.id} className="folder-item" onClick={onClick}>
            <div className="item-title">{item.folderName}</div>
            <BsThreeDots />
        </article>
    );
}

export default Folder;
