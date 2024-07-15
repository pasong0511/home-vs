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
    const itemsRef = useRef<HTMLElement[]>([]); // container 내부 div 목록

    const selectDragItem = useRef<HTMLElement | null>(null); //드래그 시작 선택 아이템
    const selectDragItemIndex = useRef(0); //드래그 시작 선택 아이템 인덱스
    const selectStartPosRef = useRef({ x: 0, y: 0 }); //드래그 시작 선택 아이템 위치

    const tempDivRef = useRef<HTMLDivElement | null>(null); //드래그 선택 아이템 빠진 공간에 들어갈 div

    const notDragItemsRef = useRef<HTMLElement[]>([]); //드래그 선택하지 않은 아이템들
    const distanceRef = useRef(0);

    const dragDataRef = useRef<any>(null); //드래그 전 원본 데이터
    const newDataRef = useRef<any[]>([]); //드래그 이후 새로운 데이터

    //마우스 왼쪽 : true / 마우스 오른쪽 : false
    const detectLeftButton = (e: any) => {
        e = e || window.event;

        if ("button" in e) {
            return e.buttons === 1;
        }

        let button = e.which || e.button;
        return button;
    };

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

    const dragEnd = () => {
        document.onpointerup = null; // Clean up the event listener
        document.onpointermove = null; // Clean up the event listener

        setIsDragging(undefined);

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

    const dragMove = (e: any) => {
        const { x, y } = selectStartPosRef.current;
        //calculate the distance the mouse pointer has traveled.
        //original coordinates minus current coordinates.

        const posX = e.clientX - x;
        const posY = e.clientY - y;

        if (selectDragItem.current) {
            selectDragItem.current.style.transform = `translate(${posX}px, ${posY}px)`;

            //swap position and data
            notDragItemsRef.current.forEach((item) => {
                //check two element is overlapping.

                const rect1 = selectDragItem.current?.getBoundingClientRect();
                const rect2 = item.getBoundingClientRect();

                if (rect1 && rect2) {
                    let isOverlapping =
                        rect1.y < rect2.y + rect2.height / 2 &&
                        rect1.y + rect1.height / 2 > rect2.y;

                    if (isOverlapping) {
                        //swap position card
                        if (item.getAttribute("style")) {
                            item.style.transform = "";
                            selectDragItemIndex.current++;
                        } else {
                            const distance = distanceRef.current;
                            item.style.transform = `translateY(${distance}px)`;
                            selectDragItemIndex.current--;
                        }

                        //swrap data
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
                }
            });
        }
    };

    //사용자가 포인터(마우스, 터치, 펜 등)를 눌렀을 때 발생하는 이벤트를 처리
    const handleDragStart = (e: any, index: number) => {
        //오직 마우스 왼쪽 클릭만 허용
        if (!detectLeftButton(e)) return;

        //드래그 대상 아이템의 인덱스 저장
        setIsDragging(index);
        selectDragItemIndex.current = index;

        const container = containerRef.current;
        if (container) {
            //items 목록 저장
            const items = Array.from(container.childNodes) as HTMLElement[];
            itemsRef.current = items;

            //선택한 드래그 아이템 저장
            const dragItem = items[index] as HTMLElement;
            selectDragItem.current = dragItem;

            //드래그 선택한 아이템의 이후 아이템들 -> 밀때 사용
            const itemsBelowDragItem = items.slice(
                index + 1
            ) as HTMLDivElement[];

            //드래그 선택하지 않은 아이템들
            const notDragItems = items.filter((_, i) => i !== index);
            notDragItemsRef.current = notDragItems;

            //드래그한 데이터 저장
            const dragData = data[index];
            dragDataRef.current = dragData;
            newDataRef.current = [...data];

            //선택한 아이템 Rect 정보 가져오기
            const dragBoundingRect = dragItem.getBoundingClientRect();

            //카드와 카드 사이의 간격정보 가져오기
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

            //드래그 할 때 빈 공간에 생기는 임시 div 생성
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
            selectStartPosRef.current = { x: e.clientX, y: e.clientY };

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

// 세부 구현 사항
// 1. 드래그 시작 기능
// 드래그 이벤트 설정

// 각 아이템에 onPointerDown 이벤트를 설정하여 드래그를 시작할 수 있도록 한다.
// 마우스 왼쪽 버튼 확인

// 드래그가 시작될 때, 마우스 왼쪽 버튼이 클릭된 경우에만 드래그가 시작되도록 한다.
// 이를 통해 의도하지 않은 드래그를 방지한다.
// 초기 위치 저장

// 드래그가 시작될 때, 드래그된 아이템의 초기 마우스 위치를 저장한다.
// 이를 통해 드래그 중 이동 거리를 계산할 수 있다.
// 아이템 스타일 변경

// 드래그가 시작되면, 드래그된 아이템의 스타일을 변경하여 고정 위치로 설정한다.
// 시각적으로 드래그 중임을 사용자에게 알릴 수 있도록 한다.
// 임시 대체 div 생성

// 드래그된 아이템의 원래 위치를 유지하기 위해 임시 div를 생성하여 컨테이너에 추가한다.
// 임시 div는 드래그된 아이템의 자리 표시자 역할을 한다.
// 2. 드래그 이동 기능
// 드래그 이벤트 설정

// 드래그 중에 onPointerMove 이벤트를 설정하여 드래그된 아이템의 위치를 업데이트한다.
// 아이템 위치 업데이트

// 드래그 중인 아이템의 위치를 실시간으로 업데이트하여 사용자 인터페이스에 반영한다.
// 마우스의 현재 위치를 기반으로 드래그된 아이템의 새로운 위치를 계산한다.
// 아이템 겹침 감지

// 드래그 중인 아이템과 다른 아이템의 겹침을 감지하여 위치를 교환한다.
// 드래그된 아이템이 다른 아이템과 겹칠 때, 두 아이템의 위치를 교환하여 시각적 순서를 업데이트한다.
// 데이터 순서 업데이트

// 겹침이 발생할 때마다 데이터의 순서를 업데이트하여 상태에 반영한다.
// 이를 통해 드래그가 완료되었을 때 올바른 순서로 데이터를 유지할 수 있다.
// 3. 드래그 종료 기능
// 드래그 종료 이벤트 설정

// 드래그가 종료될 때 onPointerUp 이벤트를 설정하여 드래그를 종료한다.
// 아이템 스타일 복원

// 드래그가 종료되면 드래그된 아이템을 원래 스타일로 복원한다.
// 이를 통해 드래그 상태가 끝났음을 사용자에게 알린다.
// 임시 div 제거

// 임시로 생성된 div를 제거하여 원래의 레이아웃을 복원한다.
// 임시 div가 제거됨으로써 드래그된 아이템이 원래 위치에 놓이게 된다.
// 데이터 상태 업데이트

// 최종적으로 드래그된 아이템의 새로운 위치를 반영하여 데이터 상태를 업데이트한다.
// 이를 통해 드래그 앤 드랍이 완료된 후에도 올바른 데이터 순서를 유지할 수 있다.

// 1. 드래그 시작 기능
// onPointerDown 이벤트를 사용하여 드래그를 시작합니다.
// 마우스 왼쪽 버튼이 클릭된 경우에만 드래그를 시작합니다.
// 드래그된 아이템의 초기 위치를 저장합니다.
// 드래그된 아이템의 스타일을 변경하여 고정 위치로 설정합니다.

// 2. 드래그 이동 기능
// onPointerMove 이벤트를 사용하여 드래그 중인 아이템의 위치를 업데이트합니다.
// 드래그된 아이템과 다른 아이템의 겹침을 감지하여 위치를 교환합니다.
// 데이터의 순서를 업데이트하여 상태에 반영합니다.

// 3. 드래그 종료 기능
// onPointerUp 이벤트를 사용하여 드래그를 종료합니다.
// 드래그된 아이템을 원래 위치로 복원하고, 임시로 생성된 div를 제거합니다.
// 최종적으로 업데이트된 데이터를 상태에 반영합니다.
