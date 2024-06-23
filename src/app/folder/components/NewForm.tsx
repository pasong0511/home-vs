"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

function NewForm() {
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

        const response = await fetch("/api/folder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // 폴더 생성 후 페이지 전환과 새로고침
            router.push("/folder");
            router.refresh();
        } else {
            // 에러 처리 추가 필요함
            console.log("Failed to add folder", formData);
        }
    };

    return (
        <div>
            <h1>새 폴더 만들기</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">생성</button>
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

export default NewForm;
