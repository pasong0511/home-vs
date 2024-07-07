import React from "react";

import { ViewComponent } from "@/types/types";

import Input from "./ui/InputUI";
import TextArea from "./ui/TextAreaUI";
import ButtonGroup from "./ui/ButtonGroupUI";
import withConfigToProps from "@/hoc/withConfigToProps";
import CombinedContainer from "./CombinedContainer";

const CONTAINER = {
    input: withConfigToProps(Input),
    text_area: withConfigToProps(TextArea),
    button_group: withConfigToProps(ButtonGroup),
    combined_input: CombinedContainer,
};

export const ItemProvider = ({ viewType, ...props }: ViewComponent) => {
    const Component =
        CONTAINER[viewType as keyof typeof CONTAINER] ??
        (() => <div>존재하지 않는 viewType 입니다.</div>);

    return <Component {...props} />;
};
