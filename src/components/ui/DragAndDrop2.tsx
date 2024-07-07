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

function DragAndDrop2() {
    const [data, setData] = useState(available);
    const [isDragging, setIsDragging] = useState<number | undefined>();

    const containerRef = useRef<HTMLDivElement>(null);
    const dragItemRef = useRef<HTMLElement | null>(null);
    const tempDivRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLElement[]>([]); // items 참조 추가
    const startPosRef = useRef({ x: 0, y: 0 }); // 시작 위치 참조 추가
    const notDragItemsRef = useRef<HTMLElement[]>([]);
    const distanceRef = useRef(0); // distance 참조 추가
    const indexRef = useRef(0);

    const dragDataRef = useRef<any>(null);
    const newDataRef = useRef<any[]>([]);

    //마우스 왼쪽 : true / 마우스 오른쪽 : false
    const detectLeftButton = (e: any) => {
        e = e || window.event;

        if ("button" in e) {
            return e.buttons === 1;
        }

        let button = e.which || e.button;
        return button;
    };

    const dragEnd = () => {
        document.onpointerup = null; // Clean up the event listener
        document.onpointermove = null; // Clean up the event listener

        setIsDragging(undefined);

        if (dragItemRef.current) {
            dragItemRef.current.style.position = "";
            dragItemRef.current.style.zIndex = "";
            dragItemRef.current.style.width = "";
            dragItemRef.current.style.height = "";
            dragItemRef.current.style.top = "";
            dragItemRef.current.style.left = "";

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

    const dragMove = (e: any) => {
        const { x, y } = startPosRef.current;
        //calculate the distance the mouse pointer has traveled.
        //original coordinates minus current coordinates.

        const posX = e.clientX - x;
        const posY = e.clientY - y;

        if (dragItemRef.current) {
            dragItemRef.current.style.transform = `translate(${posX}px, ${posY}px)`;

            //swap position and data
            notDragItemsRef.current.forEach((item) => {
                //check two element is overlapping.

                const rect1 = dragItemRef.current?.getBoundingClientRect();
                const rect2 = item.getBoundingClientRect();

                if (rect1 && rect2) {
                    let isOverlapping =
                        rect1.y < rect2.y + rect2.height / 2 &&
                        rect1.y + rect1.height / 2 > rect2.y;

                    //console.log(isOverlapping);

                    if (isOverlapping) {
                        //swap position card
                        if (item.getAttribute("style")) {
                            item.style.transform = "";
                            indexRef.current++;
                        } else {
                            const distance = distanceRef.current;
                            item.style.transform = `translateY(${distance}px)`;
                            indexRef.current--;
                        }

                        //swrap data
                        const dragData = dragDataRef.current;
                        // const newData = newDataRef.current.filter(
                        //     (item) => item.id !== dragData.id
                        // );
                        // newDataRef.current = newData;

                        newDataRef.current = data.filter(
                            (item) => item.id !== dragData.id
                        );
                        newDataRef.current.splice(
                            indexRef.current,
                            0,
                            dragDataRef.current
                        );
                        console.log(newDataRef.current);
                    }
                }
            });
        }
    };

    //사용자가 포인터(마우스, 터치, 펜 등)를 눌렀을 때 발생하는 이벤트를 처리
    const handleDragStart = (e: any, index: number) => {
        //오직 마우스 왼쪽 클릭만 허용
        if (!detectLeftButton(e)) return;
        console.log({ "left mouse click ": detectLeftButton(e) });

        setIsDragging(index);
        indexRef.current = index;

        const container = containerRef.current;
        if (container) {
            const items = Array.from(container.childNodes) as HTMLElement[];
            itemsRef.current = items; // items를 참조에 저장

            const dragItem = items[index] as HTMLElement; //선택한 아이템 엘리먼트
            dragItemRef.current = dragItem; // dragItem을 참조에 저장

            const itemsBelowDragItem = items.slice(
                index + 1
            ) as HTMLDivElement[];
            //console.log(itemsBelowDragItem);
            const notDragItems = items.filter((_, i) => i !== index); //드래그 선택한 아이템이 아닌 목록
            notDragItemsRef.current = notDragItems;

            const dragData = data[index];
            dragDataRef.current = dragData;

            //const newData = data.filter((item) => item.id !== dragData.id);
            newDataRef.current = [...data];

            //선택한 아이템 Rect 정보 가져오기
            const dragBoundingRect = dragItem.getBoundingClientRect();
            //distance between two chard
            const space =
                items[1].getBoundingClientRect().top -
                items[0].getBoundingClientRect().bottom;
            //console.log(space);
            distanceRef.current = dragBoundingRect.height + space;

            //드래그 아이템 마우스 다운할 때 스타일 set
            dragItem.style.position = "fixed";
            dragItem.style.zIndex = "5000";
            dragItem.style.width = `${dragBoundingRect.width}px`;
            dragItem.style.height = `${dragBoundingRect.height}px`;
            dragItem.style.top = `${dragBoundingRect.top}px`;
            dragItem.style.left = `${dragBoundingRect.left}px`;
            dragItem.style.left = "grabbing";

            //create alternate div element whewn dragItem position is fixed
            const div = document.createElement("div");
            div.id = "dic-temp";
            div.style.width = `${dragBoundingRect.width}px`;
            div.style.height = `${dragBoundingRect.height}px`;
            div.style.pointerEvents = "none";
            container.appendChild(div);

            // Store the created div in the ref
            tempDivRef.current = div;

            // move the elements below dragItem
            // distence to be moved
            const distance = dragBoundingRect.height + space;

            itemsBelowDragItem.forEach((item) => {
                item.style.transform = `translateY(${distance}px)`;
            });

            //get the original coordinates of the mouse pointer
            startPosRef.current = { x: e.clientX, y: e.clientY };

            // 드래그 이벤트
            document.onpointermove = dragMove;

            // onPointerDown 이벤트 끝
            document.onpointerup = dragEnd;
        }
    };

    return (
        <div className="container" ref={containerRef}>
            {data.map((item, index) => (
                <div
                    key={item.id}
                    onPointerDown={(e) => handleDragStart(e, index)}
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

export default DragAndDrop2;

//https://reactjs-drag-drop.pages.dev/
//https://www.youtube.com/watch?v=PyGqKt86gU0
