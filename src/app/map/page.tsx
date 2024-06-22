import React, { useEffect } from "react";
import MapContainer from "./component/MapContainer";

const page = async () => {
    return (
        <div>
            <h1>지도페이지</h1>
            <MapContainer />
        </div>
    );
};

export default page;
