"use client";
import React, {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import ReactDOM from "react-dom";
import "./SlideUpLayer.css";

interface SlideUpLayerProps {
    children: ReactNode;
}

export interface SlideUpLayerRef {
    show: () => void;
    hide: () => void;
}

const SlideUpLayer: ForwardRefRenderFunction<
    SlideUpLayerRef,
    SlideUpLayerProps
> = ({ children }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        show() {
            setIsVisible(true);
        },
        hide() {
            setIsVisible(false);
        },
    }));

    const hideLayer = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
        return null;
    }

    const layerContent = (
        <div className={`slide-up-layer ${isVisible ? "show" : "hide"}`}>
            <button onClick={hideLayer}>Close</button>
            {children}
        </div>
    );

    return ReactDOM.createPortal(layerContent, document.body);
};

export default forwardRef(SlideUpLayer);
