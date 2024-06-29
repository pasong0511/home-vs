//src/app/folder/[id]/page.tsx
import React, { useEffect, useState } from "react";

import FolderForm from "../components/folder/FolderForm";

function FolderDetailPage({ params }: any) {
    const { id } = params;

    return <FolderForm id={id} />;
}

export default FolderDetailPage;
