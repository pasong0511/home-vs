"use client";
import React, { useRef, useState } from "react";

function DragAndDrop() {
    const dragItem = useRef<number | null>(null); // 드래그할 아이템의 인덱스
    const dragOverItem = useRef<number | null>(null); // 드랍할 위치의 아이템의 인덱스
    const [list, setList] = useState([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
    ]);

    // 드래그 시작될 때 실행
    const handleDragStart = (e, index: number) => {
        console.log("시작", index);
        dragItem.current = index;
    };

    // 드래그중인 대상이 위로 포개졌을 때
    const handleDragEnter = (e, index: number) => {
        console.log("포갬", index);
        dragOverItem.current = index;
    };

    // 드랍 (커서 뗐을 때)
    const handleDragDrop = (e) => {
        const dragItemIndex = dragItem.current; //드래그 시작을 선택한 아이템
        const dragOverItemIndex = dragOverItem.current; //드래그 마지막으로 포갠 아이템
        console.log("🚗드랍", dragOverItemIndex);

        if (
            dragItemIndex !== null &&
            dragOverItemIndex !== null &&
            dragItemIndex !== dragOverItemIndex
        ) {
            const newList = [...list];
            const draggedItem = newList[dragItemIndex];

            //splice 사용하여 원본 배열을 변경, 아이템을 제거하고 다시 삽입
            newList.splice(dragItemIndex, 1); // 드래그한 아이템을 기존 위치에서 제거
            newList.splice(dragOverItemIndex, 0, draggedItem); // 드랍한 위치에 아이템 추가
            console.log("슬라이스1", newList);

            setList(newList);
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    return (
        <div>
            DragAndDrop
            <div>
                {list &&
                    list.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: "lightblue",
                                margin: "20px 25%",
                                textAlign: "center",
                                fontSize: "40px",
                            }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            onDragEnd={handleDragDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {item}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default DragAndDrop;
