// src/app/folder/page.tsx
import React from "react";

import Header from "./components/Header";
import Folders from "./components/folder/Folders";

// 데이터 페칭 함수
async function fetchFolders() {
    const response = await fetch("http://localhost:3000/api/folder", {
        next: { revalidate: 10 },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

// 서버 컴포넌트
const FolderPage = async () => {
    try {
        const folders = await fetchFolders();

        return (
            <div>
                <div className="content-header">
                    <Header title={"파일"} routeUrl={"/folder/new-folder"} />
                </div>
                <div className="content-body">
                    <Folders folders={folders} />
                </div>
            </div>
        );
    } catch (error: any) {
        return <div>Error loading folders: {error.message}</div>;
    }
};

export default FolderPage;
