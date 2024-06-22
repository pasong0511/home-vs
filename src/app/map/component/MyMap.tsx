"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

function MyMap() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Script
                onLoad={() => kakao.maps.load(() => setShow(true))}
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=0c44c195b0d549c627b026d2c12bca6c&autoload=false`}
            ></Script>
            맵로드
            {show && (
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
