import { useEffect, useState } from "react";

export default function withStringState(component: Function) {
    return (props: { [key: string]: unknown }) => {
        const [value, setValue] = useState("");

        console.log("스테이트 업데이트", value);

        return component({
            ...props,
            value,
            onChange: (value: string) => setValue(value),
        });
    };
}
