"use client";
import React from "react";

import styles from "./MarkerTooltip.module.css";

export interface IMarkerTooltip {
    title: string;
    address: string;
}

export function MarkerTooltip({ title, address }: IMarkerTooltip) {
    return (
        <div style={{ color: "#000" }} className={styles.infoWindow}>
            <div className={styles.title}>{title}</div>
            <div className={styles.address}>{address}</div>
        </div>
    );
}
