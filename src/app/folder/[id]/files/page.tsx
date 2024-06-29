//src/app/folder/[id]/files/page.tsx
import React from "react";
import FilesList from "../../components/FilesList";

function FilesPage({ params }: any) {
    const { id } = params;

    console.log("파일즈 id", id);

    return (
        <div>
            <FilesList folderId={id}></FilesList>
        </div>
    );
}

export default FilesPage;
