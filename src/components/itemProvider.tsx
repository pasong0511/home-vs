import React from "react";

import ButtonGroupContainer from "./container/ButtonGroupContainer";
import InputContainer from "./container/InputContainer";
import TextAreaContainer from "./container/TextAreaContainer";
import { ViewComponent } from "@/types/types";

export const itemProvider = (props: ViewComponent) => {
    const { viewType } = props;

    switch (viewType) {
        //나중에 enum으로 만들기
        case "input":
            return <InputContainer {...props} />;
        case "text_area":
            return <TextAreaContainer {...props} />;
        case "button_group":
            return <ButtonGroupContainer {...props} />;
        default:
            return <div>존재하지 않는 viewType 입니다.</div>;
    }
};
