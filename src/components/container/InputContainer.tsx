import React from "react";
import InputUI from "../ui/InputUI";

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

function InputContainer(props: any) {
    if (!props.display) {
        return null;
    }

    const { label, placeholder } = props.config;

    return <InputUI label={label} placeholder={placeholder} />;
}

export default InputContainer;
