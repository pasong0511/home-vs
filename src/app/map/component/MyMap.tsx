"use client";
import { KAKAO_MAP_SCRIPT_URL } from "@/constants/kakaoMap";
import useLoad from "@/hooks/useLoad";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

function MyMap() {
    // const [show, setShow] = useState(false);

    const loaded = useLoad(KAKAO_MAP_SCRIPT_URL);

    return (
        <div>
            {loaded && (
                <Map
                    center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
                    style={{ width: "800px", height: "600px" }} // 지도 크기
                    level={3} // 지도 확대 레벨
                />
            )}
        </div>
    );
}

export default MyMap;
