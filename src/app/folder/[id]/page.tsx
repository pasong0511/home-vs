//src/app/folder/[id]/page.tsx
import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import FolderDetail from "../components/FolderDetail";

function FolderDetailPage({ params }: any) {
    const { id } = params;

    return <FolderDetail id={id} />;
}

export default FolderDetailPage;
