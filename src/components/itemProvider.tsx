import React from "react";

import { ViewComponent } from "@/types/types";

import withConfigToProps from "@/hoc/withConfigToProps";

import CombinedContainer from "./CombinedContainer";

import ButtonGroup from "./ui/ButtonGroup";
import TextArea from "./ui/TextArea";
import Input from "./ui/Input";

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
