"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "./ImageUpload.css";

interface UploadedImage {
    id: string;
    url: string;
}

const MAX_IMAGE_COUNT = 15;

function ImageUpload() {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        //이미지 업로드한 파일은 e.target.files 여기에 들어가있음
        const files = Array.from(e.target.files || []);
        const totalSelected = selectedImages.length + files.length;

        if (totalSelected > MAX_IMAGE_COUNT) {
            alert(`${MAX_IMAGE_COUNT}개만 올릴 수 있어요`);
            const remainingSlots = MAX_IMAGE_COUNT - selectedImages.length;
            const uploadableFiles = files.slice(0, remainingSlots);

            setSelectedImages((prevImages) => [
                ...prevImages,
                ...uploadableFiles,
            ]);
        } else {
            setSelectedImages((prevImages) => [...prevImages, ...files]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        selectedImages.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });

        //api 없으니까 임시로 이미지 데이터 추가.
        const newUploadedImages = selectedImages.map((image, index) => ({
            id: `${Date.now()}-${index}`,
            url: URL.createObjectURL(image),
        }));

        setUploadedImages((prevImages) => [
            ...prevImages,
            ...newUploadedImages,
        ]);
        setSelectedImages([]);

        //api 코드
        // try {
        //     const response = await fetch(`test`, {
        //         method: "POST",
        //         body: formData,
        //     });

        //     if (response.ok) {
        //         const data = await response.json();
        //         setUploadedImages((prevImages) => [
        //             ...prevImages,
        //             ...data.images,
        //         ]);
        //         setSelectedImages([]);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const handleRemoveImage = async (index: number) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );

        //api 코드
        const imageToRemove = uploadedImages[index];
        try {
            const response = await fetch(
                `https://test.com/delete/${imageToRemove.id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setUploadedImages((prevImages) =>
                    prevImages.filter((_, i) => i !== index)
                );
            } else {
                console.error("이미지 딜리트 실패");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    useEffect(() => {
        console.log(selectedImages);
    }, [selectedImages]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                <button type="submit" className="complete-btn">
                    Upload Images
                </button>
            </form>
            {/* 미리보기 이미지 */}
            <div className="image-container">
                <div className="image-grid">
                    {selectedImages.length > 0 &&
                        selectedImages.map((image, index) => (
                            <div
                                key={index}
                                style={{ margin: "10px" }}
                                className="image-item"
                            >
                                {/* 임시 로컬 서버이므로 Next.js <Image> 컴포넌트가 아닌 img 태그 대체 */}
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Selected ${index}`}
                                />
                                <button
                                    className="delete-btn"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                </div>
            </div>
            {/* 업로드 후 데이터 이미지 */}
            {/* <div>
                {uploadedImages.length > 0 && (
                    <div>
                        <h3>Uploaded Images</h3>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {uploadedImages.map((image) => (
                                <div key={image.id} style={{ margin: "10px" }}>
                                    <img
                                        src={image.url}
                                        alt={`Uploaded ${image.id}`}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default ImageUpload;
