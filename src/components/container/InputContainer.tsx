import React from "react";
import InputUI from "../ui/InputUI";

function InputContainer(props: any) {
    if (!props.display) {
        return null;
    }

    const { id, label, placeholder, subPlaceholder } = props.config;

    return (
        <InputUI
            id={id}
            label={label}
            placeholder={placeholder}
            subPlaceholder={subPlaceholder}
        />
    );
}

export default InputContainer;
