import React from "react";
import ButtonGroupUI from "../ui/ButtonGroupUI";

// interface ViewComponent {
//     viewType: string;
//     display: boolean;
//     data?: any;
//     config: {
//         label?: string;
//         placeholder?: string;
//         className?: string;
//     };
// }

function ButtonGroupContainer(props: any) {
    if (!props.display) {
        return null;
    }

    return (
        <div>
            <label>{props.config.label}</label>
            <ButtonGroupUI buttonList={props.config.buttonList} />
        </div>
    );
}

export default ButtonGroupContainer;
