import React, { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

function PinMarker({ item }: any) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClick = (marker: kakao.maps.Marker) => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div>
            <MapMarker
                position={item.latlng}
                // image={{
                //     src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                //     size: { width: 24, height: 35 },
                // }}
                // title={loc.title}
                onClick={onClick}
            ></MapMarker>

            {isOpen && (
                <CustomOverlayMap position={item.latlng}>
                    {item.infoWindow}
                </CustomOverlayMap>
            )}
        </div>
    );
}

export default PinMarker;
