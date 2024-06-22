"use client";
import { KAKAO_MAP_SCRIPT_URL } from "@/constants/kakaoMap";
import useLoad from "@/hooks/useLoad";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import { MarkerTooltip } from "./MarkerTooltip";
import PinMarker from "./PinMarker";

function MapContainer() {
    const loaded = useLoad(KAKAO_MAP_SCRIPT_URL);
    const [isOpen, setIsOpen]: any = useState(false);

    const locations = [
        {
            title: "카카오",
            latlng: { lat: 33.450705, lng: 126.570677 },
            infoWindow: <MarkerTooltip title="카카오" address="카카오 주소" />,
        },
        {
            title: "생태연못",
            latlng: { lat: 33.450936, lng: 126.569477 },
            infoWindow: (
                <MarkerTooltip title="카카오" address="생태연못 주소" />
            ),
        },
        {
            title: "텃밭",
            latlng: { lat: 33.450879, lng: 126.56994 },
            infoWindow: <MarkerTooltip title="카카오" address="텃밭 주소" />,
        },
        {
            title: "근린공원",
            latlng: { lat: 33.451393, lng: 126.570738 },
            infoWindow: (
                <MarkerTooltip title="카카오" address="근린공원 주소" />
            ),
        },
    ];

    return (
        <div>
            {loaded && (
                <Map
                    center={{ lat: 33.450705, lng: 126.570677 }} // 지도의 중심 좌표
                    style={{ width: "1200", height: "600px" }} // 지도 크기
                    level={3} // 지도 확대 레벨
                >
                    {locations.map((item, idx) => (
                        <PinMarker
                            key={`${item.title}-${item.latlng}`}
                            item={item}
                        />
                    ))}
                </Map>
            )}
        </div>
    );
}

export default MapContainer;

//https://velog.io/@syncstar/%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%A7%80%EB%8F%84-8-%EC%A0%84%EC%B2%B4-%EC%A7%80%EB%8F%84%EC%97%90%EC%84%9C-%EA%B2%8C%EC%8B%9C%EB%AC%BC-%EC%98%AC%EB%A6%B0-%EB%A7%88%EC%BB%A4-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0
