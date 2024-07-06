import React from "react";
import InputUI from "../ui/InputUI";

function CombinedInputContainer(props: any) {
    if (!props.display) {
        return null;
    }

    const { id, label, placeholder, subPlaceholder, combined } = props.config;
    const frontInput = combined[0];
    const backInput = combined[1];

    return (
        <div className="input-group-wrapper">
            <InputUI
                id={frontInput.itemId}
                label={frontInput.config.label}
                placeholder={frontInput.config.placeholder}
                subPlaceholder={frontInput.config.subPlaceholder}
            />
            <InputUI
                id={backInput.itemId}
                label={backInput.config.label}
                placeholder={backInput.config.placeholder}
                subPlaceholder={backInput.config.subPlaceholder}
            />
        </div>
    );
}

export default CombinedInputContainer;
