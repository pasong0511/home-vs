import { useEffect } from "react";

export default function withConsole(component: Function) {
    return (props: { [key: string]: unknown }) => {
        useEffect(() => {
            console.log(props);
        }, [props]);

        return component({
            ...props,
        });
    };
}
