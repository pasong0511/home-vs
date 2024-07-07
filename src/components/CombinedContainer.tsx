import React from "react";
import withCombined from "@/hoc/withCombined";
import { ItemProvider } from "./ItemProvider";

function CombinedContainer(props: any) {
    return (
        <div className="input-group-wrapper">
            {withCombined([ItemProvider, ItemProvider])(props)}
        </div>
    );
}

export default CombinedContainer;
