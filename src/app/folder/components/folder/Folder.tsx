// src/app/folder/components/Folder.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

function Folder({ item }: { item: IFolder }) {
    const router = useRouter();

    /**
     * 폴더 정보 페이지 이동
     */
    const handleClickFolderModify = () => {
        router.push(`/folder/${item.id}`);
    };

    /**
     * 폴더 id를 통해 파일 목록 페이지 이동
     */
    const handleClickFolder = () => {
        router.push(`/folder/${item.id}/files`);
    };

    return (
        <article
            key={item.id}
            className="folder-item"
            onClick={handleClickFolder}
        >
            <div className="folder-icon">📁</div>
            <div className="folder-details">
                <div className="folder-name">{item.folderName}</div>
                <span className="folder-status">비어있음</span>
            </div>
            <div className="folder-options" onClick={handleClickFolderModify}>
                <BsThreeDots />
            </div>
        </article>
    );
}

export default Folder;
