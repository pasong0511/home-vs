import React from "react";
import TextAreaUI from "../ui/TextAreaUI";

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

function TextAreaContainer(props: any) {
    if (!props.display) {
        return null;
    }

    const { label, placeholder } = props.config;

    return <TextAreaUI label={label} placeholder={placeholder} />;
}

export default TextAreaContainer;
