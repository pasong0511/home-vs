"use client";
import React, {
    forwardRef,
    ForwardRefRenderFunction,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import "./SlideUpLayer.css";
import ReactDOM from "react-dom";

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
    const [shouldRender, setShouldRender] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        show() {
            setShouldRender(true);
            setTimeout(() => setIsVisible(true), 10);
        },
        hide() {
            setIsVisible(false);
            setTimeout(() => setShouldRender(false), 300);
        },
    }));

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted) {
        return null;
    }

    const layerContent = shouldRender && (
        <div className={`slide-up-layer ${isVisible ? "show" : "hide"}`}>
            <button onClick={() => setIsVisible(false)}>Close</button>
            <div className="move-button">Move</div>
            {children}
        </div>
    );

    return ReactDOM.createPortal(layerContent, document.body);
};

export default forwardRef(SlideUpLayer);
