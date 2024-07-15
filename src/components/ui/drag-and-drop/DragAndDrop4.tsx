"use client";
import React, { useRef, useState } from "react";
import "./DragAndDropUI2.css";

const available = [
    {
        id: 1,
        title: "111111",
        subtitle: "111111",
    },
    {
        id: 2,
        title: "222222",
        subtitle: "222222",
    },
    {
        id: 3,
        title: "333333",
        subtitle: "333333",
    },
    {
        id: 4,
        title: "44444",
        subtitle: "44444",
    },
    {
        id: 5,
        title: "55555",
        subtitle: "55555",
    },
];

function DragAndDrop4() {
    const [data, setData] = useState(available);
    const [isDragging, setIsDragging] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLElement[]>([]); // container 내부 div 목록

    const selectDragItemIndex = useRef<number>(0); //select
    const selectDragItem = useRef<HTMLDivElement | null>(null); // 드래그 선택한 아이템

    const notDragItemsRef = useRef<HTMLElement[]>([]); //드래그 선택하지 않은 아이템들

    const distanceRef = useRef({});

    const tempDivRef = useRef<HTMLDivElement | null>(null);
    const startPosRef = useRef({ x: 0, y: 0 });

    const dragDataRef = useRef<any>(null);
    const newDataRef = useRef<any[]>([]);

    const createTempDivEl = ({
        width,
        height,
    }: {
        width: number;
        height: number;
    }): HTMLDivElement => {
        //create alternate div element whewn dragItem position is fixed
        const div = document.createElement("div");
        div.id = "dic-temp";
        div.style.width = `${width}px`;
        div.style.height = `${height}px`;
        div.style.pointerEvents = "none";

        return div;
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        //1. 드래그 대상 아이템의 인덱스 저장
        selectDragItemIndex.current = index;
        setIsDragging(index);

        // 2. containerRef통해서 내부의 items 목록 가져오기
        const container = containerRef.current;
        if (container) {
            //items 목록 저장
            const items = Array.from(container.childNodes) as HTMLDivElement[];
            itemsRef.current = items;

            //선택한 드래그 아이템 저장
            const dragItem = items[index] as HTMLDivElement;
            selectDragItem.current = dragItem;

            //드래그 선택한 아이템의 이후 아이템들 -> 밀때 사용
            const itemsBelowDragItem = items.slice(
                index + 1
            ) as HTMLDivElement[];

            //드래그 선택하지 않은 아이템들
            const notDragItems = items.filter((_, i) => i !== index); //드래그 선택한 아이템이 아닌 목록
            notDragItemsRef.current = notDragItems;

            dragDataRef.current = data[index];
            //드래그 이전 시점 데이터 기억
            newDataRef.current = [...data];

            //선택한 아이템 Rect 정보 가져오기
            const dragBoundingRect = dragItem.getBoundingClientRect();
            //카드와 카드 사이의 간격정보 가져오기 - 생략
            const cardSpace =
                items[1].getBoundingClientRect().top -
                items[0].getBoundingClientRect().bottom;

            distanceRef.current = dragBoundingRect.height + cardSpace;

            //드래그 아이템 마우스 다운할 때 스타일 set
            dragItem.style.position = "fixed";
            dragItem.style.zIndex = "5000";
            dragItem.style.width = `${dragBoundingRect.width}px`;
            dragItem.style.height = `${dragBoundingRect.height}px`;
            dragItem.style.top = `${dragBoundingRect.top}px`;
            dragItem.style.left = `${dragBoundingRect.left}px`;
            dragItem.style.left = "grabbing";

            //드래그 할 때 빈 공간에 생기는 임시 div
            const tempEl = createTempDivEl({
                width: dragBoundingRect.width,
                height: dragBoundingRect.height,
            });
            container.appendChild(tempEl);
            tempDivRef.current = tempEl;

            //드래그 선택한 아이템의 이후 아이템들 Y 축으로 밀기
            const distance = dragBoundingRect.height + cardSpace;
            itemsBelowDragItem.forEach((item) => {
                item.style.transform = `translateY(${distance}px)`;
            });

            //드래그 시작한 아이템 좌표 저장
            startPosRef.current = { x: e.clientX, y: e.clientY };
        }
    };

    //draggable 걸린 아이템에 닿을 때 실행, index는 닿은 아이템
    const handleDragEnter = (e: React.DragEvent, index: number) => {
        console.log("handleDragEnter", index);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setIsDragging(null);

        if (selectDragItem.current) {
            selectDragItem.current.style.position = "";
            selectDragItem.current.style.zIndex = "";
            selectDragItem.current.style.width = "";
            selectDragItem.current.style.height = "";
            selectDragItem.current.style.top = "";
            selectDragItem.current.style.left = "";

            const container = containerRef.current;
            if (container && tempDivRef.current) {
                container.removeChild(tempDivRef.current);
                tempDivRef.current = null;

                // items 스타일 초기화
                itemsRef.current.forEach((item) => {
                    item.style.transform = "";
                });
            }
        }

        setData(newDataRef.current);
    };

    const handleDragOver = (e: React.DragEvent) => {};

    //onDrag 이벤트는 onDragStart 이후에 드래그 중에 지속적으로 발생하며,
    //드래그된 요소가 이동하는 동안 실행됩니다
    const handleDrag = (e: React.DragEvent) => {
        const { x, y } = startPosRef.current;

        //오리지널 좌표와, 드래고 하고 있는 이동하고있는 좌표 계산해서 이동
        const posX = e.clientX - x;
        const posY = e.clientY - y;

        if (selectDragItem.current) {
            selectDragItem.current.style.transform = `translate(${posX}px, ${posY}px)`;

            //드래그 선택 대상 아이템 위치 조정
            notDragItemsRef.current.forEach((item) => {
                const rect1 = selectDragItem.current?.getBoundingClientRect();
                const rect2 = item.getBoundingClientRect();

                if (rect1 && rect2) {
                    //swap position card
                    if (item.getAttribute("style")) {
                        item.style.transform = "";
                        selectDragItemIndex.current++;
                    } else {
                        const distance = distanceRef.current;
                        item.style.transform = `translateY(${distance}px)`;
                        selectDragItemIndex.current--;
                    }

                    //드래그 하고 나서 데이터 새로 만들기
                    const dragData = dragDataRef.current;
                    newDataRef.current = data.filter(
                        (item) => item.id !== dragData.id
                    );
                    newDataRef.current.splice(
                        selectDragItemIndex.current,
                        0,
                        dragDataRef.current
                    );
                }
            });
        }
    };

    return (
        <div className="container" ref={containerRef}>
            {data.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrag={(e) => handleDrag(e)}
                >
                    <div
                        className={`card ${
                            isDragging === index ? "dragging" : ""
                        }`}
                    >
                        <div className="img-container"></div>
                        <div className="box">
                            <h4>{item.title}</h4>
                            <h2>{item.subtitle}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DragAndDrop4;
