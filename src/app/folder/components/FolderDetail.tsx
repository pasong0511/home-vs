//src/app/folder/components/FolderDetail.tsx
"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FolderDetail = ({ id }: { id: string }) => {
    const [formData, setFormData] = useState({
        folderName: "",
        location: "",
        memo: "",
        option: {},
    });
    const router = useRouter();

    useEffect(() => {
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
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(`/api/folder/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push("/folder");
            router.refresh();
        } else {
            console.log("Failed to update folder", formData);
        }
    };

    return (
        <div>
            <h1>폴더 수정</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">수정</button>
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
};

export default FolderDetail;
