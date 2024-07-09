"use client";

//src\app\folder\components\folder\FolderForm.tsx
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface FolderFormProps {
    id?: string;
}

function FolderForm({ id }: FolderFormProps) {
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        folderName: "",
        location: "",
        memo: "",
        option: {},
    });
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const method = isEditMode ? "PUT" : "POST";
        const url = isEditMode ? `/api/folder/${id}` : "/api/folder";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // 폴더 생성 후 페이지 전환과 새로고침
            router.push("/folder");
        } else {
            // 에러 처리 추가 필요함
            console.log("Failed to add folder", formData);
        }
    };

    useEffect(() => {
        //id가 존재할때만
        if (isEditMode) {
            const fetchFolder = async () => {
                const response = await fetch(`/api/folder/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        folderName: data.folderName || "",
                        location: data.location || "",
                        memo: data.memo || "",
                        option: data.option || {},
                    });
                }
            };

            fetchFolder();
        }
    }, [id, isEditMode]);

    return (
        <div>
            <h1>{isEditMode ? "폴더 수정" : "새 폴더 만들기"}</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">{isEditMode ? "수정" : "생성"}</button>
                <div>
                    <span>폴더이름</span>
                    <input
                        type="text"
                        name="folderName"
                        value={formData.folderName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span>지역</span>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <span>메모</span>
                    <input
                        type="text"
                        name="memo"
                        value={formData.memo}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    );
}

export default FolderForm;
