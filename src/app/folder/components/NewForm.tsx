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
            //폴더 생성 후 페이지 이동
            router.push("/folder");
        } else {
            //에러 처리 추가 필요함
            router.push("/folder");
            console.log(formData);
        }
    };

    return (
        <div>
            <h1>새 폴더 만들기</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    폴더 이름:
                    <input
                        type="text"
                        name="folderName"
                        value={formData.folderName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    지역:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    메모:
                    <input
                        type="text"
                        name="memo"
                        value={formData.memo}
                        onChange={handleChange}
                    />
                </label>

                {/* 나머지 필드 추가 */}
                <button type="submit">생성</button>
            </form>
        </div>
    );
}

export default NewForm;
