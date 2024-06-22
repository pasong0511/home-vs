import React, { useEffect } from "react";
import MyMap from "./component/MyMap";

const page = async () => {
    return (
        <div>
            <h1>지도페이지</h1>
            <MyMap />
        </div>
    );
};

export default page;
