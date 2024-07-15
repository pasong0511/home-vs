"use client";
import { useRef } from "react";
import SlideUpLayer, { SlideUpLayerRef } from "./ui/layer/SlideUpLayer";

function Content() {
    const layerRef = useRef<SlideUpLayerRef>(null);

    const showLayer = () => {
        if (layerRef.current) {
            layerRef.current.show();
        }
    };

    return (
        <div>
            <button onClick={showLayer}>Show Layer</button>
            <SlideUpLayer ref={layerRef}>
                <div>슬라이드</div>
            </SlideUpLayer>
        </div>
    );
}

export default Content;
