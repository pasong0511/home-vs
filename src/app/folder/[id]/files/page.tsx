//src/app/folder/[id]/files/page.tsx
import React from "react";
import FilesList from "../../components/file/FilesList";
import Header from "../../components/Header";

function FilesPage({ params }: any) {
    const { id } = params;

    console.log("파일즈 id", id);

    return (
        <div>
            {/* 파일 생성 버튼 */}
            <Header
                title={"폴더"}
                routeUrl={`/folder/new-folder/${id}/new-file`}
            />

            {/* 파일 목록 */}
            <FilesList folderId={id} />
        </div>
    );
}

export default FilesPage;

//http://localhost:3000/folder/8da01656-5c2b-4e9f-bd14-aae4e975ce48/new-files
