import React from "react";

interface FilesListProps {
    folderId: string;
}

function FilesList(props: FilesListProps) {
    return (
        <div>
            <div>폴더 아이디{props.folderId}</div>
        </div>
    );
}

export default FilesList;
