import ButtonGroup from "@/components/ButtonGroup";
import React from "react";

const buttonValue = [
    { order: 1, value: "아파트", label: "아파트" },
    { order: 2, value: "오피스텔", label: "오피스텔" },
    { order: 3, value: "빌라", label: "빌라" },
    { order: 4, value: "상가", label: "상가" },
];

function NewFilePage() {
    return (
        <div>
            <div>파일만들기</div>
            <div>
                <header className="app-header">
                    <div className="location">
                        서울특별시 관악구 신림동 1660
                    </div>
                </header>
                <main>
                    <div className="input-group">
                        <label htmlFor="name">이름 (필수)</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="이름을 입력해 주세요."
                        />
                    </div>
                    <div className="input-group">
                        <label>종류 (필수)</label>
                        <ButtonGroup buttonList={buttonValue} />
                    </div>
                    <div className="tab-menu">
                        <button className="tab-button">시세</button>
                        <button className="tab-button">기본</button>
                        <button className="tab-button active">상세</button>
                        <button className="tab-button">학군</button>
                        <button className="tab-button">교통</button>
                        <button className="tab-button">환경</button>
                        <button className="tab-button">사진</button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default NewFilePage;
